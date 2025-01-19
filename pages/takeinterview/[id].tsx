import UploadTRanscript from '@/src/components/Upload/uploadTranscript';
import { AccountCircleOutlined, MarkunreadOutlined, PhoneOutlined, West } from '@mui/icons-material';
import { Button, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GetIntervieQues, GetProfileById, UpdateInterViewQuestions } from '../api/profile';
import { Profile } from '@/types/profile';
import EvaluteMarkDown from '@/src/components/MarkDown/evaluationCriteria';

const TakeAssement = () => {
  const [isUploaded, setIsUploaded] = useState<Boolean>(false);
  const [isUploadTranscript, setIsUploadTranscript] = useState<Boolean>(true);
  const [data, setData] = useState<Profile>();
  const [loading, setLoading] = useState(true);
  const [questionsData, setQuestionsData] = useState('');
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionsUpdated, setQuestionsUpdated] = useState(false);

  const navigate = useRouter();
  const ans = navigate?.query;
  const profileId = ans?.id;
  const recruitId = ans?.recruit;

  useEffect(() => {
    const checkId = async () => {
      if (typeof profileId === 'string') {
        try {
          const response = await GetProfileById(profileId);
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkId();
  }, [profileId]);

  useEffect(() => {
    const fetchInterviewQuestions = async () => {
      if (typeof recruitId === 'string') {
        try {
          const response = await GetIntervieQues(recruitId);
          setQuestionsData(response.recruitment.questions);
          setQuestionLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchInterviewQuestions();
  }, [recruitId, questionsUpdated]);

  // Update isUploadTranscript based on questionsData
  useEffect(() => {
    if (questionsData === "No interview questions found for this recruitment.") {
      setIsUploadTranscript(false);
    } else {
      setIsUploadTranscript(true);
    }
  }, [questionsData]);

  const handleGenerateQuestions = async () => {
    if (typeof recruitId === 'string') {
      try {
        await UpdateInterViewQuestions(recruitId);
        setQuestionsUpdated(!questionsUpdated); // Toggle state to refetch questions
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Stack sx={{ m: { xs: 1, sm: 2, md: 3, p: 2 }, width: '100%' }}>
      <Stack display="flex" flexDirection="row" mb={2}>
        <Button href="/takeinterview" sx={{ border: 1 }}>
          <West />
        </Button>
      </Stack>
      <Paper sx={{ p: 3 }}>
        <Stack display="flex" flexDirection="row" gap={2} textAlign="center" justifyContent="space-between">
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AccountCircleOutlined />
            {loading ? (
              <Skeleton width={100} height={20} sx={{ bgcolor: "rgb(76 78 100 / 87%)" }} />
            ) : (
              data?.name
            )}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MarkunreadOutlined />
            {loading ? (
              <Skeleton width={100} height={20} sx={{ bgcolor: "rgb(76 78 100 / 87%)" }} />
            ) : (
              data?.email
            )}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneOutlined />
            {loading ? (
              <Skeleton width={100} height={20} sx={{ bgcolor: "rgb(76 78 100 / 87%)" }} />
            ) : (
              data?.mobile
            )}
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
            <Typography fontSize={20} textAlign="center" fontWeight="bold" color="primary" mb={3}>
              Interview Questions
            </Typography>

            {questionLoading ? (
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
            ) : questionsData ===
              "No interview questions found for this recruitment." ? (
              <Stack spacing={2}>
                <Typography>
                No interview questions found for this recruitment.
                </Typography>
                <Stack flexDirection="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={handleGenerateQuestions}>
                    Generate
                  </Button>
                </Stack>
              </Stack>
            ) : (
              // <Typography>{questionsData}</Typography>
              <EvaluteMarkDown markdownStr={questionsData} />
            )}
          </Paper>

          <UploadTRanscript
            isUploaded={isUploaded}
            setIsUploaded={setIsUploaded}
            setIsUploadTranscript={setIsUploadTranscript}
            recruitId={recruitId}
          />

          {isUploadTranscript && (
            <Stack direction="row" gap={4} mt={4} >
              <Button variant="contained" onClick={() => {setIsUploaded(true),setIsUploadTranscript(false)}}>
                Upload Transcript
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default TakeAssement;
