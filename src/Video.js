import React, { useState } from "react";
import axios from "axios";

const Video = () => {
  const [productId, setProductId] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productId || !videoFile) {
      setMessage("Please enter a product ID and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("videoFile", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading video.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="text"
          id="productId"
          name="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <br />
        <label htmlFor="videoFile">Select Video:</label>
        <input
          type="file"
          id="videoFile"
          name="videoFile"
          accept="video/*"
          onChange={handleFileChange}
          required
        />
        <br />
        <button type="submit">Upload</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default Video;
