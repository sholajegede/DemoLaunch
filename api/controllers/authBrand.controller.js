import Brand from "../models/brand.js";
import Influencer from "../models/influencer.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import BrandVerification from "../models/brandVerification.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (brand, email, res) => {
  const OTP = Math.floor(Math.random() * 9000) + 1000;
  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: 'Welcome🎉! Verify your Email on GetCollabo',
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Welcome! Verify your Email on GetCollabo</title>
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
    const newVerification = new BrandVerification({
      brandId: brand._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });
    await newVerification.save();

    const token = jwt.sign(
      {
        brandId: brand._id,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(brand);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send verification email');
  }
};

export const register = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#\$%\^&\*\(\)_\+{}\|:"\<\>\?`\-=\[\]\\;',\.\/]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const emailExists = await Brand.findOne({ email: req.body.email });
    const influencerEmailExists = await Influencer.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'This email already exists' });
    }

    if (influencerEmailExists) {
      return res.status(400).json({ error: 'This email exists as an influencer account' });
    }

    const newBrand = new Brand({
      email: req.body.email.toLowerCase(), // convert email to lowercase
      password: hash,
      verified: false,
    });

    await newBrand.save();
    await sendVerificationEmail(newBrand, req.body.email, res);
  } catch (error) {
    next(error);
  }
};

export const brandRegistration = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const completeRegistration = req.body;

    const phoneExists = await Brand.findOne({ phone: req.body.phone });
    const businessNameExists = await Brand.findOne({ businessName: req.body.businessName });

    if (phoneExists && businessNameExists) {
      return res.status(400).json({ error: 'This phone number and business name already exist' });
    }

    if (phoneExists) {
      return res.status(400).json({ error: 'This phone number already exists' });
    }

    if (businessNameExists) {
      return res.status(400).json({ error: 'This business name already exists' });
    }

    if (!completeRegistration.termsAndConditionsAccepted) {
      return res.status(400).json({ error: 'You must agree to the terms and conditions to complete your registration' });
    }

    const registerBrand = await Brand.findByIdAndUpdate(brandId, { $set: completeRegistration }, { new: true });

    res.status(200).json(registerBrand);
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const brandId = req.params.brandId;

    const verification = await BrandVerification.findOne({ brandId, OTP });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand not found"));
    }

    brand.verified = true;

    await brand.save();

    if (verification && typeof verification.delete === "function") {
      await verification.delete();
    };

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const brandId = req.params.brandId;

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand account not found"));
    }

    if (brand.verified) {
      return next(createError(400, "Brand account already verified"));
    }

    const verification = await BrandVerification.findOne({ brandId });

    if (!verification) {
      return next(createError(400, "Verification not found"));
    }

    const currentTime = Date.now();

    if (verification.expiryAt > currentTime) {
      const timeLeft = Math.ceil((verification.expiryAt - currentTime) / 1000 / 60);
      return next(createError(400, `OTP can only be resent after ${timeLeft} minute(s)`));
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: {
        name: 'GetCollabo',
        address: process.env.AUTH_EMAIL,
      },
      to: brand.email,
      subject: 'New Verification Code | GetCollabo',
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Welcome! Verify your Email on GetCollabo</title>
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
            <h1>Hi👋, ${brand.businessName}!</h1>
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
    console.log(`OTP resent to ${brand.email}`);

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
    const brand = await Brand.findOne({ email: req.body.email.toLowerCase() });

    if (!brand) return res.status(400).json({ error: 'No brand account with the email was found' });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      brand.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Your password is incorrect' });

    const token = jwt.sign(
      {
        brandId: brand._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = brand._doc;
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
    .send("You have been logged out.");
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const brand = await Brand.findOne({ email: req.body.email.toLowerCase() });

    if (!brand) {
      return next(createError(404, "Brand account not found with this email"));
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: {
        name: 'GetCollabo',
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: 'Password Reset | GetCollabo',
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Welcome! Verify your Email on GetCollabo</title>
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

    const newVerification = new BrandVerification({
      brandId: brand._id,
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
    const brandId = req.params.brandId;

    const verification = await BrandVerification.findOne({ brandId, OTP });

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
    const brandId = req.params.brandId;

    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand account not found"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    brand.password = hash;
    await brand.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    next(error);
  }
};
