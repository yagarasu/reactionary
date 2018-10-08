"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _connectedReactRouter = require("connected-react-router");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(mm, history) {
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var reducers = (0, _connectedReactRouter.connectRouter)(history)((0, _redux.combineReducers)(_objectSpread({}, mm.reducers)));
  var sagaMiddleware = (0, _reduxSaga.default)();

  var createRootSaga = function createRootSaga() {
    return (
      /*#__PURE__*/
      regeneratorRuntime.mark(function rootSaga() {
        return regeneratorRuntime.wrap(function rootSaga$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _effects.all)(mm.getFrom('sagas').map(function (s) {
                  return s();
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, rootSaga, this);
      })
    );
  };

  var store = (0, _redux.createStore)(reducers, composeEnhancers(_redux.applyMiddleware.apply(void 0, [sagaMiddleware, (0, _connectedReactRouter.routerMiddleware)(history)].concat(_toConsumableArray(mm.getFrom('middlewares'))))));
  sagaMiddleware.run(createRootSaga());
  return store;
};

exports.default = _default;