// @ts-nocheck
import React, { useState } from 'react';
import { Grid, Stack, TextField, Typography, Button, Snackbar, Alert, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AutoAwesome, West } from '@mui/icons-material';
import { Save } from 'lucide-react';
import GetDescription from '@/src/components/GetDescription';
import { createJob } from '../api/job';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  roleTitle: Yup.string().required('Role/Title is required'),
  skills: Yup.string().required('Skills are required'),
  projectExperience: Yup.string().required('Project Experience is required'),
  location: Yup.string().required('Location are required'),
  otherDetails: Yup.string(),
  jobDescription: Yup.string(),
  evaluationCriteria: Yup.string(),
});



interface FormData {
    companyName:string
    roleTitle:string
    skills:string
    projectExperience:string
    otherDetails:string
    jobDescription:string
    evaluationCriteria:string
  }
  const defaultValues ={
    companyName: "",
    roleTitle: "",
    skills: "",
    projectExperience: "",
    otherDetails: "",
    jobDescription: "",
    evaluationCriteria: "",
    location:""
  }
const CreateJobDetails = () => {

    const [companyNameDetail,setCompanyName] = useState("")
    const [dis,setDis] = useState(false)
    const [jobDetails,setJobDetails] = useState('')
    const [loading,setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode:'onBlur',
    
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = async (data: FormData) => {
    const {
      companyName,
      roleTitle,
      skills,
      location,
      projectExperience,
      otherDetails,
    } = data;
  
    setLoading(true);
  
    try {
    const jobData =   await createJob({
        company_name: companyName,
        role :roleTitle,
        skills,
        location,
        project_experience:projectExperience,
        other_details: otherDetails,
        linkedin_saved:false
      });

      setJobDetails(jobData);
      console.log(jobData)
      setCompanyName =(companyName)
      setDis(true);
    } catch (error) {
      console.error((error as Error).message);
      setDis(true);
      
    } finally {
      setLoading(false);
    }
  };
  


if (dis){
  return  <GetDescription  jobDetails ={jobDetails}/>
}
else{
  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
      <Stack display={"felx"} flexDirection={"row"}>
              <Button href='/jobs'  sx={{border:1}} >
                <West/>
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
        Enter Job Details
      </Typography>
      <Paper elevation={3} sx={{p:3}}>
      <form >
        <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company Name"
                      fullWidth
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                  )}
                />
              </Grid>
              
          <Grid item xs={12} md={6}>

            {/* <Stack gap={2}>
              <Controller
                name="jobDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Description"
                    disabled = {dis}
                    fullWidth
                    multiline
                    rows={9}
                    error={!!errors.jobDescription}
                    helperText={errors.jobDescription?.message}
                  />
                )}
              />
              <Controller
                name="evaluationCriteria"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled = {dis}
                    label="Evaluation Criteria"
                    multiline
                    rows={9.8}
                    fullWidth
                    error={!!errors.evaluationCriteria}
                    helperText={errors.evaluationCriteria?.message}
                  />
                )}
              />
            </Stack> */}
             <Controller
                  name="roleTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Role/Title"
                      fullWidth
                      error={!!errors.roleTitle}
                      helperText={errors.roleTitle?.message}
                    />
                  )}
                  />
          </Grid>
          <Grid item xs={12} md={6}>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Skills (comma-separated)"
                      fullWidth
                      error={!!errors.skills}
                      helperText={errors.skills?.message}
                    />
                  )}
                />
              </Grid>
          <Grid item xs={12} md={6}>
             <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                  />
          </Grid>
          <Grid item xs={12} md={6}>
                <Controller
                  name="projectExperience"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Project Experience"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.projectExperience}
                      helperText={errors.projectExperience?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="otherDetails"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Other Relevant Details" 
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.otherDetails}
                      helperText={errors.otherDetails?.message}
                    />
                  )}
                />
              </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" mt={4}>
        
 <Button sx={{width:'70%',gap:2}} disabled = {loading}  onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
         <AutoAwesome/>   Generate Job Description
          </Button> 
        </Stack>
      </form>
      </Paper>

    </Stack>
  );
}
};

export default CreateJobDetails;
