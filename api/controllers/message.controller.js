import Message from "../models/message.js";
import Notification from "../models/notification.js";
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

export const createMessage = async (req, res, next) => {
  const {
    chatId,
    senderId,
    receiverName,
    senderName,
    senderImage,
    text,
    image,
    video,
  } = req.body;

  const newMessage = new Message({
    chatId,
    senderId,
    receiverName,
    senderName,
    senderImage,
    text,
    image,
    video,
  });
  try {
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  const {
    chatId,
    senderId,
    receiverName,
    receiverEmail,
    senderName,
    senderImage,
    text,
    image,
    video,
  } = req.body;

  const messageData = {
    chatId,
    senderId,
    receiverName,
    receiverEmail,
    senderName,
    senderImage,
    text,
    image,
    video,
  };
  try {
    await saveNotification(messageData);
    res.status(200).json({ message: "Notification saved successfully" });
  } catch (error) {
    next(error);
  }
};

export const saveNotification = async (messageData) => {
  const newNotification = new Notification({
    senderId: messageData.senderId,
    receiverName: messageData.receiverName,
    receiverEmail: messageData.receiverEmail,
    senderName: messageData.senderName,
    senderImage: messageData.senderImage,
    text: messageData.text,
    image: messageData.image,
    video: messageData.video,
  });

  const notification = await newNotification.save();

  const notifData = notification.toJSON();

  const email = messageData.receiverEmail;
  const receiver = messageData.receiverName;
  const sender = messageData.senderName;
  const messageText = messageData.text;

  const mailOptions = {
    from: {
      name: "GetCollabo",
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "💬 You have a message",
    html: `<!DOCTYPE html>
      <html>
      <head>
          <title>New Notification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  margin: 0;
                  padding: 0;
              }

              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 20px;
              }

              .header {
                  background-color: #3BB2F6;
                  color: #fff;
                  padding: 10px;
                  text-align: center;
                  border-radius: 5px 5px 0 0;
              }

              .content {
                  padding: 20px;
              }

              .notification-icon {
                  width: 50px;
                  height: 50px;
                  background-color: #3BB2F6;
                  color: #fff;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 50px;
                  font-size: 24px;
                  margin: 0 auto 20px;
              }

              .message {
                  font-size: 16px;
                  line-height: 1.6;
              }

              .inbox-link {
                  display: inline-block;
                  margin-top: 20px;
            
                  color: #fff;
                  text-decoration: none;
              
              
                  background-color: #3BB2F6;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    padding: 10px 20px;
                    border-radius: 6px;
              }

              .inbox-link:hover {
                  background-color: #3367D6;
              }

              .footer {
                  text-align: center;
                  margin-top: 20px;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>New Notification</h1>
              </div>
              <div class="content">
                  <div class="notification-icon">🔔</div>
                  <p class="message">Hi ${receiver},</p>
                  <p class="message">You have a new notification from ${sender} in your inbox. Please log in to your account to check it.</p>
                  <a href="https://getcollabo.io" class="inbox-link">Go to Inbox</a>
              </div>
              <div class="footer">
                  <p>© 2023 GetCollabo, Inc. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error("Failed to send new message email");
  }

  return notifData;
};

export const getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const receiverName = req.params.receiverName;

    const messages = await Notification.find({ receiverName });
    if (messages.length === 0) {
      return res.status(404).json({ message: "You have no new notifications" });
    }

    res.status(200).json(messages);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Error retrieving notifications" });
  }
};

export const deleteNotification = async (req, res, next) => {
  const senderName = req.params.senderName;

  try {
    const notifications = await Notification.find({ senderName: senderName });

    if (notifications.length === 0) {
      return res
        .status(404)
        .send("No notifications found for the specified senderName");
    }

    await Notification.deleteMany({ senderName: senderName });
    res.status(200).send("All notifications have been deleted!");
  } catch (error) {
    next(error);
    res.status(500).send("Something went wrong");
  }
};