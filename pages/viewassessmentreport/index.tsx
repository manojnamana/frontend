
import { AppBar, Button, Checkbox, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, InputBase, Link, List, ListItemButton, ListItemText, Paper, Skeleton, Slide, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Recruit } from '@/types/recruit';
import { GetAssementReportAssignedProfiles } from '../api/profile';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Profile } from '@/types/profile';
import { useRouter } from 'next/router';
import EvaluteMarkDown from '@/src/components/MarkDown/evaluationCriteria';


interface Column {
  id:  'job_id'|'name' | 'mobile' | 'email' | 'resume_text'|'assessmentReport' ;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'job_id', label: 'Job Id', minWidth: 200,},
  { id: 'name', label: 'Profile Name', minWidth: 200,},
  { id: 'mobile', label: 'Mobile', minWidth: 200 ,},
  { id: 'email', label: 'Email', minWidth: 200,},
  { id: 'resume_text', label: 'View Resume', minWidth: 200,},
  { id: 'assessmentReport', label: 'Assessment Report', minWidth: 200,},
 
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Screen7 = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen,setDialogOpen] = useState(false);
    const [rows, setRows] = React.useState<Profile[]>([]);
    const [filteredRows, setFilteredRows] = useState<Profile[]>([]);
    const [loading,setLoading] = useState(false);
    const navigate = useRouter()

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
      const AssementReport = async()=>{
        setLoading(true)
        try{
          
          const response = await GetAssementReportAssignedProfiles();
          console.log(response)
          const profilesData = response.map((item: any) => {
            const prof = item.profile;
            const recProfiles = prof.recruitment_profiles;
          
            return {
              encrypted_profile_id: prof.encrypted_profile_id?.toString(),
              resume_id: prof.resume_id,
              name: prof.name,
              mobile: prof.mobile,
              email: prof.email,
              role: prof.role,
              resume_text: prof.resume_text,
              status: recProfiles?.[0]?.status || "Not Available",
              job_id :prof.recruitment_profiles?.[0]?.job_id,
              percentage_matching: recProfiles?.[0]?.matching_percentage || "0%",
              interviewTime: prof.recruitment_profiles?.[0]?.interview_time
              
          ? formatDateTime(prof.recruitment_profiles[0].interview_time)
          : "Not Scheduled",
              actionTaken: "Schedule Interview",
              recruitment_profiles: recProfiles?.map((recProf: any) => ({
                id: recProf.id,
                job_id: recProf.job_id,
                profile_id: recProf.profile_id,
                status: recProf.status,
                questions: recProf.questions,
                transcript: recProf.transcript,
                interview_feedback: recProf.interview_feedback,
                matching_percentage: recProf.matching_percentage,
                interviewTime: prof.recruitment_profiles?.[0]?.interview_time
          ? formatDateTime(prof.recruitment_profiles[0].interview_time)
          : "Not Scheduled",
                interview_link: recProf.interview_link,
              })) || [],
            };
          });
            setRows(profilesData)
            setFilteredRows(profilesData)
            setLoading(false)
        }
        catch(error){
          
    
          console.error('Error fetching Profiles:', error);
        }finally{
          setLoading(false)
        }
    
      }

      AssementReport()

    },[])
      
  
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      setFilteredRows(
          rows.filter(
          (row) =>
            row.encrypted_profile_id.toLowerCase().includes(query) ||
            row.name.toLowerCase().includes(query) ||
            row.mobile.toLowerCase().includes(query) ||
            row.email.toLowerCase().includes(query) 
  
        )
      );
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleClose = ()=>{
      setDialogOpen(false)
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden','&::-webkit-scrollbar': { display: 'none' }, mt: 4 ,mx:3}}>

{loading && (
    <Stack m={2}> 
        <Skeleton variant="rectangular" sx={{bgcolor:"rgb(76 78 100 / 87%)"}} width={'100%'} height={400} />
    </Stack>

    )}
       {!loading && <Stack spacing={2} p={2}>
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

            <TableContainer sx={{boxShadow:2}}
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
                {filteredRows.length >0 && 
                (filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                    <TableRow hover  tabIndex={-1} key={index}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        const getId = row.assessmentReport
                        const profileId = row.encrypted_profile_id
                        const jobID = row.job_id
                        // const truncatedText = value?.split(' ').slice(0, 20).join(' ');
                        // const isTruncated = value?.split(' ').length > 20;
                    
                        return (
                            <>
                             {(column.id === "name" || column.id ==='job_id')&& (
                                                              <TableCell key={column.id} align={column.align}>
                                                                 {column.id !=="job_id" ? <Button onClick={() => navigate.push(`/profiles/${profileId}/`)}>
                                                                      {value}
                                                                  </Button> : <Button onClick={() => navigate.push(`/jobs/${jobID}/`)}>
                                                                      {value}
                                                                  </Button> }
                                                              </TableCell>
                                                          )}
                            {((column.id === "resume_text") ||(column.id === 'assessmentReport') )?(
                            <TableCell key={column.id} align={column.align}>
                                <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                <Stack maxWidth={400}>
                                <Tooltip title={ value }  placement="bottom-start"  >
                                {/* <Typography textOverflow="inherit">
                                    {truncatedText}
                                    {isTruncated && '...'}
                                </Typography> */}
                                
                                
                                {column.id === "resume_text"?
                                <Chip sx={{gap:2}}  label={'View Resume'}/>
                                :
                                <Button onClick={()=>setDialogOpen(true)} sx={{gap:2}}   >{'View Report'}</Button>
                                }
                                
                                </Tooltip>
                                </Stack>
                            
                            </Stack>
                            
                            </TableCell>):
                            ((column.id !== "name" && column.id !== "job_id") && <TableCell key={column.id} align={column.align}>
                                                        {value} 
                                                        
                                                        </TableCell>)}
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
            rowsPerPageOptions={[20]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Stack>}


            <Dialog
        fullWidth
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

<DialogTitle id="responsive-dialog-title">
  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <Typography color='primary' fontWeight={"bold"}>Assessment Report</Typography>
       <Stack display={"flex"} direction={"row"} justifyContent={"start"} textAlign={"start"}>
                        <IconButton onClick={()=>setDialogOpen(false)}><Close/></IconButton>
                      </Stack>
  </Stack>
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Typography>
          {filteredRows.map((i)=>i.recruitment_profiles.map((i)=>((typeof i.interview_feedback)==="string" &&<EvaluteMarkDown markdownStr={i.interview_feedback} />)))}
        </Typography>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </Paper>
  )
}

export default Screen7
