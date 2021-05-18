import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'semantic-ui-react';
import { FormElement } from './FormElement';
import { createYupSchema } from './yupSchemaCreator';
import './dynamic-form.less';

const DynamicForm = ({ formData, submit, submitText = 'Submit' }) => {
  const initialValues = {};
  formData.forEach((item) => {
    initialValues[item.id] = item.value || '';
  });

  const yupSchema = formData.reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yupSchema);

  return (
    <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={submit}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form>
          {formData.map((f, k) => (
            <FormElement
              key={k}
              formProps={{
                value: values[f.id],
                error: errors[f.id],
                touched: touched[f.id],
                handleChange,
                handleBlur,
                setFieldValue,
                setFieldTouched,
              }}
              data={f}
            />
          ))}
          <Button primary content={submitText} onClick={handleSubmit} />
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
