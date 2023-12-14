import { Router } from "express";
import { newConverstation, getUserConverstations, deleteConversation } from "../controllers/conversations.js";

import authentication from "../middleware/authentication.js";

const router = Router();

router.post('/', authentication, newConverstation);
router.get('/:id', authentication, getUserConverstations);
router.delete('/:id', authentication, deleteConversation);

export default router;