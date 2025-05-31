const express = require('express');
const router=express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { addNewPlaylist, getPlaylist } = require('../controllers/playlist');
const {auth,isAdmin}=require('../middlewires/auth');

router.post("/create",auth,isAdmin,upload.single("image"),addNewPlaylist);
router.get("/view",auth,getPlaylist);

module.exports = router;