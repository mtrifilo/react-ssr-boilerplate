webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);


var _React$PropTypes = __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func;


var Input = function Input(_ref) {
  var label = _ref.label,
      type = _ref.type,
      value = _ref.value,
      name = _ref.name,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      validationError = _ref.validationError;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('form-group', { 'has-danger': validationError }) },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'label',
      null,
      label
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
      type: type,
      value: value,
      name: name,
      onChange: onChange,
      onBlur: onBlur,
      className: 'form-control' }),
    validationError && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'form-control-feedback' },
      validationError
    )
  );
};

Input.propTypes = {
  label: string,
  type: string,
  value: string,
  name: string,
  onChange: func.isRequired,
  onBlur: func,
  validationError: string
};

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEmpty");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Router_Routes__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Layout__ = __webpack_require__(16);





var App = function App(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["BrowserRouter"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3__Layout__["a" /* default */],
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Router_Routes__["a" /* default */])()
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bootstrap");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Validator = __webpack_require__(7);
var isEmpty = __webpack_require__(5);

function loginFormValidation(state) {
  var errors = {};

  errors = Object.assign({}, errors, validateIdentifier(state.identifier));
  errors = Object.assign({}, errors, validatePassword(state.password));

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}

function validateIdentifier(identifier) {
  // identifier shouldn't be empty
  if (Validator.isEmpty(identifier)) {
    return { identifier: 'A registered username or email is required' };
  }
  return { identifier: '' };
}

function validatePassword(password) {
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' };
  }
  return { password: '' };
}

module.exports = {
  loginFormValidation: loginFormValidation,
  validateIdentifier: validateIdentifier,
  validatePassword: validatePassword
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validator = __webpack_require__(7);
var isEmpty = __webpack_require__(5);

/**
 * Validates all signup form fields.
 *
 * @param {object} data - A new user's submitted signup form data
 * @returns {object} {error: Array, isValid: Boolean} - errors contains the
 *   results of all of the validation functions as an array. isValid
 *   will be true if any error messages are returned from any of the validation
 *   functions.
 */
function signupFormValidation(data) {
  var validationResults = Object.assign({}, validateUsername(data.username), validateEmail(data.email), validatePassword(data.password), validateConfirmPassword(data.password, data.confirmPassword));

  var fields = Object.keys(validationResults);

  // return any error messages, or an empty array
  var validationErrors = fields.map(function (field) {
    if (validationResults[field]) {
      return _defineProperty({}, field, validationResults[field]);
    }
    return false;
  }).filter(function (message) {
    return message;
  });

  return {
    validationErrors: validationErrors,
    isValid: isEmpty(validationErrors)
  };
}

function validateUsername(username) {
  // username shouldn't be empty
  if (Validator.isEmpty(username)) {
    return { username: 'A username is required' };
  }
  return { username: '' };
}

function validateEmail(email) {
  // email shouldn't be empty
  if (Validator.isEmpty(email)) {
    return { email: 'An email address is required' };
  }
  // email should be a valid email address
  if (!Validator.isEmail(email)) {
    return { email: 'This email address is not valid' };
  }
  return { email: '' };
}

function validatePassword(password) {
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' };
  }
  return { password: '' };
}

function validateConfirmPassword(password, confirmPassword) {
  // confirmPassword shouldn't be empty
  if (Validator.isEmpty(confirmPassword)) {
    return { confirmPassword: 'Please confirm your password' };
  }
  // password and confirmPassword should match
  if (!Validator.equals(password, confirmPassword)) {
    return { confirmPassword: 'Passwords don\'t match, try again' };
  }
  return { confirmPassword: '' };
}

module.exports = {
  signupFormValidation: signupFormValidation,
  validateUsername: validateUsername,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateConfirmPassword: validateConfirmPassword
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ClientApp__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bootstrap__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_bootstrap_dist_css_bootstrap_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_bootstrap_dist_css_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_bootstrap_dist_css_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__main_css__);







__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ClientApp__["a" /* default */], null), document.getElementById('app'));

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Home = function Home(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h1',
    { className: 'text-center page-title' },
    'Home!'
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Home);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavBar_NavBar__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Common_FlashMessageContainer__ = __webpack_require__(49);



var element = __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.element;


var Layout = function Layout(_ref) {
  var children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__NavBar_NavBar__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Common_FlashMessageContainer__["a" /* default */], null),
    children
  );
};

Layout.propTypes = {
  children: element
};

/* harmony default export */ __webpack_exports__["a"] = (Layout);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LoginForm__ = __webpack_require__(18);



var Login = function Login(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: 'text-center page-title' },
      'Login'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__LoginForm__["a" /* default */], null)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Common_Input__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_validation_loginFormValidation__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_validation_loginFormValidation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__server_validation_loginFormValidation__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this));

    _this.onChangeHandler = function (evt) {
      _this.setState(_defineProperty({}, evt.target.name, evt.target.value));
    };

    _this.onBlurHandler = function (evt) {
      if (evt.target.name === 'identifier') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_loginFormValidation__["validateIdentifier"])(_this.state.identifier));
      }
      if (evt.target.name === 'password') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_loginFormValidation__["validatePassword"])(_this.state.password));
      }
    };

    _this.setValidationError = function (validationResult) {
      // Set validation result to state
      var newValidationErrors = Object.assign({}, _this.state.validationErrors, validationResult);
      _this.setState({ validationErrors: newValidationErrors });
    };

    _this.state = {
      identifier: '',
      password: '',
      validationErrors: {
        identifier: '',
        password: ''
      }
    };
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { className: 'login-form' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Username or Email',
          type: 'text',
          name: 'identifier',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.identifier,
          validationError: this.state.validationErrors.identifier }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Password',
          type: 'password',
          name: 'password',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.password,
          validationError: this.state.validationErrors.password }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'submit', className: 'btn btn-primary' },
          'Submit'
        )
      );
    }
  }]);

  return LoginForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (LoginForm);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);



var GuestLinks = function GuestLinks(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'collapse navbar-collapse justify-content-end', id: 'navbarNavAltMarkup' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'navbar-nav' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"],
        { to: '/signup', className: 'nav-link', activeClassName: 'active' },
        'Signup'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"],
        { to: '/login', className: 'nav-link', activeClassName: 'active' },
        'Login'
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (GuestLinks);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GuestLinks__ = __webpack_require__(19);




var NavBar = function NavBar(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'nav',
    { className: 'navbar navbar-toggleable-md navbar-inverse bg-inverse' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'button',
      {
        className: 'navbar-toggler navbar-toggler-right',
        type: 'button',
        'data-toggle': 'collape',
        'data-target': '#navbarNavAltMarkup',
        'aria-controls': 'navbarNavAltMarkup',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'navbar-toggler-icon' })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
      { to: '/', className: 'navbar-brand' },
      'React SSR Boilerplate'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__GuestLinks__["a" /* default */], null)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (NavBar);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Status__ = __webpack_require__(23);



var NotFound = function NotFound(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1__Status__["a" /* default */],
    { code: 404 },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      null,
      'Nothing here. 404'
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (NotFound);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Home_Home__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login_Login__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Signup_Signup__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__NotFound__ = __webpack_require__(21);







var Routes = function Routes() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_router__["Switch"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_2__Home_Home__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: '/login', component: __WEBPACK_IMPORTED_MODULE_3__Login_Login__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: '/signup', component: __WEBPACK_IMPORTED_MODULE_4__Signup_Signup__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { component: __WEBPACK_IMPORTED_MODULE_5__NotFound__["a" /* default */] })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Routes);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);


var _React$PropTypes = __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes,
    number = _React$PropTypes.number,
    element = _React$PropTypes.element;


var Status = function Status(_ref) {
  var code = _ref.code,
      children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { render: function render(_ref2) {
      var staticContext = _ref2.staticContext;

      if (staticContext) {
        staticContext.status = code;
      }
      return children;
    } });
};

Status.propTypes = {
  code: number,
  children: element
};

/* harmony default export */ __webpack_exports__["a"] = (Status);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SignupForm__ = __webpack_require__(25);



var Signup = function Signup(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: 'text-center page-title' },
      'Signup!'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__SignupForm__["a" /* default */], null)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Signup);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Common_Input__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SignupForm = function (_Component) {
  _inherits(SignupForm, _Component);

  function SignupForm() {
    _classCallCheck(this, SignupForm);

    var _this = _possibleConstructorReturn(this, (SignupForm.__proto__ || Object.getPrototypeOf(SignupForm)).call(this));

    _this.onChangeHandler = function (evt) {
      _this.setState(_defineProperty({}, evt.target.name, evt.target.value));
    };

    _this.onBlurHandler = function (evt) {
      if (evt.target.name === 'username') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__["validateUsername"])(_this.state.username));
      }
      if (evt.target.name === 'email') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__["validateEmail"])(_this.state.email));
      }
      if (evt.target.name === 'password') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__["validatePassword"])(_this.state.password));
      }
      if (evt.target.name === 'confirmPassword') {
        _this.setValidationError(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server_validation_signupFormValidation__["validateConfirmPassword"])(_this.state.password, _this.state.confirmPassword));
      }
    };

    _this.setValidationError = function (validationResult) {
      // set the validtion result to state
      var newValidationErrors = Object.assign({}, _this.state.validationErrors, validationResult);
      _this.setState({ validationErrors: newValidationErrors });
    };

    _this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
    return _this;
  }

  _createClass(SignupForm, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { className: 'signup-form' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Username',
          type: 'text',
          name: 'username',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.username,
          validationError: this.state.validationErrors.username }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Email Address',
          type: 'email',
          name: 'email',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.email,
          validationError: this.state.validationErrors.email }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Password',
          type: 'password',
          name: 'password',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.password,
          validationError: this.state.validationErrors.password }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Common_Input__["a" /* default */], {
          label: 'Confirm Password',
          type: 'password',
          name: 'confirmPassword',
          onChange: this.onChangeHandler,
          onBlur: this.onBlurHandler,
          value: this.state.confirmPassword,
          validationError: this.state.validationErrors.confirmPassword }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { type: 'submit', className: 'btn btn-primary' },
          'Submit'
        )
      );
    }
  }]);

  return SignupForm;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (SignupForm);

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);


var string = __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string;


var FlashMessage = function FlashMessage(_ref) {
  var message = _ref.message,
      level = _ref.level;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('alert', {
        'alert-success': level === 'success',
        'alert-danger': level === 'error'
      }) },
    message
  );
};

FlashMessage.propTypes = {
  message: string,
  level: string
};

/* harmony default export */ __webpack_exports__["a"] = (FlashMessage);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FlashMessage__ = __webpack_require__(48);



var array = __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.array;


var FlashMessageContainer = function FlashMessageContainer(_ref) {
  var flashMessages = _ref.flashMessages;

  var displayFlashMessages = flashMessages.map(function (_ref2) {
    var message = _ref2.message,
        level = _ref2.level;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__FlashMessage__["a" /* default */], { key: message, message: message, level: level });
  });
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    displayFlashMessages
  );
};

FlashMessageContainer.propTypes = {
  flashMessages: array.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    flashMessages: state.flashMessage.flashMessages
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps)(FlashMessageContainer));

/***/ })
],[14]);
//# sourceMappingURL=bundle.js.map