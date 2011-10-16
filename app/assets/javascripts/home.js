WebFontConfig = {
        google: { families: [ 'Nova Square', 'Play' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
			
			var cp = (function(){
				var r = {};
				
				r.sort = function(by){
					if(!by) return false;
					
					var pre, aft, a, b;
					for(var i = 0; cp.projs[i]; i++){
						var b = cp.projs[i], self = $("#projects-"+b.id);
						if(pre){
							var A = a[by], B = b[by];
							if(A < B){
								pre.before(self);
							}else if(A > B){
								pre.after(self);
							}else{
								pre.before(self);
							}
						}
						a = b;
						pre = $("#projects-"+b.id);
					};
				}
				r.sortproj = function(b,a){
					var A = a.price;
					var B = b.price;
					if (A < B){
						return -1;
					}else if (A > B){
						return  1;
					}else{
						return 0;
					}
				}
				r.genproj = function(projs){
					var self = this; cp.projs = projs = projs||[];
					projs = projs.sort(cp.sortproj);
					for(var i = 0; projs[i]; i++){
						var html, peeps = [], v = projs[i];
						if(v.pledges){
							v.pledges.forEach(function(v,i){
								peeps.push("<span class='pledgesamount'>$"+ v.amount + "</span> ~ "+ v.name);
							});
						}
						v.time = new Date(v.created_at).getTime();
						html = ''
							//+'<a href="/projects/'+v.id+'">'
							+'<div class="project" id="projects-'+v.id+'" tag="'+(v.title.toLowerCase()||((v.tags)?(v.tags.join(' ')||'').toLowerCase():'none'))+'">'
							+'<input type="hidden" class="plink" value="/projects/'+v.id+'">'
							+'<div class="ptotal">$'
							+	v.price
							//+ '<br/>'+v.created_at
								+ '<div class="pspec">'
									+	'<div class="btn success large"><big>'
									+ 'PLEDGE'
									+	'</big></div>'
									+ '<br/>'
									+	'<div class="bcomplete btn large"><small>'
									+ 'COMPLETE'
									+	'</small></div>'
									+	'<br/><div class="btn url-home">'
									+ 'go back'
									+	'</div>'
								+ '</div>'
							+'</div>'
							+'<div class="pbody">'
							+	'<div class="ptitle"><b><u><span class="psubj">'
							+		v.title
							+	'</span></u></b>'
							+		'<span class="ptime"> - '
							+			(new Date(v.created_at)||new Date()).toDateString()
							+		'</span>'
							+ '<div class="psummary">'
							+ (v.description||'').slice(0,160)
							+ (v.description.length>160?"...":"")
							+ '</div>'
							+ '</div>'
							+	'<div class="pdetail">'
							+		v.description
							+	'<div class="pmeta">'
								+	'<div class="pledges">'
									+ "Pledges:<br/>"
									+ peeps.join('<br/>')
								+ '</div>'
								+	'<div><br/>'
									+ 'Tags: '
									+ (v.tags||[]).join(', ')
								+ '<div>'
							+ '<div>'
							+	'</div>'
							+'</div>'
						+"</div>"
						//+'</a>'
						$("#projects").append(html);
					};
					self.hash(location.hash);
				}
				
				r.hash = function(hash){
					//window.location.pathname = hash;
					return true;
					var proj = $(hash.replace('/','-'));
					if(!hash || proj.is('.pactive')) return false;
					scroll = $(document).scrollTop();
					$(document).scrollTop(0);
					$(".project").hide();
					proj.addClass('pactive').stop(true,true).show().find('.pdetail, .pspec').show();
					location.hash = hash;
				}
				
				return r;
			})();
			
			$(document).ready(function(){
				var scroll = 0;
				
				$.get('/projects?format=json',function(data){
					//console.log(data);
					cp.genproj(data);
				});
				
				$(".project").live("click",function(e){
					location.pathname = $(this).children('.plink').val();
					return true;
					cp.hash('#'+$(this).attr('id'));
				});
				$("#logo, .url-home").live("click",function(e){
					e.stopPropagation();e.preventDefault();
					$(".pactive").removeClass('pactive').stop(true,true).show().find('.pdetail, .pspec').hide();
					$(".project").show(1,function(){
						$(document).scrollTop(scroll);
					});
				});
				$("#sort-time").live("click",function(e){
					cp.sort('time');
				});
				$("#sort-price").live("click",function(e){
					cp.sort('price');
				});
				
				$("#search").live('keyup',function(e){
					var val = $(this).val();
					var selector = '[tag*=' + (val||'').toLowerCase() + ']';
					console.log(selector);
					$("#projects").children().filter(selector).show();
					$("#projects").children().not(selector).hide();
				}).focus(function(){
					if($(this).val() == 'search'){
						$(this).val('');
					}
				}).blur(function(){
					if($(this).val() == ''){
						$(this).val('search');
					}
				});
				
			});