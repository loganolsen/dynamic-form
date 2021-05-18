import { useState, useEffect, useMemo } from 'react';
import { checkCookies, setCookies } from 'cookies-next';
import { Container, Image, Button, Form } from 'semantic-ui-react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';

const CookieNotification = ({
  readMore,
  showIcon,
  inverted,
  cookieIconUrl: _cookieIconUrl = '/static/images/cookie-icon.svg',
  hasCookieCallback: _hasCookieCallback = () => {}
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!checkCookies(null, 'cookie'));

    _hasCookieCallback(checkCookies(null, 'cookie')); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const handleAccepted = () => {
    setVisible(false);
    setCookies(null, 'cookie', 'accepted', {
      expires: 9999
    }, 'secure');

    _hasCookieCallback(checkCookies(null, 'cookie'));
  };

  return /*#__PURE__*/jsx(Fragment, {
    children: visible && /*#__PURE__*/jsxs(Container, {
      text: true,
      className: `cookie-popup ${inverted && 'dark-mode'}`,
      children: [/*#__PURE__*/jsxs("div", {
        children: [showIcon && /*#__PURE__*/jsx(Image, {
          src: _cookieIconUrl,
          size: "tiny"
        }), /*#__PURE__*/jsx("p", {
          children: "We use cookies to improve your experience and to analyse our traffic."
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: "cookie-buttons",
        children: [/*#__PURE__*/jsx(Button, {
          primary: true,
          content: "Accept",
          onClick: () => handleAccepted()
        }), readMore && /*#__PURE__*/jsxs("a", {
          primary: true,
          href: readMore,
          children: ["Read more", /*#__PURE__*/jsx("span", {
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

const FormElement = props => {
  const {
    formProps,
    data
  } = props;
  const [element, setElement] = useState(undefined);
  useMemo(() => {
    const renderFormElement = item => {
      const {
        error,
        touched,
        value
      } = formProps;
      const required = item.validations && item.validations.filter(x => x.type === 'required').length > 0; // select, checkbox group and radio group requires an array of options as props

      if (item.options) {
        // checkbox and radio groups require a form group with a map of the options as form fields
        // TODO: Radio's rendered this way are multi-select - need to NOT have that happen
        if (item.control === 'checkbox-group') {
          return /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx(Form.Field, {
              required: required,
              children: /*#__PURE__*/jsx("label", {
                htmlFor: item.id,
                id: item.id,
                children: item.label
              })
            }), /*#__PURE__*/jsx(Form.Group, {
              name: formProps.values,
              widths: "equal",
              children: item.options.map((elem, i) => {
                const optIndex = value.indexOf(elem.value);
                let checkVal = value;
                const defaultChecked = value.indexOf(elem.value) > -1;
                return /*#__PURE__*/jsx(Form.Checkbox, {
                  label: elem.text,
                  name: value,
                  defaultChecked: defaultChecked,
                  error: touched ? error : null,
                  onChange: () => {
                    if (optIndex === -1) checkVal.push(elem.value);else checkVal = checkVal.filter(x => x !== elem.value);
                    formProps.setFieldValue(item.id, checkVal);
                    formProps.setFieldTouched(item.id);
                  }
                }, i);
              })
            })]
          });
        } // select requires a single dropdown element with options and a defaultValue


        if (item.control === 'select') {
          return /*#__PURE__*/jsx(Form.Dropdown, {
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
            onChange: (e, {
              value
            }) => {
              formProps.handleChange(e);
              formProps.setFieldValue(item.id, value);
              formProps.setFieldTouched(item.id);
            },
            onBlur: formProps.handleBlur
          });
        }
      } // toggle requires a single Checkbox element that accepts a boolean value (different from a group)


      if (item.control === 'toggle') {
        return /*#__PURE__*/jsx(Form.Checkbox, {
          toggle: true,
          required: required,
          error: touched ? error : null,
          label: item.label,
          "aria-label": item.label,
          name: item.id,
          id: item.id,
          defaultChecked: value,
          onChange: (e, {
            checked
          }) => {
            formProps.handleChange(e);
            formProps.setFieldValue(item.id, checked);
            formProps.setFieldTouched(item.id);
          },
          onBlur: formProps.handleBlur
        });
      } // date picker requires element as a control & min/max date values passed as props


      const dateProps = item.type === 'date' ? {
        minDate: moment(item.minDate),
        maxDate: moment(item.maxDate),
        type: 'text',
        control: DateInput,
        hideMobileKeyboard: true,
        dateFormat: 'DD MMMM YYYY',
        popupPosition: 'bottom center',
        animation: 'none',
        preserveViewMode: false,
        closable: true,
        icon: false,

        onChange(e, {
          value
        }) {
          formProps.handleChange(e);
          formProps.setFieldValue(item.id, value);
          formProps.setFieldTouched(item.id);
        }

      } : {};
      return /*#__PURE__*/jsx(Form.Field, _extends({
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

    const el = renderFormElement(data);
    setElement(el);
  }, [data, formProps]);
  return /*#__PURE__*/jsx(Fragment, {
    children: element
  });
};

function createYupSchema(schema, config) {
  const {
    id,
    validationType,
    validations = []
  } = config;

  if (!yup[validationType]) {
    return schema;
  }

  let validator = yup[validationType]();
  validations.forEach(validation => {
    const {
      params,
      type
    } = validation;

    if (!validator[type]) {
      return;
    }

    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}

const DynamicForm = ({
  formData,
  submit,
  submitText: _submitText = 'Submit'
}) => {
  const initialValues = {};
  formData.forEach(item => {
    initialValues[item.id] = item.value || '';
  });
  const yupSchema = formData.reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yupSchema);
  return /*#__PURE__*/jsx(Formik, {
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: submit,
    children: ({
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched
    }) => /*#__PURE__*/jsxs(Form, {
      children: [formData.map((f, k) => /*#__PURE__*/jsx(FormElement, {
        formProps: {
          value: values[f.id],
          error: errors[f.id],
          touched: touched[f.id],
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched
        },
        data: f
      }, k)), /*#__PURE__*/jsx(Button, {
        primary: true,
        content: _submitText,
        onClick: handleSubmit
      })]
    })
  });
};

var index = {
  CookieNotification,
  DynamicForm
};

export default index;
//# sourceMappingURL=index.modern.js.map
