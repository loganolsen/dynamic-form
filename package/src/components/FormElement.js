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

      return (
        <div className={`field ${error && "error"}`}>
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
          {error && <span>{error}</span>}
        </div>
      );
    };

    const el = testElem(data);
    setElement(el);
  }, [data, formProps]);

  return <React.Fragment>{element}</React.Fragment>;
}
export default FormElement;
