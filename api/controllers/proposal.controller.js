import Proposal from "../models/proposal.js";
import nodemailer from "nodemailer";

export const createProposal = async (req, res, next) => {
  try {
    const {
      influencerId,
      brandId,
      username,
      businessName,
      creatorImg,
      brandLogo,
      influencerEmail,
      brandEmail,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      status,
      date,
      update,
      updateDate,
    } = req.body;

    const newProposal = new Proposal({
      influencerId,
      brandId,
      username,
      businessName,
      creatorImg,
      brandLogo,
      influencerEmail,
      brandEmail,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      status,
      date,
      update,
      updateDate,
    });

    const savedProposal = await newProposal.save();

    res.status(200).json({
      success: true,
      message: "Proposal created successfully",
      proposalId: savedProposal._id,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    console.error("Error creating proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create proposal",
      error: error.message,
    });
  }
};

export const createOffProposal = async (req, res, next) => {
  try {
    const {
      influencerId,
      username,
      businessName,
      creatorImg,
      brandLogo,
      influencerEmail,
      brandEmail,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      status,
      date,
      update,
      updateDate,
    } = req.body;

    const newProposal = new Proposal({
      influencerId,
      username,
      businessName,
      creatorImg,
      brandLogo,
      influencerEmail,
      brandEmail,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      status,
      date,
      update,
      updateDate,
    });

    const savedProposal = await newProposal.save();

    res.status(200).json({
      success: true,
      message: "Proposal created successfully",
      proposalId: savedProposal._id,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    console.error("Error creating proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create proposal",
      error: error.message,
    });
  }
};

export const acceptProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.proposalId;

    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { $set: { status: "accepted" } },
      { new: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Proposal accepted successfully",
      updatedProposal,
    });
  } catch (error) {
    console.error("Error accepting proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept proposal",
      error: error.message,
    });
  }
};

export const rejectProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.proposalId;

    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { $set: { status: "rejected" } },
      { new: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Proposal rejected successfully",
      updatedProposal,
    });
  } catch (error) {
    console.error("Error rejecting proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject proposal",
      error: error.message,
    });
  }
};

export const updateProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.proposalId;
    const { q1, q2, q3, q4, q5, q6, q7, update, updateDate } = req.body;

    const proposalToUpdate = {};
    if (q1) proposalToUpdate.q1 = q1;
    if (q2) proposalToUpdate.q2 = q2;
    if (q3) proposalToUpdate.q3 = q3;
    if (q4) proposalToUpdate.q4 = q4;
    if (q5) proposalToUpdate.q5 = q5;
    if (q6) proposalToUpdate.q6 = q6;
    if (q7) proposalToUpdate.q7 = q7;
    if (update) proposalToUpdate.update = update;
    if (updateDate) proposalToUpdate.updateDate = updateDate;

    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      proposalToUpdate,
      {
        new: true,
      }
    );

    if (!updatedProposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Proposal updated successfully",
      proposal: updatedProposal,
    });
  } catch (error) {
    console.error("Error updating proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update proposal",
      error: error.message,
    });
  }
};

export const deleteProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.proposalId;

    const deletedProposal = await Proposal.findByIdAndDelete(proposalId);

    if (!deletedProposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Proposal deleted successfully",
      proposal: deletedProposal,
    });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete proposal",
      error: error.message,
    });
  }
};

export const getProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.proposalId;
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    res.status(200).json(proposal);
  } catch (error) {
    next(error);
  }
};

export const getProposalsByBusinessName = async (req, res, next) => {
  try {
    const businessName = req.params.businessName;
    const proposals = await Proposal.find({
      businessName,
    });

    if (proposals.length === 0) {
      return res.status(404).json({
        message: "No proposals found for the given Brand",
      });
    }

    res.status(200).json(proposals);
  } catch (error) {
    next(error);
  }
};

export const getProposalsByInfluencerId = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;
    const proposals = await Proposal.find({
      influencerId,
    });

    if (proposals.length === 0) {
      return res.status(404).json({
        message: "No proposals found for the given Creator",
      });
    }

    res.status(200).json(proposals);
  } catch (error) {
    next(error);
  }
};

export const getAllProposals = async (req, res, next) => {
  try {
    const proposals = await Proposal.find();

    if (proposals.length === 0) {
      return res.status(404).json({
        message: "No proposals found",
      });
    }

    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error retrieving proposals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve proposals",
      error: error.message,
    });
  }
};

export const checkExistingProposal = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;
    const brandId = req.params.brandId;

    console.log(influencerId, brandId);

    const existingProposal = await Proposal.findOne({
      influencerId,
      brandId,
    });

    if (existingProposal) {
      res.status(200).json({
        proposalExists: true,
      });
    } else {
      res.status(200).json({
        proposalExists: false,
      });
    }
  } catch (error) {
    console.error("Error checking existing proposal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check existing proposal",
      error: error.message,
    });
  }
};

export const sendReminderEmail = async (req, res) => {
  try {
    const { email, brandName, creatorName } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "GetCollabo",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: `Reminder 🔔: You have a pending Proposal from ${brandName}`,
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Pending proposal reminder on GetCollabo</title>
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
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi👋, ${creatorName}!</h1>
            <p>This is a reminder that you have a pending proposal from ${brandName}</p>
            <p>Login to your dashboard to view it.</p>
            <a href="https://getcollabo.io/login-creator" class="login-button">
              Login
            </a>
            <p>Best regards,</p>
            <p>Shola</p>
            <p>GetCollabo, Inc</p>
          </div>
        </body>
      </html>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reminder sent successfully!",
    });
  } catch (error) {
    console.error("Failed to send reminder:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send reminder",
      error: error.message,
    });
  }
};

export const sendAcceptedEmail = async (req, res) => {
  try {
    const proposalId = req.params.proposalId;
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    const {
      brandEmail: email,
      businessName: businessName,
      username: creator,
    } = proposal;

    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "GetCollabo",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: `Notification 🔔: Your proposal has been accepted by ${creator}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Accepted proposal reminder on GetCollabo</title>
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
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hi👋, ${businessName}!</h1>
              <p>This is to notify you that your proposal has been accepted by ${creator}</p>
              <p>Login to your dashboard to begin collaborating.</p>
              <a href="https://getcollabo.io/login-brand" class="login-button">
                Login
              </a>
              <p>Best regards,</p>
              <p>Shola</p>
              <p>GetCollabo, Inc</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully!",
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
};

export const sendRejectedEmail = async (req, res) => {
  try {
    const proposalId = req.params.proposalId;
    const rejectionReason = req.params.reason;
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    const {
      brandEmail: email,
      businessName: businessName,
      username: creator,
    } = proposal;

    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "GetCollabo",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: "Notification 🔔: Your proposal was rejected",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Rejected proposal notification on GetCollabo</title>
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
  
       
          .reason {
            margin-top: 30px;
            padding: 20px;
            background-color: #f2f2f2;
            border-radius: 5px;
          }
          .reason h2 {
            color: #555;
            margin: 0;
            margin-bottom: 10px;
          }
          .reason p {
            color: #777;
            margin: 0;
          }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hi, ${businessName}!</h1>
              <p>We regret to inform you that your proposal has been rejected by ${creator} for the following reason:</p>
              <div class="reason">
                <h2>Reason for Rejection</h2>
                <p>${rejectionReason}</p>
              </div>
              <p>Thank you for your interest and effort in submitting the proposal. We appreciate your time and consideration.</p>
              <div class="reason">
                <h2>Check out other Creators on GetCollabo</h2>
                <a href="https://getcollabo.io/search">300+ Creators fit your Brand's Criteria</a>
              </div>
              <p>Best regards,</p>
              <p>Shola</p>
              <p>GetCollabo, Inc</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully!",
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
};

export const sendChatEmail = async (req, res) => {
  try {
    const proposalId = req.params.proposalId;

    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }

    const {
      brandEmail: email,
      businessName: businessName,
      username: creator,
    } = proposal;

    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "GetCollabo",
        address: process.env.AUTH_EMAIL,
      },
      to: email,
      subject: `🔔: ${creator} wants to start a conversation with you`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>New chat notification on GetCollabo</title>
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
              .reason {
                margin-top: 30px;
                padding: 20px;
                background-color: #f2f2f2;
                border-radius: 5px;
              }
              .reason h2 {
                color: #555;
                margin: 0;
                margin-bottom: 10px;
              }
              .reason p {
                color: #777;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hi👋, ${businessName}!</h1>
              <p>${creator} wants to start a conversation with you.</p>
              <p>Please create your account on GetCollabo to continue this conversation.</p>
              <div class="reason">
                <a href="https://getcollabo.io/signup">Signup for free</a>
              </div>
              <p>Best regards,</p>
              <p>Shola</p>
              <p>GetCollabo, Inc</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully!",
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
};