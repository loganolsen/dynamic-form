import React from 'react';
import DynamicForm from './dynamic-form.js';
import { defaultFormData } from './formData';

const feedbackFormData = [
  {
    id: 'subject',
    label: 'Subject',
    placeholder: 'Specify a subject',
    control: 'input',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Subject is required.'],
      },
      {
        type: 'min',
        params: [5, 'Subject cannot be less than 5 characters.'],
      },
      {
        type: 'max',
        params: [10, 'Subject cannot be more than 10 characters.'],
      },
    ],
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email',
    control: 'input',
    validationType: 'string',
    value: 'example@abc.com',
    validations: [
      {
        type: 'required',
        params: ['Email is required.'],
      },
      {
        type: 'email',
        params: ['Please enter a valid email address.'],
      },
    ],
  },
  {
    id: 'summary',
    label: 'Details',
    placeholder: 'Please provide some details',
    control: 'textarea',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Details are required.'],
      },
      {
        type: 'min',
        params: [5, 'Please type more words.'],
      },
      {
        type: 'max',
        params: [1024, 'Maximum character limit reached.'],
      },
    ],
  },
  {
    id: 'altContact',
    label: 'Alternative Contact',
    placeholder: '(e.g. a phone number)',
    control: 'input',
    validationType: 'string',
    validations: [],
  },
];

const showFormData = (values) => window.alert(`FormData ${JSON.stringify(values)}`);

export const Default = () => <DynamicForm submit={showFormData} formData={defaultFormData} />;
export const FeedbackForm = () => (
  <DynamicForm submit={showFormData} formData={feedbackFormData} submitText="Send Email" />
);

export default {
  title: 'Components/DynamicForm',
};
