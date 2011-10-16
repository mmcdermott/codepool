		
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
			
			r.genproj = function(projs){
				var self = this;
				(projs).forEach(function(v,i){
					var html, peeps = [];
					if(v.pledges){
						v.pledges.forEach(function(v,i){
							peeps.push("<span class='pledgesamount'>$"+ v.amount + "</span> ~ "+ v.name);
						});
					}
					html = '<div class="project" id="projects-'+v.id+'" tag="'+((v.tags)?(v.tags.join(' ')||'').toLowerCase():'none')+'">'
						+'<div class="ptotal">$'
						+	v.price
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
						+	'<div class="ptitle"><b><u>'
						+		v.title
						+	'</u></b></div>'
						+		'<span class="pbrief">'
					//	+		v.brief
						+		'</span>'
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
				//console.log(hash);
				var proj = $(hash.replace('/','-'));
				if(!hash || proj.is('.pactive')) return false;
				scroll = $(document).scrollTop();
				$(document).scrollTop(0);
				$(".project").fadeOut();
				proj.addClass('pactive').stop(true,true).fadeIn().find('.pdetail, .pspec').slideDown();
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
				cp.hash('#'+$(this).attr('id'));
			});
			$("#logo, .url-home").live("click",function(e){
				e.stopPropagation();e.preventDefault();
				$(".pactive").removeClass('pactive').stop(true,true).fadeIn().find('.pdetail, .pspec').slideUp();
				$(".project").slideDown(function(){
					$(document).scrollTop(scroll);
				});
			});
			
			$("#search").live('keyup',function(e){
				var val = $(this).val();
				var selector = '[tag*=' + (val||'').toLowerCase() + ']';
				console.log(selector);
				$("#projects").children().filter(selector).fadeIn();
				$("#projects").children().not(selector).fadeOut();
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