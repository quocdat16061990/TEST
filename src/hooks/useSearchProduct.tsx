import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import path from 'src/constants/path'
import { createSearchParams } from 'react-router-dom'
import { RootState, useAppDispatch } from 'src/store'
import { useSelector } from 'react-redux'
import { logout } from 'src/pages/Auth/authSlice'
import useDebounce from './useDebounce'
interface FormData {
  searchTerm: string
}
export default function useSearchProducts() {
  const dispatch = useAppDispatch()
  const queryConfig = useQueryConfig()
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticatedLS)
  const { register, handleSubmit, setValue, control } = useForm<FormData>()
  const navigate = useNavigate()
  useEffect(() => {
    setValue('searchTerm', queryConfig.searchTerm || '')
  }, [queryConfig, setValue])

  const onSubmitSearch = handleSubmit((data: any) => {
    console.log('data: ', data)
    const config = {
      ...queryConfig,
      searchTerm: data.searchTerm
    }
    setTimeout(() => {
      navigate({
        pathname: path.home,
        search: createSearchParams(config).toString()
      })
    }, 1000)
  })
  const hadleLogout = () => {
    if (isAuthenticated) {
      dispatch(logout(isAuthenticated))
    }
  }
  return { onSubmitSearch, register, hadleLogout, control }
}
