import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Link, Stack, Typography, TextField, Box, InputBase, IconButton, Tooltip } from '@mui/material';
import IconifyIcon from '../../src/components/icon';

import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowRightAlt } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ProfileRows from '@/utils/Demo/profiles';


interface Column {
  id: 'resumeId' | 'name' | 'mobile' | 'email' ;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'resumeId', label: 'Resume id', minWidth: 200 ,},
  { id: 'name', label: 'Name', minWidth: 200,},
  { id: 'mobile', label: 'Mobile', minWidth: 200 ,},
  { id: 'email', label: 'Email', minWidth: 200,},

 
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
export default function Jobs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(ProfileRows);

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
    <Paper elevation={0} sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',bgcolor:"white" }}>

      <Stack 
        sx={{
          width: '100%',
          overflowX: 'auto',
          boxShadow: { xs: 1, sm: 2, md: 3 },
          '&::-webkit-scrollbar': { display: 'none' },
          px:2,
          bgcolor:'white'
         
          
        }}
      >
        <Stack display={'flex'} justifyContent={'space-between'} direction={'row'} alignItems={'center'} p={2}>
          <Typography fontSize={25} fontWeight={'bold'} color='primary'>
            Profiles
          </Typography>
          <Stack >
            <Link href="/profiles/upload">
              <Button variant="contained" startIcon={<IconifyIcon icon={'mdi:plus'} />} color="primary">
                Upload
              </Button>
            </Link>
          </Stack>
        </Stack>
         <Stack component="form"  direction={'row'} justifyContent={'flex-end'} mb={2}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Search>
            </Stack>

        <Paper
        elevation={3}
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            borderRadius:1,
            bgcolor:"white"
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
                        {column.id === "email" ?(
                          <TableCell key={column.id} align={column.align}>
                            <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                              <Stack maxWidth={400}>
                            <Tooltip title={isTruncated ? value : ''}  placement="bottom-start"  >
                              <Typography textOverflow="inherit">
                                {truncatedText}
                                {isTruncated && '...'}
                              </Typography>
                            </Tooltip>
                            </Stack>
                          <Button variant='outlined' sx={{gap:2}} onClick={()=>{navigate.push(`profiles/${getId}`)}} >View Details{<ArrowRightAlt/>}</Button>
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
      </Stack>
    </Paper>
  );
}
