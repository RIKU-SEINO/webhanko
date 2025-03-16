export interface SignUpParams {
  email: string
  password: string
  password_confirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  allow_password_change: boolean
  is_admin: boolean
  created_at: Date
  updated_at: Date
}
