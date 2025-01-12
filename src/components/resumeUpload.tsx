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
import { Close, West } from "@mui/icons-material";
import { CreateResume } from "@/pages/api/profile";
import { Files } from "lucide-react";



const fileTypes = [ "PDF","DOCX"]

export default function UploadResume({uploadTrue,setUploadTrue,setIsUploadResume}) {
    const [files, setFiles] = useState([]);
    const [open, setOpen] =   useState(false);
    const [loading,setLoading] = useState(false)
    const [message ,setMessage] = useState('')
  


  
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

  const handleUpload = async () => {
    if (files.length > 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("resumes", file);
        });
  
        await CreateResume(formData);
        setOpen(true);
        setUploadTrue(false)
        setIsUploadResume(true)
        setMessage("Resumes Uploaded");
      } catch (error) {
        setOpen(true);
        setMessage((error as Error).message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    else if (files.length === 0){
      setOpen(true);
        setMessage("Please Upload Resume");
    }
  };
  
if(uploadTrue){
  return (
    <Stack>
      <Paper elevation={3} sx={{p:3,display:"flex", flexDirection:"column",gap:2}}>
        <Stack display={"flex"} direction={"row"} justifyContent={"start"} textAlign={"start"}>
          <IconButton onClick={()=>setUploadTrue(false)}><Close/></IconButton>
        </Stack>
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
          <Typography variant="body1"  color="rgb(170 159 159 / 60%)" sx={{display:"flex",alignItems:"center",gap:2,justifyContent:"center"}}>
          <Files/>  No files uploaded yet
          </Typography>
        )}


      </Box>

      <Stack flexDirection={"row"} justifyContent={"end"}>
        
  <Button variant="contained" onClick={handleUpload} disabled = {loading} >Find Relevant Profiles</Button>
</Stack>
      </Paper>
            <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={message === "Resumes Uploaded"?'success':'error'}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {message}
              </Alert>
            </Snackbar>
    </Stack>

  );
}
}
