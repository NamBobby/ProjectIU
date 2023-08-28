// ** React Imports
import { useEffect, useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import GoTop from "../components/GoTop";
import Navbar from "@layouts/components/navbar";
import { getCodeLanguage } from "@store/common/selectors";

const BlankLayout = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const codeLanguage = useSelector((state) => getCodeLanguage(state));

  return (
    <Fragment>
      <div>
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header">
              <Navbar />
            </div>
            <div className="content-body">{children}</div>
          </div>
        </div>
        {/* <GoTop scrollStepInPx="50" delayInMs="16.66" /> */}
      </div>
    </Fragment>
  );
};

export default BlankLayout;
