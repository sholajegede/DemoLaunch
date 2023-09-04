// @ts-nocheck
import axios from "axios";

const uploadContract = async (contractFile, onProgress) => {
  const data = new FormData();
  data.append("file", contractFile);
  data.append("upload_preset", "getcollabo");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/newlink/raw/upload", data, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      },
    });

    const { url } = response.data;
    const contractUrl = url;

    return contractUrl;
  } catch (err) {
    console.log(err);
  }
};

export default uploadContract;