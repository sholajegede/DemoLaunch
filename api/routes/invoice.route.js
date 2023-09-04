import express from "express";
import {
  createInvoice,
  getInvoice,
  getInvoiceByInfluencerId,
  getInvoiceByBrandName,
  deleteInvoice,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/create", createInvoice);
router.get("/find/:invoiceId", getInvoice);
router.get("/get/:influencerId", getInvoiceByInfluencerId);
router.get("/brand/:brandName", getInvoiceByBrandName);

router.delete("/delete/:influencerId/:invoiceId", deleteInvoice);

export default router;