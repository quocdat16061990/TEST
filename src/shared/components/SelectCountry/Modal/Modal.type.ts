export interface ReusableModalProps {
  open: boolean
  onClose: () => void
  heading?: string
  children: React.ReactNode
  footerContent?: React.ReactNode
  className?: string
  isAnimate?: boolean
}
