import React from 'react';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const Home: React.FC = () => {
  return (
    <>
    <div className="overAllcontent">
      <div className="container">
        <div className="d-flex align-items-center py-4 justify-content-center flex-column">
          <h1 className="mb-4">Welcome to Our Application</h1>
          
          <p className="mb-4">Please sign in or create an account to continue.</p>

          <div className="d-flex">
            <Link to="/login" className="btn btn-primary mx-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary mx-2">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
