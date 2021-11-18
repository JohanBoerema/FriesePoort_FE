export interface UserFormData {
  Email: string
  PhoneNumber: string
  RoleName: string
  confirmPassword: string
  password: string
}

export interface UserDataItem {
  Email: string
  Id: string
  IsActive: boolean
  PhoneNumber: string
  RoleId: string
  RoleName: string
  TwoFactorEnabled: boolean
  UserName: string
}

export interface UserRoleItem {
  Id: string
  Name: string
  Permissions: []
}

export interface UpdateUserItem {
  Id: string
  PhoneNumber: string
  RoleName: string
}
