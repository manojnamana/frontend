
import {  Button, Chip, InputBase, Link, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, {  useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import ProfileRows from '@/utils/Demo/profiles';
import { Recruit } from '@/types/recruit';
import { GetIntervieScheduledProfiles } from '../api/profile';


interface Column {
  id:  'name' | 'mobile' | 'email' | 'resume_text' |'percentage_matching' |'interviewTime'|'takeInterview';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
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
    const [rows, setRows] = React.useState<Recruit[]>([]);
    const [filteredRows, setFilteredRows] = useState<Recruit[]>([]);
    const [loading,setLoading] = useState(false);

  
    const navigate = useRouter()

        useEffect(()=>{
          const TakeInterview = async()=>{
            setLoading(true)
            try{
              
              const response = await GetIntervieScheduledProfiles();
              const profilesData : Recruit[] = response.map((prof:any)=>({
                name :prof.name,
                mobile :prof.mobile,
                email:prof.email,
                resume_text:prof.resume_text,
                percentage_matching:prof.percentage_matching,
                status:prof.status,
                interviewTime:"2025-18-03",
                takeInterview:"Take InterView",
                encrypted_profile_id:prof.encrypted_profile_id
                
              }))
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
    
          TakeInterview()
    
        },[])
  

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      setFilteredRows(
          rows.filter(
          (row) =>
            row.ProfileId.toLowerCase().includes(query) ||
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
                {filteredRows.length > 0 
                    &&
                (filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                    <TableRow hover  tabIndex={-1} key={index}>
                        {columns.map((column) => {
                        const value = row[column.id] ;
                        const getId = row.encrypted_profile_id
                    
                        return (
                            <>
                            {column.id === "name" && (
                                  <TableCell key={column.id} align={column.align}>
                                      <Button onClick={() => navigate.push(`/profiles/${getId}`)}>
                                          {value}
                                      </Button>
                                  </TableCell>
                              )}
                            {((column.id === "resume_text")||(column.id === 'takeInterview') )?(
                            <TableCell key={column.id} align={column.align}>
                                <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                <Stack maxWidth={400}>
                                {
                                  (column.id === 'takeInterview') ?(
                                    <Link href={`takeinterview/${getId}`} underline='hover'>Take Interview</Link>
                                  ):(<Chip sx={{gap:2}}  label={'View Resume'}/>)
                                }
                                
                                </Stack>
                            
                            </Stack>
                            
                            </TableCell>):
                            (column.id !== "name" && <TableCell key={column.id} align={column.align}>
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
    </Paper>
  )
}

export default TakeInterView
