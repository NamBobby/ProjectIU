var nodemailer = require("nodemailer");

const USER_NAME_GMAIL = "petshopecommerce301@gmail.com";
// petshopecommerce301@gmail.com
// 22052023
const APP_PASSWORD_HARD_CODE = "oelntfgcqbaypmrg"; // SET-UP FOR petshopecommerce301@gmail.com

class SendEmailController {
  sendEmail(req, res) {
    // res.json(req.body);
    const { orderId, userEmail, userName } = req.body;
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: USER_NAME_GMAIL,
        pass: APP_PASSWORD_HARD_CODE,
      },
    });
    // to: "plstuan.ityu@gmail.com, phamtuan1152001@gmail.com",
    var mailOptions = {
      from: userEmail,
      to: "petshopecommerce301@gmail.com",
      subject: "Confirm payment in PetShop",
      // text: `Customer ${userName} has already pay his/her order. Please admin in PetShop check the bank account to confirm that his/her order has already pay successfully. Order ID ${orderId}`,
      html: `<figure class="image" style="text-align: center;"><img src="https://res.cloudinary.com/dh5uzwer0/image/upload/v1683702966/kxi318dnci04rbqojacc.jpg"></figure><p>Hello administator of PetShop !</p><p>Customer's name <strong>${userName}</strong> has already pay his/her order successfully. Please check the bank account to confirm that customer <strong>${userName}</strong> with his/her ORDER ID <strong>${orderId}</strong> has already complete the order.</p><p>Thank for your checking this email.</p><p>Yours sincerely,</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send({
          retCode: 0,
          retText: "Send email successfully!",
          retData: info,
        });
      }
    });
  }
}

module.exports = new SendEmailController();
