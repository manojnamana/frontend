
import ProfileRows, { Data } from '@/utils/Demo/profiles'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DetailView = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const checkId = () => {
      const foundData = ProfileRows.find((i) => i.resumeId === id)
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
        Profile Details
      </Typography>
      <Paper elevation={3} sx={{p:3,display:"flex", flexDirection:"column",gap:2}}>


            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <Typography fontSize={18} fontWeight="bold">Name:</Typography>
              <Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.name}</Typography>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Email:</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.email}</Typography></>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"} >
              <><Typography fontSize={18} fontWeight="bold">Mobile :</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.mobile}</Typography></>
            </Stack>
            <Stack direction={'row'} gap={2} alignItems={"center"}>
              <><Typography fontSize={18} fontWeight="bold">Role :</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.role}</Typography></>
            </Stack>
            <Stack  >
              <><Typography fontSize={18} fontWeight="bold">Resume :</Typography></>
              <><Typography fontSize={15} color="rgb(76 78 100 / 87%)">{data?.resume_text}</Typography></>
            </Stack>



      </Paper>
    </Stack>
  )
}

export default DetailView
