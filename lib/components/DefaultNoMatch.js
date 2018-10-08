"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultNoMatch = function DefaultNoMatch(_ref) {
  var location = _ref.location;
  return _react.default.createElement("div", null, _react.default.createElement("p", null, location.pathname), _react.default.createElement("p", null, "The route you are looking for was not found."));
};

var _default = DefaultNoMatch;
exports.default = _default;