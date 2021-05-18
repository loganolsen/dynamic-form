var react = require('react');
var cookiesNext = require('cookies-next');
var semanticUiReact = require('semantic-ui-react');
var jsxRuntime = require('react/jsx-runtime');
var formik = require('formik');
var yup = require('yup');
var moment = require('moment');
var semanticUiCalendarReact = require('semantic-ui-calendar-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return n;
}

var yup__namespace = /*#__PURE__*/_interopNamespace(yup);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var CookieNotification = function CookieNotification(_ref) {
  var readMore = _ref.readMore,
      showIcon = _ref.showIcon,
      inverted = _ref.inverted,
      _ref$cookieIconUrl = _ref.cookieIconUrl,
      cookieIconUrl = _ref$cookieIconUrl === void 0 ? '/static/images/cookie-icon.svg' : _ref$cookieIconUrl,
      _ref$hasCookieCallbac = _ref.hasCookieCallback,
      hasCookieCallback = _ref$hasCookieCallbac === void 0 ? function () {} : _ref$hasCookieCallbac;

  var _useState = react.useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

  react.useEffect(function () {
    setVisible(!cookiesNext.checkCookies(null, 'cookie'));
    hasCookieCallback(cookiesNext.checkCookies(null, 'cookie')); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var handleAccepted = function handleAccepted() {
    setVisible(false);
    cookiesNext.setCookies(null, 'cookie', 'accepted', {
      expires: 9999
    }, 'secure');
    hasCookieCallback(cookiesNext.checkCookies(null, 'cookie'));
  };

  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: visible && /*#__PURE__*/jsxRuntime.jsxs(semanticUiReact.Container, {
      text: true,
      className: "cookie-popup " + (inverted && 'dark-mode'),
      children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
        children: [showIcon && /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Image, {
          src: cookieIconUrl,
          size: "tiny"
        }), /*#__PURE__*/jsxRuntime.jsx("p", {
          children: "We use cookies to improve your experience and to analyse our traffic."
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "cookie-buttons",
        children: [/*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Button, {
          primary: true,
          content: "Accept",
          onClick: function onClick() {
            return handleAccepted();
          }
        }), readMore && /*#__PURE__*/jsxRuntime.jsxs("a", {
          primary: true,
          href: readMore,
          children: ["Read more", /*#__PURE__*/jsxRuntime.jsx("span", {
            className: "sr-only",
            children: "about our cookie policy"
          })]
        })]
      })]
    })
  });
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var FormElement = function FormElement(props) {
  var formProps = props.formProps,
      data = props.data;

  var _useState = react.useState(undefined),
      element = _useState[0],
      setElement = _useState[1];

  react.useMemo(function () {
    var renderFormElement = function renderFormElement(item) {
      var error = formProps.error,
          touched = formProps.touched,
          value = formProps.value;
      var required = item.validations && item.validations.filter(function (x) {
        return x.type === 'required';
      }).length > 0; // select, checkbox group and radio group requires an array of options as props

      if (item.options) {
        // checkbox and radio groups require a form group with a map of the options as form fields
        // TODO: Radio's rendered this way are multi-select - need to NOT have that happen
        if (item.control === 'checkbox-group') {
          return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [/*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Field, {
              required: required,
              children: /*#__PURE__*/jsxRuntime.jsx("label", {
                htmlFor: item.id,
                id: item.id,
                children: item.label
              })
            }), /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Group, {
              name: formProps.values,
              widths: "equal",
              children: item.options.map(function (elem, i) {
                var optIndex = value.indexOf(elem.value);
                var checkVal = value;
                var defaultChecked = value.indexOf(elem.value) > -1;
                return /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Checkbox, {
                  label: elem.text,
                  name: value,
                  defaultChecked: defaultChecked,
                  error: touched ? error : null,
                  onChange: function onChange() {
                    if (optIndex === -1) checkVal.push(elem.value);else checkVal = checkVal.filter(function (x) {
                      return x !== elem.value;
                    });
                    formProps.setFieldValue(item.id, checkVal);
                    formProps.setFieldTouched(item.id);
                  }
                }, i);
              })
            })]
          });
        } // select requires a single dropdown element with options and a defaultValue


        if (item.control === 'select') {
          return /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Dropdown, {
            name: item.id,
            label: item.label,
            "aria-label": item.label,
            placeholder: item.placeholder,
            options: item.options,
            defaultValue: value,
            scrolling: item.scrolling,
            required: required,
            error: touched ? error : null,
            selection: true,
            onChange: function onChange(e, _ref) {
              var value = _ref.value;
              formProps.handleChange(e);
              formProps.setFieldValue(item.id, value);
              formProps.setFieldTouched(item.id);
            },
            onBlur: formProps.handleBlur
          });
        }
      } // toggle requires a single Checkbox element that accepts a boolean value (different from a group)


      if (item.control === 'toggle') {
        return /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Checkbox, {
          toggle: true,
          required: required,
          error: touched ? error : null,
          label: item.label,
          "aria-label": item.label,
          name: item.id,
          id: item.id,
          defaultChecked: value,
          onChange: function onChange(e, _ref2) {
            var checked = _ref2.checked;
            formProps.handleChange(e);
            formProps.setFieldValue(item.id, checked);
            formProps.setFieldTouched(item.id);
          },
          onBlur: formProps.handleBlur
        });
      } // date picker requires element as a control & min/max date values passed as props


      var dateProps = item.type === 'date' ? {
        minDate: moment__default['default'](item.minDate),
        maxDate: moment__default['default'](item.maxDate),
        type: 'text',
        control: semanticUiCalendarReact.DateInput,
        hideMobileKeyboard: true,
        dateFormat: 'DD MMMM YYYY',
        popupPosition: 'bottom center',
        animation: 'none',
        preserveViewMode: false,
        closable: true,
        icon: false,
        onChange: function onChange(e, _ref3) {
          var value = _ref3.value;
          formProps.handleChange(e);
          formProps.setFieldValue(item.id, value);
          formProps.setFieldTouched(item.id);
        }
      } : {};
      return /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Form.Field, _extends({
        required: required,
        error: touched ? error : null,
        label: item.label,
        "aria-label": item.label,
        name: item.id,
        placeholder: item.placeholder,
        value: value,
        type: item.type,
        onChange: formProps.handleChange,
        onBlur: formProps.handleBlur,
        control: item.control
      }, dateProps));
    };

    var el = renderFormElement(data);
    setElement(el);
  }, [data, formProps]);
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: element
  });
};

function createYupSchema(schema, config) {
  var id = config.id,
      validationType = config.validationType,
      _config$validations = config.validations,
      validations = _config$validations === void 0 ? [] : _config$validations;

  if (!yup__namespace[validationType]) {
    return schema;
  }

  var validator = yup__namespace[validationType]();
  validations.forEach(function (validation) {
    var _validator;

    var params = validation.params,
        type = validation.type;

    if (!validator[type]) {
      return;
    }

    validator = (_validator = validator)[type].apply(_validator, params);
  });
  schema[id] = validator;
  return schema;
}

var DynamicForm = function DynamicForm(_ref) {
  var formData = _ref.formData,
      submit = _ref.submit,
      _ref$submitText = _ref.submitText,
      submitText = _ref$submitText === void 0 ? 'Submit' : _ref$submitText;
  var initialValues = {};
  formData.forEach(function (item) {
    initialValues[item.id] = item.value || '';
  });
  var yupSchema = formData.reduce(createYupSchema, {});
  var validateSchema = yup__namespace.object().shape(yupSchema);
  return /*#__PURE__*/jsxRuntime.jsx(formik.Formik, {
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: submit,
    children: function children(_ref2) {
      var values = _ref2.values,
          errors = _ref2.errors,
          touched = _ref2.touched,
          handleSubmit = _ref2.handleSubmit,
          handleChange = _ref2.handleChange,
          handleBlur = _ref2.handleBlur,
          setFieldValue = _ref2.setFieldValue,
          setFieldTouched = _ref2.setFieldTouched;
      return /*#__PURE__*/jsxRuntime.jsxs(semanticUiReact.Form, {
        children: [formData.map(function (f, k) {
          return /*#__PURE__*/jsxRuntime.jsx(FormElement, {
            formProps: {
              value: values[f.id],
              error: errors[f.id],
              touched: touched[f.id],
              handleChange: handleChange,
              handleBlur: handleBlur,
              setFieldValue: setFieldValue,
              setFieldTouched: setFieldTouched
            },
            data: f
          }, k);
        }), /*#__PURE__*/jsxRuntime.jsx(semanticUiReact.Button, {
          primary: true,
          content: submitText,
          onClick: handleSubmit
        })]
      });
    }
  });
};

var index = {
  CookieNotification: CookieNotification,
  DynamicForm: DynamicForm
};

module.exports = index;
//# sourceMappingURL=index.js.map
