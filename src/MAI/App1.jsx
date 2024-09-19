import React, { useState } from 'react';
import './sta/st.css'

const App1 = () => {
  const [data, setData] = useState({
    title: '',
    detail: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!data.title || !data.detail) {
      setError('Both Title and Detail are required.');
      return;
    }

    // Clear error and success messages
    setError('');
    setSuccess('');

    // Simulate API call
    createPerson(data)
      .then((res) => {
        setSuccess('Data submitted successfully!');
        console.log(res);
      })
      .catch((err) => {
        setError('Error submitting data. Please try again.');
        console.log(err);
      });
  };

  return (
    <>
      <div className="card">
        <div>
          <div className="form-group">
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Detail</label>
            <br />
            <input
              type="text"
              name="detail"
              value={data.detail}
              onChange={onChange}
              className="form-input"
            />
          </div>
          <br />

          {/* Display error or success messages */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <br />

          <button className="btn-submit" type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

// Mock API call (you can replace this with your real API call)
const createPerson = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Success' });
    }, 1000);
  });
};

export default App1;
