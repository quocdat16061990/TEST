import React from 'react'
import { Controller, useForm, FieldValues } from 'react-hook-form'
import ReactPhoneInput from 'react-phone-input-2'
import './SelectCountry.scss'
import 'react-phone-input-2/lib/style.css'

interface PhoneInputProps {
  label: string
  name: string
  control: any
  rules?: Record<string, any>
}

const SelectCountry: React.FC<PhoneInputProps> = ({ label, name, control, rules }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState }) => (
        <div className='tel-input'>
          <ReactPhoneInput {...field} country={'hk'} countryCodeEditable={false} specialLabel={label} />
          {fieldState?.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  )
}

export default SelectCountry
