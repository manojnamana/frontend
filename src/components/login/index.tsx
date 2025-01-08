import { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Checkbox,
  TextField,
  InputLabel,
  IconButton,
  Box,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Typography,
  Grid,
  Alert,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import Icon from '@/src/components/icon'
import { Login } from '@/pages/api/login'



const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
})



const defaultValues = {
  email: '',
  password: '',
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)
  const [message ,setMessage] = useState('')
  const navigate = useRouter()

  const [open, setOpen] = useState(false);



  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = async(data: FormData) => {
    const { email, password } = data
    setLoading(true)
    try {
      await Login(email,password);
      setMessage("Login Success");
      setOpen(true)
      setTimeout(() => navigate.push("/home"), 100);
    } catch (error) {
      setMessage((error as Error).message);
      setOpen(true)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(#b696f5, #8753EF, #3F0F9F)",
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: 600,
          padding: { xs: 2, sm: 4, md: 6 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid item xs={12}>
          <Typography textAlign={"center"} mb={2} 
          fontWeight={"bold"} fontSize={25} color='rgb(76 78 100 / 87%)'
          >
            Welcome Back!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    placeholder="admin@gmail.com"
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="password" error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id="password"
                    label= 'password'
                    type={showPassword ? 'text' : 'password'}
                   

                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                      </InputAdornment>
                    }
                    error={Boolean(errors.password)}
                  />
                )}
              />
              {errors.password && (
                <FormHelperText error>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 2,
              }}
            >
              <Typography
                variant="body2"
                component={Link}
                href="/forgot-password"
                sx={{ textDecoration: 'none', color: 'black', }}
              >
                Forgot Password?
              </Typography>
            </Box> */}

            <Button type="submit" variant="contained" disabled = {loading} sx={{color:"white",bgcolor:"black"}} fullWidth>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert
    onClose={handleClose}
    severity={message === "Login Success" ? "success" : "error"}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
</Snackbar>
    </Box>
  )
}

export default LoginPage
