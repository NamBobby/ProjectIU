// ** React Imports
import ReactDOM from "react-dom";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";

//**CSS */
import "@assets/css/bootstrap.min.css";
import "@assets/css/icofont.min.css";
import "@assets/css/animate.css";
import "antd/dist/antd.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "react-image-lightbox/style.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "@assets/css/style.scss";
import "@assets/css/responsive.scss";
// import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";

// ** Lazy load app
import Bootstrap from "./bootstrap";

ReactDOM.render(<Bootstrap />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
