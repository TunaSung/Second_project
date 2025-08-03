const multer = require("multer");
const { avatarStorage } = require('../config/cloudinary')

const upload = multer({ storage: avatarStorage });

module.exports = upload.single("avatar");