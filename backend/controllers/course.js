const Courses = require("../models/courses");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

//config the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//add a new course to the database -by teacher
exports.createCourse = async (req,res) =>{
  try {
    const { course_title, topic, mode, starting_date, duration, course_overview, course_level, outcomes, topics_covered, prerequisite, demovideo, email} = req.body;

    // Handle file upload to Cloudinary
    let thumbnailUrl = '';
    if (req.file) {
      const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'course_thumbnails' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      thumbnailUrl = result.secure_url;
    }

    const course = await Courses.create({ course_title, topic, mode, starting_date, duration, course_overview, course_level, outcomes, topics_covered, prerequisite, demovideo, thumbnail: thumbnailUrl,created_by: email });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
    });
  } catch (error) {
    console.error('Error in createCourse:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message,
    });
  }
};

//get all the online courses - for students
exports.getOnlineCourses = async (req, res) => {
  try {
    const course = await Courses.find({ mode: "online" });
    return res.status(200).json({
      message: true,
      course
    });
  } catch (err) {
    return res.status(500).json({ message: false, error: err.message });
  }
};

//get all the offline courses - for students
exports.getOfflineCourses = async (req, res) => {
  try {
    const course = await Courses.find({ mode: "offline" });
    return res.status(200).json({
      message: true,
      course
    });
  } catch (err) {
    return res.status(500).json({ message: false, error: err.message });
  }
};

//get all the notes - by students(unimplemented)
exports.getNotes = async (req, res) => {};


// In the teacher home - provided online courses
exports.getOnlineCoursesByTeacher = async (req, res) => {
  const email = req.body.email;
  try {
    const courses = await Courses.find({ mode: "online", created_by: email });
    if (courses.length === 0) {
      return res.status(404).json({ message: "No online courses found", success: false });
    }
    return res.status(200).json({ message: "Successfully fetched", success: true, courses });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// In the teacher home - provided offline courses
exports.getOfflineCoursesByTeacher = async (req, res) => {
  const email = req.body.email;
  try {
    const courses = await Courses.find({ mode: "offline", created_by: email });
    if (courses.length === 0) {
      console.log("No offline courses found");
      return res.status(404).json({ message: "No offline courses found", success: false });
    }
    return res.status(200).json({ message: "Successfully fetched", success: true, courses });
  } catch (err) {
    console.error("Error fetching offline courses:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

//get the no of students by topic - teasches by teacher
exports.getEnrollmentsByTopic = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await Courses.aggregate([
      { $match: { created_by: { $in: [email] } } },
      {
        $group: {
          _id: "$topic",
          studentCount: { $sum: { $size: "$persued_by" } },
        },
      },
      {
        $project: {
          _id: 0,
          topic: "$_id",
          studentCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};


