// @ts-nocheck
import IconifyIcon from '@/src/components/icon'
import {  Business, West } from '@mui/icons-material'
import { Alert, Button, Checkbox, Chip, InputBase, Paper, Skeleton, Snackbar, SnackbarCloseReason, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search';
import React, {  useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { Profile } from '@/types/profile';
import { GetRelavanentProfile } from '@/pages/api/profile';

import { Job } from '@/types/job';
import { GetJobsListById } from '@/pages/api/job';
import DialogInterView from '@/src/components/Ui/dialogInterView';
import UploadResume from '@/src/components/resumeUpload';
import { CircleCheckBig, UserRoundCheck } from 'lucide-react';



interface Column {
  id:  'name' | 'mobile' | 'email' | 'role' |'percentage_matching' |'actionTaken' |'interviewTime' ;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Profile Name', minWidth: 200,},
  { id: 'mobile', label: 'Mobile', minWidth: 200 ,},
  { id: 'email', label: 'Email', minWidth: 200,},
  { id: 'role', label: 'Role', minWidth: 200,},
  { id: 'percentage_matching', label: '% Match', minWidth: 200 ,},
  { id: 'interviewTime', label: 'Interview Date&Time', minWidth: 200,},
  { id: 'actionTaken', label: 'Action Taken', minWidth: 200,},
  

 
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "whitesmoke",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    // [theme.breakpoints.up('lg')]: {
    //   width: '20ch',
    // },
  },
}));

const Matchedprofiles = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState<Profile[]>([]);
    const [filteredRows, setFilteredRows] = useState<Profile[]>([]);
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false)
    const [uploadTrue,setUploadTrue] = useState(false)
    const [Dialogopen, setDialogOpen] = useState(false);
    const [inviewDateUpdated,setInviewDateUpdated] = useState(false);
    const [data, setData] = useState<Job>()
    const [textloading,setTextLoading] = useState(true)
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
    const [isUploadResume,setIsUploadResume] = useState(false)
    const navigate = useRouter()

    const ans = navigate?.query
    const jobiId = ans.id 
    

    function formatDateTime(dateTime: string): string {
      const dateObj = new Date(dateTime);
    
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return "not yet scheduled";
      }
    
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    
      return `${year}-${month}-${day}`;
    }
    
    
    
    useEffect(()=>{
      const FindRelevant = async()=>{
        setLoading(true)
        if (typeof jobiId === 'string') {
        try{
          
          const response = await GetRelavanentProfile(jobiId);
          setData(response.job_details)
          setTextLoading(false)
          const profilesData: Profile[] = response.profiles.map((prof: any) => ({
            encrypted_profile_id: prof.encrypted_profile_id.toString(),
            resume_id: prof.resume_id,
            name: prof.name,
            mobile: prof.mobile,
            email: prof.email,
            role: prof.role,
            resume_text: prof.resume_text,
            status: prof.recruitment_profiles?.[0]?.status || "Not Available",
            percentage_matching: prof.recruitment_profiles?.[0]?.matching_percentage || "0%",
            interviewTime: prof.recruitment_profiles?.[0]?.interview_time
              ? formatDateTime(prof.recruitment_profiles[0].interview_time)
              : "Not Scheduled",
            actionTaken: "Schedule Interview",
            recruitment_profiles: prof.recruitment_profiles?.map((recProf: any) => ({
              id: recProf.id,
              job_id: recProf.job_id,
              profile_id: recProf.profile_id,
              status: recProf.status,
              questions: recProf.questions,
              transcript: recProf.transcript,
              interview_feedback: recProf.interview_feedback,
              matching_percentage: recProf.matching_percentage,
              interview_time: recProf.interview_time
                ? formatDateTime(recProf.interview_time)
                : "Not Scheduled",
              interview_link: recProf.interview_link,
            })) || [],
          }));
          
          
          setRows(profilesData);
          setFilteredRows(profilesData);
          
            setLoading(false)
        }
        catch(error){
    
          console.error('Error fetching Profiles:', error);
        }finally{
          setLoading(false)
        }
      }
      }

      FindRelevant()

    },[isUploadResume ,inviewDateUpdated,jobiId])

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);

      };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      )
    );
  };


  const handleOpenDialog = (recruitIDD: string) => {
    setSelectedProfileId(recruitIDD); // Set the selected profile ID
    setDialogOpen(true); // Open the dialog
    
};
  
const aiConcepts =(data?.skills)?.split(',')


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Stack sx={{ width: '100%', overflow: 'hidden','&::-webkit-scrollbar': { display: 'none' }, mt: 4 ,mx:3}}>
            <Stack display={"felx"} flexDirection={"row"} mb={2}>
                    <Button href='/jobs'  sx={{border:1}}  >
                      <West/>
                    </Button>
                  </Stack>
    <Paper elevation={3} sx={{display:"flex",flexDirection:"column",p:2,gap:2}}>

        <Paper >
          <Stack sx={{display:'flex',flexDirection:{md:"row",xs:'column',justifyContent:"space-between",alignItems:"center"}}} >
          <Stack display={"flex"} direction={"row"} alignItems={"center"} m={2} gap={2} >
            <Paper elevation={0} sx={{display:'flex',p:1,gap:2,alignItems:'center'}}>
            <Typography fontFamily={18} color='primary' 
            fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}><Business/>Company :</Typography>
            <Typography fontSize={16}>
              {textloading ? <Skeleton width={100} height={20} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/> : `${data?.job_company_name}`}</Typography>
            </Paper>
          </Stack>

          <Stack display={"flex"} direction={"row"} alignItems={"center"} m={2} gap={2} >
          <Paper elevation={0} sx={{display:'flex',p:1,gap:2,alignItems:'center'}}>
            <Typography fontFamily={18} color='primary' 
            fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}><UserRoundCheck/>Role :</Typography>
            <Typography fontSize={16}>{textloading ? <Skeleton width={100} height={20} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/> : `${data?.role}`}</Typography>
          </Paper>
          </Stack>
          </Stack>

          <Stack display={"flex"} direction={"row"} alignItems={"center"} ml={2} mb={2}  gap={2} >
          <Paper elevation={0} sx={{display:'flex',p:1,gap:2,alignItems:'center'}}>
            <Typography fontFamily={18} color='primary' 
            fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}><CircleCheckBig/>Skills :</Typography>
            <Typography fontSize={16}>
  {textloading ? (
    <Skeleton
      width={100}
      height={20}
      sx={{ bgcolor: "rgb(76 78 100 / 87%)" }}
    />
  ) : (
    aiConcepts.map((concept, index) => (
      <Chip
        key={index}
        label={concept}
        color="rgb(76 78 100 / 87%)"
        variant="filled"
        sx={{
          fontSize: "1rem",
          padding: "5px 10px",
          fontWeight: "bold",
          margin: "3px",
        }}
      />
    ))
  )}
</Typography>

          </Paper>
          </Stack>
        </Paper>
       


        <Stack display={"flex"} flexDirection={{xs:"column",md:"row"}} gap={2} sx={{justifyContent:"center",alignItems:'center'}}>
        <Button variant="outlined" fullWidth  onClick={()=>{setUploadTrue(true)}} startIcon={<IconifyIcon icon={'mdi:plus'} />} color="primary">
                Upload
              </Button>
            <Button variant='outlined' fullWidth onClick={()=>{setOpen(true)}} >Fetch from Linkedin</Button>
            <Button variant='outlined' fullWidth  sx={{height:38}}> <Checkbox />
              Include resumes</Button>
{/* <Button variant='contained' fullWidth onClick={FindRelevant} disabled={relevantProfiles}>Find Relevant Resumes</Button> */}
        </Stack>


       {(typeof jobiId === "string") && (uploadTrue) && <UploadResume uploadTrue={uploadTrue} setUploadTrue ={setUploadTrue} setIsUploadResume={setIsUploadResume} jobId={data?.encrypted_id} /> }

    </Paper>
{loading && (
    <Stack my={2}> 
        <Skeleton variant="rectangular" sx={{bgcolor:"rgb(76 78 100 / 87%)"}} width={'100%'} height={400} />
    </Stack>

    )}
    { (!loading) &&   <Paper elevation={3} sx={{gap:2,p:2,my:2}}>
            {/* <Stack component="form"  direction={'row'} justifyContent={'flex-end'} my={2}>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon  />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={handleSearch}
                        />
                    </Search>
                    </Stack> */}

                <TableContainer

                sx={{boxShadow:2}}
               
                >
                <Table stickyHeader aria-label="responsive table" >
                    <TableHead >
                    <TableRow >
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                        >
                            {column.label}
                            
                        </TableCell>
                        
                        ))}
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredRows.length > 0 
                    &&
                    (
                        filteredRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                        <TableRow hover key={index}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            const getId = row.encrypted_profile_id
                            const recruitIDD = row.recruitment_profiles.map((i)=>i.id)
                            
                            
                            const sechuduleInterview =(( row.actionTaken === "Schedule Interview" ) || ( row.actionTaken === "Reschedule Interview" ) )
                        
                            return (
                              <>
                              {column.id === "name" && (
                                  <TableCell key={column.id} align={column.align}>
                                      <Button sx={{textAlign:'start'}} onClick={() => navigate.push(`/profiles/${getId}`)}>
                                          {value}
                                      </Button>
                                  </TableCell>
                              )}
                          
                              {column.id === "interviewTime" && (
                                  <TableCell key={column.id} align={column.align}>
                                      {value}
                                  </TableCell>
                              )}
                          
                              {column.id === "resume_text" ? (
                                  <TableCell key={column.id} align={column.align}>
                                      <Stack
                                          direction={"row"}
                                          gap={4}
                                          alignItems={"center"}
                                          justifyContent={"space-between"}
                                      >
                                          <Stack maxWidth={400}>
                                              <Chip sx={{ gap: 2 }} label={"View Resume"} />
                                          </Stack>
                                      </Stack>
                                  </TableCell>
                              ) : column.id === "actionTaken" && sechuduleInterview ? (
                                  <TableCell key={column.id} align={column.align}>
                                      <Button onClick={() => handleOpenDialog(recruitIDD)}>
                                          {row.interviewTime ==="not yet scheduled"?value:"Resechudule Interview"}
                                      </Button>
                                  </TableCell>
                              ) : column.id !== "name" &&
                                column.id !== "interviewTime" &&
                                column.id !== "resume_text" ? (
                                  <TableCell key={column.id} align={column.align}>
                                      {value}
                                  </TableCell>
                              ) : null}
                          </>
                          
                                
                            );
                            
                            
                            })}
                            
                            
                        
                        </TableRow>
                        )))}
                        {filteredRows.length <=0 && 
                        (<TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No profiles found.
                                        </TableCell>
                                        </TableRow>)}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                sx={{mt:2}}
                rowsPerPageOptions={[20]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>}
                          
              {selectedProfileId&& <DialogInterView Dialogopen={Dialogopen} setDialogOpen={setDialogOpen} 
                setInviewDateUpdated ={setInviewDateUpdated} profileId={selectedProfileId}  />}
                
             <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    Coming Soon...
                  </Alert>
                </Snackbar>


    </Stack>
  )
}

export default Matchedprofiles
