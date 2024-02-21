import { useForm, SubmitHandler } from 'react-hook-form'
import { RootState, useAppDispatch } from 'src/store'
import { registerAccount } from '../authSlice'
import message from 'src/constants/message'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
interface IFormInput {
  username: string
  fullName: string
  password: string
  confirm_password: string
  email: string
}
export default function useRegister() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const body = {
      username: data.username,
      fullname: data.fullName,
      password: data.password,
      email: data.email
    }
    try {
      const res = await dispatch(registerAccount(body))
      unwrapResult(res)
      toast.success(message.REGISTER_SUCCESS)
      navigate(path.home)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors
  }
}
