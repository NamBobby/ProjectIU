import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {
  const [drawer, setDrawer] = useState(false);

  const closeDrawer = () => {
    props.onClick(drawer);
  };
  
  return (
    <div className="sidebar-modal">
      <div
        className="modal right fade show"
        style={{
          display: 'block',
          paddingRight: '16px',
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeDrawer}
              >
                <span aria-hidden="true">
                  <i className="icofont-close"></i>
                </span>
              </button>

              <h2 className="modal-title" id="myModalLabel2">
                <Link to="/">
                  <a>
                    <img
                      src={require('@src/assets/images/logo.png')}
                      alt="logo"
                    />
                  </a>
                </Link>
              </h2>
            </div>

            <div className="modal-body">
              <div className="sidebar-modal-widget">
                <h3 className="title">Additional Links</h3>

                <ul>
                  <li>
                    <Link to="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <a>Register</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      <a>FAQ</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      <a>Logout</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-modal-widget">
                <h3 className="title">Contact Info</h3>

                <ul className="contact-info">
                  <li>
                    <i className="icofont-google-map"></i>
                    Address
                    <span>
                      1660 Travis Street Miramar, FL 33025, California
                    </span>
                  </li>
                  <li>
                    <i className="icofont-email"></i>
                    Email
                    <span>admin@mojosa.com</span>
                  </li>
                  <li>
                    <i className="icofont-phone"></i>
                    Phone
                    <span>+123 456 7890</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-modal-widget">
                <h3 className="title">Connect With Us</h3>

                <ul className="social-list">
                  <li>
                    <Link to="/#">
                      <a>
                        <i className="icofont-facebook"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      <a>
                        <i className="icofont-twitter"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      <a>
                        <i className="icofont-instagram"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/#">
                      <a>
                        <i className="icofont-linkedin"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
