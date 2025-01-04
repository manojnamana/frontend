import { AccountCircleOutlined, MarkunreadOutlined, PhoneOutlined } from '@mui/icons-material'
import West from '@mui/icons-material/West'
import { Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const viewassessmentreportId = () => {
  return (
   <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%' }}>
    <Stack display={"felx"} flexDirection={"row"} mb={2}>
        <Button href='/viewassessmentreport'  sx={{border:1}} >
          <West/>
        </Button>
      </Stack>
    <Paper sx={{p:3}}>
             <Stack display={"flex"} 
                        flexDirection={"row"}
                        gap={2} textAlign={"center"} justifyContent={"space-between"}>
                            <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <AccountCircleOutlined/>John Doe</Typography>
                                           <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <MarkunreadOutlined/>john.doe@example.com</Typography>
                                           <Typography sx={{display:'flex',alignItems:'center',gap:2}}><PhoneOutlined/>123-456-7890</Typography>
                        </Stack>

            <Stack mt={4}  p={2} gap={2}>
                <Typography fontSize={20} fontWeight={"bold"}  textAlign={"center"} color='#8257dc'>Assessment Report</Typography>
<Typography fontSize={15}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum sunt, exercitationem optio magnam explicabo repellendus enim quae dolorum ab consequatur ipsam beatae quis iusto reiciendis ipsa eius, tempora ullam dignissimos cum! At repellat voluptas voluptatum error ex culpa magnam, deleniti sequi ipsa explicabo maiores quis facilis blanditiis exercitationem suscipit aut praesentium. Amet aliquam ab ducimus laboriosam nesciunt illum, vitae blanditiis. Fugit, reiciendis. Laborum nostrum illum aliquid consequatur, possimus odit ad eligendi. Itaque, at exercitationem! Officiis debitis, labore, cumque suscipit quo nihil numquam molestias blanditiis adipisci sequi velit nam ipsa eius mollitia soluta consectetur! Molestiae repellendus consequatur reprehenderit atque tenetur dolore?</Typography>
<Typography fontSize={15}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum sunt, exercitationem optio magnam explicabo repellendus enim quae dolorum ab consequatur ipsam beatae quis iusto reiciendis ipsa eius, tempora ullam dignissimos cum! At repellat voluptas voluptatum error ex culpa magnam, deleniti sequi ipsa explicabo maiores quis facilis blanditiis exercitationem suscipit aut praesentium. Amet aliquam ab ducimus laboriosam nesciunt illum, vitae blanditiis. Fugit, reiciendis. Laborum nostrum illum aliquid consequatur, possimus odit ad eligendi. Itaque, at exercitationem! Officiis debitis, labore, cumque suscipit quo nihil numquam molestias blanditiis adipisci sequi velit nam ipsa eius mollitia soluta consectetur! Molestiae repellendus consequatur reprehenderit atque tenetur dolore?</Typography>

            </Stack>
        </Paper>

   </Stack>
  )
}

export default viewassessmentreportId
