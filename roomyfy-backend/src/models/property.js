import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  rent: Number,
  location: String,

  bedrooms: Number,
  bathrooms: Number,

  images: [String],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("Property", propertySchema);