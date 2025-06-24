import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  // Maneja archivos para ambos dropzones
  const handleFiles = (files, multiple = false) => {
    const stored = JSON.parse(localStorage.getItem("files") || "[]");
    const now = new Date().toISOString();
    const newFiles = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
      date: now,
    }));
    const updated = multiple ? [...stored, ...newFiles] : [...stored, newFiles[0]];
    localStorage.setItem("files", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Para refrescar la tabla
  };

  // Dropzone para un solo archivo
  const onDropSingle = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) handleFiles([acceptedFiles[0]], false);
  }, []);
  const { getRootProps: getRootPropsSingle, getInputProps: getInputPropsSingle, isDragActive: isDragActiveSingle } = useDropzone({
    onDrop: onDropSingle,
    multiple: false,
  });

  // Dropzone para múltiples archivos
  const onDropMulti = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) handleFiles(acceptedFiles, true);
  }, []);
  const { getRootProps: getRootPropsMulti, getInputProps: getInputPropsMulti, isDragActive: isDragActiveMulti } = useDropzone({
    onDrop: onDropMulti,
    multiple: true,
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white">
      <div className="flex-1">
        <div
          {...getRootPropsSingle()}
          className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
            isDragActiveSingle ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputPropsSingle()} />
          <p>Arrastra un archivo aquí, o haz click para seleccionar uno</p>
        </div>
      </div>
      <div className="flex-1">
        <div
          {...getRootPropsMulti()}
          className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
            isDragActiveMulti ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputPropsMulti()} />
          <p>Arrastra varios archivos aquí, o haz click para seleccionarlos</p>
        </div>
      </div>
    </div>
  );
}