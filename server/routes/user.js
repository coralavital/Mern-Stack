import { Router } from "express";
import { login, signup, getUsers, updateAccount, deleteUser, updatePassword } from "../controllers/users.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get('/users', getUsers);
router.patch('/:id', updateAccount);
router.delete('/:id', deleteUser);
router.patch('/newPassword/:id', updatePassword);

export default router;