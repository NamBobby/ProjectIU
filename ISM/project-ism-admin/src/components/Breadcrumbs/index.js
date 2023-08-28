import "./index.scss";

import { Link } from "react-router-dom";

// ** Third Party Components
import Proptypes from "prop-types";

import { BackIcon } from "@src/assets/svg";

const BreadCrumbs = (props) => {
  // ** Props
  const { breadCrumbs, backTo, rightComponent } = props;

  return (
    <div className="breadcrumb-wrapper" id="breadcrumb">
      <div className="page__section">
        {backTo && (
          <div className="breadcrumb-back">
            <Link to={backTo}>
              <BackIcon />
            </Link>
          </div>
        )}
        <nav className="breadcrumb breadcrumb_type" aria-label="Breadcrumb">
          <ol className="breadcrumb__list r-list">
            {breadCrumbs?.length > 0 &&
              breadCrumbs.map((item, index) => (
                <li key={`breadcrumb-${index}`} className="breadcrumb__group">
                  {item.to ? (
                    <Link className="breadcrumb__point r-link" to={item.to}>
                      {item.title}
                    </Link>
                  ) : (
                    <span className="breadcrumb__point" aria-current="page">
                      {item.title}
                    </span>
                  )}
                  {index + 1 < breadCrumbs.length && (
                    <span className="breadcrumb__divider" aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              ))}
          </ol>
        </nav>
      </div>
      {rightComponent && (
        <div className="right-component">{rightComponent}</div>
      )}
    </div>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbs: Proptypes.array.isRequired,
};
