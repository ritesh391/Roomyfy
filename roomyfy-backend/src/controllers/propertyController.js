import Property from "../models/Property.js";

// GET ALL PROPERTIES
export const getProperties = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const properties = await Property.find(query)
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROPERTY
export const getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const { title, description, rent, location, bedrooms, bathrooms, images } = req.body;

    const property = await Property.create({
      title,
      description,
      rent,
      location,
      bedrooms,
      bathrooms,
      images,
      owner: req.user._id,
    });

    res.status(201).json({ property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};