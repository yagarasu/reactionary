"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModuleManager =
/*#__PURE__*/
function () {
  function ModuleManager(modules) {
    _classCallCheck(this, ModuleManager);

    this.modules = modules.map(function (m) {
      return new m();
    });
    this.routes = [];
    this.routeNotFound = {};
    this.reducers = {};
    this.middlewares = [];
    this.sagas = [];
    this.modules.forEach(function (m) {
      return m.initialize();
    });
  }

  _createClass(ModuleManager, [{
    key: "register",
    value: function register() {
      var _this = this;

      this.modules.forEach(function (m) {
        return m.register(_this);
      });
    }
  }, {
    key: "pushInto",
    value: function pushInto(arr, el, weight) {
      if (!Array.isArray(arr)) throw new TypeError('pushInto requires arr to be an array');
      var idx = 0;

      while (idx < arr.length && weight <= arr[idx].weight) {
        idx++;
      }

      arr.splice(idx, 0, {
        el: el,
        weight: weight
      });
    }
  }, {
    key: "getFrom",
    value: function getFrom(type) {
      console.log('getFrom', type);
      var arr = this[type];
      if (!Array.isArray(arr)) throw new TypeError('getFrom requires type to map to an internal array');
      return arr.map(function (_ref) {
        var el = _ref.el;
        return el;
      });
    }
  }, {
    key: "registerRoute",
    value: function registerRoute(path, component, extra) {
      var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      this.pushInto(this.routes, _objectSpread({
        path: path,
        component: component,
        exact: true
      }, extra), weight);
    }
  }, {
    key: "registerNotFound",
    value: function registerNotFound(component, extra) {
      this.routeNotFound = _objectSpread({
        component: component
      }, extra);
    }
  }, {
    key: "registerReducer",
    value: function registerReducer(key, reducer) {
      this.reducers[key] = reducer;
    }
  }, {
    key: "registerMiddleware",
    value: function registerMiddleware(middleware) {
      var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.pushInto(this.middlewares, middleware, weight);
    }
  }, {
    key: "registerSaga",
    value: function registerSaga(saga) {
      var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.pushInto(this.sagas, saga, weight);
    }
  }]);

  return ModuleManager;
}();

var _default = ModuleManager;
exports.default = _default;