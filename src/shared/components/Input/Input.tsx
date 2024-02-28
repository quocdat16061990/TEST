import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { MaterialUITextFieldProps } from './Input.type'
import './Input.scss'
import CustomTypography from '../Typography/Typography'

const MaterialUIInput = ({
  label,
  name,
  control,
  rules,
  type,
  showText,
  className,
  ...rest
}: MaterialUITextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className='form-group'>
          <TextField
            className={`muiInput ${className} ${fieldState?.error ? 'errors MuiOutlinedInput-notchedOutline' : ''} `}
            {...field}
            {...rest}
            variant='outlined'
            type={type}
            label={
              <label>
                {label}
                {showText && <span className='start'> * </span>}
              </label>
            }
            fullWidth
          />

          {fieldState?.error && (
            <CustomTypography component='p' variant='body1' className='error-validate'>
              {fieldState.error.message}
            </CustomTypography>
          )}
        </div>
      )}
    />
  )
}

export default MaterialUIInput
