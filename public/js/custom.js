// JavaScript Document

//cufon font replacement class/id
Cufon.replace('.button_1 a,.button_2 a,.button_3 a',{textShadow: '0px 1px 0px #878787'});    
Cufon.replace('h1,h2,#header_top p');    

$(document).ready(function(){

//Fancybox for image gallery
$("a[rel=next]").fancybox({
		'opacity'		: true,
		'overlayShow'	       : true,
		'overlayColor': '#000000',
		'overlayOpacity'     : 0.9,
		'titleShow':true,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic'
});

//Slideshow for testimonial
$('.testimonial').cycle({
		fx: 'fade', // choose your transition type, ex: fade, scrollUp, scrollLeft etc... 
   		speed: 1000,
		timeout: 4000,  // milliseconds between slide transitions (0 to disable auto advance)
		cleartypeNoBg:   true, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
		pause:  1
});

//Contact form
$(function() {
		var v = $("#form").validate({
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					target: "#result"
				});
			}
		});
		
});	
$('#form #message').val('');

//Subscribe form
$(function() {
		var v = $("#subform").validate({
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					target: "#result_sub"
				});
			}
		});
		
});	

//Page scroll	
$(".scroll").click(function() {
    	$.scrollTo($($(this).attr("href")), {
           duration: 750
    	});
	
        return false;
});

//On Hover Event for gallery, social
$('ul.gallery li img,.social li a img').hover(function(){
			$(this).animate({opacity: 0.6}, 300);
		}, function () {
			$(this).animate({opacity: 1}, 300);
});

//Styling to table row
$('tr:nth-child(odd)').addClass('alt');

}); // close document.ready

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);