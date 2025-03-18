import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: {
        value: true,
        message: "Email is required.",
        unique: true,
        lowercase: true,
    },
  },
  password: {
    type: String,
    required:{
        value: true,
        message: "Password is required.",
        minlength: 8,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("User",UserSchema);
