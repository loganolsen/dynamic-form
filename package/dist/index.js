"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _formik = require("formik");

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

var _yupSchemaCreator = require("./components/yupSchemaCreator");

var _yupSchemaCreator2 = _interopRequireDefault(_yupSchemaCreator);

var _FormElement = require("./components/FormElement");

var _FormElement2 = _interopRequireDefault(_FormElement);

require("./styles.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicForm = function DynamicForm(_ref) {
  var formData = _ref.formData,
      submit = _ref.submit,
      _ref$submitText = _ref.submitText,
      submitText = _ref$submitText === undefined ? "Submit" : _ref$submitText;

  if (!formData) return null;

  var initialValues = {};
  formData.forEach(function (item) {
    initialValues[item.id] = item.value || "";
  });

  var yupSchema = formData.reduce(_yupSchemaCreator2.default, {});
  var validateSchema = yup.object().shape(yupSchema);

  return _react2.default.createElement(
    _formik.Formik,
    {
      initialValues: initialValues,
      validationSchema: validateSchema,
      onSubmit: submit
    },
    function (_ref2) {
      var values = _ref2.values,
          errors = _ref2.errors,
          touched = _ref2.touched,
          handleSubmit = _ref2.handleSubmit,
          handleChange = _ref2.handleChange,
          handleBlur = _ref2.handleBlur,
          setFieldValue = _ref2.setFieldValue,
          setFieldTouched = _ref2.setFieldTouched;
      return _react2.default.createElement(
        "form",
        { className: "ui form" },
        formData.map(function (f, k) {
          return _react2.default.createElement(_FormElement2.default, {
            key: k,
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
          });
        }),
        _react2.default.createElement(
          "button",
          {
            className: "ui button primary",
            type: "submit",
            onClick: handleSubmit
          },
          submitText
        )
      );
    }
  );
};

exports.default = DynamicForm;