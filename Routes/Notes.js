import express from 'express';
const router = express.Router()
import { getAllNotes, getNoteById, addNote, updateNote, deleteNote } from "../Controllers/NotesControllers.js";

router.route("/")
.get(getAllNotes)
.post(addNote);

// router.get("/:id", getNoteById);
router.route("/:id")
.get(getNoteById)
.delete(deleteNote)
.put(updateNote)


export default router;
