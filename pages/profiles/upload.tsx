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

const fileTypes = ["JPEG","JPG", "PNG", "PDF"]

export default function App() {
  const [files, setFiles] = useState([]);
    const [open, setOpen] = React.useState(false);
  
  
  
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  const handleChange = (newFiles) => {

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };


  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',textAlign:"center",justifyContent:"center"}}>
      <Typography variant="h4" color="#8257dc" textAlign="center" fontFamily={"serif"} fontWeight="bold" mb={2} >
        UPLOAD
      </Typography>
      <Paper elevation={3} sx={{p:3,display:"flex", flexDirection:"column",gap:2}}>
        <Stack display={"flex"} justifyContent={"center"} flexDirection={"row"} width={"100%"}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      </Stack>
      <Box sx={{ mt: 3 }}>
        {files.length > 0 ? (
          <List>
            {files.map((file, index) => (
              <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
                <ListItemText
                  primary={file.name}
                  secondary={file.type.startsWith("image/") ? "Image File" : "Document File"}
                />
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: "50px", height: "auto", marginRight: "10px" }}
                  />
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mr: 2 }}
                  >
                    View PDF
                  </Button>
                )}
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => removeFile(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No files uploaded yet
          </Typography>
        )}
      </Box>
     
      </Paper>
            <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
              >
                You can upload up to 5 files only.
              </Alert>
            </Snackbar>
    </Stack>

  );
}
