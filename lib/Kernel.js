"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ModuleManager = _interopRequireDefault(require("./ModuleManager"));

var _DefaultNoMatch = _interopRequireDefault(require("./components/DefaultNoMatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(modules) {
  // Build the thing...
  var mm = new _ModuleManager.default(modules);
  mm.registerNotFound(_DefaultNoMatch.default); // Register the other things...

  mm.register();
  var routeNotFound = mm.routeNotFound;
  var routes = mm.getFrom('routes');
  console.log(routes);

  var Kernel = function Kernel(props) {
    return _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, routes.map(function (route) {
      return _react.default.createElement(_reactRouterDom.Route, _extends({
        key: route.path
      }, route));
    }), _react.default.createElement(_reactRouterDom.Route, routeNotFound)));
  };

  return Kernel;
}; // import React, { Component } from 'react'
// import PropTypes from 'prop-types'
//
// class Kernel extends Component {
//   propTypes: {
//     modules: PropTypes.array
//   }
//
//   defaultProps: {
//     modules: []
//   }
//
//   store: null
//
//   constructor (props) {
//     super(props)
//     const { modules } = props
//
//   }
//
//   render () {
//     return (<div />)
//   }
// }
//
// export default Kernel


exports.default = _default;