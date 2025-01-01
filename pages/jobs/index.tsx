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
import rows from '../../utils/Demo/demo';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowRightAlt } from '@mui/icons-material';
import { useRouter } from 'next/router';


interface Column {
  id: 'company' | 'role' | 'skills' | 'project_experience' | 'other_details' | 'job_description' | 'evaluation_criteria';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'company', label: 'Company', minWidth: 200 ,},
  { id: 'role', label: 'Role', minWidth: 200,},
  { id: 'skills', label: 'Skills', minWidth: 200 ,},
  { id: 'job_description', label: 'Job Description', minWidth: 200,},

 
];

// interface Data {
//   company: string;
//   role: string;
//   skills: string;
//   project_experience: string;
//   other_details: string;
//   job_description: string;
//   evaluation_criteria: string;,
// }

// function createData(
//   company: string,
//   role: string,
//   skills: string,
//   project_experience: string,
//   other_details: string,
//   job_description: string,
//   evaluation_criteria: string
// ): Data {
//   return { company, role, skills, project_experience, other_details, job_description, evaluation_criteria };
// }

// const rows = [
//   createData(
//     'TechCorp',
//     'Software Engineer',
//     'JavaScript, React, Node.js',
//     'Built a scalable web application.',
//     'Remote-friendly, Flexible hours.',
//     'Develop and maintain web applications.',
//     'Code quality, Problem-solving, Team collaboration.'
//   ),
//   createData(
//     'DataSolutions',
//     'Data Analyst',
//     'Python, SQL, Tableau',
//     'Analyzed sales data to increase revenue.',
//     'Hybrid role, Full-time.',
//     'Analyze and visualize business data.',
//     'Accuracy, Analytical thinking, Communication.'
//   ),
//   createData(
//     'Innovatech',
//     'Project Manager',
//     'Leadership, Agile, JIRA',
//     'Managed a cross-functional team for product delivery.',
//     'On-site, Leadership role.',
//     'Oversee project timelines and deliverables.',
//     'Leadership, Time management, Risk assessment.'
//   ),
// ];

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
  const [filteredRows, setFilteredRows] = React.useState(rows);

  const navigate = useRouter()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter(
        (row) =>
          row.company.toLowerCase().includes(query) ||
          row.role.toLowerCase().includes(query) ||
          row.skills.toLowerCase().includes(query) ||
          row.evaluation_criteria.toLowerCase().includes(query) ||
          row.job_description.toLowerCase().includes(query) || 
          row.project_experience.toLowerCase().includes(query) ||
          row.other_details.toLowerCase().includes(query)
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
            Jobs
          </Typography>
          <Stack >
            <Link href="/jobs/create">
              <Button variant="contained" startIcon={<IconifyIcon icon={'mdi:plus'} />} color="primary">
                Create
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const getId = row.jobId
                      const truncatedText = value?.split(' ').slice(0, 20).join(' ');
                      const isTruncated = value?.split(' ').length > 20;
                  
                      return (
                        <>
                        {column.id === "job_description" ?(
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
                          <Button variant='outlined' sx={{gap:2}} onClick={()=>{navigate.push(`jobs/${getId}`)}} >View Details{<ArrowRightAlt/>}</Button>
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
