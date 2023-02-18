import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {

  // Hooks
  const [values, setValues] = useState({});

  // Submission Handleer for Add Item button in the ToDo Component.
  const handleSubmit = (event) => {
    event.preventDefault();
    callback({ ...values });
  };

  // Slider Logic
  const handleChange = (event) => {
    let name, value;
    if (typeof (event) === 'object') {
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event)
      name = 'difficulty';
      value = event;
    }
    if (parseInt(value)) {
      value = parseInt(value);
    }
    setValues(values => ({ ...values, [name]: value }));
  };

  // Set Default Values
  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;