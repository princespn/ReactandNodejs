import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import illustrationSignIn from '../assets/img/illustrations/photo-1497294815431-9365093b7331.avif'; // Correctly importing the image


const apiUrl = process.env.REACT_APP_API_URL;
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
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
    <>
    <main className="main-content  mt-0"
    style={{ backgroundImage: `url(${illustrationSignIn})`, backgroundSize: 'cover',}}>
  
 
      <div className="page-header align-items-start min-vh-100">
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                    <div className="row mt-3">
                      <div className="col-2 text-center ms-auto">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-facebook text-white text-lg"></i>
                        </a>
                      </div>
                      <div className="col-2 text-center px-1">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-github text-white text-lg"></i>
                        </a>
                      </div>
                      <div className="col-2 text-center me-auto">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-google text-white text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="text-start">
                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <div className="input-group input-group-outline my-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" placeholder="Please Enter Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" name="password" placeholder="Please Enter Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-check form-switch d-flex align-items-center mb-3">
                      <input className="form-check-input" type="checkbox" id="rememberMe" checked />
                      <label className="form-check-label mb-0 ms-3">Remember me</label>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                    </div>
                    <p className="mt-4 text-sm text-center">
                      Don't have an account?
                      <Link to="/register" className="text-primary text-gradient font-weight-bold">Sign up</Link>

                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Login;
