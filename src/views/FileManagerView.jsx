import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileUpload from "../components/FileUpload";
import FileTable from "../components/FileTable";

export default function FileManagerView() {
  return (
    <div>
      <div className="inline-block bg-white rounded shadow px-4 py-2 mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 m-0">
          <InsertDriveFileIcon fontSize="large" />
          Gestión de Archivos
        </h2>
      </div>
      <FileUpload />
      <FileTable />
    </div>
  );
}