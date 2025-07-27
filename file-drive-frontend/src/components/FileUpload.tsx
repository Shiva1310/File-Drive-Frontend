"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function FileUpload({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const res = await api.post("/files/signed-url", {
        fileName: file.name,
        fileType: file.type,
      });

      const { uploadUrl } = res.data;

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        console.error("Failed to upload to S3", await uploadRes.text());
        return;
      }

      setFile(null);
      onUpload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
    <div className="flex flex-col gap-2">
  {file ? (
    <div className="text-sm text-gray-700 font-medium">
      Selected file: <span className="font-normal">{file.name}</span>
    </div>
  ) : (
    <div className="text-sm text-gray-400 italic">No file selected</div>
  )}

  <div className="relative inline-block">
    <label
      htmlFor="fileUpload"
      className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Upload File
    </label>
    <input
      id="fileUpload"
      type="file"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
      className="hidden"
    />
  </div>
</div>


      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow disabled:opacity-50"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
