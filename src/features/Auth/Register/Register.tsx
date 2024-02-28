import MuiButton from 'src/shared/components/Button/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import './Register.scss'
import Box from '@mui/material/Box'
import CustomTypography from 'src/shared/components/Typography/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'src/core/redux/store'
import { useNavigate } from 'react-router-dom'
import { registerAccount } from '../authSlice'
import message from 'src/shared/constants/message'
import path from 'src/shared/constants/path'
import Logo from 'src/assets/images/Logo.png'
import { useState } from 'react'
import { UserRegister } from 'src/core/models/user.type'
import SelectCountry from 'src/shared/components/SelectCountry'
import MaterialUIInput from 'src/shared/components/Input/Input'
import { Paper } from '@mui/material'
import { validateRules } from 'src/shared/utils/fucntion'
export default function Register() {
  const [password, setPassword] = useState<Boolean>(false)
  const defaultTheme = createTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, formState } = useForm<UserRegister>({})

  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    const body = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      confirm_password: data.confirm_password
    }

    try {
      const res = await dispatch(registerAccount(body))
      toast.success(message.LOGIN_SUCCESS)
      navigate(path.login)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Paper className='register'>
      <Box className='register-intro'>
        <Box className='register-title'>
          <div>
            <img src={Logo} alt='Logo' />
          </div>

          <CustomTypography component='p' variant='body1' className='intro'>
            Automate Construction Monitoring
          </CustomTypography>
        </Box>

        <CustomTypography component='p' variant='body1' className='signin'>
          CREATE NEW ACCOUNT
        </CustomTypography>
        <CustomTypography component='p' variant='body1' className='welcome'>
          Build Smart Risk Free
        </CustomTypography>
        <Box className='register-desc'>
          <CustomTypography component='p' variant='body1' className='desc'>
            Understand why Viact is being used on millions of customers everyday
          </CustomTypography>
          <CustomTypography component='p' variant='body1' className='desc'>
            Find out if Viact is the right fit for your business
          </CustomTypography>
          <CustomTypography component='p' variant='body1' className='desc'>
            Get all your questions answered (personally)
          </CustomTypography>
          <CustomTypography component='p' variant='body1' className='desc'>
            Completely risk-free with 14-day free trial and a 30-day money back guarantee!
          </CustomTypography>
        </Box>
      </Box>

      <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
        <MaterialUIInput
          name='firstName'
          control={control}
          type='text'
          label='FirstName'
          rules={validateRules.firstName}
          showText
          className='field'
        />
        <MaterialUIInput
          name='lastName'
          control={control}
          type='text'
          label='Last Name'
          rules={validateRules.lastName}
          showText
          className='field'
        />
        <MaterialUIInput
          name='username'
          control={control}
          type='text'
          label='Username '
          rules={validateRules.username}
          showText
          className='field'
        />
        <MaterialUIInput
          name='email'
          control={control}
          type='text'
          label='Email '
          rules={validateRules.email}
          showText
          className='field'
        />
        <SelectCountry label='Phone' name='phone' control={control} rules={validateRules.phone} />
        <MaterialUIInput
          name='password'
          control={control}
          type={password ? 'text' : 'password'}
          className='field'
          label='Password'
          rules={validateRules.password}
          showText
        />
        <MaterialUIInput
          name='confirmPassword'
          control={control}
          type={password ? 'text' : 'password'}
          className='field'
          label='Confirm Password'
          rules={validateRules.confirmPassword}
          showText
        />

        <Box>
          <FormControlLabel
            control={<Checkbox value='remember' color='error' />}
            label='Show Password'
            className='showPassword'
            onChange={() => setPassword(!password)}
          />
        </Box>
        <MuiButton type='submit' variant='contained' disabled={!formState.isValid}>
          SIGN UP
        </MuiButton>
        <Box className = 'register-text'>
          <CustomTypography component='h5' variant='h5' className='registers'>
            By clicking Sign up or Continue with Google, you agree to viAct’s
            <span className='sing-up'>Terms and Conditions for Free Trial.</span>
          </CustomTypography>

          <CustomTypography component='h5' variant='h5' className='registers'>
            Already have an account?
            <Link to={path.login} className='sing-up'>
              Login
            </Link>
          </CustomTypography>
        </Box>
      </form>
    </Paper>
  )
}
