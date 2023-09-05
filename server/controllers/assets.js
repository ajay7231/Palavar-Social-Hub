import GridFile from "../models/Gridfile.js";
import redisClient from "../middleware/cache.js";

export const getAssets = async (req, res) => {
  try {
    const id = req.params.id;
    const cachedFile = await redisClient.get(`file:${id}`);
    if (cachedFile) {
      res.set("E-Tag", id);
      console.log("Cache Hit - File");
      return res.status(200).end(cachedFile, "binary");
    }
    const file = await GridFile.findById(id);
    if (file) {
      res.attachment(file.filename);
      const data = await file.getBinaryString();
      await redisClient.setEx(`file:${id}`, process.env.FILE_EXPIRE_TIME, data);
      // binary string of image file to response

      res.status(200).end(data, "binary");
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
