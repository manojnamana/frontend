import IconifyIcon from '@/src/components/icon'
import { Alert, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, InputBase, InputLabel, Link, Paper, Skeleton, Snackbar, SnackbarCloseReason, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { Profile } from '@/types/profile';
import { GetRelavanentProfile } from '@/pages/api/profile';
import { tree } from 'next/dist/build/templates/app-page';
import { West } from '@mui/icons-material';


interface Column {
  id:  'name' | 'mobile' | 'email' | 'resume_text' |'percentage_matching' |'status'|'actionTaken' ;
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
  { id: 'status', label: 'Status', minWidth: 200,},
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
    const [Dialogopen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(true)



        useEffect(()=>{
        const FindRelevant = async()=>{
            
            try{
                
                const response = await GetRelavanentProfile();
                const profilesData : Profile[] = response.map((prof:any)=>({
                name :prof.name,
                mobile :prof.mobile,
                email:prof.email,
                resume_text:prof.resume_text,
                percentage_matching:prof.percentage_matching,
                status:prof.status,
                actionTaken:"Schedule Interview",
                encrypted_profile_id:prof.encrypted_profile_id
                
                }))
                setRows(profilesData)
                setFilteredRows(profilesData)
                setLoading(false)
            }catch(error){
                 console.error('Error fetching Profiles:', error);
            }

            }

            FindRelevant()

        })
    



        const handleClose = (
            event?: React.SyntheticEvent | Event,
            reason?: SnackbarCloseReason,
            ) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
            setDialogOpen(false)

            };
        const handleDialogClose = ()=>{
                setDialogOpen(false)
            }

  
        const navigate = useRouter()


          // Get today's date in 'yyyy-MM-dd' format for the `min` attribute
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Get the current time in 'HH:mm' format for the `min` attribute
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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

    {loading && (
    <Stack> 
        <Skeleton variant="rectangular" sx={{bgcolor:"rgb(76 78 100 / 87%)"}} width={'100%'} height={400} />
    </Stack>

    )}
    { (!loading) &&   <Paper elevation={3} sx={{gap:2,p:2}}>
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
                    &&(
                        filteredRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                        <TableRow hover key={index}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            const getId = row.encrypted_profile_id
                            const sechuduleInterview =(( row.actionTaken === "Schedule Interview" ) || ( row.actionTaken === "Reschedule Interview" ) )
                        
                            return (
                                <>
                                {column.id === "name" && (
                                <TableCell key={column.id} align={column.align}>
                                  <Button  onClick={()=>{navigate.push(`/profiles/${getId}`)}}>{value}</Button>
                                  {/* <Link href={`profiles/${getId}`} underline='hover'>
                                  {value}
                                  </Link> */}
                              </TableCell>
                              )}
                                {(column.id === "resume_text" || column.id === "status") ?(
                                <TableCell key={column.id} align={column.align}>
                                    <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                    <Stack maxWidth={400}>
                                    
                                    
                                    {column.id === "status"?<Chip sx={{gap:2}}  label={`${value}`}/>:<Chip sx={{gap:2}}  label={'View Resume'}/>}

                                    </Stack>
                                
                                </Stack>
                                
                                </TableCell>):

                                (column.id === "actionTaken")&&(sechuduleInterview)  ?

                                ( <TableCell key={column.id} align={column.align}>
                                <Button onClick={()=>{setDialogOpen(true)}} >
                                {value} 
                                </Button>
                                
                                </TableCell>):( (column.id !== "name") && 
                                 <TableCell key={column.id} align={column.align}>
                                {value} 
                                
                                </TableCell>)
                                }
                                </>
                                
                            );
                            
                            
                            })}
                            
                            
                        
                        </TableRow>
                        )))}
                        {filteredRows.length <=0 && 
                        (<TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No jobs found.
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

                <Dialog
        open={Dialogopen}
        onClose={handleDialogClose}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const date = formJson.Date;
            const time = formJson.Time;
            console.log({ date, time });
            navigate.push('/takeinterview')
          },
        }}
      >
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          {/* Date Field */}
          <InputLabel sx={{mt:2}}>Date</InputLabel>
          <TextField
            autoFocus
            required
            margin="dense"
            id="date"
            name="Date"
            
            type="date"
            fullWidth
            variant="outlined"
            InputProps={{
              inputProps: {
                min: getTodayDate(), // Set minimum date to today
              },
            }}
          />
          {/* Time Field */}
          <InputLabel sx={{mt:2}}>Time</InputLabel>

          <TextField
            required
            margin="dense"
            id="time"
            name="Time"
           
            type="time"
            fullWidth
            variant="outlined"
            InputProps={{
              inputProps: {
                min: getCurrentTime(), // Set minimum time to current time
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Sechudule</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default Matchedprofiles
