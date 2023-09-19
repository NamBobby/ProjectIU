// ** React Imports
import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Layouts/Navbar";
import { ToastContainer } from "react-toastify";
import GoTop from "../components/GoTop";
import { getShareInfo } from "@store/common/actions";
import { getCodeLanguage, getShareInfoSelector } from "@store/common/selectors";
import { useRouteMatch } from "react-router";
import Footer from "../components/Layouts/Footer";

const BlankLayout = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  // ** States
  const [isMounted, setIsMounted] = useState(false);

  const codeLanguage = useSelector((state) => getCodeLanguage(state));
  const formData = useSelector((state) => getShareInfoSelector(state));

  return (
    <Fragment>
      <div className={""}>
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header">
              <Navbar />
            </div>
            <div className="content-body">{children}</div>
            <div className="content-footer">
              <Footer />
            </div>
          </div>
        </div>
        {/* <GoTop scrollStepInPx="50" delayInMs="16.66" /> */}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default BlankLayout;
