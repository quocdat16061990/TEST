import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { RootState } from './core/redux/store'
import AuthLayout from 'src/layout/AuthLayout'
import path from 'src/shared/constants/path'
import { useSelector } from 'react-redux'
import { Suspense, lazy } from 'react'

const Login = lazy(() => import('src/features/Auth/Login'))
const Register = lazy(() => import('src/features/Auth/Register'))
const Home = lazy(() => import('src/features/Home'))

export default function useRoutesElements() {
  const isAuthenticatedLS = useSelector((state: RootState) => state?.authReducer?.isAuthenticatedLS)

  function RejectedRoute() {
    return !isAuthenticatedLS ? <Outlet /> : <Navigate to={path.login} />
  }

  const routeElement = useRoutes([
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
