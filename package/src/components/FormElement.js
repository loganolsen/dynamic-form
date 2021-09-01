/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useMemo } from "react";

function FormElement(props) {
  const { formProps, data } = props;
  const [element, setElement] = useState(undefined);

  useMemo(() => {
    const testElem = (item) => {
      const { error, touched, value } = formProps;
      const required =
        item.validations &&
        item.validations.filter((x) => x.type === "required").length > 0;

      if (item.control === "input")
        return (
          <div className={`field ${touched && error && "error"}`}>
            <label aria-label={item.label}>
              {item.label}
              {required && <font color="red">{` *`}</font>}
            </label>
            <input
              error={touched ? error : null}
              name={item.id}
              type={item.type}
              placeholder={item.placeholder}
              value={value}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            {touched && error && <span>{error}</span>}
          </div>
        );
      if (item.control === "select")
        return (
          <div className={`field ${touched && error && "error"}`}>
            <label aria-label={item.label}>
              {item.label}
              {required && <font color="red">{` *`}</font>}
            </label>
            <select
              name={item.name}
              id={item.id}
              value={value}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            >
              {item.options.map((opt, index) => (
                <option key={`${opt.value}-${index}`} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
            {touched && error && <span>{error}</span>}
          </div>
        );
      if (item.control === "radio-group")
        return (
          <div
            className={`field field-radio-group ${touched && error && "error"}`}
          >
            <label aria-label={item.label}>
              {item.label}
              {required && <font color="red">{` *`}</font>}
            </label>

            {item.options.map((opt, index) => (
              <div key={`${opt.value}-${index}`} className="radio-button">
                <input
                  type={item.type}
                  name={item.id}
                  id={`${item.id}-${opt.value}`}
                  value={opt.value}
                  onChange={formProps.handleChange}
                />
                <label htmlFor={`${item.id}-${opt.value}`}>{opt.text}</label>
              </div>
            ))}
            {touched && error && <span>{error}</span>}
          </div>
        );
    };

    const el = testElem(data);
    setElement(el);
  }, [data, formProps]);

  return <React.Fragment>{element}</React.Fragment>;
}
export default FormElement;
