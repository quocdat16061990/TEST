export interface ButtonMui {
  type: 'submit' | 'button' | 'reset'
  label?: string
  className?: string
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning' | undefined
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}