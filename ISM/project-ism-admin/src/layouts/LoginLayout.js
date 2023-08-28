// ** React Imports
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@layouts/components/navbar";
import { ToastContainer } from "react-toastify";
import GoTop from "../components/GoTop";
import { getShareInfo } from "@store/common/actions";
import { getCodeLanguage, getShareInfoSelector } from "@store/common/selectors";
import { useRouteMatch } from "react-router";

const LoginLayout = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const codeLanguage = useSelector((state) => getCodeLanguage(state));
  const formData = useSelector((state) => getShareInfoSelector(state));

  return (
    <Fragment>
      <div>
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginLayout;
