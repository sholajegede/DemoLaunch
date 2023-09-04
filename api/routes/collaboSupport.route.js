import express from "express";
import {
    sendSupportMail,
    requestRefundEmail,
} from "../controllers/collaboSupport.controller.js";

const router = express.Router();

router.post("/support", sendSupportMail);
router.post("/refund", requestRefundEmail);

export default router;