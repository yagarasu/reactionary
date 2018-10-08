"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _history = require("history");

var _reactRouterDom = require("react-router-dom");

var _connectedReactRouter = require("connected-react-router");

var _reactRedux = require("react-redux");

var _ModuleManager = _interopRequireDefault(require("./ModuleManager"));

var _DefaultNoMatch = _interopRequireDefault(require("./components/DefaultNoMatch"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(modules) {
  // Build the thing...
  var mm = new _ModuleManager.default(modules); // Default 404

  mm.registerNotFound(_DefaultNoMatch.default); // Register the other things...

  mm.register(); // Routing

  var routeNotFound = mm.routeNotFound;
  var routes = mm.getFrom('routes');
  var history = (0, _history.createBrowserHistory)(); // Reducers

  var store = (0, _store.default)(mm, history);

  var Kernel = function Kernel(props) {
    return _react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_connectedReactRouter.ConnectedRouter, {
      history: history
    }, _react.default.createElement(_reactRouterDom.Switch, null, routes.map(function (route) {
      return _react.default.createElement(_reactRouterDom.Route, _extends({
        key: route.path
      }, route));
    }), _react.default.createElement(_reactRouterDom.Route, routeNotFound))));
  };

  return Kernel;
};

exports.default = _default;