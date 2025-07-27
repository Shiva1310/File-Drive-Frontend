"use client";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  const [files, setFiles] = useState<any[]>([]);

  const fetchFiles = async () => {
    const res = await api.get("/files");
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 My File Storage</h1>
        <FileUpload onUpload={fetchFiles} />
        <FileList files={files} onDelete={fetchFiles} />
      </div>
    </div>
  );
}
