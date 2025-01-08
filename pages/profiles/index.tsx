import IconifyIcon from '@/src/components/icon'
import { ArrowRightAlt } from '@mui/icons-material'
import { Alert, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, FormControlLabel, FormGroup, IconButton, InputBase, Link, Paper, Skeleton, Snackbar, SnackbarCloseReason, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { use, useState } from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import ProfileRows from '@/utils/Demo/profiles';
import { Profile } from '@/types/profile';
import { GetRelavanentProfile } from '../api/profile';


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
    const [relevantProfiles,setRelevantProfiles] = useState(false);
    const [Dialogopen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false)

    
  const FindRelevant = async()=>{
    setLoading(true)
    try{
      
      const response = await GetRelavanentProfile();
      const profilesData : Profile[] = response.map((prof:any)=>({
        name :prof.name,
        mobile :prof.mobile,
        email:prof.email,
        resume_text:prof.resume_text,
        percentage_matching:prof.percentage_matching,
        status:prof.status,
        actionTaken:"Schedule Interview"
        
      }))
        setRows(profilesData)
        setRelevantProfiles(true)
        setLoading(false)
    }catch(error){

      console.error('Error fetching Profiles:', error);
    }finally{
      setLoading(false)
    }

  }


        const handleClose = (
            event?: React.SyntheticEvent | Event,
            reason?: SnackbarCloseReason,
          ) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);

          };
      const handleDialogClose = ()=>{
            setDialogOpen(false)
          }

  
    const navigate = useRouter()
    const ans = navigate?.query
    
  
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
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%' }}>
    <Paper elevation={3} sx={{display:"flex",flexDirection:"column",p:2,gap:2}}>
        <Stack display={"flex"} flexDirection={"row"} gap={4} >
        <Typography fontSize={18}>TechCorp</Typography>
        <Typography fontSize={18}>Software Engineer</Typography>
        </Stack>
        <Stack display={"flex"} flexDirection={"row"}  gap={2} sx={{justifyContent:"center",alignItems:'center'}}>
        <Button variant="outlined" fullWidth  onClick={()=>{setDialogOpen(true)}} startIcon={<IconifyIcon icon={'mdi:plus'} />} color="primary">
                Upload
              </Button>
            <Button variant='outlined' fullWidth onClick={()=>{setOpen(true)}} >Fetch from Linkedin</Button>
            <Button variant='outlined' fullWidth  sx={{height:38}}> <Checkbox />
              Include resumes</Button>
<Button variant='contained' fullWidth onClick={FindRelevant} >Find Relevant Resumes</Button>
        </Stack>

        

    </Paper>
{loading && (
  <Stack> 
    <Skeleton variant="rectangular" width={210} height={200} />
  </Stack>

)}
{ (relevantProfiles || ans?.w ) &&   <Paper elevation={3} sx={{mt:3}}>
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

            <Paper
            elevation={3}
            sx={{
                maxWidth: '100%',
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                borderRadius:1,
                bgcolor:"white",
                mx:2,mt:6
            }}
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
                        const sechuduleInterview =( row.actionTaken === "Schedule Interview" ) 
                        const truncatedText = value?.split(' ').slice(0, 20).join(' ');
                        const isTruncated = value?.split(' ').length > 20;
                    
                        return (
                            <>
                            {column.id === "resume_text" ?(
                            <TableCell key={column.id} align={column.align}>
                                <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                <Stack maxWidth={400}>
                                <Tooltip title={isTruncated ? value : ''}  placement="bottom-start"  >
                                {/* <Typography textOverflow="inherit">
                                    {truncatedText}
                                    {isTruncated && '...'}
                                </Typography> */}
                                
                                <Chip sx={{gap:2}}  label={'View Resume'}/>
                                
                                </Tooltip>
                                </Stack>
                            
                            </Stack>
                            
                            </TableCell>):

                            (column.id === "actionTaken")&&(sechuduleInterview)  ?

                            ( <TableCell key={column.id} align={column.align}>
                            <Link href='/takeinterview' underline='hover'>
                            {value} 
                            </Link>
                            
                            </TableCell>):( <TableCell key={column.id} align={column.align}>
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
                                        No jobs found.
                                      </TableCell>
                                    </TableRow>)}
                </TableBody>
            </Table>
            </Paper>
            <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>}
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

                <Dialog
        open={Dialogopen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent id="alert-dialog-title" sx={{textTransform:"capitalize"}}>
          {"Upload resumes and get profiles"}
        </DialogContent>
        

        <DialogActions>
          <Button onClick={handleDialogClose}>Disagree</Button>
          <Button onClick={()=>{setDialogOpen(false),navigate.push('profiles/upload')} } >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default Matchedprofiles
