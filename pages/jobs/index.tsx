import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Stack,
  Typography,
  Button,
  Link,
  Chip,
  Skeleton,
  InputBase,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GetJobsList } from '../api/job';
import { Job } from '@/types/job';
import IconifyIcon from '@/src/components/icon';
import { ArrowRightAlt } from '@mui/icons-material';


interface Column {
  id: 'encrypted_id'|'job_company_name' | 'role' | 'skills' | 'created_at' | 'job_status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
   
  { id: 'encrypted_id', label: 'Job Id', minWidth: 200 },
  { id: 'job_company_name', label: 'Company', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 200 },
  { id: 'skills', label: 'Skills', minWidth: 200 },
  { id: 'created_at', label: 'Last updated on', minWidth: 200 },
  { id: 'job_status', label: 'Status', minWidth: 200 },
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState<Job[]>([]);
  const [loading,setLoading] = useState(true)

  const formatDateTime = (dateTime: string): string => {
    const dateObj = new Date(dateTime);
  
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "not yet scheduled";
    }
  
    // Format date and time
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetJobsList();
        const jobs: Job[] = response.map((job: any) => ({
          job_company_name: job.job_company_name,
          role: job.role,
          skills: job.skills,
          created_at: formatDateTime(job.updated_at),
          job_status: job.job_status,
          encrypted_id:job.encrypted_id,
          decrypted_id :job.decrypted_id
        }));
        setRows(jobs);
        setFilteredRows(jobs);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    setFilteredRows(
      rows.filter((row) => {
        return (
          row.encrypted_id.toLowerCase().includes(query) || // Match encrypted_id
          row.job_company_name.toLowerCase().includes(query) || // Match company name
          row.job_status.toLowerCase().includes(query) || // Match job status
          row.created_at.includes(query) || // Match formatted date
          row.skills.toLowerCase().includes(query) || // Match skills
          row.role.toLowerCase().includes(query) // Match role
        );
      })
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
      {loading && (
    <Stack> 
        <Skeleton variant="rectangular" sx={{bgcolor:"rgb(76 78 100 / 87%)"}} width={'100%'} height={400} />
    </Stack>

    )}
      {!loading &&<Stack spacing={2} p={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Jobs Listing
        </Typography>
        <Stack>
              <Button href="/jobs/create" variant="contained" startIcon={<IconifyIcon icon={'mdi:plus'} />} color="primary">
                Create
              </Button>
          </Stack>
        </Stack>
        <Stack component="form"  direction={'row'} justifyContent={'flex-end'} my={2}>
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
                </Stack>
        <TableContainer sx={{boxShadow:2}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const EncryptedId = row.encrypted_id
                        const DecryptedId = row.decrypted_id
                        
                        return(
                          <>
                          {column.id === "encrypted_id" && (
                            <TableCell key={column.id} align={column.align}>
                              <Link href={`jobs/${DecryptedId}`} underline='hover'>
                              {value}
                              </Link>
                          </TableCell>
                          )}
                          {column.id === "job_status" && (
                            <TableCell key={column.id} align={column.align}>
                              
                              <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                              <Chip sx={{gap:2}}  label={`${value}`}/>
                              <Button variant="outlined" href={`jobs/matchprofile/${DecryptedId}/`} sx={{ gap: 2 }}>
                                Find Matching Profile
                                <ArrowRightAlt />
                              </Button>
                            </Stack>
                              
                          </TableCell>
                          )}
                        {((column.id !== "job_status")&&(column.id !== "encrypted_id" )) &&(<TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>)}
                        </>
                        )
})}
                    </TableRow>
                  ))
              ) : 
              (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
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
  );
}
