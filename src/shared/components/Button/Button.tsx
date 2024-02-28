import Button from '@mui/material/Button'
import { ButtonMui } from './Button.type'
import './Button.scss'

const MuiButton: React.FC<ButtonMui> = ({
  label,
  type,
  className,
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  ...otherProps
}) => {
  return (
    <Button
      className={` btn ${className}`}
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  )
}

export default MuiButton
