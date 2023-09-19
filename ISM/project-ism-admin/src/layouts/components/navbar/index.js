import "./index.scss";
import "./responsive.scss";

import React, { useState, useEffect, Fragment } from "react";

/*Hooks*/
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useMediaQuery } from "react-responsive";

/*Navigation*/
import navigation from "@src/navigation";

/*Components*/
import Switch from "@components/Switch";

/*Icon*/
import {
  TTLIcon,
  FBIcon,
  YoutubeIcon,
  TiktokIcon,
  HamburgerIcon,
} from "@src/assets/svg";

import { LogoutOutlined } from "@ant-design/icons";

const Navbar = ({ data = {} }) => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  /*State*/
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const logo = require("@assets/images/ism-image.png").default;
  const logoMobile = require("@assets/images/logo.svg").default;

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      setIsMounted(true);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:user");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("persist:Payment");
    localStorage.removeItem("persist:Auth");
    localStorage.removeItem("mode");
    localStorage.removeItem("persist:layout");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <header id="header">
        <div id="navbar" className="crake-nav top-header">
          <div className="container-fluid header">
            <div className="d-flex flex-row justify-content-start align-items-center gap-3">
              <Link to="/" className="navbar-brand desktop">
                <img src={logo} alt="logo" />
              </Link>
              <div id="navbar" className="crake-nav light">
                <div className="container">
                  <nav className="navbar navbar-expand-md navbar-light">
                    <div
                      className="collapse navbar-collapse navbar-desktop"
                      id="navbarSupportedContent"
                    >
                      {navigation && navigation.length ? (
                        <ul className="navbar-nav nav ms-auto">
                          {navigation.map((item) => (
                            <li
                              className={`nav-item ${
                                item.to === url ? "active" : ""
                              }`}
                              key={item.id}
                              onClick={() => history.push(item.to)}
                            >
                              <Link
                                className="nav-link nav-header-link"
                                to={item.to}
                              >
                                {item.titleI18n
                                  ? t(item.titleI18n)
                                  : item.title}
                              </Link>
                              {item.submenu && item.submenu.length ? (
                                <ul className="dropdown_menu">
                                  {item.submenu.map((sub, index) => (
                                    <li key={sub.id || `sub-${index}`}>
                                      <Link to={sub.to}>
                                        {sub.titleI18n
                                          ? t(sub.titleI18n)
                                          : sub.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="header-logout-box" onClick={() => logout()}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <LogoutOutlined />
              </div>
              <div className="header-logout-title">Logout</div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
