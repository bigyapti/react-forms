import React, { useState } from 'react';

interface Inputs {
  username: string;
  phone?: number;
  address: string;
  hobbies: string[];
  married: boolean;
}

const FormElement = () => {
  const [inputs, setInputs] = useState<Inputs>({
    username: '',
    phone: undefined,
    address: '',
    hobbies: [],
    married: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (name === 'hobbies') {
      setInputs({
        ...inputs,
        hobbies: value.split(',').map(hobby => hobby.trim()),
      });
    } else if (type === 'checkbox') {
      setInputs({
        ...inputs,
        [name]: checked,
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setInputs({
      username: '',
      phone: undefined,
      address: '',
      hobbies: [],
      married: false,
    });
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center m-10 p-2 text-sm text-light">
      {!submitted && (
        <form onSubmit={handleSubmit} className="text-left shadow-xl p-6 rounded-lg w-80 space-y-4 bg-gray-100">
          <label className="flex flex-col">
            <span>Enter your name:</span>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="border-gray-300 border-2 rounded shadow-md p-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            <span>Enter your phone number:</span>
            <input
              type="number"
              name="phone"
              value={inputs.phone || ''}
              onChange={handleChange}
              className="border-gray-300 border-2 rounded shadow-md p-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            <span>Enter your address:</span>
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              className="border-gray-300 border-2 rounded shadow-md p-2 mt-1"
            />
          </label>
          <label className="flex flex-col">
            <span>Enter your hobbies (comma separated):</span>
            <input
              type="text"
              name="hobbies"
              value={inputs.hobbies.join(', ')}
              onChange={handleChange}
              className="border-gray-300 border-2 rounded shadow-md p-2 mt-1"
            />
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="married"
              checked={inputs.married}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Married</span>
          </label>
          <input
            type="submit"
            value="Submit"
            className="bg-red-800 text-white p-2 rounded-md text-sm mt-2 hover:bg-red-900 cursor-pointer w-1/3"
          />
        </form>
      )}

      {submitted && (
        <div className="shadow-xl p-6 rounded-lg w-80 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
          <div className=''>
          <ul className="text-left list-none">
            <li className='m-3'>Name: {inputs.username}</li>
            <li className='m-3'>Address: {inputs.address}</li>
            <li className='m-3'>Phone: {inputs.phone}</li>
            <li className='m-3'>
              Hobbies:
              <ul className="list-none text-left m-3">
                {inputs.hobbies.map((hobby, index) => (
                  <li key={index}>{index}. {hobby}</li>
                ))}
              </ul>
            </li>
            <li className='m-3'>Married: {inputs.married ? 'Yes' : 'No'}</li>
          </ul>
          </div>
          <button
            onClick={resetForm}
            className="bg-red-800 text-white p-2 rounded-md text-sm mt-2 hover:bg-red-900 cursor-pointer w-1/3"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default FormElement;
