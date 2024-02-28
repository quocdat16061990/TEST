import { useState } from 'react'
import { UserLogin } from 'src/core/models/user.type'
import MuiButton from 'src/shared/components/Button/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import './Login.scss'
import Box from '@mui/material/Box'
import CustomTypography from 'src/shared/components/Typography/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'src/core/redux/store'
import { useNavigate } from 'react-router-dom'
import { loginAccount } from '../authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import message from 'src/shared/constants/message'
import path from 'src/shared/constants/path'
import Logo from 'src/assets/images/Logo.png'
import { validateRules } from 'src/shared/utils/fucntion'
import MaterialUIInput from 'src/shared/components/Input/Input'
import { Paper } from '@mui/material'
export default function SignIn() {
  const [password, setPassword] = useState<Boolean>(false)
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<UserLogin>()
  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    const body = {
      username: data.username,
      password: data.password
    }

    try {
      navigate(path.register)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Paper className='login'>
      <Box className='login-heading'>
        <div>
          <img src={Logo} alt='Logo' />
        </div>

        <CustomTypography component='p' variant='body1' className='intro'>
          Automate Construction Monitoring
        </CustomTypography>
      </Box>
      <CustomTypography component='p' variant='body1' className='signin'>
        LOGIN
      </CustomTypography>
      <CustomTypography component='p' variant='body1' className='welcome'>
        Welcome Back
      </CustomTypography>

      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <MaterialUIInput
          type='text'
          name='username'
          label='Email or Username'
          control={control}
          rules={validateRules.username}
        />
        <MaterialUIInput
          className='password'
          type={password ? 'text' : 'password'}
          name='password'
          label='Password'
          control={control}
          rules={validateRules.password}
        />

        <Box className='login-group'>
          <FormControlLabel
            control={<Checkbox value='remember' color='error' />}
            label='Show Password'
            className='showPassword'
            onChange={() => setPassword(!password)}
          />

          <Link to='/forgot-password' className='forgot-password'>
            Forgot password?
          </Link>
        </Box>
        <MuiButton type='submit' variant='contained' className='btn-login'>
          LOGIN
        </MuiButton>
        <CustomTypography component='h5' variant='h5' text='OR' className='utils'>
          OR
        </CustomTypography>
        <MuiButton type='button' variant='contained' className='btn-google'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 16 16'
            color='#ffffff'
            width={16}
            height={16}
            style={{ margin: '5px' }}
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
          LOGIN WITH GOOGLE
        </MuiButton>
        <CustomTypography component='h5' variant='h5' className='text' text='Not on Via Yet' />
        <CustomTypography component='h5' variant='h5' className='registers1'>
          Not on Via yet?
          <Link to={path.register} className='sing-up'>
            Sign Up
          </Link>
          Now
        </CustomTypography>
      </form>
    </Paper>
  )
}
