// @ts-nocheck

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Link, Stack, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRightAlt } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { GetJobsList } from '../api/job';

interface Column {
  id: 'company' | 'role' | 'skills' | 'created_on' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'company', label: 'Company', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 200 },
  { id: 'skills', label: 'Skills', minWidth: 200 },
  { id: 'created_on', label: 'Last updated on', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 200 },
];

export default function Jobs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState([]);

  const router = useRouter();

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await GetJobsList();
        const sortedJobs = response.data.results.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRows(sortedJobs);
        setFilteredRows(sortedJobs);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter(
        (row) =>
          row.company.toLowerCase().includes(query) ||
          row.role.toLowerCase().includes(query) ||
          row.skills.toLowerCase().includes(query) ||
          row.created_on.toLowerCase().includes(query) ||
          row.status.toLowerCase().includes(query)
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
    <Paper elevation={0} sx={{ m: { xs: 1, sm: 2, md: 3, p: 2 }, width: '100%', bgcolor: 'white' }}>
      <Stack
        sx={{
          width: '100%',
          overflowX: 'auto',
          boxShadow: { xs: 1, sm: 2, md: 3 },
          '&::-webkit-scrollbar': { display: 'none' },
          px: 2,
          bgcolor: 'white',
        }}
      >
        <Stack display={'flex'} justifyContent={'space-between'} direction={'row'} alignItems={'center'} p={2}>
          <Typography fontSize={25} fontWeight={'bold'} color="primary">
            Jobs Listing
          </Typography>
          <Stack>
            <Link href="/jobs/create">
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Link>
          </Stack>
        </Stack>

        <Paper
          elevation={3}
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            borderRadius: 1,
            bgcolor: 'white',
          }}
        >
          <Table stickyHeader aria-label="responsive table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const truncatedText = value?.split(' ').slice(0, 20).join(' ');
                      const isTruncated = value?.split(' ').length > 20;

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'company' ? (
                            <Link href={`/jobs/${row.jobId}`} underline="hover">
                              {value}
                            </Link>
                          ) : column.id === 'status' ? (
                            <Stack direction={"row"} gap={4} alignItems={"center"} justifyContent={"space-between"}>
                              <Tooltip title={isTruncated ? value : ''} placement="bottom-start">
                                <Typography textOverflow="inherit">
                                  {truncatedText}
                                  {isTruncated && '...'}
                                </Typography>
                              </Tooltip>
                              <Button variant="outlined" href="/profiles" sx={{ gap: 2 }}>
                                Find Profile
                                <ArrowRightAlt />
                              </Button>
                            </Stack>
                          ) : (
                            value
                          )}
                        </TableCell>
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
