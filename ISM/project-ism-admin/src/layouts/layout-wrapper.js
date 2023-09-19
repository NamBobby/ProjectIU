// ** Third Party Components
import classnames from "classnames";

// ** Styles
// import 'animate.css/animate.css';

import { useRouteMatch } from "react-router";
const LayoutWrapper = (props) => {
  // ** Props
  const { children, wrapperClass } = props;
  const { url } = useRouteMatch();
  const className = url.toLowerCase() === "/buycourse" ? "BuyCourse" : "";
  return (
    <div
      className={classnames(
        "app-content content overflow-hidden " + className,
        {
          [wrapperClass]: wrapperClass,
        }
      )}
    >
      <div>{children}</div>
    </div>
  );
};

export default LayoutWrapper;
