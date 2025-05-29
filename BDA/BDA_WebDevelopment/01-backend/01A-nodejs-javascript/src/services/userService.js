require("dotenv").config();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const mailService = require("./mailService");
const { sequelize } = require("../config/database");
const { User, Chat, UserOTPVerification } = require("../models/associations");
const fs = require("fs");
const { Op } = require("sequelize");
const path = require("path");
const axios = require("axios");

// Create user service
const createUserService = async ({ name, email, password, dateOfBirth, gender }) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { EC: 1, EM: "Email already exists" };
    }

    const existingName = await User.findOne({ where: {name} });
    if (existingName) {
      return { EC: 1, EM: "Username already exists" };
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      dateOfBirth,
      gender,
    });

    return { EC: 0, EM: "User created successfully", data: newUser };
  } catch (error) {
    console.error("Error in createUserService:", error);
    return { EC: 3, EM: "Error creating user" };
  }
};

// Login service
const loginService = async (email, password) => {
  try {
    // Fetch user by email
    const user = await User.findOne({ where: { email } });
    if (user) {
      // Compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password errors",
        };
      } else {
        // Create an access token
        const payload = {
          userId: user.userId,
          email: user.email,
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          avatarPath: user.avatarPath,
          gender: user.gender,
        };

        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: {
            userId: user.userId,
            email: user.email,
            name: user.name,
            avatarPath: user.avatarPath,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password errors",
      };
    }
  } catch (error) {
    console.log(error);
    return { EC: 4, EM: "Error logging in" };
  }
};

const getUserService = async () => {
  try {
    let result = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return result;
  } catch (error) {
    console.log(error);
    return { EC: 5, EM: "Error fetching users" };
  }
};

// Get users service
const getProfileService = async (userId) => {
  try {
    let result = await User.findAll({
      where: { userId },
      attributes: { exclude: ["password"] },
    });
    return result;
  } catch (error) {
    console.log(error);
    return { EC: 5, EM: "Error fetching users" };
  }
};

// Update user service
const updateUserService = async (profileData) => {
  try {
    const user = await User.findOne({ where: { email: profileData.email } });
    if (!user) {
      return { EC: 6, EM: "User not found" };
    }

    if (
      profileData.avatarPath &&
      user.avatarPath &&
      profileData.avatarPath !== user.avatarPath
    ) {
      const oldAvatarPath = path.join(__dirname, "../uploads", user.avatarPath);
      console.log("Old Avatar Path:", oldAvatarPath);

      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
        console.log("Old avatar deleted successfully.");
      } else {
        console.log("Old avatar does not exist.");
      }
    }

    const updatedFields = {
      ...(profileData.dateOfBirth && { dateOfBirth: profileData.dateOfBirth }),
      ...(profileData.gender && { gender: profileData.gender }),
      ...(profileData.avatarPath && { avatarPath: profileData.avatarPath }),
    };

    await User.update(updatedFields, {
      where: { email: profileData.email },
    });
    return { EC: 0, EM: "Profile updated successfully" };
  } catch (error) {
    console.error("Error in updateUserService:", error);
    throw new Error("Error updating profile in the database");
  }
};

// Update password service
const updatePasswordService = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { EC: 6, EM: "User not found" };
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return { EC: 7, EM: "Invalid current password" };
    }

    if (newPassword !== confirmPassword) {
      return { EC: 8, EM: "New password and confirmation do not match" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { userId } });

    return { EC: 0, EM: "Password updated successfully" };
  } catch (error) {
    console.error("Error in updatePasswordService:", error);
    return { EC: 9, EM: "Error updating password" };
  }
};

// Generate OTP service
const generateOtp = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { EC: 1, EM: "User not found" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    const hashedOTP = await bcrypt.hash(otp.toString(), saltRounds);

    await UserOTPVerification.update(
      { status: false },
      { where: { email, status: true } }
    );

    const newOTP = await UserOTPVerification.create({
      email,
      otp: hashedOTP,
      userId: user.userId,
      status: true,
    });

    await mailService.sendOTP(email, otp);

    // Cancel after 10 minutes
    setTimeout(async () => {
      await UserOTPVerification.update(
        { status: false },
        { where: { otpId: newOTP.otpId } }
      );
    }, 10 * 60 * 1000);

    return { EC: 0, EM: "OTP sent successfully" };
  } catch (error) {
    console.log(error);
    return { EC: 3, EM: "Error generating OTP" };
  }
};

// Verify OTP and update password service
const verifyOtpAndUpdatePassword = async (email, otp, newPassword) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { EC: 1, EM: "User not found" };
    }

    const existingOTP = await UserOTPVerification.findOne({
      where: { email, status: true },
    });

    if (!existingOTP) {
      return { EC: 2, EM: "No valid OTP found" };
    }

    const isMatchOtp = await bcrypt.compare(otp.toString(), existingOTP.otp);
    if (!isMatchOtp) {
      return { EC: 2, EM: "Invalid OTP" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password: hashedPassword },
      { where: { userId: user.userId } }
    );

    await UserOTPVerification.update(
      { status: false },
      { where: { otpId: existingOTP.otpId } }
    );

    return { EC: 0, EM: "Password updated successfully" };
  } catch (error) {
    console.error("Error in verifyOtpAndUpdatePassword:", error);
    return { EC: 3, EM: "Error verifying OTP" };
  }
};

// Process a chat message with Flask AI
const processChatMessage = async (message, userId = null) => {
  try {
    // Get response from Flask chatbot
    const flaskResponse = await axios.post("http://localhost:5001/predict", {
      features: [message]
    });
    
    // Get sentiment analysis from Flask
    const sentimentResponse = await axios.post("http://localhost:5001/sentiment", {
      text: message
    });
    
    const botReply = flaskResponse.data.prediction[0];
    const sentiment = sentimentResponse.data.sentiment;
    const intent = flaskResponse.data.intent;
    
    // Only save to database if the user is logged in
    if (userId) {
      // Save the user message
      await Chat.create({
        userId,
        sender: "User",
        message: message,
        sentiment: sentiment,
        intent: intent
      });
      
      // Save the bot response
      await Chat.create({
        userId,
        sender: "Bot",
        message: botReply,
        sentiment: "Neutral",
        intent: "response" 
      });
    }
    
    return {
      EC: 0,
      reply: botReply,
      sentiment: sentiment,
      intent: intent
    };
  } catch (error) {
    console.error("Error processing chat message:", error);
    return { EC: 1, EM: "Error processing message" };
  }
};

// Get user chat statistics
const getUserChatStats = async (userId) => {
  try {
    // Get total number of user messages
    const totalMessages = await Chat.count({
      where: { 
        userId, 
        sender: "User" 
      }
    });
    
    // Get sentiment distribution
    const sentimentStats = await Chat.findAll({
      attributes: [
        'sentiment',
        [sequelize.fn('COUNT', sequelize.col('sentiment')), 'count']
      ],
      where: { 
        userId, 
        sender: "User",
        sentiment: { [Op.ne]: null }
      },
      group: ['sentiment'],
      raw: true
    });
    
    // Format sentiment stats as percentages
    const sentimentDistribution = sentimentStats.map(stat => ({
      sentiment: stat.sentiment,
      count: parseInt(stat.count),
      percentage: Math.round((parseInt(stat.count) / totalMessages) * 100)
    }));
    
    // Get intent distribution
    const intentStats = await Chat.findAll({
      attributes: [
        'intent',
        [sequelize.fn('COUNT', sequelize.col('intent')), 'count']
      ],
      where: { 
        userId, 
        sender: "User",
        intent: { [Op.ne]: null }
      },
      group: ['intent'],
      raw: true
    });
    
    // Format intent stats as percentages
    const intentDistribution = intentStats.map(stat => ({
      intent: stat.intent,
      count: parseInt(stat.count),
      percentage: Math.round((parseInt(stat.count) / totalMessages) * 100)
    }));
    
    // Sort distributions by count (descending)
    sentimentDistribution.sort((a, b) => b.count - a.count);
    intentDistribution.sort((a, b) => b.count - a.count);
    
    return {
      EC: 0,
      data: {
        totalMessages,
        sentimentDistribution,
        intentDistribution,
      }
    };
  } catch (error) {
    console.error("Error getting user chat stats:", error);
    return { EC: 1, EM: "Error retrieving chat statistics" };
  }
};

module.exports = {
  createUserService,
  loginService,
  getProfileService,
  updateUserService,
  updatePasswordService,
  generateOtp,
  verifyOtpAndUpdatePassword,
  getUserService,
  processChatMessage,
  getUserChatStats
};