import Influencer from "../models/influencer.js";
import Brand from "../models/brand.js";
import Invoice from "../models/invoice.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import InfluencerVerification from "../models/influencerVerification.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { stripe } from "../utils/stripe.js";
import Paystack from '@paystack/paystack-sdk';

dotenv.config();

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (influencer, email) => {
  const OTP = Math.floor(Math.random() * 9000) + 1000;
  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "Welcome🎉! Verify your Email on GetCollabo",
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
              text-align: center;
              margin-bottom: 30px;
            }
            .verification-code {
              background-color: #3BB2F6;
              color: #fff;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              padding: 20px;
              border-radius: 10px;
              margin: 0 auto;
              width: 200px;
            }
            p {
              color: #fff;
              text-align: center;
              line-height: 1.5;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋, Welcome to GetCollabo!</h1>
            <p>Thank you for signing up! We're excited to have you use our platform.</p>
            <p>Please use the OTP verification code below to verify your email address (OTP is valid for 5 minutes):</p>
            <div class="verification-code">
              ${OTP}
            </div>
            <p>Once your email is verified, you'll have full access to all the amazing features on GetCollabo.</p>
            <p>Enjoy your experience!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
    const newVerification = new InfluencerVerification({
      influencerId: influencer._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });
    await newVerification.save();

    const token = jwt.sign(
      {
        influencerId: influencer._id,
      },
      process.env.JWT_KEY
    );

    return {
      token: token,
      influencer: influencer,
    };
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error("Failed to send verification email");
  }
};

export const register = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[!@#\$%\^&\*\(\)_\+{}\|:"\<\>\?`\-=\[\]\\;',\.\/]/.test(password)
    ) {
      return res
        .status(400)
        .json({
          error:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const emailExists = await Influencer.findOne({ email: req.body.email });
    const brandEmailExists = await Brand.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: "This email already exists" });
    }

    if (brandEmailExists) {
      return res
        .status(400)
        .json({ error: "This email exists as a brand account" });
    }

    if (!req.body.displayName) {
      return res.status(400).json({ error: "You need to add a Display Name" });
    }

    if (!req.body.username) {
      return res.status(400).json({ error: "You need to add a Username" });
    }

    if (!req.body.termsAndConditionsAccepted) {
      return res
        .status(400)
        .json({
          error:
            "You must agree to the terms and conditions to complete your registration",
        });
    }

    const customer = await stripe.customers.create({
      email: req.body.email.toLowerCase(),
      name: req.body.username.toLowerCase()
    }, {
      apiKey: process.env.STRIPE_SECRET_KEY
    });

    const paystackCustomer = await paystack.customer.create({
      email: req.body.email.toLowerCase(),
      first_name: req.body.username.toLowerCase()
    });

    const newInfluencer = new Influencer({
      email: req.body.email.toLowerCase(),
      password: hash,
      verified: false,
      displayName: req.body.displayName,
      username: req.body.username.toLowerCase(),
      termsAndConditionsAccepted: req.body.termsAndConditionsAccepted,
      stripeCustomerId: customer.id,
      paystackCustomerId: paystackCustomer.data.customer_code
    });

    await newInfluencer.save();

    const verificationData = await sendVerificationEmail(
      newInfluencer,
      req.body.email
    );

    return res
      .cookie("accessToken", verificationData.token, { httpOnly: true })
      .status(200)
      .json(verificationData.influencer);
  } catch (error) {
    // Handle duplicate key error for displayName field
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateField];
      return res
        .status(400)
        .json({
          error: `The ${duplicateField} '${duplicateValue}' already exists`,
        });
    }

    // Handle other errors
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
};

export const buildProfile = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const completeProfile = req.body;

    // Check if username already exists
    if (completeProfile.username) {
      completeProfile.username = completeProfile.username.toLowerCase();
    }
    const displayNameExists = await Influencer.findOne({
      displayName: completeProfile.displayName,
    });
    if (displayNameExists) {
      return res
        .status(400)
        .json({ error: "This display name already exists" });
    }
    const usernameExists = await Influencer.findOne({
      username: completeProfile.username,
    });
    if (usernameExists) {
      return res.status(400).json({ error: "This username already exists" });
    }

    // Validate deliverable data
    const deliverables = completeProfile.deliverable;

    if (!deliverables || !deliverables.length) {
      return res
        .status(400)
        .json({
          error:
            'Please add one or more deliverables by clicking on the "Add deliverable" button.',
        });
    }
    const invalidDeliverables = deliverables.filter((deliverable) => {
      return (
        !deliverable.description ||
        !deliverable.rate ||
        !deliverable.deliveryTime
      );
    });
    if (invalidDeliverables.length) {
      return res
        .status(400)
        .json({ error: "One or more deliverables are incomplete" });
    }

    // Update influencer profile
    const registerInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      { $set: completeProfile },
      { new: true }
    );

    res.status(200).json(registerInfluencer);
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const influencerId = req.params.influencerId;

    const verification = await InfluencerVerification.findOne({
      influencerId,
      OTP,
    });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer profile not found"));
    }

    influencer.verified = true;

    await influencer.save();

    if (verification && typeof verification.delete === "function") {
      await verification.delete();
    }

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer profile not found"));
    }

    if (influencer.verified) {
      return next(createError(400, "Influencer profile already verified"));
    }

    const verification = await InfluencerVerification.findOne({ influencerId });

    if (!verification) {
      return next(createError(400, "Verification not found"));
    }

    const currentTime = Date.now();

    if (verification.expiryAt > currentTime) {
      const timeLeft = Math.ceil(
        (verification.expiryAt - currentTime) / 1000 / 60
      );
      return next(
        createError(400, `OTP can only be resent after ${timeLeft} minute(s)`)
      );
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: influencer.email,
      subject: "New Verification Code | GetCollabo",
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
              text-align: center;
              margin-bottom: 30px;
            }
            .verification-code {
              background-color: #3BB2F6;
              color: #fff;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              padding: 20px;
              border-radius: 10px;
              margin: 0 auto;
              width: 200px;
            }
            p {
              color: #fff;
              text-align: center;
              line-height: 1.5;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋, ${influencer.username}!</h1>
            <p>Thank you for signing up! We're excited to have you use our platform.</p>
            <p>Please use the OTP verification code below to verify your email address (OTP is valid for 5 minutes):</p>
            <div class="verification-code">
              ${OTP}
            </div>
            <p>Once your email is verified, you'll have full access to all the amazing features on GetCollabo.</p>
            <p>Enjoy your experience!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP resent to ${influencer.email}`);

    verification.OTP = OTP;
    verification.createdAt = currentTime;
    verification.expiryAt = new Date(currentTime + 5 * 60000);

    await verification.save();

    res.status(200).send("OTP resent successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!influencer)
      return res
        .status(400)
        .json({ error: "No creator account with this email was found" });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      influencer.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Your password is incorrect" });

    const token = jwt.sign(
      {
        influencerId: influencer._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = influencer._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Influencer has been logged out.");
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const influencer = await Influencer.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!influencer) {
      return next(
        createError(404, "Influencer profile not found with this email")
      );
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Password Reset | GetCollabo",
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
              text-align: center;
              margin-bottom: 30px;
            }
            .verification-code {
              background-color: #3BB2F6;
              color: #fff;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              padding: 20px;
              border-radius: 10px;
              margin: 0 auto;
              width: 200px;
            }
            p {
              color: #fff;
              text-align: center;
              line-height: 1.5;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋!</h1>
            <p>You requested a password reset.</p>
            <p>Please use the OTP below to verify your email address to reset your password (OTP is valid for 5 minutes):</p>
            <div class="verification-code">
              ${OTP}
            </div>
            <p>Once your email is verified, you'll be able to reset your password.</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${email}: ${info.response}`);

    const newVerification = new InfluencerVerification({
      influencerId: influencer._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });

    await newVerification.save();

    res.status(200).send("OTP sent successfully to your email");
  } catch (error) {
    next(error);
  }
};

export const verifyPasswordResetOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const influencerId = req.params.influencerId;

    const verification = await InfluencerVerification.findOne({
      influencerId,
      OTP,
    });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const influencerId = req.params.influencerId;

    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer not found"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    influencer.password = hash;
    await influencer.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    next(error);
  }
};

export const sendBookingEmail = async (req) => {
  const {
    influencerImage,
    brandImage,
    brandName,
    aboutBrand,
    bookedDeliverable,
    paidAmount,
    sendAmount,
    timeFrame,
    influencerEmail,
    brandEmail,
    username,
    brandId,
    influencerId,
    invoiceId,
    date,
  } = req.body;

  const bookingData = {
    influencerImage,
    brandImage,
    brandName,
    aboutBrand,
    bookedDeliverable,
    paidAmount,
    sendAmount,
    timeFrame,
    influencerEmail,
    brandEmail,
    username,
    brandId,
    influencerId,
    invoiceId,
    date,
  };

  await Promise.all([
    sendCreatorBookingEmail(bookingData),
    sendBrandBookingEmail(bookingData),
    sendInvoiceAndBookingDetails(bookingData),
  ]);
};

export const sendCreatorBookingEmail = async (bookingData) => {
  const email = bookingData.influencerEmail;
  const id = bookingData.influencerId;

  const newInfluencerDatatable = {
    logo: bookingData.brandImage || "",
    businessName: bookingData.brandName,
    deliverableBooked: bookingData.bookedDeliverable,
    bookingStatus: true,
    amountPaid: bookingData.paidAmount,
    timeframe: bookingData.timeFrame,
    dateCreated: bookingData.date,
  };

  const options = { new: true }; // return the updated document
  const updateQuery = {
    $push: {
      datatable: {
        $each: [newInfluencerDatatable],
      },
    },
  };

  // Save the updated document to a variable before sending the email
  const updatedInfluencer = await Influencer.findByIdAndUpdate(
    id,
    updateQuery,
    options
  );

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "You just got booked🎉! | GetCollabo",
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
            <h1>Hi👋, ${bookingData.username}!</h1>
            <p>You just got booked, here are the details of your booking:</p>
            <ul>
              <li><strong>Brand/Business:</strong> ${bookingData.brandName}</li>
              <li><strong>Brand Info:</strong> ${bookingData.aboutBrand}</li>
              <li><strong>Deliverable Booked:</strong> ${bookingData.bookedDeliverable}</li>
              <li><strong>Amount Paid:</strong> NGN${bookingData.sendAmount}</li>
              <li><strong>Timeframe:</strong> ${bookingData.timeFrame}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-creator" class="login-button">
              Login
            </a>
            <p>Payments are deposited into your set account within 24 hours.</p>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  // Return the newOrder variable
  return updatedInfluencer;
};

export const sendBrandBookingEmail = async (bookingData) => {
  const email = bookingData.brandEmail;
  const id = bookingData.brandId;

  const newBrandDatatable = {
    img: bookingData.influencerImage,
    creatorUsername: bookingData.username,
    profileLink: `https://getcollabo.io/book/${bookingData.username}`,
    deliverableBooked: bookingData.bookedDeliverable,
    bookingStatus: true,
    amountPaid: bookingData.paidAmount,
    timeframe: bookingData.timeFrame,
    dateCreated: bookingData.date,
  };

  const options = { new: true }; // return the updated document
  const updateQuery = {
    $push: {
      datatable: {
        $each: [newBrandDatatable],
      },
    },
  };

  // Save the updated document to a variable before sending the email
  const updatedBrand = await Brand.findByIdAndUpdate(id, updateQuery, options);

  // Remove the return statement before the .json method
  const newOrder = updatedBrand.toJSON();

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "Your booking has been confirmed! | GetCollabo",
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
            <h1>Hi👋, ${bookingData.brandName}!</h1>
            <p>Your booking has been confirmed, here are the details of your booking:</p>
            <ul>
              <li><strong>Creator:</strong> ${bookingData.username}</li>
              <li><strong>Deliverable Booked:</strong> ${bookingData.bookedDeliverable}</li>
              <li><strong>Amount Paid:</strong> NGN${bookingData.sendAmount}</li>
              <li><strong>Timeframe:</strong> ${bookingData.timeFrame}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-brand" class="login-button">
              Login
            </a>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  // Return the newOrder variable
  return newOrder;
};

export const sendDeliverableEmail = async (req, res) => {
  const {
    sendBrandName,
    sendInfluencerId,
    sendDeliverableCompleted,
    datatableDataId,
    videoSubmit,
  } = req.body;

  const id = datatableDataId;
  const brandInfo = sendDeliverableCompleted;

  // Update influencer document
  const influencerFilter = { "datatable._id": id };
  const influencerUpdate = { $set: { "datatable.$.bookingStatus": false } };
  const updatedInfluencer = await Influencer.findOneAndUpdate(
    influencerFilter,
    influencerUpdate,
    { new: true }
  );

  // Update brand document
  const brandFilter = { "datatable.deliverableBooked": brandInfo };
  const brandUpdate = { $set: { "datatable.$.bookingStatus": false } };
  const updatedBrand = await Brand.findOneAndUpdate(brandFilter, brandUpdate, {
    new: true,
  });

  const brandName = sendBrandName;
  const brandData = await Brand.findOne({ brandName });

  const influencerId = sendInfluencerId;
  const influencerData = await Influencer.findById(influencerId);

  const email = brandData.email;

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "Your deliverable has been submitted! | GetCollabo",
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
            <h1>Hi👋, ${sendBrandName}!</h1>
            <p>Your deliverable has been completed, here are the details of the content:</p>
            <ul>
              <li><strong>Creator:</strong> ${influencerData.username}</li>
              <li><strong>Deliverable Completed:</strong> ${sendDeliverableCompleted}</li>
              <li><strong>Download Content:</strong> ${videoSubmit}</li>
            </ul>
            <p>We hope you're happy with the content. To drop a review for ${influencerData.username}, click on the link below:</p>
            <a href="https://getcollabo.io/book/${influencerData.username}" class="login-button">
              Drop a review
            </a>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  return { updatedInfluencer, updatedBrand };
};

export const sendInvoiceAndBookingDetails = async (bookingData) => {
  const invoiceId = bookingData.invoiceId;
  const amountPaid = bookingData.sendAmount;
  const email = bookingData.influencerEmail;

  const invoice = await Invoice.findById(invoiceId);

  const options = { new: true };
  const updateQuery = { $set: { status: true } };
  const updateInvoice = await Invoice.findByIdAndUpdate(
    invoiceId,
    updateQuery,
    options
  ).lean();

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "You invoice has been paid🎉! | GetCollabo",
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
            <h1>Hi👋, ${invoice.influencerUsername}!</h1>
            <p>Your invoice has been paid by ${invoice.brandName}. These are the details of the invoice:</p>
            <ul>
              <li><strong>Brand:</strong> ${invoice.brandName}</li>
              <li><strong>Deliverable:</strong> ${invoice.description}</li>
              <li><strong>Amount Paid:</strong> NGN${amountPaid}</li>
              <li><strong>Timeframe:</strong> ${invoice.deliveryTime}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-creator" class="login-button">
              Login
            </a>
            <p>Payments are deposited into your set account within 24 hours.</p>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  return updateInvoice;
};

export const sendInvoiceEmail = async (req) => {
  const { invoiceId } = req.body;

  const invoiceData = {
    invoiceId,
  };

  await Promise.all([
    sendBrandInvoiceEmail(invoiceData),
    sendNewInvoice(invoiceData),
    sendCreatorInvoiceEmail(invoiceData),
  ]);
};

export const sendCreatorInvoiceEmail = async (invoiceData) => {
  const { invoiceId } = invoiceData;

  const invoice = await Invoice.findById(invoiceId);
  const email = invoice.influencerEmail;

  // Use an object instead of an array for newBrandDatatable
  const newInfluencerDatatable = {
    logo: "",
    businessName: invoice.brandName,
    deliverableBooked: invoice.description,
    bookingStatus: true,
    amountPaid: invoice.rate,
    timeframe: invoice.deliveryTime,
    dateCreated: invoice.date,
  };

  const options = { new: true }; // return the updated document
  const updateQuery = {
    $push: {
      datatable: {
        $each: [newInfluencerDatatable],
      },
    },
  };

  // Save the updated document to a variable before sending the email
  const updatedInfluencer = await Influencer.findByIdAndUpdate(
    invoice.influencerId,
    updateQuery,
    options
  );

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "You just got booked🎉! | GetCollabo",
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
            <h1>Hi👋, ${invoice.influencerUsername}!</h1>
            <p>You just got booked, here are the details of your booking:</p>
            <ul>
              <li><strong>Brand/Business:</strong> ${invoice.brandName}</li>
              <li><strong>Deliverable Booked:</strong> ${
                invoice.description
              }</li>
              <li><strong>Amount Paid:</strong> NGN${invoice.rate.toLocaleString()}</li>
              <li><strong>Timeframe:</strong> ${invoice.deliveryTime}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-creator" class="login-button">
              Login
            </a>
            <p>Payments are deposited into your set account within 24 hours.</p>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  return updatedInfluencer;
};

export const sendBrandInvoiceEmail = async (invoiceData) => {
  const { invoiceId } = invoiceData;

  const invoice = await Invoice.findById(invoiceId);
  const email = invoice.brandEmail;

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "Your booking has been confirmed! | GetCollabo",
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
            <h1>Hi👋, ${invoice.brandName}!</h1>
            <p>Your booking has been confirmed, here are the details of your booking:</p>
            <ul>
              <li><strong>Creator:</strong> ${invoice.influencerUsername}</li>
              <li><strong>Deliverable Booked:</strong> ${
                invoice.description
              }</li>
              <li><strong>Amount Paid:</strong> NGN${invoice.rate.toLocaleString()}</li>
              <li><strong>Timeframe:</strong> ${invoice.deliveryTime}</li>
            </ul>
            <p>Create an account to collaborate better on GetCollabo.</p>
            <a href="https://getcollabo.io/signup" class="login-button">
              Signup
            </a>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  return invoice;
};

export const sendNewInvoice = async (invoiceData) => {
  const { invoiceId } = invoiceData;

  const invoice = await Invoice.findById(invoiceId);
  const email = invoice.influencerEmail;

  const options = { new: true };
  const updateQuery = { $set: { status: true } };
  const updateInvoice = await Invoice.findByIdAndUpdate(
    invoiceId,
    updateQuery,
    options
  ).lean();

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: "You invoice has been paid🎉! | GetCollabo",
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
            <h1>Hi👋, ${invoice.influencerUsername}!</h1>
            <p>Your invoice has been paid by ${
              invoice.brandName
            }. These are the details of the invoice:</p>
            <ul>
              <li><strong>Brand:</strong> ${invoice.brandName}</li>
              <li><strong>Deliverable:</strong> ${invoice.description}</li>
              <li><strong>Amount Paid:</strong> NGN${invoice.rate.toLocaleString()}</li>
              <li><strong>Timeframe:</strong> ${invoice.deliveryTime}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-creator" class="login-button">
              Login
            </a>
            <p>Payments are deposited into your set account within 24 hours.</p>
            <p>Enjoy your collaboration!</p>
            <p>Best regards,</p>
            <p>Shola, Founder at GetCollabo</p>
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
    throw new Error("Failed to send booking email");
  }

  return updateInvoice;
};