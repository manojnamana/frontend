// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/system'

const Admin = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center horizontally
        height: '100vh', // Full viewport height
        textAlign: 'center',
        ml:{md:'30%'},
      }}
    >
      <Typography variant='h4' fontFamily={"serif"} color='rgb(76 78 100 / 87%) ' >Welcome to the Admin Dashboard</Typography>
    </Stack>
  )
}

export default Admin
