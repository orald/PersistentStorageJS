var utils = {
  isMsie: function() {
    var match = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
    return match ? parseInt(match[2], 10) : false;
  },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isString: is.String,

  isNumber: is.Numeric,

  isArray: is.Array,

  isFunction: is.Function,

  isObject: is.Object,

  isUndefined: is.Undefined,

  isBlankString: is.BlankString,

  bind: $.proxy,

  bindAll: function(obj) {
    var val;
    for (var key in obj) {
			val = obj[key];
      if($.isFunction(val)){
				obj[key] = $.proxy(val, obj);
			}
		}
  },

  indexOf: SH.indexOf,

  every: SH.every,

  some: SH.some,

  each: $.each,

  map: $.map,

  filter: $.grep,

  mixin: $.extend,

  defer: function(fn) { setTimeout(fn, 0); },

  debounce: $.debounce,

  throttle: $.throttle,

  getUniqueId: (function() {
    var counter = 0;
    return function() { return counter++; };
  })(),

  tokenizeQuery: function(str) {
    return $.trim(str).toLowerCase().split(/[\s]+/);
  },

  tokenizeText: function(str) {
    return $.trim(str).toLowerCase().split(/[\s\-_]+/);
  },

  getProtocol: function() {
    return location.protocol;
  },

  noop: function() {}
};
