export interface UserRegister {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirm_password: string
}
export interface UserLogin
  extends Omit<UserRegister, 'firstName' | 'lastName' | 'email' | 'confirm_password' | 'phone'> {}
