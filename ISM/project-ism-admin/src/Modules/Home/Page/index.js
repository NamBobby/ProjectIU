import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const userInfo = useSelector(getUserData);
  const codeLanguage = useSelector((state) => getCodeLanguage(state));

  // console.log("userInfo", userInfo);

  return (
    <div className="home-page">
      <div className="home-page__content">
        <div className="home-page__content-icon">
          <svg
            stroke="#ffffff"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="28"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>

        <div className="home-page__content-info">
          <h1 className="home-page__content-info-title">
            Welcome {userInfo?.username}
          </h1>
          <p className="home-page__content-info-des">
            Welcome to <strong>Monito Pets for Pets</strong>. Every task becomes
            easy in Monito Pets for Pets Admin
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
