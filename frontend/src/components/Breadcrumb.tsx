import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
const location = useLocation();
const pathnames = location.pathname.split('/').filter((item) => item);

  return (
    <>
<nav aria-label="breadcrumb">
    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
    <li className="breadcrumb-item text-sm">
          <Link className="opacity-5 text-dark" to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item text-sm text-dark active" aria-current="page">
      
         
              {value}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link className="opacity-5 text-dark" to={to}>{value}</Link>
            </li>
          );
        })}
      </ol>

    </nav>
    </>
  );
};

export default Breadcrumb;