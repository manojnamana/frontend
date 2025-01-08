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
} from '@mui/material';
import { GetJobsList } from '../api/job';
import { Job } from '@/types/job';

interface Column {
  id: 'job_company_name' | 'role' | 'skills' | 'created_at' | 'active_status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'job_company_name', label: 'Company', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 200 },
  { id: 'skills', label: 'Skills', minWidth: 200 },
  { id: 'created_at', label: 'Last updated on', minWidth: 200 },
  { id: 'active_status', label: 'Status', minWidth: 200 },
];

export default function Jobs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, setRows] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetJobsList();
        const jobs: Job[] = response.results.map((job: any) => ({
          company_name: job.company_details.company_name,
          role: job.role,
          skills: job.skills.join(', '),
          created_on: new Date(job.updated_at).toLocaleDateString(),
          job_status: job.job_status,
        }));
        setRows(jobs);
        setFilteredRows(jobs);
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
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 ,mx:3}}>
      <Stack spacing={2} p={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Jobs Listing
        </Typography>
        {/* <TextField
          variant="outlined"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          sx={{ width: '100%', maxWidth: 400 }}
        /> */}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : (
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
      </Stack>
    </Paper>
  );
}
