import UploadTRanscript from '@/src/components/Upload/uploadTranscript';
import { AccountCircleOutlined, MarkunreadOutlined, Phone, PhoneOutlined, West } from '@mui/icons-material';
import { Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CreateInterViewQuestions, GetIntervieQues, GetProfileById } from '../api/profile';
import { Profile } from '@/types/profile';

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


const TakeAssement = () => {
       
  const [isUploaded,setIsUploaded] = useState<Boolean>(false)
  const [isUploadTranscript,setIsUploadTranscript]= useState<Boolean>(false)
  const [data, setData] = useState<Profile>()
  const [loading,setLoading] = useState(true)
  const [questionsData,setQuestionsData] = useState([])
  const [questionLoading,setQuestionLoading] = useState(true)
  const [questionsUpdated,setQuestionsUpdated] = useState(false)

  const navigate = useRouter()
    
      const ans = navigate?.query
      const recruitId = ans?.id

        useEffect(() => {
          const checkId = async () => {
            if (typeof recruitId === 'string') {
              try {
                const response = await GetProfileById(recruitId)
                setData(response)
                setLoading(false)
              } catch (error) {
                console.error(error)
              }
            }
          }
          checkId()
        }, [recruitId])

        useEffect(() => {
          const GetIntervieQuestions = async () => {
            if (typeof recruitId === 'string') {
              try {
                const response = await GetIntervieQues(recruitId)
                setQuestionsData(response.inter_view_questions)
                setQuestionLoading(false)
              } catch (error) {
                console.error(error)
              }
            }
          }
          GetIntervieQuestions()
        }, [recruitId,questionsUpdated])
        
        const handleGenerateQuestions = async()=>{
          if (typeof recruitId === 'string') {
            try {
              await CreateInterViewQuestions(recruitId)
              setQuestionsUpdated(true)

            } catch (error) {
              console.error(error)
            }
          }

        }

  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3 ,p:2,}, width: '100%',}}>
      <Stack display={"felx"} flexDirection={"row"} mb={2}>
        <Button href='/takeinterview'  sx={{border:1}} >
          <West/>
        </Button>
      </Stack>
        <Paper sx={{p:3}}>
            <Stack display={"flex"} 
            flexDirection={"row"}
            gap={2} textAlign={"center"} justifyContent={"space-between"}>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <AccountCircleOutlined/>
                {loading ? <Skeleton width={100} height={20} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/> : `${data?.name}`}</Typography>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}> <MarkunreadOutlined/>
                {loading ? <Skeleton width={100} height={20} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/> : `${data?.email}`}
                </Typography>
                <Typography sx={{display:'flex',alignItems:'center',gap:2}}><PhoneOutlined/>
                {loading ? <Skeleton width={100} height={20} sx={{bgcolor:"rgb(76 78 100 / 87%)"}}/> : `${data?.mobile}`}
                </Typography>
            </Stack>

            <Stack mt={4}>
  <Paper
    elevation={3}
    sx={{
      p: 3,
      maxHeight: 300,
      overflowY: 'auto',
      '&::-webkit-scrollbar': { display: 'none' },
    }}
  >
    <Typography
      fontSize={20}
      textAlign="center"
      fontWeight="bold"
      color="primary"
      mb={3}
    >
      Interview Questions
    </Typography>

    {questionLoading && (
      <Stack my={2}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: 'rgb(76 78 100 / 87%)',
            minHeight: 200,
            maxHeight: 400,
          }}
          width="100%"
        />
      </Stack>
    )}

    {!questionLoading &&
      questionsData?.map((item: string) => {
        if (item === "Questions not yet generated, click on generate to generate interview question.") {
          // Set isUploadTranscript to false if the specific message is found
          
          return (
            <Stack key={item}>
              <Typography>
                Questions not yet generated, click on generate to generate interview question.
              </Typography>
              <Stack flexDirection="row" justifyContent="end">
                <Button
                  variant="contained"
                  onClick={handleGenerateQuestions}
                  sx={{ mt: 2 }}
                >
                  Generate
                </Button>
              </Stack>
            </Stack>
          );
        }
        setIsUploadTranscript(true);
        return <Typography key={item}>{item}</Typography>;
      })}
  </Paper>

  <UploadTRanscript
    isUploaded={isUploaded}
    setIsUploaded={setIsUploaded}
    setIsUploadTranscript={setIsUploadTranscript}
    recruitId={recruitId}
  />

  {isUploadTranscript && (
    <Stack direction="row" gap={4} mt={4}>
      <Button variant="contained" onClick={() => setIsUploaded(true)}>
        Upload Transcript
      </Button>
    </Stack>
  )}
</Stack>

        </Paper>
    </Stack>
  )
}

export default TakeAssement
