import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import createYupSchema from "./components/yupSchemaCreator";
import FormElement from "./components/FormElement";
import "./styles.css";

const DynamicForm = ({ formData, submit, submitText = "Submit" }) => {
  if (!formData) return null;

  const initialValues = {};
  formData.forEach((item) => {
    initialValues[item.id] = item.value || "";
  });

  const yupSchema = formData.reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yupSchema);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={submit}
    >
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
        <form className="ui form">
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
          <button
            className="ui button primary"
            type="submit"
            onClick={handleSubmit}
          >
            {submitText}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default DynamicForm;
