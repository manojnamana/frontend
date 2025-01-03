/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  Stack,
  useMediaQuery,
} from '@mui/material';
import {
  BookOpen,
  FileAudio,
  BrainCircuit,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Calendar,
  Settings,
  Home,
  Users,
  GraduationCap,
  Loader,
} from 'lucide-react';
import { AccountCircle, Logout, People, Work } from '@mui/icons-material';
import Admin from '@/pages/home';
import Jobs from '@/pages/jobs';
import { useRouter } from 'next/router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8257dc',
    },
    secondary: {
      main: '#f97316',
    },
    background: {
      default: '#dee0e0',
      paper: '#ececec',
    },
    text:{
      primary: '#0a0a0a',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// const GradientText = styled(Typography)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #ec4899, #f97316, #3b82f6)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundClip: 'text',
// }));

const NavMenuItem = ({ icon: Icon, label, isActive = false, onClick, hasSubitems = false }) => {
  const theme = useTheme();

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 2,
        mb: 1,
        color: isActive ? 'primary.main' : 'text.secondary',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
        <Icon size={20} />
      </ListItemIcon>
      <ListItemText primary={label} />
      {hasSubitems && (
        <ChevronRight
          size={16}
          style={{
            transform: isActive ? 'rotate(90deg)' : 'none',
            transition: theme.transitions.create('transform'),
          }}
        />
      )}
    </ListItemButton>
  );
};

const CollapsibleLibrary = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const route = useRouter()
  const [activeComponent, setActiveComponent] = useState(`${route.pathname}`); 

  const drawerWidth = isSidebarOpen ? 241 : 241;
  console.log(route.pathname)

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case '/jobs':
        return <Jobs />;
      case '/home':
        return <Admin />;
        case '/profile':
        return <Profile />;
      default:
        return null;
    }
  };



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100%' ,bgcolor:"#efe8fd"}}>
      <Drawer
    variant="permanent"
   sx={{
    width: {lg:drawerWidth,xs:75},
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: {lg:drawerWidth,xs:75},
      boxSizing: 'border-box',
      transition: (theme) =>
        theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      display: 'flex',
      flexDirection: 'column', // Ensures the content stacks vertically
      justifyContent: 'space-between', // Pushes content to top and bottom
      bgcolor:'#11062c'

    },
  }}
>
  <Box>

    <List sx={{ px: 2 }}>
      <NavMenuItem
        icon={Home}
        label={isSmallScreen ? 'Home' : ''}
        isActive={activeComponent === '/home'}
        onClick={() => {setActiveComponent('/home'),route.push('/home')}}
      />
      <NavMenuItem
        icon={Work}
        label={isSmallScreen ? 'Jobs Listing' : ''}
        isActive={activeComponent === '/jobs'}
        onClick={() => {setActiveComponent('/jobs'),route.push('/jobs')}

        }
      />
      <NavMenuItem
        icon={People}
        label={isSmallScreen ? 'Match Profiles' : ''}
        isActive={activeComponent === '/profiles'}
        onClick={() => {setActiveComponent('/profiles'),route.push('/profiles')}

        }
      />
    </List>
  </Box>

  {/* Profile and Settings Section */}
  <Box>
    <Divider />
    <List sx={{ px: 2 }}>
      <NavMenuItem
        icon={AccountCircle}
        label={isSmallScreen ? 'Profile' : ''}
      />
      <NavMenuItem
        icon={Logout}
        label={isSmallScreen ? 'Logout' : ''}
      />
    </List>
  </Box>
      </Drawer>


      {/* <
>
  {renderActiveComponent()}
</> */}

      </Box>
    </ThemeProvider>
  );
};

export default CollapsibleLibrary;