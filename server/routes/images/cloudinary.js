require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "drczyzte9",
    api_key: "214571133583921",
    api_secret: "jovHTcIquehVsFF-abYzZ9SFBJc",
});
module.exports = { cloudinary };