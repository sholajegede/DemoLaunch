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

export const sendSupportMail = async (req, res) => {
  const { userName, userEmail, userMessage } = req.body;

  const email = process.env.AUTH_EMAIL;

  const mailOptions = {
    from: {
      name: "Platform Support",
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: `${userName}, needs help with something`,
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
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
              background-color: #111827;
            }
            h1 {
              color: #fff;
              text-align: left;
              margin-bottom: 30px;
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
              color: #fff;
              text-align: left;
              line-height: 1.5;
              margin: 10px 0;
            }
            ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
              text-align: left;
              color: #fff;
            }
            li {
              margin-bottom: 10px;
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋, Collabo Support!</h1>
            <p>A customer needs help with a problem, here are the details:</p>
            <ul>
              <li><strong>Name:</strong> ${userName}</li>
              <li><strong>Email:</strong> ${userEmail}</li>
              <li><strong>Message:</strong> ${userMessage}</li>
            </ul>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error("Failed to send support email");
  }
};

export const requestRefundEmail = async (req, res) => {
  const { userName, userEmail, userPlan, userReason } = req.body;

  const email = process.env.AUTH_EMAIL;

  const mailOptions = {
    from: {
      name: "Refund Requested",
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: `${userName}, is requesting a refund`,
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
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
              background-color: #111827;
            }
            h1 {
              color: #fff;
              text-align: left;
              margin-bottom: 30px;
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
              color: #fff;
              text-align: left;
              line-height: 1.5;
              margin: 10px 0;
            }
            ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
              text-align: left;
              color: #fff;
            }
            li {
              margin-bottom: 10px;
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋, Collabo Support!</h1>
            <p>A customer is requesting a refund for their ${userPlan}, here are the details:</p>
            <ul>
                <li><strong>Name:</strong> ${userName}</li>
                <li><strong>Email:</strong> ${userEmail}</li>
                <li><strong>Plan type:</strong> ${userPlan}</li>
              <li><strong>Refund reason:</strong> ${userReason}</li>
            </ul>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error("Failed to send support email");
  }
};