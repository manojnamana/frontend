import { AccountCircleOutlined, MarkunreadOutlined, Phone, PhoneOutlined } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const questions = [
  "How would you detect and fix a memory leak in a Node.js application?",
  "Explain how you would design a REST API to handle 10,000 requests per second.",
  "What strategies would you use to prevent SQL injection attacks in a web application?",
  "How do you ensure data consistency in a distributed system with eventual consistency?",
  "Describe how to optimize a query with multiple joins on large datasets in SQL.",
  "What is the difference between optimistic and pessimistic concurrency control, and when would you use each?",
  "How would you design a caching layer for a high-traffic e-commerce website?",
  "Explain how you would implement role-based access control (RBAC) in a microservices architecture.",
  "What approach would you take to handle real-time notifications for millions of users?",
  "How do you manage zero-downtime deployments for a live application?",

];


const Screen6 = () => {
       
  const [isUploaded,setIsUploaded] = useState(false)
      const navigate = useRouter()
    
      const ans = navigate?.query
    

  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
        <Paper sx={{p:3}}>
            <Stack display={"flex"} 
            flexDirection={"row"}
            gap={2} textAlign={"center"} justifyContent={"space-between"}>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <AccountCircleOutlined/>John Doe</Typography>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <MarkunreadOutlined/>john.doe@example.com</Typography>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}><PhoneOutlined/>123-456-7890</Typography>
            </Stack>

            <Stack mt={4}>
              <Paper elevation={3} sx={{p:3,maxHeight:300,overflowY:'auto', '&::-webkit-scrollbar': { display: 'none' },}}>
        {questions.map((i,index)=>(
          <Typography>{index+1}. {i}</Typography>

        ))}

              </Paper>

<Stack direction={"row"} gap={4} mt={4}>
    <Button variant='contained' href='/takeinterview/upload' >Upload Transcript</Button>
    {(isUploaded || ans?.w) &&<Button variant='contained'  >Generate Assessment Report</Button>}
</Stack>
            </Stack>
        </Paper>
    </Stack>
  )
}

export default Screen6
