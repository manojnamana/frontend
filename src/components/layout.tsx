
import { Box } from "@mui/material";
import CollapsibleLibrary from "./Sidebar";

 
export default function Layout({ children }: { children: React.ReactNode }) {

  
  return (
    <Box sx={{ display: 'flex'}}>
        <CollapsibleLibrary />
      <>{children}</>
      </Box>
  );
}