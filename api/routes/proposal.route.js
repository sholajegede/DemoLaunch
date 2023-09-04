import express from "express";
import {
  createProposal,
  createOffProposal,
  getProposal,
  getProposalsByBusinessName,
  getProposalsByInfluencerId,
  updateProposal,
  deleteProposal,
  getAllProposals,
  checkExistingProposal,
  sendReminderEmail,
  acceptProposal,
  rejectProposal,
  sendAcceptedEmail,
  sendRejectedEmail,
  sendChatEmail
} from "../controllers/proposal.controller.js";

const router = express.Router();

router.post("/create", createProposal);
router.post("/off-create", createOffProposal);

router.put("/update/:proposalId", updateProposal);

//ACCEPT & REJECT
router.put("/accept/:proposalId", acceptProposal);
router.put("/reject/:proposalId", rejectProposal);

//DELETE
router.delete("/delete/:proposalId", deleteProposal);

router.get("/:proposalId", getProposal);
router.get("/get/:businessName", getProposalsByBusinessName);
router.get("/find/:influencerId", getProposalsByInfluencerId);

router.get("/all", getAllProposals);

// New endpoint for checking existing proposal
router.get("/check/:influencerId/:brandId", checkExistingProposal);

//Resend
router.post("/resend", sendReminderEmail);

//Accepted Email
router.post("/sendAcceptedEmail/:proposalId", sendAcceptedEmail);

//Rejected Email
router.post("/sendRejectedEmail/:proposalId/:reason", sendRejectedEmail);

//Chat Email
router.post("/sendChatMail/:proposalId", sendChatEmail);

export default router;