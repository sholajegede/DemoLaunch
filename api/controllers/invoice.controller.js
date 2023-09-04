import Invoice from "../models/invoice.js";
import Brand from "../models/brand.js";
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

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createInvoice = async (req, res, next) => {
  try {
    const {
      influencerId,
      username: influencerUsername,
      businessName: brandName,
      brandEmail,
      influencerEmail,
      influencerImg,
      description,
      deliveryTime,
      rate,
      paperId,
      notes,
      date,
      status,
    } = req.body;

    const newInvoice = new Invoice({
      influencerId,
      influencerUsername,
      brandName,
      brandEmail,
      influencerEmail,
      influencerImg,
      description,
      deliveryTime,
      rate,
      paperId,
      notes,
      date,
      status,
    });

    const savedInvoice = await newInvoice.save();
    const brandEmailExists = await Brand.findOne({ email: brandEmail });

    if (brandEmailExists) {
      await sendNewInvoiceEmail(savedInvoice);
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Invoice created successfully",
        invoiceId: savedInvoice._id,
      });
  } catch (error) {
    next(error);
  }
};

export const sendNewInvoiceEmail = async (savedInvoice) => {
  const invoiceId = savedInvoice._id;

  const invoice = await Invoice.findById(invoiceId);

  const creator = capitalizeFirstLetter(invoice.influencerUsername);
  const creatorImage = invoice.influencerImg;
  const brand = invoice.brandName;
  const invoiceNumber = invoice.paperId;
  const dateSent = invoice.date;
  const invoiceStatus = invoice.status === false ? "Pending" : "Paid";
  const deliverable = invoice.description;
  const rate = invoice.rate;
  const timeframe = invoice.deliveryTime;
  const extraNotes = invoice.notes;
  const email = invoice.brandEmail;

  const mailOptions = {
    from: {
      name: 'GetCollabo',
      address: process.env.AUTH_EMAIL,
    },
    to: email,
    subject: `${creator} sent you an invoice`,
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
            <h1>Hi👋, ${brand}!</h1>
            <p>You just receive a payment invoice from ${
              creator
            }. These are the details of the invoice:</p>
            <ul>
              <li><strong>Invoice No.:</strong> ${invoiceNumber}</li>
              <li><strong>Status:</strong> ${invoiceStatus}</li>
              <li><strong>Date:</strong> ${dateSent}</li>

              <li><strong>Creator Image:</strong> ${creatorImage}</li>
              <li><strong>Deliverable:</strong> ${deliverable}</li>
              <li><strong>Payment Due:</strong> NGN ${rate.toLocaleString()}</li>
              <li><strong>Timeframe:</strong> ${timeframe}</li>

              <li><strong>Other Notes:</strong> ${extraNotes}</li>
            </ul>
            <p>Login to your dashboard to view details.</p>
            <a href="https://getcollabo.io/login-brand" class="login-button">
              Login
            </a>
            <p>Best regards,</p>
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
    throw new Error("Failed to send booking email");
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceByInfluencerId = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;
    const invoices = await Invoice.find({
      influencerId,
    });

    if (invoices.length === 0) {
      return res.status(404).json({
        message: "No invoices found for this creator",
      });
    }

    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceByBrandName = async (req, res, next) => {
  try {
    const brandName = req.params.brandName;
    const invoices = await Invoice.find({
      brandName,
    });

    if (invoices.length === 0) {
      return res.status(404).json({
        message: "No invoices found for this brand",
      });
    }

    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;
    const invoiceId = req.params.invoiceId;

    const invoice = await Invoice.findOne({
      _id: invoiceId,
      influencerId: influencerId,
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found or not owned by the creator",
      });
    }

    await Invoice.findByIdAndDelete(invoiceId);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};