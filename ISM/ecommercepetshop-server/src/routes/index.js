const productsRouter = require("./products");
const authRouter = require("./auth");
const userRouter = require("./user");
const uploadRouter = require("./upload");
const feedbackRouter = require("./feedbacks");
const sendEmailRouter = require("./sendemail");
const voucherRouter = require("./vouchers");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const newsRouter = require("./news");

// "start": "nodemon --inspect src/index.js",

function route(app) {
  // news
  app.use("/news", newsRouter);

  // order
  app.use("/order", orderRouter);

  // cart
  app.use("/cart", cartRouter);

  // voucher
  app.use("/vouchers", voucherRouter);

  // send email
  app.use("/send-email", sendEmailRouter);

  // feedbacks
  app.use("/feedback", feedbackRouter);

  // upload
  app.use("/upload", uploadRouter);

  // signin-signup for authenticate
  app.use("/auth", authRouter);

  // authorization - test
  app.use("/user", userRouter);

  // main
  app.use("/products", productsRouter);

  // home
  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Server is OK - pham le song tuan -haha!",
    });
  });
}

module.exports = route;
