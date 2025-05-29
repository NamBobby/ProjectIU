const { User } = require("./user");
const UserOTPVerification = require("./userOTPVerification");
const Chat = require("./chat");

User.hasMany(UserOTPVerification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UserOTPVerification.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Chat, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Chat.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

module.exports = {
  User,
  UserOTPVerification,
  Chat
};