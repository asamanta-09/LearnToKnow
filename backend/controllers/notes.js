const Notes = require("../models/notes");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//config the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//add new notes as pdf
exports.addNewNote = async (req, res) => {
  const { topic, title } = req.body;
  let pdfUrl = "";
  let imageUrl = "";

  const uploadFromBuffer = (fileBuffer, folder, resourceType = "raw") => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };

  try {
    if (req.files?.pdf?.[0]) {
      const result = await uploadFromBuffer(
        req.files.pdf[0].buffer,
        "notes/pdf",
        "raw"
      );
      pdfUrl = result.secure_url;
    }

    if (req.files?.image?.[0]) {
      const result = await uploadFromBuffer(
        req.files.image[0].buffer,
        "notes/image",
        "image"
      );
      imageUrl = result.secure_url;
    }

    await Notes.create({
      topic,
      title,
      image: imageUrl,
      pdf: pdfUrl,
    });

    res
      .status(201)
      .json({ success: true, message: "Note added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create note" });
  }
};

//fetch all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({});
    if (!notes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No notes in database" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notes fetched successfully", notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch notes" });
  }
};
