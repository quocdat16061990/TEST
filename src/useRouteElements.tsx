import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { RootState } from './store'
import AuthLayout from 'src/layout/AuthLayout'
import path from 'src/constants/path'
import MainLayout from 'src/layout/MainLayout/MainLayout'
import { useSelector } from 'react-redux'
import { Suspense, lazy } from 'react'

const Login = lazy(() => import('src/features/Auth/Login'))
const Register = lazy(() => import('src/features/Auth/Register'))
const Home = lazy(() => import('src/features/Home'))

export default function useRoutesElements() {
  const isAuthenticatedLS = useSelector((state: RootState) => state?.authReducer?.isAuthenticatedLS)
  const isAuthenticatedSS = useSelector((state: RootState) => state?.authReducer?.isAuthenticatedSS)
  const total = isAuthenticatedLS || isAuthenticatedSS

  function ProtectedRoute() {
    return total ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    return !total ? <Outlet /> : <Navigate to='/' />
  }

  const routeElement = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.home,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])

  return routeElement
}
