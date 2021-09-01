import "./App.css";
import DynamicForm from "@loganolsen/dynamic-form";

import formData from "./formData.js";

const App = () => {
  const handleSubmit = (values) => {
    console.log("this submitted: ", values);
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <DynamicForm formData={formData} submit={handleSubmit} />
    </div>
  );
};

export default App;
