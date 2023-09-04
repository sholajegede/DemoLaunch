import express from "express";
import {
  createChat,
  influencerChats,
  brandChats,
  findChat,
  findChatById,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post('/', createChat);
router.get('/:influencerId', influencerChats);
router.get('/:brandId', brandChats);
router.get('/find/:firstId/:secondId', findChat);

router.get("/getChat/:chatId", findChatById);

export default router;
    