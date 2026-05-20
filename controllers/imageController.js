import imagekit from "../configs/imageKit.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname
    });

    res.json({ url: response.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};