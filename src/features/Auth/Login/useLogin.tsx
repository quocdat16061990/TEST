import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'src/store'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import User from 'src/types/user.type'
import { loginAccount, setIsAuthenticateChecked, setIsAuthenticateUnChecked } from '../authSlice'
import message from 'src/constants/message'
import path from 'src/constants/path'
import { useState } from 'react'

export default function useLogin() {
  type UserLogin = Omit<User, 'fullname' | 'email'>
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLogin>()
  const [rememberLogin, setRememberLogin] = useState<Boolean>(false)

  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    const body = {
      username: data.username,
      password: data.password
    }
    try {
      const res = (await dispatch(loginAccount(body))) as any
      unwrapResult(res)
      toast.success(message.LOGIN_SUCCESS)
      if (rememberLogin) {
        dispatch(setIsAuthenticateChecked(true))
      } else {
        dispatch(setIsAuthenticateUnChecked(true))
      }
      navigate(path.home)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleCheckbox = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    setRememberLogin(checked)
  }

  return {
    handleCheckbox,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors
  }
}
