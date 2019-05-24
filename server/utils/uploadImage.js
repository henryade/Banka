import Cloudinary from "cloudinary";
import fs from "fs";
import data from "../controllers/dbController";

const cloudinary = Cloudinary.v2;

const downloadImage = (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({
        status: 400,
        message: "No file uploaded",
      });
    } else {
      const { Image } = req.files;
      Image.mv(`./uploads/${Image.name}`);

      return `./uploads/${Image.name}`;
    }
  } catch (err) {
    res.status(500).send(err);
  }
  return null;
};

exports.uploadImage = async (req, res) => {
  try {
    const imageURL = await downloadImage(req, res);
    if (!imageURL.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return res.status(400).json({ message: "Only image files are allowed!" });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    cloudinary.url(`${req.body.email}`, { width: 300, height: 300, crop: "fill" });
    cloudinary.uploader.upload(imageURL, async (err, result) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: "Error Occured",
        });
      }
      const image = await result.secure_url;
      fs.unlinkSync(imageURL);
      let user;
      if (image) {
        user = await data.findUserByEmail(image, req.userData.email);
        return res.status(200).json({
          status: 200,
          data: user,
        });
      }
      return null;
    });
  } catch (error) {
    res.status(500).send(error);
  }
  return null;
};
