import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="overAllcontent">
    <div className="container">
    <div className="d-flex align-items-center py-4">
      <main className="form-signin w-100 m-auto text-center">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        
        <div className="form-floating">
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Please Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Please Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    </div>
    </div>
  );
};

export default Login;
