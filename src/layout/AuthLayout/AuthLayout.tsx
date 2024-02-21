import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.scss'

interface Props {
  children?: React.ReactNode
  heading?: string
}
export default function AuthLayout({ children }: Props) {
  return (
    <div className='authLayout'>
      <Link to='/'>
      </Link>
     {children}
      <Outlet/>
    </div>
  )
}

