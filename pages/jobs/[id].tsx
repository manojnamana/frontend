import { Job } from '@/types/job'
import { West } from '@mui/icons-material'
import { Button, IconButton, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetJobsListById } from '../api/job'


const DetailView = () => {
  const router = useRouter()
  const { id } = router?.query
  const [data, setData] = useState<Job>()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const checkId = async () => {
      if (typeof id === 'string') {
        try {
          const response = await GetJobsListById(id)
          setData(response[0])
          setLoading(false)
          console.log(response[0].job_description)
        } catch (error) {
          console.error(error)
        }
      }
    }
    checkId()
  }, [id])




  return (

    

    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
      <Stack display={"felx"} flexDirection={"row"}>
        <Button href='/jobs'  sx={{border:1}} >
          <West/>
        </Button>
      </Stack>
      <Typography variant="h4" color="#8257dc" textAlign="center" fontFamily={"serif"} fontWeight="bold" mb={2}>
        Job Details
      </Typography>
      <Paper elevation={3} sx={{p:3,display:"flex", flexDirection:"column",gap:3}}>


            {/* <Stack direction={'row'} gap={2} alignItems={"center"}>
              <Typography fontSize={18} fontWeight="bold">Company:</Typography>
              <Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.company}</Typography>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Role:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.role}</Typography></>
            </Stack> */}
            {loading && <Skeleton  variant="rectangular" height={280} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/>}
           {!loading && (<>
            <Stack >
              
              <><Typography fontSize={18} fontWeight="bold">Job Description:</Typography></>
              <><Typography fontSize={15}  color="rgb(76 78 100 / 87%)">{data?.job_description}</Typography></>
            </Stack>
            {/* <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Skills Required:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.skills}</Typography></>
            </Stack> */}
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Project Experience:</Typography></>
              <><Typography fontSize={15}  color="rgb(76 78 100 / 87%)">{data?.project_experience}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Evaluation Criteria:</Typography></>
              <><Typography fontSize={15}  color="rgb(76 78 100 / 87%)">{data?.evaluation_criteria}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Other Details:</Typography></>
              <><Typography fontSize={15}  color="rgb(76 78 100 / 87%)">{data?.other_details}</Typography></>
            </Stack>
            </>)}


      </Paper>
    </Stack>
  )
}

export default DetailView
