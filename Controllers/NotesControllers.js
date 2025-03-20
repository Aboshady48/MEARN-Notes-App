import Note from "../Model/NoteScheme.js";
import mongoose from "mongoose";

/**
 * Get all notes for the authenticated user
 */
export const getAllNotes = async (req, res) => {
  try {
    const userID = req.user?._id || req.query.userID; // Retrieve userID correctly

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    console.log("Fetching notes for userID:", userID);
    const notes = await Note.find({ userID });

    if (notes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No notes found for this user" });
    }

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error while fetching notes",
    });
  }
};

/**
 * Get a single note by ID
 */
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid note ID format" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error while retrieving the note",
    });
  }
};

/**
 * Create a new note
 */
export const addNote = async (req, res) => {
  try {
    const userID = req.user?._id || req.body.userID;

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const note = new Note({
      ...req.body,
      userID, // Ensure the correct userID field is set
    });

    await note.save();

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Error creating the note",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user?._id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
      });
    }

    // Ensure request body contains data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty",
      });
    }

    // Find and update note if it belongs to the user
    const note = await Note.findOneAndUpdate(
      { _id: id, userID }, // Ensures user can only update their own notes
      { $set: req.body }, // Only update provided fields
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};




/**
 * Delete a note (Only owner can delete)
 */
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid note ID format" });
    }

    const note = await Note.findOneAndDelete({ _id: id, userID });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server error while deleting the note",
    });
  }
};
