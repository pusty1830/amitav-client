// components/ImageUploader.js
import React, { useState } from "react";
import { UploadFile } from "../../services/Service";

export default function ImageUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file)); // show preview while uploading

    const formData = new FormData();
    console.log(formData);
    formData.append("files", file);

    try {
      UploadFile(formData).then((res) => {
        const data = res?.data?.data;
        if (data?.doc0) {
          onUpload(data.doc0); // send URL back to parent
        } else {
          alert("Upload failed.");
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" className="form-control" onChange={handleFileChange} />
      {uploading && <small>Uploading...</small>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="img-fluid mt-2 rounded shadow-sm"
          style={{ maxHeight: "200px" }}
        />
      )}
    </div>
  );
}
