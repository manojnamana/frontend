// @ts-nocheck
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { West } from "@mui/icons-material";

const fileTypes = ["DOCX"];

export default function App() {
  const [file, setFile] = useState(null); // Single file
  const [error, setError] = useState(false);

  const handleChange = (newFile) => {
    if (newFile) {
      setFile(newFile); // Replace the current file with the new one
      setError(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleUploadClick = () => {
    if (file) {
      // Implement your upload logic here
      console.log("Uploading file:", file);
    } else {
      setError(true);
    }
  };

  const handleSnackbarClose = () => {
    setError(false);
  };

  return (
    <Stack
      sx={{
        m: { xs: 1, sm: 2, md: 3, p: 2 },
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Stack display="flex" flexDirection="row" mb={2}>
        <Button href="/takeinterview" sx={{ border: 1 }}>
          <West />
        </Button>
      </Stack>
      <Typography
        variant="h4"
        color="#8257dc"
        textAlign="center"
        fontFamily="serif"
        fontWeight="bold"
        mb={2}
      >
        Upload Transcript
      </Typography>
      <Paper elevation={3} sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack display="flex" justifyContent="center" flexDirection="row" width="100%">
          <FileUploader
            multiple={false} // Allow only one file
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </Stack>
        <Box sx={{ mt: 3 }}>
          {file ? (
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <ListItemText primary={file.name} secondary="Document File" />
                <Button
                  variant="outlined"
                  color="primary"
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 2 }}
                >
                  View DOCX
                </Button>
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={removeFile} color="error">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No file uploaded yet
            </Typography>
          )}
          <Stack>
            <Button
              variant="contained"
              onClick={handleUploadClick}
              sx={{ mt: 2 }}
              disabled={!file}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          Please upload a file before proceeding.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
