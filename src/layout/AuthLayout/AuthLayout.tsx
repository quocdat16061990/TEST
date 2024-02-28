import { Paper, ThemeProvider, createTheme, Container, CssBaseline } from '@mui/material'
import { Props } from './Auth.type'
import { Outlet } from 'react-router-dom'
import './AuthLayout.scss'

export default function AuthLayout({ children }: Props) {
  const defaultTheme = createTheme()
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className='authLayout' maxWidth = {false}>
        <CssBaseline />
        {children}
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}
