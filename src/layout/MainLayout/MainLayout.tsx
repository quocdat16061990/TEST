import { Outlet } from 'react-router-dom'

import './MainLayout.scss'

interface Props {
  children?: React.ReactNode
  heading?: string
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='mainLayout'>
   
      <div className='mainBody'>
      
        <div className='mainContent'>
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
