import express from "express";
import {
  getAllNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
} from "../Controllers/NotesControllers.js";
import { requireAuth } from "../Middlewares/requireAuth.js";

const router = express.Router();

// Require authentication for all note routes
router.use(requireAuth);

router.route("/").get(getAllNotes).post(addNote);

router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
