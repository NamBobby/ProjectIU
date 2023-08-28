const User = require("../models/User");

class UserController {
  async updateInfoUser(req, res, next) {
    try {
      const userDetail = await User.findById(req.params.id).exec();
      userDetail.set(req.body);
      const result = await userDetail.save();
      res.json({
        retCode: 0,
        retText: "Successfully Update",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new UserController();
