'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConfigProvider", {
  enumerable: true,
  get: function get() {
    return _context.ConfigProvider;
  }
});
Object.defineProperty(exports, "getRandomColor", {
  enumerable: true,
  get: function get() {
    return _utils.getRandomColor;
  }
});
exports.default = exports.Avatar = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("./context");

var _utils = require("./utils");

var _internalState = _interopRequireDefault(require("./internal-state"));

var _Gravatar = _interopRequireDefault(require("./sources/Gravatar"));

var _Facebook = _interopRequireDefault(require("./sources/Facebook"));

var _Vkontakte = _interopRequireDefault(require("./sources/Vkontakte"));

var _Twitter = _interopRequireDefault(require("./sources/Twitter"));

var _Google = _interopRequireDefault(require("./sources/Google"));

var _Skype = _interopRequireDefault(require("./sources/Skype"));

var _Value = _interopRequireDefault(require("./sources/Value"));

var _Src = _interopRequireDefault(require("./sources/Src"));

var _Icon = _interopRequireDefault(require("./sources/Icon"));

var _AvatarRedirect = _interopRequireDefault(require("./sources/AvatarRedirect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SOURCES = [_Facebook.default, _Google.default, _Twitter.default, (0, _AvatarRedirect.default)('twitter', 'twitterHandle'), (0, _AvatarRedirect.default)('instagram', 'instagramId'), _Vkontakte.default, _Skype.default, _Gravatar.default, _Src.default, _Value.default, _Icon.default]; // Collect propTypes for each individual source

var sourcePropTypes = SOURCES.reduce(function (r, s) {
  return Object.assign(r, s.propTypes);
}, {});

function matchSource(Source, props, cb) {
  var cache = props.cache;
  var instance = new Source(props);
  if (!instance.isCompatible(props)) return cb();
  instance.get(function (state) {
    var failedBefore = state && state.hasOwnProperty('src') && cache.hasSourceFailedBefore(state.src);

    if (!failedBefore && state) {
      cb(state);
    } else {
      cb();
    }
  });
}

var Avatar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Avatar, _PureComponent);

  function Avatar(props) {
    var _this;

    _classCallCheck(this, Avatar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Avatar).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_createFetcher", function (internal) {
      return function (errEvent) {
        var cache = _this.props.cache;
        if (!internal.isActive(_this.state)) return; // Mark img source as failed for future reference

        if (errEvent && errEvent.type === 'error') cache.sourceFailed(errEvent.target.src);
        var pointer = internal.sourcePointer;
        if (SOURCES.length === pointer) return;
        var source = SOURCES[pointer];
        internal.sourcePointer++;
        matchSource(source, _this.props, function (nextState) {
          if (!nextState) return setTimeout(internal.fetch, 0);
          if (!internal.isActive(_this.state)) return; // Reset other values to prevent them from sticking (#51)

          nextState = _objectSpread({
            src: null,
            value: null,
            color: null
          }, nextState);

          _this.setState(function (state) {
            // Internal state has been reset => we received new props
            return internal.isActive(state) ? nextState : {};
          });
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetch", function () {
      var internal = new _internalState.default();
      internal.fetch = _this._createFetcher(internal);

      _this.setState({
        internal: internal
      }, internal.fetch);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_scaleTextNode", function (node) {
      var _this$props = _this.props,
          unstyled = _this$props.unstyled,
          textSizeRatio = _this$props.textSizeRatio;
      if (!node || unstyled) return;
      var parent = node.parentNode; // Reset font-size such that scaling works correctly (#133)

      parent.style.fontSize = null;
      var textWidth = node.getBoundingClientRect().width;
      if (textWidth < 0) return;
      var containerWidth = parent.getBoundingClientRect().width;
      var ratio = containerWidth / textWidth; // Set font-size on parent span, otherwise the `table-cell` span
      // will cause alignment issues.

      parent.style.fontSize = "calc((100% * ".concat(ratio, ") / ").concat(textSizeRatio, ")");
    });

    _this.state = {
      internal: null,
      src: null,
      value: null,
      color: props.color
    };
    return _this;
  }

  _createClass(Avatar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetch();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var needsUpdate = false; // This seems redundant
      //
      // Props that need to be in `state` are
      // `value`, `src` and `color`

      for (var prop in sourcePropTypes) {
        needsUpdate = needsUpdate || newProps[prop] !== this.props[prop];
      }

      if (needsUpdate) setTimeout(this.fetch, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.internal) {
        this.state.internal.active = false;
      }
    }
  }, {
    key: "_renderAsImage",
    value: function _renderAsImage() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          round = _this$props2.round,
          unstyled = _this$props2.unstyled,
          name = _this$props2.name,
          value = _this$props2.value;
      var internal = this.state.internal;
      var size = (0, _utils.parseSize)(this.props.size);
      var alt = name || value;
      var imageStyle = unstyled ? null : {
        maxWidth: '100%',
        width: size.str,
        height: size.str,
        borderRadius: round === true ? '100%' : round
      };
      return _react.default.createElement("img", {
        className: className + ' sb-avatar__image',
        width: size.str,
        height: size.str,
        style: imageStyle,
        src: this.state.src,
        alt: alt,
        onError: internal && internal.fetch
      });
    }
  }, {
    key: "_renderAsDiv",
    value: function _renderAsDiv() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          round = _this$props3.round,
          unstyled = _this$props3.unstyled,
          name = _this$props3.name,
          value = _this$props3.value;
      var internal = this.state.internal;
      var size = (0, _utils.parseSize)(this.props.size);
      var alt = name || value;
      var imageStyle = unstyled ? null : {
        maxWidth: "100%",
        width: size.str,
        height: size.str,
        borderRadius: round === true ? "100%" : round
      };
      return _react.default.createElement("div", {
        width: size.str,
        height: size.str,
        style: imageStyle,
        alt: alt,
        onError: internal && internal.fetch
      }, _react.default.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundImage: "url(".concat(this.state.src, ")"),
          backgroundPosition: "50% 50%",
          borderRadius: round === true ? "100%" : round
        }
      }));
    }
  }, {
    key: "_renderAsText",
    value: function _renderAsText() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          round = _this$props4.round,
          unstyled = _this$props4.unstyled;
      var size = (0, _utils.parseSize)(this.props.size);
      var initialsStyle = unstyled ? null : {
        width: size.str,
        height: size.str,
        lineHeight: 'initial',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: this.props.fgColor,
        background: this.state.color,
        borderRadius: round === true ? '100%' : round
      };
      var tableStyle = unstyled ? null : {
        display: 'table',
        width: '100%',
        height: '100%'
      };
      var spanStyle = unstyled ? null : {
        display: 'table-cell',
        verticalAlign: 'middle'
      };
      return _react.default.createElement("div", {
        className: className + ' sb-avatar__text',
        style: initialsStyle
      }, _react.default.createElement("div", {
        style: tableStyle
      }, _react.default.createElement("span", {
        style: spanStyle
      }, _react.default.createElement("span", {
        ref: this._scaleTextNode,
        key: this.state.value
      }, this.state.value))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          className = _this$props5.className,
          unstyled = _this$props5.unstyled,
          round = _this$props5.round,
          style = _this$props5.style,
          onClick = _this$props5.onClick;
      var _this$state = this.state,
          src = _this$state.src,
          sourceName = _this$state.sourceName;
      var size = (0, _utils.parseSize)(this.props.size);
      var hostStyle = unstyled ? null : _objectSpread({
        display: 'inline-block',
        verticalAlign: 'middle',
        width: size.str,
        height: size.str,
        borderRadius: round === true ? '100%' : round,
        fontFamily: 'Helvetica, Arial, sans-serif'
      }, style);
      var classNames = [className, 'sb-avatar'];

      if (sourceName) {
        var source = sourceName.toLowerCase().replace(/[^a-z0-9-]+/g, '-') // only allow alphanumeric
        .replace(/^-+|-+$/g, ''); // trim `-`

        classNames.push('sb-avatar--' + source);
      }

      return _react.default.createElement("div", {
        className: classNames.join(' '),
        onClick: onClick,
        style: hostStyle
      }, src ? this._renderAsDiv() : this._renderAsText());
    }
  }]);

  return Avatar;
}(_react.PureComponent);

exports.Avatar = Avatar;

_defineProperty(Avatar, "displayName", 'Avatar');

_defineProperty(Avatar, "propTypes", _objectSpread({}, sourcePropTypes, {
  className: _propTypes.default.string,
  fgColor: _propTypes.default.string,
  color: _propTypes.default.string,
  colors: _propTypes.default.arrayOf(_propTypes.default.string),
  round: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  style: _propTypes.default.object,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  textSizeRatio: _propTypes.default.number,
  unstyled: _propTypes.default.bool,
  cache: _propTypes.default.object,
  onClick: _propTypes.default.func
}));

_defineProperty(Avatar, "defaultProps", {
  className: '',
  fgColor: '#FFF',
  round: false,
  size: 100,
  textSizeRatio: 3,
  unstyled: false
});

_defineProperty(Avatar, "getRandomColor", _utils.getRandomColor);

_defineProperty(Avatar, "ConfigProvider", _context.ConfigProvider);

var _default = Object.assign((0, _context.withConfig)(Avatar), {
  getRandomColor: _utils.getRandomColor,
  ConfigProvider: _context.ConfigProvider
});

exports.default = _default;