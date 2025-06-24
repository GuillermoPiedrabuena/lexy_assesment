import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

// Utilidad para formato de fecha para input
function formatForInput(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}

// Tabla colapsable (mobile)
function CollapsibleRow({ file, editCell, setEditCell, editValue, setEditValue, finishEdit, onDelete }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* Nombre editable */}
        <TableCell>
          {editCell.id === file.id && editCell.field === "name" ? (
            <input
              className="w-full"
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => finishEdit(file.id, "name")}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEdit(file.id, "name");
              }}
            />
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => {
                setEditCell({ id: file.id, field: "name" });
                setEditValue(file.name);
              }}
              title="Haz click para editar"
            >
              {file.name}
            </span>
          )}
        </TableCell>
        {/* Acciones */}
        <TableCell align="center">
          <Tooltip title="Eliminar archivo">
            <IconButton
              color="error"
              onClick={() => onDelete(file.id)}
              aria-label="Eliminar archivo"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Metadata
              </Typography>
              <Table size="small" aria-label="metadata">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tamaño
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tipo
                    </TableCell>
                    <TableCell>{file.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Fecha de carga
                    </TableCell>
                    <TableCell>
                      {editCell.id === file.id && editCell.field === "date" ? (
                        <input
                          type="datetime-local"
                          className="w-full"
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => finishEdit(file.id, "date")}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") finishEdit(file.id, "date");
                          }}
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            setEditCell({ id: file.id, field: "date" });
                            setEditValue(formatForInput(file.date));
                          }}
                          title="Haz click para editar"
                        >
                          {new Date(file.date).toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Tabla completa (desktop)
function FullRow({ file, editCell, setEditCell, editValue, setEditValue, finishEdit, onDelete }) {
  return (
    <TableRow>
      {/* Nombre editable */}
      <TableCell>
        {editCell.id === file.id && editCell.field === "name" ? (
          <input
            className="w-full"
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => finishEdit(file.id, "name")}
            onKeyDown={(e) => {
              if (e.key === "Enter") finishEdit(file.id, "name");
            }}
          />
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => {
              setEditCell({ id: file.id, field: "name" });
              setEditValue(file.name);
            }}
            title="Haz click para editar"
          >
            {file.name}
          </span>
        )}
      </TableCell>
      <TableCell>{file.size}</TableCell>
      <TableCell>{file.type}</TableCell>
      <TableCell>
        {editCell.id === file.id && editCell.field === "date" ? (
          <input
            type="datetime-local"
            className="w-full"
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => finishEdit(file.id, "date")}
            onKeyDown={(e) => {
              if (e.key === "Enter") finishEdit(file.id, "date");
            }}
          />
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => {
              setEditCell({ id: file.id, field: "date" });
              setEditValue(formatForInput(file.date));
            }}
            title="Haz click para editar"
          >
            {new Date(file.date).toLocaleString()}
          </span>
        )}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Eliminar archivo">
          <IconButton
            color="error"
            onClick={() => onDelete(file.id)}
            aria-label="Eliminar archivo"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function FileTable() {
  const [files, setFiles] = React.useState([]);
  const [editCell, setEditCell] = React.useState({ id: null, field: null });
  const [editValue, setEditValue] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const load = () => setFiles(JSON.parse(localStorage.getItem("files") || "[]"));
    load();
    window.addEventListener("storage", load);
    // Responsive listener
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDelete = (id) => {
    const updated = files.filter((f) => f.id !== id);
    localStorage.setItem("files", JSON.stringify(updated));
    setFiles(updated);
  };

  const handleEdit = (id, field, value) => {
    const updated = files.map((f) => {
      if (f.id === id) {
        if (field === "date") {
          const iso = new Date(value).toISOString();
          return { ...f, [field]: iso };
        }
        if (field === "name") {
          // Cambia el id al nuevo nombre
          const newId = `${value}-${f.size.replace(' KB','') * 1024}-${new Date(f.date).getTime()}`;
          return { ...f, name: value, id: newId };
        }
        return { ...f, [field]: value };
      }
      return f;
    });
    localStorage.setItem("files", JSON.stringify(updated));
    setFiles(updated);
  };

  const finishEdit = (id, field) => {
    handleEdit(id, field, editValue);
    setEditCell({ id: null, field: null });
    setEditValue("");
  };

  if (!files.length)
    return <div className="text-gray-500">No hay archivos cargados.</div>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isMobile ? (
              <>
                <TableCell />
                <TableCell>Nombre</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </>
            ) : (
              <>
                <TableCell>Nombre</TableCell>
                <TableCell>Tamaño</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha de carga</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) =>
            isMobile ? (
              <CollapsibleRow
                key={file.id}
                file={file}
                editCell={editCell}
                setEditCell={setEditCell}
                editValue={editValue}
                setEditValue={setEditValue}
                finishEdit={finishEdit}
                onDelete={handleDelete}
              />
            ) : (
              <FullRow
                key={file.id}
                file={file}
                editCell={editCell}
                setEditCell={setEditCell}
                editValue={editValue}
                setEditValue={setEditValue}
                finishEdit={finishEdit}
                onDelete={handleDelete}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}