import rows, { Data } from '@/utils/Demo/demo'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DetailView = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const checkId = () => {
      const foundData = rows.find((i) => i.jobId === id)
      if (foundData) {
        setData(foundData)
        console.log(foundData)
      }
    }
    checkId()
  }, [id])

  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
      <Typography variant="h4" color="#8257dc" textAlign="center" fontFamily={"serif"} fontWeight="bold" mb={2}>
        Job Details
      </Typography>
      <Paper elevation={3} sx={{p:3,display:"flex", flexDirection:"column",gap:2}}>


            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <Typography fontSize={18} fontWeight="bold">Company:</Typography>
              <Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.company}</Typography>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Role:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.role}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Job Description:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.job_description}</Typography></>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Skills Required:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.skills}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Project Experience:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.project_experience}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Evaluation Criteria:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.evaluation_criteria}</Typography></>
            </Stack>
            <Stack >
              <><Typography fontSize={18} fontWeight="bold">Other Details:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.other_details}</Typography></>
            </Stack>


      </Paper>
    </Stack>
  )
}

export default DetailView
