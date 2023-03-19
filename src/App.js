import React from 'react';
import drug1Data from './drug1.json';
import drug2Data from './drug2.json';
import './App.css';

function DynamicForm({ formData }) {
  // Create a state object to hold form data
  const [formValues, setFormValues] = React.useState({});

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  // Render form fields dynamically based on JSON schema
  const renderFields = () => {
    return formData.fields.map((field) => {
      switch (field.type) {
        case 'date':
          return (
            <div key={field.key} className="form-field">
              <label className="form-label">{field.label}</label>
              <input
                type="date"
                name={field.key}
                value={formValues[field.key] || ''}
                onChange={handleChange}
                required={field.isRequired}
                readOnly={field.isReadonly}
                className="form-input"
              />
            </div>
          );

        case 'number':
          return (
            <div key={field.key} className="form-field">
              <label className="form-label">{field.label}</label>
              <input
                type="number"
                name={field.key}
                value={formValues[field.key] || ''}
                onChange={handleChange}
                required={field.isRequired}
                readOnly={field.isReadonly}
                className="form-input"
              />
              {field.unit && <span className="form-unit">{field.unit}</span>}
            </div>
          );

        case 'dropdown':
          return (
            <div key={field.key} className="form-field">
              <label className="form-label">{field.label}</label>
              <select
                name={field.key}
                value={formValues[field.key] || ''}
                onChange={handleChange}
                required={field.isRequired}
                readOnly={field.isReadonly}
                className="form-input"
              >
                <option value="">Select an option</option>
                {field.items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFields()}
      <button type="submit" className="form-submit-button">Submit</button>
    </form>
  );
}

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Navadhiti Form</h1>
      <h2 className="drug-heading">Drug 1</h2>
      <DynamicForm formData={drug1Data} />
      <br />
      <h2 className="drug-heading">Drug 2</h2>
      <DynamicForm formData={drug2Data} />
    </div>
  );
}




export default App;
