import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import './Login.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'src/store'
import { useNavigate } from 'react-router-dom'
import { loginAccount, registerAccount } from '../authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import message from 'src/constants/message'
import path from 'src/constants/path'
import User from 'src/types/user.type'
import GoogleIcon from 'src/assets/logo.svg'
import Logo from 'src/assets/images/Logo.png'
interface IFormInput {
  username: string
  password: string
}

export default function SignIn() {
  const defaultTheme = createTheme()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInput>()

  const password = watch('password')

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const body = {
      username: data.username,
      password: data.password
    }
    console.log('body', body)

    try {
      const res = (await dispatch(loginAccount(body))) as any
      unwrapResult(res)
      toast.success(message.LOGIN_SUCCESS)

      navigate(path.home)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFF',
            borderRadius: '20px',
            padding: '16px',
            width: '520px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1em'
            }}
          >
            <img src={Logo} style={{ width: '70%' }} alt='Logo' />

            <Typography component='p' variant='h5' sx={{ fontSize: '16px', color: '#EB5757', marginRight: '5px' }}>
              Automate Construction Monitoring
            </Typography>
          </Box>

          <Typography component='h1' variant='h5' sx={{ fontSize: '16px' }}>
            LOGIN
          </Typography>
          <Typography component='h1' variant='h5' sx={{ fontSize: '20px', fontWeight: 'bold', color: '#EB5757' }}>
            Welcome Back
          </Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                padding: '30px'
              }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                label='Email or UserName'
                type='text'
                style={{
                  fontSize: '15px'
                }}
                {...register('username', { required: 'This field is required' })}
              />

              <TextField
                margin='normal'
                required
                fullWidth
                label='Password'
                type='password'
                {...register('password', { required: 'This field is required' })}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Show Password'
                  style={{ fontSize: '14px' }}
                />

                <Link
                  href='#'
                  variant='body2'
                  style={{ fontSize: '12px', textDecoration: 'none', color: '#EB5757', fontWeight: 'bold' }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  marginTop: '20px',
                  padding: '15px',
                  fontSize: '14px',
                  background: '#23B6D8',
                  '&:hover': {
                    background: '#23B6D8'
                  }
                }}
              >
                LOGIN
              </Button>
              <Typography component='h5' variant='h5' sx={{ textAlign: 'center', fontSize: '14px', margin: '10px 0' }}>
                OR
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  background: '#EB5757',
                  '&:hover': {
                    background: '#EB5757'
                  },
                  fontSize: '14px',
                  padding: '10px'
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 16 16'
                  color='#ffffff'
                  width={16}
                  height={16}
                  style={{ marginRight: 5 }}
                >
                  <g clipPath='url(#google_svg__a)'>
                    <path
                      fill='currentColor'
                      d='M15.671 6.545H8.035v3.273h4.328C11.671 12 9.962 12.727 8 12.727a4.726 4.726 0 1 1 3.035-8.346l2.378-2.265A8 8 0 1 0 8 16c4.411 0 8.4-2.909 7.671-9.455Z'
                    />
                  </g>
                  <defs>
                    <clipPath id='google_svg__a'>
                      <path fill='currentColor' d='M0 0h16v16H0z' />
                    </clipPath>
                  </defs>
                </svg>
                <Typography
                  component='h5'
                  variant='h5'
                  sx={{ textAlign: 'center', fontSize: '14px', margin: '10px 0' }}
                >
                  LOGIN WITGH GOOGLE
                </Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
