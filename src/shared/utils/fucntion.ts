
export const validateRules = {
  firstName: {
    required: "First Name is required"
  },
  lastName: {
    required: "Last Name is required"
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
  },
  username: {
    required: 'Username is required',
    minLength: {
      value: 5,
      message: 'Username must be at minimum 5 characters long'
    },
    maxLength: {
      value: 20,
      message: 'Username must be at maximun 20 characters long'
    }
  },
  phone : {
    required:"Phone is required",
    minLength: {
      value: 10,
      message: 'Username must be at minimum 5 characters long'
    },
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
