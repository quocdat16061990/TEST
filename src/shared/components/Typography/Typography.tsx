import React from 'react'
import Typography from '@mui/material/Typography'
import { HeadingProps } from './Typography.type'
import './Typography.scss'

const CustomTypography: React.FC<HeadingProps> = ({ children, text, className, component, variant, ...rest }) => {
  return (
    <Typography text={text} className={className} component={component} variant={variant} {...rest}>
      {children}
    </Typography>
  )
}

export default CustomTypography
