import { Variant } from '@mui/material/styles/createTypography'

export interface HeadingProps {
  text?: string
  className: string
  component: React.ElementType
  variant: Variant
  children?: React.ReactNode
}
