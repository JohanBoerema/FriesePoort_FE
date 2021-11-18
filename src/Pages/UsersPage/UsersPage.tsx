import React, { useState } from 'react'
import { DashboardLayout, Template } from 'UI'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'UI/Components'
import { showSlideForm, hideSlideForm, useIsMounted, useAxios, getPaginationData } from 'Lib'
import { AddUser } from './AddUser'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QueryKey } from 'types'
import { UserDataItem, UserRoleItem } from './types'
import { AxiosError } from 'axios'
import { ThreeBounce } from 'better-react-spinkit'
import Sweetalert from 'sweetalert'
import './styles.scss'

export function UsersPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { setSafely } = useIsMounted()
  const [openAddUser, setOpenAddUser] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initUserData, setInitUserData] = useState<UserDataItem[]>([])
  const [userData, setUserData] = useState<UserDataItem[]>([])
  const [editUser, setEditUser] = useState<UserDataItem | undefined>()
  const [userRoles, setUserRoles] = useState<UserRoleItem[]>([])
  const axios = useAxios()

  const getRoleData = async (): Promise<UserDataItem[]> => {
    setSafely(setIsLoading, true)
    const { data } = await axios.get(`/api/Roles`)
    return data
  }

  useQuery(QueryKey.roleData, getRoleData, {
    onSuccess: (data) => {
      setSafely(setUserRoles, data)
    },
  })

  const getUserData = async (): Promise<UserDataItem[]> => {
    setSafely(setIsLoading, true)
    const { data } = await axios.get(`/api/users/GetUsers?excludeActiveUsers=false`)
    return data
  }

  useQuery(QueryKey.usersScreen, getUserData, {
    onSuccess: (data) => {
      setSafely(setIsLoading, false)
      setSafely(setInitUserData, data)
      changePaginationUserData(20, 1, data)
    },
  })

  const changePaginationUserData = (pageSize: number, page: number, initData: UserDataItem[]) => {
    const users = getPaginationData(pageSize, page, initData)
    setSafely(setUserData, users)
  }

  const addUser = () => {
    setSafely(setOpenAddUser, !openAddUser)
    showSlideForm()
  }

  const closeModal = () => {
    setSafely(setEditUser, undefined)
    setSafely(setOpenAddUser, false)
    hideSlideForm()
  }

  const deleteUser = async (userId: string): Promise<void> => {
    let data: any = []
    data = await axios.post(`/api/users/Delete?id=${userId}`)
    return data
  }

  const mutationDeleteUser = useMutation(deleteUser, {
    onSuccess: (data) => {
      Sweetalert(t('Success'), {
        icon: 'success',
      })
      queryClient.refetchQueries([QueryKey.usersScreen])
    },
    onError: (err: AxiosError) => {},
  })

  const userDeleteConfirm = (userId: string) => {
    Sweetalert({
      title: t('Are you sure?'),
      text: t('Do you want to delete this user?'),
      icon: 'warning',
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutationDeleteUser.mutate(userId)
      } else {
      }
    })
  }

  const updateUser = (user: UserDataItem) => {
    setSafely(setEditUser, user)
    setSafely(setOpenAddUser, !openAddUser)
    showSlideForm()
  }

  return (
    <DashboardLayout title={t('Users')}>
      <Template title={t('Users')}>
        <div className="table-container px-4 mt-5">
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center"
              onClick={() => addUser()}
            >
              <i className="fas fa-plus" /> {t('Add User')}
            </button>
          </div>
          <div className="table-responsive mt-4">
            <table id="user-table" className="mb-1 table table-striped">
              <thead>
                <tr>
                  <th>{t('UserName')}</th>
                  <th>{t('Email')}</th>
                  <th>{t('Active')}</th>
                  <th>{t('Action')}</th>
                </tr>
              </thead>
              {userData && !isLoading && (
                <tbody>
                  {userData.map((data: UserDataItem, i: number) => (
                    <tr key={i}>
                      <td>{data.UserName}</td>
                      <td>{data.Email}</td>
                      <td>
                        {data.IsActive ? (
                          <i className="fas fa-check-circle active-icon"></i>
                        ) : (
                          <i className="fas fa-check-circle inactive-icon"></i>
                        )}
                      </td>
                      <td style={{ width: 250 }}>
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => userDeleteConfirm(data.Id)}
                            className="btn btn-outline-secondary btn-sm mx-1"
                          >
                            <i className="fas fa-trash-alt me-2"></i>
                            {t('Delete')}
                          </button>
                          <button
                            onClick={() => updateUser(data)}
                            className="btn btn-outline-secondary btn-sm mx-1"
                          >
                            <i className="fas fa-edit me-2"></i>
                            {t('Edit')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {isLoading && (
              <div
                className="col-md-4 offset-md-4 col-xs-12 text-center loading"
                style={{ textAlign: 'center' }}
              >
                <ThreeBounce size={15} color="#585858" />
              </div>
            )}
          </div>
          <Pagination
            recordNum={initUserData.length}
            getData={(pageSize: number, page: number) =>
              changePaginationUserData(pageSize, page, initUserData)
            }
          />
        </div>
        {openAddUser && (
          <AddUser closeModal={() => closeModal()} editUser={editUser} userRoles={userRoles} />
        )}
      </Template>
    </DashboardLayout>
  )
}
