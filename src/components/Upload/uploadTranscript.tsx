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
import { CreateAssessmetReport } from "@/pages/api/profile";
import { Close } from "@mui/icons-material";
import { Files } from "lucide-react";

const fileTypes = ["DOCX"];

export default function UploadTRanscript({isUploaded,setIsUploaded,setIsUploadTranscript,recruitId}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading,setLoading] = useState(false)
  const [showAssessment,setShowAssessment] = useState(false)
  const [assessmentData,setAssessmentData] = useState<String |null>(null)

  const handleChange = (newFile:any) => {
    if (newFile) {
      setFile(newFile); // Replace the current file with the new one
      setError(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("attachment", file);
       const response =  await CreateAssessmetReport(formData,recruitId);
        setIsUploaded(false)
        setIsUploadTranscript(true)
        setShowAssessment(true)
        setAssessmentData(response?.assessmet_report)
      } catch (error) {
        console.error(error);
        setIsUploaded(false)
        
        setShowAssessment(true)
      } finally {
        setLoading(false);
      }
    }
    else if (!file){
      setError(true);
        
    }
  };

  const handleSnackbarClose = () => {
    setError(false);
  };

  if(isUploaded){
  return (
    <>

      <Paper elevation={3} sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2,mt:3 }}>
         <Stack display={"flex"} direction={"row"} justifyContent={"start"} textAlign={"start"}>
                  <IconButton onClick={()=>setIsUploaded(false),setIsUploadTranscript(true)}><Close/></IconButton>
                </Stack>
        <Stack display="flex" justifyContent="center" flexDirection="row" width="100%">
          <FileUploader
            multiple={false} 
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </Stack>
        <Box sx={{ mt: 3 }}>
          {file ? (
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <ListItemText primary={file?.name} secondary="Document File" />
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
            <Typography variant="body1"  color="rgb(170 159 159 / 60%)" sx={{display:"flex",alignItems:"center",gap:2,justifyContent:"center"}}>
          <Files/>  No files uploaded yet
          </Typography>
          )}
          <Stack flexDirection={"row"} justifyContent={"end"}>
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              Generate Assessment Report
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          Please Upload File
        </Alert>
      </Snackbar>
    </>
  
  );
}

if(showAssessment){
    return (
           <Paper sx={{p:3,my:3}}>
                    <Stack gap={2}>
          <Typography fontSize={20} fontWeight={"bold"}  textAlign={"center"} color='#8257dc'>Assessment Report</Typography>
        <Typography fontSize={15}>{assessmentData}</Typography>
        
                    </Stack>
                </Paper>
    )
}
}
