const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { addNewNote, getNotes } = require("../controllers/notes");
const {auth,isAdmin}=require('../middlewires/auth');

router.post(
  "/create", auth.apply,isAdmin,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addNewNote
);

router.get("/view",auth, getNotes);

module.exports = router;
