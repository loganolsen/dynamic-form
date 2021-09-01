"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormElement(props) {
  var formProps = props.formProps,
      data = props.data;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      element = _useState2[0],
      setElement = _useState2[1];

  (0, _react.useMemo)(function () {
    var testElem = function testElem(item) {
      var error = formProps.error,
          touched = formProps.touched,
          value = formProps.value;

      var required = item.validations && item.validations.filter(function (x) {
        return x.type === "required";
      }).length > 0;

      if (item.control === "input") return _react2.default.createElement(
        "div",
        { className: "field " + (touched && error && "error") },
        _react2.default.createElement(
          "label",
          { "aria-label": item.label },
          item.label,
          required && _react2.default.createElement(
            "font",
            { color: "red" },
            " *"
          )
        ),
        _react2.default.createElement("input", {
          error: touched ? error : null,
          name: item.id,
          type: item.type,
          placeholder: item.placeholder,
          value: value,
          onChange: formProps.handleChange,
          onBlur: formProps.handleBlur
        }),
        touched && error && _react2.default.createElement(
          "span",
          null,
          error
        )
      );
      if (item.control === "select") return _react2.default.createElement(
        "div",
        { className: "field " + (touched && error && "error") },
        _react2.default.createElement(
          "label",
          { "aria-label": item.label },
          item.label,
          required && _react2.default.createElement(
            "font",
            { color: "red" },
            " *"
          )
        ),
        _react2.default.createElement(
          "select",
          {
            name: item.name,
            id: item.id,
            value: value,
            onChange: formProps.handleChange,
            onBlur: formProps.handleBlur
          },
          item.options.map(function (opt, index) {
            return _react2.default.createElement(
              "option",
              { key: opt.value + "-" + index, value: opt.value },
              opt.text
            );
          })
        ),
        touched && error && _react2.default.createElement(
          "span",
          null,
          error
        )
      );
      if (item.control === "radio-group") return _react2.default.createElement(
        "div",
        {
          className: "field field-radio-group " + (touched && error && "error")
        },
        _react2.default.createElement(
          "label",
          { "aria-label": item.label },
          item.label,
          required && _react2.default.createElement(
            "font",
            { color: "red" },
            " *"
          )
        ),
        item.options.map(function (opt, index) {
          return _react2.default.createElement(
            "div",
            { key: opt.value + "-" + index, className: "radio-button" },
            _react2.default.createElement("input", {
              type: item.type,
              name: item.id,
              id: item.id + "-" + opt.value,
              value: opt.value,
              onChange: formProps.handleChange
            }),
            _react2.default.createElement(
              "label",
              { htmlFor: item.id + "-" + opt.value },
              opt.text
            )
          );
        }),
        touched && error && _react2.default.createElement(
          "span",
          null,
          error
        )
      );
    };

    var el = testElem(data);
    setElement(el);
  }, [data, formProps]);

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    element
  );
}
exports.default = FormElement;