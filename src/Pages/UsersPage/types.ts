export interface UserFormData {
  Email: string
  PhoneNumber: string
  RoleName: string
  confirmPassword: string
  password: string
}

export interface FetchLoginDataResponse {
  userName: string
  roles: string
  access_token: string
  expires_in: number
}
