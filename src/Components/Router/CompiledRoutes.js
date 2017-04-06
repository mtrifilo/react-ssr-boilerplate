'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _Home = require('../Home/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('../Login/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('../Signup/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _NotFound = require('./NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bool = _react2.default.PropTypes.bool;

/**
 * Run `yarn run compile-routes` after altering any Routes in this file.
 *
 * CompiledRoutes.js is the transpiled version of this file
 * which gets used when the app renders on the server.
 */

var Routes = function Routes(props) {
  console.log('Routes props', props.isAuthenticated);
  return _react2.default.createElement(
    _reactRouter.Switch,
    null,
    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/login', render: function render() {
        return props.isAuthenticated ? _react2.default.createElement(_reactRouter.Redirect, { push: true, to: '/' }) : _react2.default.createElement(_Login2.default, null);
      } }),
    _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default }),
    _react2.default.createElement(_reactRouter.Route, { component: _NotFound2.default })
  );
};

Routes.propTypes = {
  isAuthenticated: bool
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Routes);
