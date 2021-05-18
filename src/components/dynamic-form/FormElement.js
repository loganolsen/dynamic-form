/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useMemo } from 'react';
import { Form } from 'semantic-ui-react';
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import './dynamic-form.less';

export const FormElement = (props) => {
  const { formProps, data } = props;
  const [element, setElement] = useState(undefined);

  useMemo(() => {
    const renderFormElement = (item) => {
      const { error, touched, value } = formProps;
      const required =
        item.validations && item.validations.filter((x) => x.type === 'required').length > 0;

      // select, checkbox group and radio group requires an array of options as props
      if (item.options) {
        // checkbox and radio groups require a form group with a map of the options as form fields
        // TODO: Radio's rendered this way are multi-select - need to NOT have that happen
        if (item.control === 'checkbox-group') {
          return (
            <>
              <Form.Field required={required}>
                <label htmlFor={item.id} id={item.id}>
                  {item.label}
                </label>
              </Form.Field>
              <Form.Group name={formProps.values} widths="equal">
                {item.options.map((elem, i) => {
                  const optIndex = value.indexOf(elem.value);
                  let checkVal = value;
                  const defaultChecked = value.indexOf(elem.value) > -1;
                  return (
                    <Form.Checkbox
                      key={i}
                      label={elem.text}
                      name={value}
                      defaultChecked={defaultChecked}
                      error={touched ? error : null}
                      onChange={() => {
                        if (optIndex === -1) checkVal.push(elem.value);
                        else checkVal = checkVal.filter((x) => x !== elem.value);
                        formProps.setFieldValue(item.id, checkVal);
                        formProps.setFieldTouched(item.id);
                      }}
                    />
                  );
                })}
              </Form.Group>
            </>
          );
        }

        // select requires a single dropdown element with options and a defaultValue
        if (item.control === 'select') {
          return (
            <Form.Dropdown
              name={item.id}
              label={item.label}
              aria-label={item.label}
              placeholder={item.placeholder}
              options={item.options}
              defaultValue={value}
              scrolling={item.scrolling}
              required={required}
              error={touched ? error : null}
              selection
              onChange={(e, { value }) => {
                formProps.handleChange(e);
                formProps.setFieldValue(item.id, value);
                formProps.setFieldTouched(item.id);
              }}
              onBlur={formProps.handleBlur}
            />
          );
        }
      }

      // toggle requires a single Checkbox element that accepts a boolean value (different from a group)
      if (item.control === 'toggle') {
        return (
          <Form.Checkbox
            toggle
            required={required}
            error={touched ? error : null}
            label={item.label}
            aria-label={item.label}
            name={item.id}
            id={item.id}
            defaultChecked={value}
            onChange={(e, { checked }) => {
              formProps.handleChange(e);
              formProps.setFieldValue(item.id, checked);
              formProps.setFieldTouched(item.id);
            }}
            onBlur={formProps.handleBlur}
          />
        );
      }

      // date picker requires element as a control & min/max date values passed as props
      const dateProps =
        item.type === 'date'
          ? {
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
              onChange(e, { value }) {
                formProps.handleChange(e);
                formProps.setFieldValue(item.id, value);
                formProps.setFieldTouched(item.id);
              },
            }
          : {};
      return (
        <Form.Field
          required={required}
          error={touched ? error : null}
          label={item.label}
          aria-label={item.label}
          name={item.id}
          placeholder={item.placeholder}
          value={value}
          type={item.type}
          onChange={formProps.handleChange}
          onBlur={formProps.handleBlur}
          control={item.control}
          {...dateProps}
        />
      );
    };

    const el = renderFormElement(data);
    setElement(el);
  }, [data, formProps]);

  return <>{element}</>;
};
