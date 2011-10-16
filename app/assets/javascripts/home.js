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
				var self = this; projs = projs||[];
				projs = projs.sort(cp.sortproj);
				projs.forEach(function(v,i){
					var html, peeps = [];
					if(v.pledges){
						v.pledges.forEach(function(v,i){
							peeps.push("<span class='pledgesamount'>$"+ v.amount + "</span> ~ "+ v.name);
						});
					}
					html = '<div class="project" id="projects-'+v.id+'" tag="'+(v.title.toLowerCase()||((v.tags)?(v.tags.join(' ')||'').toLowerCase():'none'))+'">'
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
						+	'<div class="ptitle"><b><u><a class="ptitle" href="/projects/'+v.id+'">'
						+		v.title
						+	'</a></u></b>'
						/*+		'<span class="ptime"> - '
						+			(new Date(v.created_at)||new Date()).toDateString()
						+		'</span>'*/
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
					$("#projects").append(html);
				});
				self.hash(location.hash);
			}
			
			r.hash = function(hash){
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
			
			$(".project").live("click",function(e){return true;
				cp.hash('#'+$(this).attr('id'));
			});
			$("#logo, .url-home").live("click",function(e){
				e.stopPropagation();e.preventDefault();
				$(".pactive").removeClass('pactive').stop(true,true).show().find('.pdetail, .pspec').hide();
				$(".project").show(1,function(){
					$(document).scrollTop(scroll);
				});
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