const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Chat = sequelize.define("chats", {
  chatId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "userId",
    },
    onDelete: "CASCADE",
  },
  sender: {
    type: DataTypes.ENUM("User", "Bot"),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  intent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sentiment: {
    type: DataTypes.ENUM("Positive", "Negative", "Neutral"),
    allowNull: true, 
  },
  conversationId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Chat;