const Playlist = require("../models/playlist.js");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

//config the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create the new playlist
exports.addNewPlaylist = async (req, res) => {
  const { topic, title, youtube_link } = req.body;
  
  let thumbnailUrl = "";
  if (req.file) {
    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "references" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    
    try {
      const result = await uploadFromBuffer(req.file.buffer);
      thumbnailUrl = result.secure_url;
    } catch (err) {
      return res
      .status(500)
      .json({ success: false, message: "Image upload failed" });
    }
  }
  
  try {
    const course = await Playlist.create({ topic,title , image: thumbnailUrl,youtube_link });
    res.status(201).json({
      success: true,
      message: "Reference added successfully",
    });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "Failed to create reference" });
  }
  
};

//get the playlist reference
exports.getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.find({});
    if (!playlist.length) {
      return res
        .status(404)
        .json({ success: false, message: "No playlist in database" });
    }
    return res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch playlists" });
  }
};
