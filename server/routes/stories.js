import { Router } from "express";
import { getStories, createStory, updateStory, deleteStory, likeStory, addComment, deleteComment } from "../controllers/stories.js";
const router = Router();

import authentication from "../middleware/authentication.js";


router.get('/', getStories);
router.post('/', authentication, createStory);
router.patch('/:id', authentication, updateStory);
router.delete("/:id", authentication, deleteStory);
router.patch('/:id/likeStory', authentication, likeStory);
router.patch('/:id/addComment', authentication, addComment);
router.patch('/:id/deleteComment', authentication, deleteComment);
// router.patch('/:id/likeComment', authentication, likeComment);


export default router;