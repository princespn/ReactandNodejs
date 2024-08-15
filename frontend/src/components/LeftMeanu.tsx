import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo-ct.png'; // Correctly importing the image

const LeftMeanu: React.FC = () => {
  return (
    <>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
    <img src={Logo} className="navbar-brand-img h-100" alt="main_logo"/>     
     
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto" id="sidenav-collapse-main">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
          <i className="material-icons">home</i><span className="nav-link-text ms-1">Dashboard</span>

          </Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link text-white" to="/category">
          <i className="material-icons">local_mall</i><span className="nav-link-text ms-1">Category</span>

          </Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link text-white" to="/products">
          <i className="material-icons opacity-10">shop</i><span className="nav-link-text ms-1">Products</span>
          </Link>
        </li>
     
      </ul>
    </div>
  
  </aside>
  </>
  );
};

export default LeftMeanu;
