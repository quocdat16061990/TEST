import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'src/store'
import { useNavigate } from 'react-router-dom'
import { registerAccount } from '../authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import message from 'src/constants/message'
import path from 'src/constants/path'
import User from 'src/types/user.type'
import Logo from 'src/assets/logo.svg'
interface IFormInput {
  username: string
  firstName: string
  lastName: string
  password: string
  confirm_password?: string
  email: string
  phone: string
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
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone
    }
    console.log('body', body)

    try {
      const res = (await dispatch(registerAccount(body))) as any
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
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Typography component='h1' variant='h5'>
            Welcome Back
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='firstName'
              label='First Name'
              {...register('firstName', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Last Name'
              type='text'
              {...register('lastName', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='User Name'
              type='text'
              {...register('username', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email'
              type='text'
              {...register('email', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Phone'
              type='text'
              {...register('phone', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              {...register('password', { required: 'This field is required' })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Confirm Password'
              type='password'
              {...register('confirm_password', {
                required: 'This field is required',
                validate: (value) => value === password || 'Passwords do not match'
              })}
            />
            <Grid container display='flex' justifyContent='space-between' sx={{ mt: 1, mb: 2 }}>
              <Grid item>
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Show Password' />
              </Grid>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              SIGN UP
            </Button>
            <Typography component='h5' variant='h5'>
              OR
            </Typography>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              <img src={Logo} alt='' />
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
