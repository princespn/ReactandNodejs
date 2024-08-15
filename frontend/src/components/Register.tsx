import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import illustrationSignup from '../assets/img/illustrations/illustration-signup.jpg'; // Correctly importing the image

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
    <>
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  style={{ backgroundImage: `url(${illustrationSignup})`, backgroundSize: 'cover',}}>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">Enter your email and password to register</p>
                  </div>
                  <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-check form-check-info text-start ps-0">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                        <label className="form-check-label">
                          I agree to the <a href="#" className="text-dark font-weight-bolder">Terms and Conditions</a>
                        </label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Sign Up</button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-2 text-sm mx-auto">
                      Already have an account? 
                      <Link to="/login" className="text-primary text-gradient font-weight-bold">Sign in</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Register;
