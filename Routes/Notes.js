import express from 'express';
import { getAllNotes, getNoteById, addNote, updateNote, deleteNote } from "../Controllers/NotesControllers.js";
import { requireAuth } from '../Middlewares/requireAuth.js';

const router = express.Router()

router.use(requireAuth);

router.route("/")
.get(getAllNotes)
.post(addNote);

// router.get("/:id", getNoteById);
router.route("/:id")
.get(getNoteById)
.put(updateNote)
.delete(deleteNote)


export default router;
