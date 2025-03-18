import express from 'express';
const router = express.Router()
import { Register, Login } from "../Controllers/UserController.js";

router.route("/register")
.post(Register)

// router.get("/:id", getNoteById);
router.route("login")
.post(Login)


export default router;
