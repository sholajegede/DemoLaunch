// @ts-nocheck
import axios from "axios";

const uploadVideo = async (videoFile, onProgress) => {
  const data = new FormData();
  data.append("file", videoFile);
  data.append("upload_preset", "getcollabo");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/newlink/video/upload", data, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      },
    });

    const { url } = response.data;
    const videoUrl = url;

    return videoUrl;
  } catch (err) {
    console.log(err);
  }
};

export default uploadVideo;