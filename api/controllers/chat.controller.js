import Chat from "../models/chat.js";
import Brand from "../models/brand.js";
import Influencer from "../models/influencer.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendNewChatEmail = async (email, businessName, username) => {
  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: `Proposal Alert 🔔: ${username} just accepted your proposal on GetCollabo!`,
    html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Start Collaborating</title>
        <style>
          /* CSS styles for the email */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          .login-button {
              background-color: #3BB2F6;
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              padding: 10px 20px;
              border-radius: 6px;
              display: inline-block;
              text-decoration: none;
            }
          p {
            color: #555;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Proposal Accepted by ${username}</h1>
          <p>Hi ${businessName},</p>
          <p>Your proposal to ${username} has been accepted. Login to your dashboard to start collaborating.</p>
          <a href="https://getcollabo.io/login-brand" class="login-button">
            Login
          </a>
          <p>Thank you for using GetCollabo</p>
          <p>Shola,</p>
          <p>GetCollabo, Inc</p>
        </div>
      </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send booking email');
  }
};

export const createChat = async (req, res, next) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedChat = await newChat.save();

    const receiver = req.body.receiverId;
    const sender = req.body.senderId;
    
    const receiverUser = await Brand.findById(receiver);
    const senderUser = await Influencer.findById(sender);

    const receiverEmail = receiverUser.email;
    const businessName = receiverUser.businessName;
    const username = senderUser.username;

    await sendNewChatEmail(receiverEmail, businessName, username);
    res.status(200).json(savedChat);
  } catch (error) {
    next(error);
  }
};

export const influencerChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.influencerId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const brandChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.brandId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const findChat = async (req, res, next) => {
  try {
    const chats = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

export const findChatById = async (req, res, next) => {
  try {
    const chatId = req.params.chatId; // Assuming the chat ID is passed as a parameter in the request
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
