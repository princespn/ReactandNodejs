import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    age: '',
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
      const response = await axios.post(`${apiUrl}/api/register`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      }
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="overAllcontent">
    <div className="container">
    <div className="d-flex align-items-center py-4">
      <div className="form-signin w-100 m-auto text-center">
        <h1 className="h3 mb-3 fw-normal">Sign up for free</h1>

        <div className="card-body">
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                name="name"
                placeholder="Please Enter Name"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                name="username"
                placeholder="Please Enter Username"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                name="email"
                placeholder="Please Enter E-mail"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                name="password"
                placeholder="Please Enter Password"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                value={formData.password2}
                onChange={handleChange}
                className="form-control"
                name="password2"
                placeholder="Please Confirm Password"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                name="age"
                placeholder="Please Enter Age"
                required
              />
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Register;
