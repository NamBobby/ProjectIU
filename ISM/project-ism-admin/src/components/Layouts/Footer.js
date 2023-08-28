import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-area ptb-100 pb-0 bg-image">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="single-footer-widget">
              <Link to="/saas">
                <a className="logo">
                  <img
                    src={require('@src/assets/images/logo2.png').default}
                    alt="logo2"
                  />
                </a>
              </Link>
              <p>
                Plan ahead by day, week, or month, and see project status at a
                glance. Search and filter to focus in on anything form a single
                project individual.
              </p>

              <ul className="social-list">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="icofont-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="instagram.com" target="_blank">
                    <i className="icofont-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i className="icofont-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="single-footer-widget pl-5">
              <h3>Company</h3>

              <ul className="list">
                <li>
                  <Link to="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <a>Carrers</a>
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <a>Awards</a>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <a>User Program</a>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <a href="/#">Locations</a>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <a>Login</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="single-footer-widget">
              <h3>Products</h3>

              <ul className="list">
                <li>
                  <Link to="#">
                    <a>Integrations</a>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <a>API</a>
                  </Link>
                </li>
                <li>
                  <Link to="/pricing-one">
                    <a>Pricing</a>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <a>Documentation</a>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <a>Sign Up</a>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <a>Release Notes</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="single-footer-widget">
              <h3>Support</h3>

              <ul className="list">
                <li>
                  <Link to="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <a>FAQ</a>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <a>Press</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
