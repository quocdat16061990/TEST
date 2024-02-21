import config from 'src/constants/config'

export const validateRules = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 10,
      message: 'Name must be at least 10 characters long'
    }
  },
  price: {
    required: 'Number is required',
    minLength: {
      value: 1,
      message: 'Number is less than 0'
    }
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Number is less than 0'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 10,
      message: 'Password must have more than 10 characters'
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{11,}$/,
      message: 'Password is incorrect'
    }
  },
  confirmPassword: {
    required: 'Please confirm your password',
    validate: (value: any, fields: any) => {
      return value === fields.password || 'Passwords do not match'
    }
  }
}
export function convertISOStringToFormattedDate(dateTimeString: string): string {
  const dateTimeObject = new Date(dateTimeString)

  const year = dateTimeObject.getFullYear()
  const month = String(dateTimeObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateTimeObject.getDate()).padStart(2, '0')

  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}
