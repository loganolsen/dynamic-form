/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useMemo } from 'react';
import './dynamic-form.css';

export const FormElement = (props) => {
  const { formProps, data } = props;
  const [element, setElement] = useState(undefined);

  useMemo(() => {
    const testElem = (item) => {
      return(
        <div className='field'>
          <label>{item.label}</label>
          <input name={item.id} type={item.type} />
        </div>
      )
    }

    const el = testElem(data);
    setElement(el);
  }, [data, formProps]);

  return <>{element}</>;
};
