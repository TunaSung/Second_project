const multer = require("multer");
const { productStorage } = require('../config/cloudinary')

const upload = multer({ storage: productStorage });

module.exports = upload.array("images", 5);