const {
  createUserService,
  loginService,
  getUserService,
  getProfileService,
  updateUserService,
  updatePasswordService,
  generateOtp,
  verifyOtpAndUpdatePassword,
  processChatMessage,
  getUserChatStats
} = require("../services/userService");

const { User } = require("../models/associations");
const { upload, checkThumbnailSize } = require("../config/multerConfig");
const axios = require("axios");

const UserRegister = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, gender } = req.body;

    if (!name || !email || !password || !dateOfBirth || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await createUserService({
      name,
      email,
      password,
      dateOfBirth,
      gender,
    });

    if (result.EC === 0) {
      return res.status(201).json({ message: result.EM, data: result.data });
    } else {
      return res.status(400).json({ message: result.EM });
    }
  } catch (error) {
    console.error("Error in createUser controller:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);

  return res.status(200).json(data);
};

const updateUser = async (req, res) => {
  try {
    const avatarFile = req.files?.avatar?.[0] || null;
    const { dateOfBirth, gender } = req.body;

    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let avatarPath = user.avatarPath;

    if (avatarFile) {
      avatarPath = `avatars/${avatarFile.filename}`;
    }

    const profileData = {
      email: req.user.email,
      dateOfBirth,
      gender,
      avatarPath,
    };

    const updateResult = await updateUserService(profileData);
    return res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error in updateUser:", error);
    return res.status(500).json({ EC: 7, EM: "Error updating profile" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.userId;

    const updateResult = await updatePasswordService(
      userId,
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (updateResult.EC === 0) {
      return res
        .status(200)
        .json({ message: "Password updated successfully!" });
    } else {
      return res.status(400).json({ message: updateResult.EM });
    }
  } catch (error) {
    console.error("Error in updatePassword:", error);
    return res.status(500).json({ message: "Error updating password." });
  }
};

const sendOtp = async (req, res) => {
  try {
    const email = req.body?.email;
    if (!email) {
      return res.status(400).json({ EC: 1, EM: "Email is required" });
    }
    const data = await generateOtp(email);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({ EC: 3, EM: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ EC: 1, EM: "Invalid request parameters" });
    }
    const data = await verifyOtpAndUpdatePassword(email, otp, newPassword);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ EC: 3, EM: "Internal server error" });
  }
};

const getAccount = async (req, res) => {
  const data = await getProfileService(req.user.userId);
  return res.status(200).json(data);
};

const getUser = async (req, res) => {
  const data = await getUserService();
  return res.status(200).json(data);
};

// API /chat/ask - for getting responses from the chatbot
const handleAskBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    
    // Get userId from authenticated user (if logged in)
    const userId = req.user?.userId || null;
    
    // Process the message through Flask and optionally save to database
    const result = await processChatMessage(message, userId);
    
    if (result.EC === 0) {
      return res.status(200).json({
        reply: result.reply,
        sentiment: result.sentiment,
        intent: result.intent
      });
    } else {
      return res.status(500).json({ message: "Failed to process message" });
    }
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ message: "Failed to get response from bot" });
  }
};

// API /chat/stats - for getting user chat statistics
const handleGetChatStats = async (req, res) => {
  try {
    // This endpoint requires authentication
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const stats = await getUserChatStats(userId);
    
    if (stats.EC === 0) {
      return res.status(200).json(stats.data);
    } else {
      return res.status(500).json({ message: stats.EM });
    }
  } catch (error) {
    console.error("Error getting chat stats:", error);
    return res.status(500).json({ message: "Failed to retrieve chat statistics" });
  }
};

module.exports = {
  UserRegister,
  handleLogin,
  getAccount,
  updateUser,
  updatePassword,
  sendOtp,
  verifyOtp,
  handleAskBot,
  handleGetChatStats,
  getUser
};