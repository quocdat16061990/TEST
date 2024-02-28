import React from 'react'
import { Modal } from '@mui/material'
import { ReusableModalProps } from './Modal.type'
import './Modal.scss'

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  heading,
  children,
  footerContent,
  className
}) => {
  return (
    <Modal
      className={`${className} modal-background`}
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div className='modal-wrapper'>
        {heading && (
          <div className='modal-header' id='modal-title'>
            {heading}
          </div>
        )}
        <div className='modal-content'>{children}</div>
        {footerContent && <div className='modal-footer'>{footerContent}</div>}
      </div>
    </Modal>
  )
}

export default ReusableModal
