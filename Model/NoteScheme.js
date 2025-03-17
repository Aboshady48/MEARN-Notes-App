import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, "User ID is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
    unique: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Note", NoteSchema);
