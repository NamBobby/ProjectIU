import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassLayout from './auth/forgot-pass/forgotPassLayout';
import { Layout } from './Layout';
import { PaymentLayout } from './payment/paymentLayout';

const Main: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element = {<Layout/>}/> 
      <Route path="/resetpass" element = {<ForgotPassLayout/>}/>
    </Routes>
  );
}

library.add(fab, far, fas);
export default Main;