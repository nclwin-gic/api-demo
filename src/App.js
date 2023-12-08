import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://cvvoddc5pc.execute-api.us-east-1.amazonaws.com/customers');
      setData(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    // Initialize form fields
    name: '',
    email: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    // Update the state when form fields change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonString = JSON.stringify(formData);

    // Encode the JSON string to base64
    const base64EncodedString = btoa(jsonString);

    try {
      console.log("FormData...", JSON.stringify(formData));
      // Perform the POST request here using fetch or axios
      const response = await fetch('https://cvvoddc5pc.execute-api.us-east-1.amazonaws.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '9DhhsDGL2s1FVqhPS35Vk8xEaRGH0vmq5qY6wOfr',
          // Include other headers as needed (e.g., API key)
        },
        body: base64EncodedString
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Handle success, if needed
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
        <h1>External API Demo</h1>

        {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )} */}
        <table style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              {/* Add more table headers based on your API response structure */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>

      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>


  );
}

export default App;
