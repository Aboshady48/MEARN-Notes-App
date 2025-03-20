import Note from "../Model/NoteScheme.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  const userID = req.userID;
  try {
    console.log(`Fetching notes for user: ${userID}`); // ✅ Debugging Log
    const notes = await Note.find({ userID });

    console.log("Fetched Notes:", notes); // ✅ Debugging Log

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error); // ✅ Debugging Log
    res.status(500).json({
      success: false,
      error: error.message || "Error retrieving notes",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    let note = mongoose.Types.ObjectId.isValid(id)
      ? await Note.findById(id)
      : await Note.findOne({ userID: id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error retrieving the note",
    });
  }
};

export const addNote = async (req, res) => {
  const userID = req.userID;

  try {
    const note = new Note({
      ...req.body,
      userID: userID, // ✅ Fixed field name (was "user" before)
    });

    await note.save();

    console.log("Note Added:", note); // ✅ Debugging Log

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error Adding Note:", error); // ✅ Debugging Log
    res.status(400).json({
      success: false,
      error: error.message || "Error creating the note",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Error updating the note",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error deleting the note",
    });
  }
};
