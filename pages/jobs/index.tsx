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
} from '@mui/material';
import { GetJobsList } from '../api/job';
import { Job } from '@/types/job';
import IconifyIcon from '@/src/components/icon';
import { ArrowRightAlt } from '@mui/icons-material';

interface Column {
  id: 'job_company_name' | 'role' | 'skills' | 'created_at' | 'job_status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'job_company_name', label: 'Company', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 200 },
  { id: 'skills', label: 'Skills', minWidth: 200 },
  { id: 'created_at', label: 'Last updated on', minWidth: 200 },
  { id: 'job_status', label: 'Status', minWidth: 200 },
];

export default function Jobs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState<Job[]>([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetJobsList();
        const jobs: Job[] = response.map((job: any) => ({
          job_company_name: job.job_company_name,
          role: job.role,
          skills: job.skills,
          created_at: new Date(job.updated_at).toLocaleDateString(),
          job_status: job.job_status,
          encrypted_id:job.encrypted_id
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
        {/* <TextField
          variant="outlined"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          sx={{ width: '100%', maxWidth: 400 }}
        /> */}
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
                        const getId = row.encrypted_id
                        
                        return(
                          <>
                          {column.id === "job_company_name" && (
                            <TableCell key={column.id} align={column.align}>
                              <Link href={`jobs/${getId}`} underline='hover'>
                              {value}
                              </Link>
                          </TableCell>
                          )}
                          {column.id === "job_status" && (
                            <TableCell key={column.id} align={column.align}>
                              
                              <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                              <Chip sx={{gap:2}}  label={`${value}`}/>
                              <Button variant="outlined" href={`jobs/matchprofile/${getId}`} sx={{ gap: 2 }}>
                                Find Profile
                                <ArrowRightAlt />
                              </Button>
                            </Stack>
                              
                          </TableCell>
                          )}
                        {((column.id !== "job_status")&&(column.id !== "job_company_name" )) &&(<TableCell key={column.id} align={column.align}>
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
