import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Fragment>
      <section className="page-title-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Error</h2>
            </div>
          </div>
        </div>
        <div className="shape1">
          <img
            src={require('@src/assets/images/star-1.png').default}
            alt="img"
          />
        </div>
        <div className="shape2">
          <img
            src={require('@src/assets/images/star-2.png').default}
            alt="img"
          />
        </div>
        <div className="shape3">
          <img
            src={require('@src/assets/images/star-3.png').default}
            alt="img"
          />
        </div>
        <div className="shape6">
          <img
            src={require('@src/assets/images/star-1.png').default}
            alt="img"
          />
        </div>
        <div className="shape8 rotateme">
          <img
            src={require('@src/assets/images/star-3.png').default}
            alt="shape"
          />
        </div>
        <div className="shape9">
          <img
            src={require('@src/assets/images/star-3.png').default}
            alt="shape"
          />
        </div>
      </section>

      <section className="error-area ptb-100">
        <div className="container">
          <div className="notfound">
            <div className="notfound-404"></div>
            <h2>404</h2>
            <span>Oops!! Page not be Found</span>
            <p>
              Sorry but the page you are looking for does not exist, have been
              removed. name changed or is temporarily unavailable
            </p>
            <Link to="/">
              <a className="btn btn-primary">Back To Homepage</a>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ErrorPage;
