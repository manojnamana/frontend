
import { Profile } from '@/types/profile'
import { Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetProfileById } from '../api/profile'

const DetailView = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Profile>()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const checkId = async () => {
      if (typeof id === 'string') {
        try {
          const response = await GetProfileById(id)
          setData(response[0])
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
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

      {loading && <Skeleton  variant="rectangular" height={280} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/>}

      {!loading &&(<>
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
            </>
            )}


      </Paper>
    </Stack>
  )
}

export default DetailView
