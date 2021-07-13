const FormData = [
  {
    id: 'name',
    label: 'Full name',
    placeholder: 'Enter full name',
    control: 'input',
    validationType: 'string',
    value: 'User name',
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
      {
        type: 'min',
        params: [5, 'name cannot be less than 5 characters'],
      },
      {
        type: 'max',
        params: [10, 'name cannot be more than 10 characters'],
      },
    ],
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    control: 'input',
    type: 'password',
    validationType: 'string',
    value: 'User name',
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
    ],
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email',
    control: 'input',
    validationType: 'string',
    value: 'e@m.com',
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
      {
        type: 'email',
        params: ['please enter a valid email'],
      },
    ],
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    control: 'input',
    validationType: 'number',
    value: '7878787878',
    validations: [
      {
        type: 'min',
        params: [10, 'phone number cannot be less than 10 characters'],
      },
    ],
  },
  {
    id: 'dateofbirth',
    label: 'Date of Birth',
    control: 'input',
    type: 'date',
    validationType: 'date',
    value: '01 January 2020',
    minDate: '2020-01-01',
    maxDate: '2021-02-05',
    validations: [
      {
        type: 'required',
        params: ['phone number is required'],
      },
    ],
  },
  {
    id: 'selectNum',
    label: 'Choose a number',
    control: 'select',
    placeholder: 'Please specify',
    validationType: 'string',
    value: 'three',
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
    ],
    options: [
      { text: 'One', value: 'one' },
      { text: 'Two', value: 'two' },
      { text: 'Three', value: 'three' },
    ],
  },
  {
    id: 'total',
    label: 'Total People in Family',
    placeholder: 'family members count',
    control: 'input',
    validationType: 'number',
    required: false,
    value: '1',
    validations: [
      {
        type: 'required',
        params: ['this field is required'],
      },
      {
        type: 'typeError',
        params: ['enter a number only'],
      },
      {
        type: 'min',
        params: [1, 'there should be atleast 1 family member'],
      },
      {
        type: 'max',
        params: [5, 'max family members can be 5'],
      },
    ],
  },
  {
    id: 'checker',
    control: 'checkbox-group',
    label: 'Select a contact preference',
    value: ['text'],
    options: [
      { text: 'Text support', value: 'text' },
      { text: 'Phone support', value: 'phone' },
      { text: 'Email support', value: 'email' },
      { text: 'Video support', value: 'video' },
    ],
    validationType: 'array',
    validations: [
      {
        type: 'required',
        params: ['Select at least one option'],
      },
    ],
  },
  {
    id: 'checkConsent',
    control: 'toggle',
    label: 'Do you consent?',
    value: false,
    validationType: 'bool',
    validations: [
      { type: 'required', params: ['You must give us consent'] },
      { type: 'oneOf', params: [[true], 'You must give us consent'] },
    ],
  },
];

export default FormData;