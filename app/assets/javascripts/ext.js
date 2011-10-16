function ii(n){
	if(!n) {
		return [0]; 
	} else if(typeof n == 'number') {
		return [n] 
	} else {
	r = n.match(/(\-\d+|\d+)/g) || [0];
	for(var i in r) {
		r[i] = parseInt(r[i]);
	}
	return r;
}}
(function( $ ){
  function i(val) {return parseInt(val)}
  $.fn.across = function(ml,bl,pl,w,pr,br,mr) {
	evyt = $(this);
	if(!evyt.data('css')) return 0;
	var width = 0;
	if(ml!=0) {
		 if(ml>0){
			if(evyt.css('float') != 'none' && evyt.css('margin-left') != 'auto') {
				width += (i(evyt.css('margin-left')||0));
			}
		} else if(evyt.data('css')['float'] != 'none' && evyt.data('css')['margin-left'] != 'auto') {
			width += (i(evyt.data('css')['margin-left']||0));
		}
	}if(bl!=0) {
		if(bl>0) width += (i(evyt.css('border-left-width')||0));
		else width += (i(evyt.data('css')['border-left-width']||0));
	}if(pl!=0) {
		if(pl>0) width += (i(evyt.css('padding-left')||0));
		else width += (i(evyt.data('css')['padding-left']||0));
	}if(w!=0) {
		if(w==-3) width += evyt.x().max_
		if(w==-2) width += (i(evyt.data('css')['_width']||evyt.data('css')['width']));
		if(w==-1) width += evyt.x().min_
		if(w== 1) width += evyt.x().min;
		if(w== 2) width += evyt.width();
		if(w== 3) width += evyt.x().max;
	}if(pr!=0) {
		if(pr>0) width += (i(evyt.css('padding-right')||0));
		else width += (i(evyt.data('css')['padding-right']||0));
	}if(br!=0){
		if(br>0) width += (i(evyt.css('border-right-width')||0));
		else width += (i(evyt.data('css')['border-right-width']||0));
	}if(mr!=0) {
		 if(mr>0){
			if(evyt.css('float') != 'none' && evyt.css('margin-right') != 'auto')
				width += (i(evyt.css('margin-right')||0));
		} else if(evyt.data('css')['float'] != 'none' && evyt.data('css')['margin-right'] != 'auto')
			width += (i(evyt.data('css')['margin-right']||0));
	}
	return width;
}
})( jQuery );
(function( $ ){
  $.fn.cax = function() {
   var max = 10, child = false;
   this.children('.evyt').each(function(){
		if(max < (w=$(this).across(1,1,1,1,1,1,1))) max = w;
		child = true;
	});
	if(max == 10 && child) {
		child = 10;
		this.children('.evyt').each(function(){
			if(child < $(this).cax()) child = $(this).cax();
		});
		max += child;
   }
	return max;
	}
})( jQuery );
(function( $ ){
	function i(val) {return parseInt(val)}
  $.fn.x = function() {
		var max =(this.css('max-width') == 'none')? Infinity : i(this.css('max-width')),
			min = (this.css('min-width') == 'none')? 10 : i(this.css('min-width')||10),
			pax = (this.parent().css('max-width') == 'none')? this.parent().width() : i(this.parent().css('max-width')),
			cax = this.cax(),
			max_ =(this.data('css')['max-width'] == 'none')? Infinity : i(this.data()['max-width']||this.data()['_width']),
			min_ = (!this.data('css')['min-width'] || this.data('css')['min-width'] == 'none')? this.data('css')['_width'] : i(this.data('css')['min-width']);
		this.cax();
		return {
			min: min,
			max: max,
			max_: max_,
			min_: min_,
			pax: pax,
			cax: cax
		};
	}
})( jQuery );
(function( $ ){
	$.fn.struct = function(obj,opt,fn) {
		var c = true;
		if(opt instanceof Function) {
			fn = opt;
			opt = {};
		} else {
			opt = opt||{};
		}
		opt.wedge = opt.wedge||": ";
		opt.val = opt.val||function(a){};
		opt.name = opt.name||function(a){};
		for(var i in obj) {
			if(obj[i] instanceof Object) {
				var id = "list-"+(+new Date().getTime()+(Math.pow(Math.random(),Math.random()).toString().slice(-6)));//time.now();
				this.last().append("<li class='list'>"
					+i+
				"<ul id='"+id+"' class='struct'></li>");
				c = false;
				opt.name(this.children('.list').last().data('val',obj[i]),obj[i]);
				$("#"+id).struct(obj[i],opt,fn);
			} else { 
				this.last().append("<li class='list'>"+
					i+"<span class='wedge'>"+opt.wedge+"<span class='val'>"+obj[i]+
				"</span></span></li>");
				opt.val(this.children('.list').last().data('val',obj[i]),obj[i]);
			}
		}
		if(c && fn) {
			fn();
		}
		return this.each(function() {
		  var self = $(this);
		});
	}	
})( jQuery );
$.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};
(function($) {
	var colornames = {
			aliceblue: { r:240, g:248, b:255 },
			antiquewhite: { r:250, g:235, b:215 },
			aqua: { r:0, g:255, b:255 },
			aquamarine: { r:127, g:255, b:212 },
			azure: { r:240, g:255, b:255 },
			beige: { r:245, g:245, b:220 },
			bisque: { r:255, g:228, b:196 },
			black: { r:0, g:0, b:0 },
			blanchedalmond: { r:255, g:235, b:205 },
			blue: { r:0, g:0, b:255 },
			blueviolet: { r:138, g:43, b:226 },
			brown: { r:165, g:42, b:42 },
			burlywood: { r:222, g:184, b:135 },
			cadetblue: { r:95, g:158, b:160 },
			chartreuse: { r:127, g:255, b:0 },
			chocolate: { r:210, g:105, b:30 },
			coral: { r:255, g:127, b:80 },
			cornflowerblue: { r:100, g:149, b:237 },
			cornsilk: { r:255, g:248, b:220 },
			crimson: { r:220, g:20, b:60 },
			cyan: { r:0, g:255, b:255 },
			darkblue: { r:0, g:0, b:139 },
			darkcyan: { r:0, g:139, b:139 },
			darkgoldenrod: { r:184, g:134, b:11 },
			darkgray: { r:169, g:169, b:169 },
			darkgreen: { r:0, g:100, b:0 },
			darkgrey: { r:169, g:169, b:169 },
			darkkhaki: { r:189, g:183, b:107 },
			darkmagenta: { r:139, g:0, b:139 },
			darkolivegreen: { r:85, g:107, b:47 },
			darkorange: { r:255, g:140, b:0 },
			darkorchid: { r:153, g:50, b:204 },
			darkred: { r:139, g:0, b:0 },
			darksalmon: { r:233, g:150, b:122 },
			darkseagreen: { r:143, g:188, b:143 },
			darkslateblue: { r:72, g:61, b:139 },
			darkslategray: { r:47, g:79, b:79 },
			darkslategrey: { r:47, g:79, b:79 },
			darkturquoise: { r:0, g:206, b:209 },
			darkviolet: { r:148, g:0, b:211 },
			deeppink: { r:255, g:20, b:147 },
			deepskyblue: { r:0, g:191, b:255 },
			dimgray: { r:105, g:105, b:105 },
			dimgrey: { r:105, g:105, b:105 },
			dodgerblue: { r:30, g:144, b:255 },
			firebrick: { r:178, g:34, b:34 },
			floralwhite: { r:255, g:250, b:240 },
			forestgreen: { r:34, g:139, b:34 },
			fuchsia: { r:255, g:0, b:255 },
			gainsboro: { r:220, g:220, b:220 },
			ghostwhite: { r:248, g:248, b:255 },
			gold: { r:255, g:215, b:0 },
			goldenrod: { r:218, g:165, b:32 },
			gray: { r:128, g:128, b:128 },
			green: { r:0, g:128, b:0 },
			greenyellow: { r:173, g:255, b:47 },
			grey: { r:128, g:128, b:128 },
			honeydew: { r:240, g:255, b:240 },
			hotpink: { r:255, g:105, b:180 },
			indianred: { r:205, g:92, b:92 },
			indigo: { r:75, g:0, b:130 },
			ivory: { r:255, g:255, b:240 },
			khaki: { r:240, g:230, b:140 },
			lavender: { r:230, g:230, b:250 },
			lavenderblush: { r:255, g:240, b:245 },
			lawngreen: { r:124, g:252, b:0 },
			lemonchiffon: { r:255, g:250, b:205 },
			lightblue: { r:173, g:216, b:230 },
			lightcoral: { r:240, g:128, b:128 },
			lightcyan: { r:224, g:255, b:255 },
			lightgoldenrodyellow: { r:250, g:250, b:210 },
			lightgray: { r:211, g:211, b:211 },
			lightgreen: { r:144, g:238, b:144 },
			lightgrey: { r:211, g:211, b:211 },
			lightpink: { r:255, g:182, b:193 },
			lightsalmon: { r:255, g:160, b:122 },
			lightseagreen: { r:32, g:178, b:170 },
			lightskyblue: { r:135, g:206, b:250 },
			lightslategray: { r:119, g:136, b:153 },
			lightslategrey: { r:119, g:136, b:153 },
			lightsteelblue: { r:176, g:196, b:222 },
			lightyellow: { r:255, g:255, b:224 },
			lime: { r:0, g:255, b:0 },
			limegreen: { r:50, g:205, b:50 },
			linen: { r:250, g:240, b:230 },
			magenta: { r:255, g:0, b:255 },
			maroon: { r:128, g:0, b:0 },
			mediumaquamarine: { r:102, g:205, b:170 },
			mediumblue: { r:0, g:0, b:205 },
			mediumorchid: { r:186, g:85, b:211 },
			mediumpurple: { r:147, g:112, b:219 },
			mediumseagreen: { r:60, g:179, b:113 },
			mediumslateblue: { r:123, g:104, b:238 },
			mediumspringgreen: { r:0, g:250, b:154 },
			mediumturquoise: { r:72, g:209, b:204 },
			mediumvioletred: { r:199, g:21, b:133 },
			midnightblue: { r:25, g:25, b:112 },
			mintcream: { r:245, g:255, b:250 },
			mistyrose: { r:255, g:228, b:225 },
			moccasin: { r:255, g:228, b:181 },
			navajowhite: { r:255, g:222, b:173 },
			navy: { r:0, g:0, b:128 },
			oldlace: { r:253, g:245, b:230 },
			olive: { r:128, g:128, b:0 },
			olivedrab: { r:107, g:142, b:35 },
			orange: { r:255, g:165, b:0 },
			orangered: { r:255, g:69, b:0 },
			orchid: { r:218, g:112, b:214 },
			palegoldenrod: { r:238, g:232, b:170 },
			palegreen: { r:152, g:251, b:152 },
			paleturquoise: { r:175, g:238, b:238 },
			palevioletred: { r:219, g:112, b:147 },
			papayawhip: { r:255, g:239, b:213 },
			peachpuff: { r:255, g:218, b:185 },
			peru: { r:205, g:133, b:63 },
			pink: { r:255, g:192, b:203 },
			plum: { r:221, g:160, b:221 },
			powderblue: { r:176, g:224, b:230 },
			purple: { r:128, g:0, b:128 },
			red: { r:255, g:0, b:0 },
			rosybrown: { r:188, g:143, b:143 },
			royalblue: { r:65, g:105, b:225 },
			saddlebrown: { r:139, g:69, b:19 },
			salmon: { r:250, g:128, b:114 },
			sandybrown: { r:244, g:164, b:96 },
			seagreen: { r:46, g:139, b:87 },
			seashell: { r:255, g:245, b:238 },
			sienna: { r:160, g:82, b:45 },
			silver: { r:192, g:192, b:192 },
			skyblue: { r:135, g:206, b:235 },
			slateblue: { r:106, g:90, b:205 },
			slategray: { r:112, g:128, b:144 },
			slategrey: { r:112, g:128, b:144 },
			snow: { r:255, g:250, b:250 },
			springgreen: { r:0, g:255, b:127 },
			steelblue: { r:70, g:130, b:180 },
			tan: { r:210, g:180, b:140 },
			teal: { r:0, g:128, b:128 },
			thistle: { r:216, g:191, b:216 },
			tomato: { r:255, g:99, b:71 },
			turquoise: { r:64, g:224, b:208 },
			violet: { r:238, g:130, b:238 },
			wheat: { r:245, g:222, b:179 },
			white: { r:255, g:255, b:255 },
			whitesmoke: { r:245, g:245, b:245 },
			yellow: { r:255, g:255, b:0 },
			yellowgreen: { r:154, g:205, b:50 },
			transparent: { r:-1, g:-1, b:-1, alpha:0 }
		},
		// Not a complete list yet...
		props = 'backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor borderColor boxShadowColor color outlineColor textShadowColor'.split(' ');

	$.color = {
		normalize: function(input) {
			var color, alpha,
				result, name, i, l,
				rhex		= /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
				rhexshort	= /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
				rrgb		= /rgb(?:a)?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0*\.?\d+)\s*)?\)/,
				rrgbpercent	= /rgb(?:a)?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(0*\.?\d+)\s*)?\)/,
				rhsl		= /hsl(?:a)?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(0*\.?\d+)\s*)?\)/;
			
			// Handle color: #rrggbb
			if (result = rhex.exec(input)) {
				color = {
					r:		parseInt(result[1], 16),
					g:		parseInt(result[2], 16),
					b:		parseInt(result[3], 16),
					source:	result[0]
				};
			}
			// Handle color: #rgb
			else if (result = rhexshort.exec(input)) {
				color = {
					r:		parseInt(result[1]+result[1], 16),
					g:		parseInt(result[2]+result[2], 16),
					b:		parseInt(result[3]+result[3], 16),
					source:	result[0]
				};
			}
			// Handle color: rgb[a](r, g, b [, a])
			else if (result = rrgb.exec(input)) {
				color = {
					r:		parseInt(result[1], 10),
					g:		parseInt(result[2], 10),
					b:		parseInt(result[3], 10),
					alpha:	parseFloat(result[4], 10),
					source:	result[0]
				};
			}
			// Handle color: rgb[a](r%, g%, b% [, a])
			else if (result = rrgbpercent.exec(input)) {
				color = {
					r:		parseInt(result[1] * 2.55, 10),
					g:		parseInt(result[2] * 2.55, 10),
					b:		parseInt(result[3] * 2.55, 10),
					alpha:	parseFloat(result[4], 10),
					source:	result[0]
				};
			}
			// Handle color: hsl[a](h%, s%, l% [, a])
			else if (result = rhsl.exec(input)) {
				color = $.color.hsl_to_rgb(
							parseFloat(result[1], 10) / 100,
							parseFloat(result[2], 10) / 100,
							parseFloat(result[3], 10) / 100
						);
				color.alpha = parseFloat(result[4], 10);
				color.source = result[0];
			}
			// Handle color: name
			else {
				result = input.split(' ');
				for (i = 0, l = result.length; i < l; i++) {
					name = result[i];
					
					if (colornames[name]) {
						break;
					}
				}
				
				if (!colornames[name]) {
					name = 'transparent';
				}
				
				color = colornames[name];
				color.source = name;
			}
			
			if (!color.alpha && color.alpha !== 0) {
				delete color.alpha;
			}
			
			return color;
		},
		rgbify: function(s){
			var value = $.color.normalize(s);
			return 'rgb(' + value.r + ',' + value.g + ',' + value.b + ')';
		},
		
		hsl_to_rgb: function(h, s, l, a) {
			var r, g, b, m1, m2;

			if (s === 0) {
				r = g = b = l;
			} else {
				if (l <= 0.5) {
					m2 = l * (s + 1);
				} else {
					m2 = (l + s) - (l * s);
				}

				m1 = (l * 2) - m2;
				r = parseInt(255 * $.color.hue_to_rgb(m1, m2, h + (1/3)), 10);
				g = parseInt(255 * $.color.hue_to_rgb(m1, m2, h), 10);
				b = parseInt(255 * $.color.hue_to_rgb(m1, m2, h - (1/3)), 10);
			}

			return { r:r, g:g, b:b, alpha:a };
		},
		
		hue_to_rgb: function(m1, m2, h) {
			if (h < 0) { h++; }
			if (h > 1) { h--; }

			if ((h * 6) < 1)		{ return m1 + ((m2 - m1) * h * 6); }
			else if ((h * 2) < 1)	{ return m2; }
			else if ((h * 3) < 2)	{ return m1 + ((m2 - m1) * ((2/3) - h) * 6); }
			else					{ return m1; }
		}
	};
	
	if ($.cssHooks) {
		$.each(props, function(i, hook) {
			$.cssHooks[hook] = {
				set: function(elem, value) {
					value = $.color.normalize(value);
					try{
					if (!value.hasOwnProperty('alpha')) {
						value.alpha = 1;
					}
					elem.style[hook] = ('rgba(' + value.r + ',' + value.g + ',' + value.b + ',' + value.alpha + ')');
					}catch(e){}
				}
			};
			
			$.fx.step[hook] = function(fx) {
				var val;
				
				if ( !fx.start || typeof fx.start === 'string' ) {
					if ( !fx.start ) {
						fx.start = $.css(fx.elem, hook);
					}

					fx.start = $.color.normalize(fx.start);
					fx.end = $.color.normalize(fx.end);

					if (!fx.start.alpha) {
						fx.start.alpha = 1;
					}

					if (!fx.end.alpha) {
						fx.end.alpha = 1;
					}
				}
				
				$.style(fx.elem, hook, 'rgba('
					+ parseInt(fx.start.r + (fx.pos * (fx.end.r - fx.start.r)), 10) + ','
					+ parseInt(fx.start.g + (fx.pos * (fx.end.g - fx.start.g)), 10) + ','
					+ parseInt(fx.start.b + (fx.pos * (fx.end.b - fx.start.b)), 10) + ','
					+ parseFloat(fx.start.alpha + (fx.pos * (fx.end.alpha - fx.start.alpha))) + ')'
				);
			};
		});
	}
})(jQuery);
/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* + Individual Border Animation by Mark Nadal
* User Select cssHook for jQuery
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Can't animate border radius in IE
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {
    // Border Radius set and get hooks
	var div = document.createElement("div"),
		divStyle = div.style,
		rWhiteSpace = /\s/,
		dirs = "TopLeft TopRight BottomRight BottomLeft".split(rWhiteSpace);
		
	$.support.borderRadius =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderRadius' :
		(divStyle.MozBorderRadius === ''? 'MozBorderRadius' : 
		(divStyle.BorderRadius === ''? 'BorderRadius' : false));
	
	//Browsers support border radius corners differently
	
	//Top Left
	$.support.TopLeft =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderTopLeftRadius' : 
		(divStyle.MozBorderRadius === ''? 'MozBorderRadiusTopleft' : 
		(divStyle.borderRadius === ''? 'borderTopLeftRadius' : false));
	
	//Top Right
	$.support.TopRight =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderTopRightRadius' : 
		(divStyle.MozBorderRadius === ''? 'MozBorderRadiusTopright' : 
		(divStyle.borderRadius === ''? 'borderTopRightRadius' : false));
	
	//Bottom Left
	$.support.BottomLeft =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderBottomLeftRadius' : 
		(divStyle.MozBorderRadius === ''? 'MozBorderRadiusBottomleft' : 
		(divStyle.borderRadius === ''? 'borderBottomLeftRadius' : false));
	
	//Bottom Right
	$.support.BottomRight =
		divStyle.WebkitBorderRadius === ''? 'WebkitBorderBottomRightRadius' : 
		(divStyle.MozBorderRadius === ''? 'MozBorderRadiusBottomright' : 
		(divStyle.borderRadius === ''? 'borderBottomRightRadius' : false));
	
	if ( $.support.borderRadius && $.support.borderRadius !== "borderRadius" ){
		//BorderRadius
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.map(dirs, function( dir ) {
					return $.css( elem, $.support[dir] );
				}).join(" ");
				
			},
			set: function( elem, value ) {
			
				var parts = value.split(rWhiteSpace),
					values = {
						"TopLeft": parts[0],
						"TopRight": parts[1] || parts[0],
						"BottomLeft": parts[2] || parts[0],
						"BottomRight": parts[3] || parts[1] || parts[0]
					};
				
				elem.style[ $.support.borderRadius ] = value;
			}
		};
		
		$.each( dirs, function( i, dir ) {

			$.cssHooks[ "border" + dir + "Radius"] = {
				get: function( elem, computed, extra ) {
					return $.css( elem, $.support[dir] );
				},
				set: function( elem, value ){
					elem.style[ $.support[dir] ] = value;
				}
			};
			
			$.fx.step[ "border" + dir + "Radius" ] = function( fx ) {
				if(!fx.endx) {
					var i = ii($(fx.elem).css("border" + dir + "Radius"));
					fx.startx = i[0];
					fx.starty = i[1]||i[0];
					fx.f = ii(fx.end);
					fx.endx = fx.f[0];
					fx.endy = fx.f[1]||fx.f[0];
					
					if((fx.endy - fx.starty) < (fx.endx - fx.startx)){
						fx.which = true;
						fx.end = fx.endx;
						fx.start = fx.startx;
						fx.now = fx.start;
						fx.now2 = fx.starty;
					} else {
						fx.which = false;
						fx.end = fx.endy;
						fx.start = fx.starty;
						fx.now = fx.start;
						fx.now2 = fx.startx;
					}
				}
				fx.now2 = (fx.which)?
					fx.starty + ((fx.endy - fx.starty) * fx.pos)
				:
					fx.startx + ((fx.endx - fx.startx) * fx.pos);
				var set = (fx.which)?
					(fx.now + fx.unit+" "+fx.now2 + fx.unit)
				:
					(fx.now2 + fx.unit+" "+fx.now + fx.unit);
				$.cssHooks[ "border" + dir + "Radius" ].set( fx.elem, 
					set
				);
			};

			
		});
		// setup fx hooks
		$.fx.step.borderRadius = function( fx ) {
			$.cssHooks.borderRadius.set( fx.elem, fx.now + fx.unit );
		};

	} else if ( !$.support.borderRadius && "createStyleSheet" in document ) {
		//BorderRadius Plugin
		$.cssHooks.borderRadius = {
			get: function( elem, computed, extra ) {

				return $.data(elem, "borderRadiusIE");
			},
			set: function( elem, value ) {

				var css,
					parts = value.split(rWhiteSpace),
					one = parts[0],
					two = parts[1] || parts[0],
					three = parts[2] || parts[0],
					four = parts[3] || parts[1] || parts[0],
					values = [
						one,
						two,
						three,
						four
					];
					try{
					css = ($.data( elem, "borderRadiusIECSS")) ? 
					$.data( elem, "borderRadiusIECSS") : document.createStyleSheet("ie_style.css")
					css.cssText = "";
					css.addRule( "#results", "border-radius:" + values.join(" ") );
					//Needs to be the directory from root of index.html
					//or page that uses this js file to the border radius htc file
					elem.style.behavior = "url(js/border-radius.htc)";
				
				$.data(elem, "borderRadiusIE", values.join(" "));
				$.data( elem, "borderRadiusIECSS", css);}catch(e){};
	
			}
		};
	}

	div = divStyle = null;
	
})(jQuery);
/*! Copyright (c) 2010 Burin Asavesna (http://helloburin.com)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // boxShadow get hooks
    var div = document.createElement('div'),
        divStyle = div.style,
        support = $.support,
        rWhitespace = /\s/,
		rIn = /inset\s*/,
		rRGB = /rgb\((.+?)\)\s*/,
        rParenWhitespace = ') ';
		
    support.boxShadow =
        divStyle.MozBoxShadow     === ''? 'MozBoxShadow'    :
        (divStyle.MsBoxShadow     === ''? 'MsBoxShadow'     :
        (divStyle.WebkitBoxShadow === ''? 'WebkitBoxShadow' :
        (divStyle.OBoxShadow      === ''? 'OBoxShadow'      :
        (divStyle.boxShadow       === ''? 'boxShadow'       :
        false))));

    div = null;

    // helper function to inject a value into an existing string
    // is there a better way to do this? it seems like a common pattern
    function insert_into(string, value, index) {
		var color = (string.match(rRGB)||['none'])[0];
		var inset = (string.match(rIn)||[''])[0];
		var parts = string.replace(rIn,'').replace(rRGB,'').split(rWhitespace);
        parts[index] = value;
        return color+' '+parts.join(" ")+' '+inset;
    }
	
    if ( support.boxShadow && support.boxShadow !== "boxShadow" ) {
        $.cssHooks.boxShadow = {
            get: function( elem, computed, extra ) {
                return $.css(elem, support.boxShadow);
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = value;
            }
        };
	}
        $.cssHooks.boxShadowColor = {
            get: function ( elem, computed, extra ) {
                return ($.css(elem, support.boxShadow).match(rRGB)||['none'])[0];
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = $.color.rgbify(value) +' '+ $.css(elem, support.boxShadow).replace(rRGB,'');
            }
        };
        $.cssHooks.boxShadowStyle = {
            get: function ( elem, computed, extra ) {
				return (/inset/).test($.css(elem, support.boxShadow))?'inset':'outset';
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = 
					(value=='inset')?
						(/inset/).test($.css(elem, support.boxShadow))?
							$.css(elem, support.boxShadow)
						:
							$.css(elem, support.boxShadow) +' inset'
					:
						$.css(elem, support.boxShadow).replace(rIn,'');
            }
        };
        $.cssHooks.boxShadowBlur = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.boxShadow).replace(rIn,'').replace(rRGB,'').split(rWhitespace)[2];
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = insert_into($.css(elem, support.boxShadow), value, 2);
            }
        };

        $.cssHooks.boxShadowSpread = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.boxShadow).replace(rIn,'').replace(rRGB,'').split(rWhitespace)[3];
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = insert_into($.css(elem, support.boxShadow), value, 3);
            }
        };

        $.cssHooks.boxShadowX = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.boxShadow).replace(rIn,'').replace(rRGB,'').split(rWhitespace)[0];
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = insert_into($.css(elem, support.boxShadow), value, 0);
            }
        };

        $.cssHooks.boxShadowY = {
            get: function ( elem, computed, extra ) {
                return $.css(elem, support.boxShadow).replace(rIn,'').replace(rRGB,'').split(rWhitespace)[1];
            },
            set: function( elem, value ) {
                elem.style[ support.boxShadow ] = insert_into($.css(elem, support.boxShadow), value, 1);
            }
        };

        // setup fx hooks
        var fxHooks = "Blur Spread X Y Style".split(" ");
        $.each(fxHooks, function( i, suffix ) {
            var hook = "boxShadow" + suffix;
            $.fx.step[ hook ] = function( fx ) {
                $.cssHooks[ hook ].set( fx.elem, fx.now + fx.unit );
            };
        });
    //}

})(jQuery);
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net) with fixes from Mark Nadal
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition   = $div.css('backgroundPosition')  === "3px 5px" ? true : false;
    $.support.backgroundPositionXY = $div.css('backgroundPositionX') === "3px" ? true : false;
    $div = null;

    var xy = ["X","Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts  = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }

    if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
        $.cssHooks.backgroundPosition = {
            get: function( elem, computed, extra ) {
                return $.map(xy, function( l, i ) {
                    return $.css(elem, "backgroundPosition" + l);
                }).join(" ");
            },
            set: function( elem, value ) {
                $.each(xy, function( i, l ) {
                    var values = parseBgPos(value);
                    elem.style[ "backgroundPosition" + l ] = values[ l ];
                });
            }
        };
    }

    if (true || ($.support.backgroundPosition && !$.support.backgroundPositionXY)) {
        $.each(xy, function( i, l ) {
            $.cssHooks[ "backgroundPosition" + l ] = {
                get: function( elem, computed, extra ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") );
                    return values[ l ];
                },
                set: function( elem, value ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") ),
                        isX = l === "X";
                    elem.style.backgroundPosition = (isX ? value : values[ "X" ]) + " " + 
                                                    (isX ? values[ "Y" ] : value);
                }
            };
            $.fx.step[ "backgroundPosition" + l ] = function( fx ) {
				if(!fx.flow) {
					if(/\%/.test(fx.end)){
						fx.unit = '%';
						fx.now = parseInt(fx.now);
						fx.end = parseInt(fx.end);
					}
					fx.flow = true;
				}
                $.cssHooks[ "backgroundPosition" + l ].set( fx.elem, fx.now + fx.unit );
            };
        });	
    }
})(jQuery);

/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($,len,createRange,duplicate){
	$.fn.caret=function(options,opt2){
		var start,end,t=this[0],browser=$.browser.msie,r={},range=false;
		if(typeof options === "object" && options.startOffset){
			range = options;
			//document.getElementById("area").focus();
			if (range != null) {
				if (window.getSelection) {//non IE and there is already a selection
					var s = window.getSelection();
					if (s.rangeCount > 0)
						s.removeAllRanges();
					s.addRange(range);
				}
				else {
					if (document.createRange) {//non IE and no selection
						window.getSelection().addRange(range);
					} else { 
						if (document.selection) {//IE
							range.select();
						}
					}
				}
			}
		} else if (typeof options==="object" && typeof options.start==="number" && typeof options.end==="number") {
			start=options.start;
			end=options.end;
		} else if(typeof options==="number" && typeof opt2==="number"){
			start=options;
			end=opt2;
		} else if(typeof options==="string"){
			if((start=(t.value||$(t).text()).indexOf(options))>-1) end=start+options[len];
			else start=null;
		} else if(Object.prototype.toString.call(options)==="[object RegExp]"){
			var re=options.exec((t.value||$(t).text()));
			if(re != null) {
				start=re.index;
				end=start+re[0][len];
			}
		}
		if(typeof start!="undefined"){
			if(browser){
				var selRange = this[0].createTextRange();
				selRange.collapse(true);
				selRange.moveStart('character', start);
				selRange.moveEnd('character', end-start);
				selRange.select();
			} else {
				this[0].selectionStart=start;
				this[0].selectionEnd=end;
			}
			this[0].focus();
			return this
		} else {
           if(browser){
				var selection=document.selection;
                if (this[0].tagName.toLowerCase() != "textarea") {
                    var val = this.val(),
                    range = selection[createRange]()[duplicate]();
                    range.moveEnd("character", val[len]);
                    var s = (range.text == "" ? val[len]:val.lastIndexOf(range.text));
                    range = selection[createRange]()[duplicate]();
                    range.moveStart("character", -val[len]);
                    var e = range.text[len];
                } else {
                    var range = selection[createRange](),
                    stored_range = range[duplicate]();
                    stored_range.moveToElementText(this[0]);
                    stored_range.setEndPoint('EndToEnd', range);
                    var s = stored_range.text[len] - range.text[len],
                    e = s + range.text[len]
                }
            } else if(this[0].value) {
				r.start=t.selectionStart;
				r.end =t.selectionEnd;
			} else if(window.getSelection&&!range) {
				var sel = window.getSelection();
				r.r = sel.getRangeAt(0);
				r.start =this.text().indexOf($(r.r.startContainer).text())+r.r.startOffset,
				r.end =this.text().indexOf($(r.r.endContainer).text())+r.r.endOffset;
			}
			r.text=(t.value||$(t).text()).substring(r.start,r.end);
			r.html=($(t).html()).substring(r.begin,r.end);
			r.replace = function(st){
				return t.value.substring(0,r.start)+st+t.value.substring(r.end,t.value[len])
			}
			return r
		}
	}
})(jQuery,"length","createRange","duplicate");