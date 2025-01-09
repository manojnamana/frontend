import IconifyIcon from '@/src/components/icon'
import { ArrowRightAlt } from '@mui/icons-material'
import { Button, Checkbox, Chip, FormControlLabel, FormGroup, InputBase, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import ProfileRows from '@/utils/Demo/profiles';


interface Column {
  id: 'resumeId' | 'name' | 'mobile' | 'email' | 'viewResume' |'match' |'status'|'actionTaken'|'assessmentReport' ;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Profile Name', minWidth: 200,},
  { id: 'mobile', label: 'Mobile', minWidth: 200 ,},
  { id: 'email', label: 'Email', minWidth: 200,},
  { id: 'viewResume', label: 'View Resume', minWidth: 200,},
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

const Screen7 = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(ProfileRows);
    const [relevantProfiles,setRelevantProfiles] = React.useState(false);
  
    const navigate = useRouter()
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      setFilteredRows(
          ProfileRows.filter(
          (row) =>
            row.resumeId.toLowerCase().includes(query) ||
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

        <Stack spacing={2} p={2}>
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
                {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                    <TableRow hover  tabIndex={-1} key={index}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        const getId = row.resumeId
                        const truncatedText = value?.split(' ').slice(0, 20).join(' ');
                        const isTruncated = value?.split(' ').length > 20;
                    
                        return (
                            <>
                            {((column.id === "viewResume") ||(column.id === 'assessmentReport') )?(
                            <TableCell key={column.id} align={column.align}>
                                <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                                <Stack maxWidth={400}>
                                <Tooltip title={isTruncated ? value : ''}  placement="bottom-start"  >
                                {/* <Typography textOverflow="inherit">
                                    {truncatedText}
                                    {isTruncated && '...'}
                                </Typography> */}
                                
                                
                                {column.id === "viewResume"?
                                <Chip sx={{gap:2}}  label={'View Resume'}/>
                                :
                                <Link href={`viewassessmentreport/${getId}`} sx={{gap:2}} underline='hover'  >{'View Report'}</Link>
                                }
                                
                                </Tooltip>
                                </Stack>
                            
                            </Stack>
                            
                            </TableCell>):
                            ( <TableCell key={column.id} align={column.align}>
                            {value} 
                            
                            </TableCell>)}
                            </>
                            
                        );
                        
                        
                        })}
                        
                        
                    
                    </TableRow>
                    ))}
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
            </Stack>
    </Paper>
  )
}

export default Screen7
