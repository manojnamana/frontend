
import {  Button, Chip, InputBase, Link, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, {  useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import ProfileRows from '@/utils/Demo/profiles';
import { Recruit } from '@/types/recruit';
import { GetIntervieScheduledProfiles } from '../api/profile';
import { Profile } from '@/types/profile';


interface Column {
  id: 'job_id'| 'name' | 'mobile' | 'email' | 'resume_text' |'percentage_matching' |'interviewTime'|'takeInterview';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'job_id', label: 'Job ID', minWidth: 200,},
  { id: 'name', label: 'Profile Name', minWidth: 200,},
  { id: 'mobile', label: 'Mobile', minWidth: 200 ,},
  { id: 'email', label: 'Email', minWidth: 200,},
  { id: 'resume_text', label: 'View Resume', minWidth: 200,},
  { id: 'percentage_matching', label: '% Match', minWidth: 200 ,},
  { id: 'interviewTime', label: 'Interview Date and Time', minWidth: 200 ,},
  { id: 'takeInterview', label: 'Take Interview', minWidth: 200 ,},
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

const TakeInterView = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
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
          const TakeInterview = async()=>{
            setLoading(true)
            try{
              
              const response = await GetIntervieScheduledProfiles();
              
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
                  percentage_matching: recProfiles?.[0]?.matching_percentage || "0%",
                  job_id: recProfiles?.[0]?.job_id,
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
              
              console.log(profilesData);
              
                setRows(profilesData)
                console.log(profilesData)
                setFilteredRows(profilesData)
                setLoading(false)
            }
            catch(error){
        
              console.error('Error fetching Profiles:', error);
            }finally{
              setLoading(false)
            }
        
          }
    
          TakeInterview()
    
        },[])
  

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      setFilteredRows(
          rows.filter(
          (row) =>
            row.interviewTime.toLowerCase().includes(query) ||
            row.name.toLowerCase().includes(query) ||
            row.mobile.toLowerCase().includes(query) ||
            row.email.toLowerCase().includes(query) 
  
        )
      );
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden','&::-webkit-scrollbar': { display: 'none' }, mt: 4 ,mx:3}}>



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
                {loading && (
    <Stack m={2}> 
        <Skeleton variant="rectangular" sx={{bgcolor:"rgb(76 78 100 / 87%)"}} width={'100%'} height={400} />
    </Stack>

    )}

           { (!loading) &&  
            <Stack spacing={2} p={2}>
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
                {filteredRows?.length > 0 
                    &&
                (filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                    <TableRow hover  tabIndex={-1} key={index}>
                        {columns.map((column) => {
                        const value = row[column.id] ;
                        const getId = row.encrypted_profile_id
                        const jobID = row.job_id
                        const recruitId = row.recruitment_profiles.map((i)=>(i.id))
                        console.log(recruitId)
                    
                        return (
                            <>
                            {(column.id === "name" || column.id ==='job_id')&& (
                                  <TableCell key={column.id} align={column.align}>
                                     {column.id !=="job_id" ? <Button onClick={() => navigate.push(`/profiles/${getId}/`)}>
                                          {value}
                                      </Button> : <Button onClick={() => navigate.push(`/jobs/${jobID}/`)}>
                                          {value}
                                      </Button> }
                                  </TableCell>
                              )}
                            {((column.id === "resume_text")||(column.id === 'takeInterview') )?(
                            <TableCell key={column.id} align={column.align}>
                                <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                <Stack maxWidth={400}>
                                {
                                  (column.id === 'takeInterview') ?(
                                    <Link href={`takeinterview/${getId}/?recruit=${recruitId}`} underline='hover'>Take Interview</Link>
                                  ):(<Chip sx={{gap:2}}  label={'View Resume'}/>)
                                }
                                
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
                    {filteredRows?.length <=0 && 
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
    </Paper>
  )
}

export default TakeInterView
