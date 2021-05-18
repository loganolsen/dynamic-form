# ui

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/ui.svg)](https://www.npmjs.com/package/ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Install

```bash
npm install --save ui
```

# Usage
```jsx
import React, { Component } from 'react'

import { DynamicForm } from 'ui'
import FormData from '../formData.js';

class Example extends Component {
  render() {
    handleSubmit = values => {
      // do something
    }
    return <DynamicForm formData={FormData} submit={this.handleSubmit} />
  }
}
```
# Props
## FormData
Form data should be structured as a JSON array of objects.  
Object structure should be as in the example below:
```jsx
{
    id: 'name',
    label: 'label for field',
    placeholder: 'placeholder text', //(optional)
    control: 'input', // input, textArea, select, checkbox-group toggle
    type: 'text', // text, checkbox, radio, date, number, password, etc
    value: '', // sets initial value (optional)
    validationType: 'string', // string, bool, array etc
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
    ],
  },

```
## Submit 
Callback function that runs when the form Submit button is clicked (and client-side validation is passed).

#
# Form Validation
## Initial Values
Initial values are dynamically generated based on the `FormData` provided to this component. if a value is defined, the form element will be rendered with that value as it's default state

#
## Validation Schema
Validation schema is dynamically generated based on the `FormData` provided to this component.  
We use `Yup` to structure the validation. Custom validation parameters are defined within the `FormData` using a validationType and an array of validations.  

Example: 

```jsx
    id:'firstName',
    validationType: 'string', // string, bool, array etc
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
      {
        type: 'matches',
        params: [/^[a-zA-Z\s\-]+$/, 'Please provide valid name.'],
      },
      {
        type: 'max',
        params: [255, 'Character limit exceeded.'],
      },
    ],
  },
```
  
Output as `Yup.object()`:
```jsx
Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required.')
    .matches(/^[a-zA-Z\s\-]+$/, 'Please provide valid name.')
    .max(255, 'Character limit exceeded.'),
  });
```
Refer to the official [Yup Documentation](https://www.npmjs.com/package/yup) for more info.  

#
# Form Elements
## Input
Default form element when a control is not defined. Validates as a string value, no additional datasets required.
Defining a type (see [HTML Types](https://www.w3schools.com/html/html_form_input_types.asp)) will change the input type rendered. 
#
## DatePicker
If the type specified is a date, additional params can be passed in for `minDate` and `maxDate` as a string.  
MomentJS will parse this string into a valid ISODateString. The default format that the date value will be saved in is `"DD MMMM YYYY"`.  

Example:
```jsx
{
    id: 'dateofbirth',
    label: 'Date of Birth',
    control: 'input',
    type: 'date',
    value: '01 January 2020',
    minDate: '2020-01-01',
    maxDate: '2021-02-05',
    validationType: 'date',
}
```
#
## Select 
Requires an array of options to be defined in the FormData as per example structure below:   
 
Example:
```jsx
{
  id: 'selectNum',
  label: 'Choose a number',
  control: 'select',
  placeholder: 'Please specify',
  value: 'three',
  options: [
    { text: 'One', value: 'one' },
      { text: 'Two', value: 'two' },
      { text: 'Three', value: 'three' },
    ],
  validationType: 'string',
}
```
#
## Checkbox Group
Requires an array of options to be defined in the FormData as per example below:    
 
Example:
```jsx
{
  options: [
      { text: 'One', value: 'one' },
      { text: 'Two', value: 'two' },
      { text: 'Three', value: 'three' },
    ],
}
```
Values stored in this form type is `array` as it is designed to be multi-select. Use the `Toggle` control for a single item, or set the type to 'checkbox' on a standard input control.

#
## Toggle

Value stored against this form element is `boolean`. Initial value should be true or false only.   
 
Example:
```jsx
{
    id: 'toggleId',
    type: 'toggle',
    label: 'Toggle Label',
    value: true, // initial value true/false
    validationType: 'bool',
  },
```


#
## License

&#x3D;MIT © [adover](https://github.com/adover)
