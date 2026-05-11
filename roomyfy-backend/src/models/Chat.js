import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  lastMessage: {
    type: String,
    default: ""
  },
  lastTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);