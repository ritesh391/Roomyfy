import upload from "../config/cloudinary.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
createProperty,
getProperties,
getSingleProperty
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createProperty);

router.get("/", getProperties);

router.get("/:id", getSingleProperty);

export default router;