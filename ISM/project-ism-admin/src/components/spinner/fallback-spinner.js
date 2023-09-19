// ** Logo
import './index.scss';

import { useState, useEffect } from 'react';
import logo from '@src/assets/images/logo.svg';

const LoadableLoading = ({ delay = 300 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    show && (
      <div className="fallback-spinner vh-100">
        <img className="fallback-logo" src={logo} alt="logo" />
        <div className="loading">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div>
      </div>
    )
  );
};

export default LoadableLoading;
