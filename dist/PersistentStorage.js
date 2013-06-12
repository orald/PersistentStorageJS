//     PersistentStorageJS 0.0.1
//     (c) 2013 Oral Dalay
//     PersistentStorageJS may be freely distributed under the MIT license.
//     This file is generated from twitter's opensource typeahead project.
//     Dependencies are updated and now it uses functions from isJS and SHJS.

var PersistentStorage = (function() {
  var ls = window.localStorage, 
      methods = null;

  function PersistentStorage(namespace) {
    this.prefix = ['__', namespace, '__'].join('');
    this.ttlKey = '__ttl__';
    this.keyMatcher = new RegExp('^' + this.prefix);
  }

  if (window.localStorage && window.JSON) {
    methods = {

      // private methods
      // ---------------

      _prefix: function(key) {
        return this.prefix + key;
      },

      _ttlKey: function(key) {
        return this._prefix(key) + this.ttlKey;
      },

      // public methods
      // --------------

      get: function(key) {
        if (this.isExpired(key)) {
          this.remove(key);
        }

        return decode(ls.getItem(this._prefix(key)));
      },

      set: function(key, val, ttl) {
        if (is.Numeric(ttl)) {
          ls.setItem(this._ttlKey(key), encode(now() + ttl));
        }else {
          ls.removeItem(this._ttlKey(key));
        }

        return ls.setItem(this._prefix(key), encode(val));
      },

      remove: function(key) {
        ls.removeItem(this._ttlKey(key));
        ls.removeItem(this._prefix(key));

        return this;
      },

      clear: function() {
        var i, key, keys = [], len = ls.length;

        for (i = 0; i < len; i++) {
          if ((key = ls.key(i)).match(this.keyMatcher)) {
            // gather keys to remove after loop exits
            keys.push(key.replace(this.keyMatcher, ''));
          }
        }

        for (i = keys.length; i--;) {
          this.remove(keys[i]);
        }

        return this;
      },

      isExpired: function(key) {
        var ttl = decode(ls.getItem(this._ttlKey(key)));

        return is.Numeric(ttl) && now() > ttl ? true : false;
      }
    };
  }

  else {
    methods = {
      get: utils.noop,
      set: utils.noop,
      remove: utils.noop,
      clear: utils.noop,
      isExpired: utils.noop
    };
  }

  utils.mixin(PersistentStorage.prototype, methods);

  return PersistentStorage;

  function now() {
    return new Date().getTime();
  }

  function encode(val) {
    // convert undefined to null to avoid issues with JSON.parse
    return JSON.stringify(is.Undefined(val) ? null : val);
  }

  function decode(val) {
    return JSON.parse(val);
  }
})();
