import { Router } from "express";
import { newMessage, getMessages } from "../controllers/messages.js";

import authentication from "../middleware/authentication.js";

const router = Router();

router.post('/', authentication, newMessage);
router.get('/:conversationId', authentication, getMessages);

export default router;