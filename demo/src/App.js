import './App.css';
import DynamicForm from 'dynamic-form';
import FormData from './formData';

function App() {
  const handleSubmit = (values) => {
    console.log(values);
  }
  return (
    <div className="container">
      <h1>Form</h1>
      <DynamicForm formData={FormData} submit={(values)=>handleSubmit(values)} />
    </div>
  );
}

export default App;
