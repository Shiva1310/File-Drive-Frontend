"use client";
import api from "@/lib/api";

export default function FileList({
  files,
  onDelete,
}: {
  files: any[];
  onDelete: () => void;
}) {
  const handleDelete = async (key: string) => {
    await api.delete(`/files/${key}`);
    onDelete();
  };

  if (files.length === 0) {
    return <p className="text-gray-500">No files uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {files.map((file) => (
        <div
          key={file._id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">{file.filename || "Untitled File"}</h2>
            <a
              href={file.signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Preview / Download
            </a>
          </div>
          <button
            className="mt-4 text-sm text-red-600 hover:text-red-800"
            onClick={() => handleDelete(file.key)}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}
