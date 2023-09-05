import mongoose from "mongoose";
import schema from "gridfile";

schema.methods.getBinaryString = function () {
  // return binary string of image file
  const bucket = this.model.getBucket();
  const stream = bucket.openDownloadStream(this._id);
  return new Promise((resolve, reject) => {
    let fileData = "";
    stream.on("data", (chunk) => {
      fileData += chunk.toString("binary");
    });
    stream.on("error", (err) => {
      reject(err);
    });
    stream.on("end", () => {
      resolve(fileData);
    });
  });
};

const GridFile = mongoose.model("GridFile", schema);
export default GridFile;
