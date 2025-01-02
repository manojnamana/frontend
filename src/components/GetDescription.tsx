import { AutoAwesome } from '@mui/icons-material'
import { Stack, Typography, Paper, TextField, Button, Snackbar, Alert,Grid, SnackbarCloseReason } from '@mui/material'
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Linkedin, Save } from 'lucide-react';
import React from 'react'


const validationSchema2 = Yup.object().shape({
    jobDescription: Yup.string().required('Job Description is required'),
    evaluationCriteria: Yup.string().required('Evaluation Criteria is required'),
  });

  interface FormData {

    jobDescription:string
    evaluationCriteria:string
  }
  const defaultValues ={
    jobDescription: '',
    evaluationCriteria: '',

  }


const GetDescription = ({companyName}:any) => {
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

        const {
          handleSubmit,
          control,
          formState: { errors },
        } = useForm({
          defaultValues,
          mode:'onBlur',
          
          resolver: yupResolver(validationSchema2),
        });
    const onSave = (data :FormData) => {
        console.log('Form Values:', data);
        setOpen(true)
      };
  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
    <Typography
      variant="h4"
      color="#8257dc"
      textAlign="center"
      fontFamily="serif"
      fontWeight="bold"
      mb={2}
    >
      {companyName}
    </Typography>
    <Paper elevation={3} sx={{p:3}}>
    <form >
      <Grid container spacing={3}>          
        <Grid item xs={12} >
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Description"
                  fullWidth
                  multiline
                  rows={9}
                  error={!!errors.jobDescription}
                  helperText={errors.jobDescription?.message}
                />
              )}
            />
        </Grid>
        <Grid item xs={12} >
        <Controller
              name="evaluationCriteria"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Evaluation Criteria"
                  multiline
                  rows={9.8}
                  fullWidth
                  error={!!errors.evaluationCriteria}
                  helperText={errors.evaluationCriteria?.message}
                />
              )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
        <Button sx={{gap:2}} fullWidth  onClick={handleSubmit(onSave)} variant="contained" color="primary">
       <Save/>   Save  Description
        </Button> 
        </Grid>
        <Grid item xs={12} md={6}>
        <Button sx={{gap:2}}  fullWidth onClick={handleSubmit(onSave)} variant="contained" color="primary">
       <Linkedin/>   Post On Linkedin
        </Button> 
        </Grid>
      </Grid>

    </form>
    </Paper>
    <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Job Details Uploaded
      </Alert>
    </Snackbar>
  </Stack>
  )
}

export default GetDescription
