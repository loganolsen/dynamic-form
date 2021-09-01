const formData = [
  {
    id: "name",
    label: "First Name",
    placeholder: "Enter Name", //(optional)
    control: "input", // input, textArea, select, checkbox-group toggle
    type: "text", // text, checkbox, radio, date, number, password, etc
    value: "", // sets initial value (optional)
    validationType: "string", // string, bool, array etc
    validations: [
      {
        type: "required",
        params: ["this field is required"],
      },
    ],
  },
  {
    id: "options",
    label: "Select from this list",
    placeholder: "Select", //(optional)
    control: "select", // input, textArea, select, checkbox-group toggle
    type: "text", // text, checkbox, radio, date, number, password, etc
    value: "", // sets initial value (optional)
    options: [
      { text: "One", value: "one-select" },
      { text: "Two", value: "two-select" },
      { text: "Three", value: "three-select" },
    ],
    validationType: "string", // string, bool, array etc
    validations: [
      {
        type: "required",
        params: ["this field is required"],
      },
    ],
  },
  {
    id: "rad-options",
    label: "Select from this list",
    placeholder: "Select", //(optional)
    control: "radio-group", // input, textArea, select, checkbox-group toggle
    type: "radio", // text, checkbox, radio, date, number, password, etc
    value: "", // sets initial value (optional)
    options: [
      { text: "One", value: "one-select" },
      { text: "Two", value: "two-select" },
      { text: "Three", value: "three-select" },
    ],
    validationType: "string", // string, bool, array etc
    validations: [
      {
        type: "required",
        params: ["this field is required"],
      },
    ],
  },
  {
    id: "check-options",
    label: "Select from this list",
    placeholder: "Select", //(optional)
    control: "checkbox-group", // input, textArea, select, checkbox-group toggle
    type: "checkbox", // text, checkbox, radio, date, number, password, etc
    value: "", // sets initial value (optional)
    options: [
      { text: "One", value: "one-select" },
      { text: "Two", value: "two-select" },
      { text: "Three", value: "three-select" },
    ],
    validationType: "string", // string, bool, array etc
    validations: [
      // {
      //   type: "required",
      //   params: ["this field is required"],
      // },
    ],
  },
];

export default formData;
