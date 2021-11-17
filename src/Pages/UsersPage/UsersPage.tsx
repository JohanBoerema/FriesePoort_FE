import React, { useState } from 'react'
import { DashboardLayout } from 'UI'
import { Template } from 'UI'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'UI/Components'
import { showSlideForm, hideSlideForm, useIsMounted, useAxios } from 'Lib'
import { AddUser } from './AddUser'
import { useQuery } from 'react-query'
import { QueryKey } from 'types'
import { $ } from 'jquery'
import './styles.scss'

export function UsersPage() {
  const { t } = useTranslation()
  const { setSafely } = useIsMounted()
  const [openAddUser, setOpenAddUser] = useState<boolean>(false)
  const axios = useAxios()
  // const axios = useAxios()
  // const role = useSelector((state: AppState) => state.user.role)

  // const screen = async (): Promise<DashboardScreen> => {
  //   const { data } = await axios.get('/v1/dashboard_screen')
  //   return data
  // }
  // const { isLoading, data: dashboardData } = useQuery(QueryKey.dashboardScreen, screen)

  const getUserData = async (): Promise<any> => {
    const { data } = await axios.get(`/api/users/GetUsers?excludeActiveUsers=false`)
    return data
  }

  // const { isLoading, data: userData } = useQuery(QueryKey.usersScreen, getUserData)

  const { isLoading } = useQuery(QueryKey.usersScreen, getUserData, {
    onSuccess: (data) => {
      console.log('data', data)
    },
  })

  const changePaginationUserData = (pageSize: number, page: number) => {
    console.log('pageSize', pageSize)
    console.log('page', page)
  }

  const addUser = () => {
    setSafely(setOpenAddUser, !openAddUser)
    showSlideForm()
  }

  const closeModal = () => {
    setSafely(setOpenAddUser, false)
    hideSlideForm()
  }

  return (
    <DashboardLayout title="Users">
      <Template title={t('Users')}>
        <div className="user-container px-4 mt-5">
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
            <table id="user-table" className="mb-4 table">
              <thead className="table-light">
                <tr>
                  <th>1231111111111111111</th>
                  <th>12311111111111111</th>
                  <th>123111111111111111</th>
                  <th>123111111111111</th>
                  <th>123111111111111111111111</th>
                  <th>1231111111111111111111</th>
                  <th>123111111111111111</th>
                  <th>12311111111111111111111</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                </tr>
                <tr>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                </tr>
                <tr>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                  <th>1231</th>
                </tr>
              </tbody>
            </table>
            <Pagination
              recordNum={60}
              getData={(pageSize: number, page: number) => changePaginationUserData(pageSize, page)}
            />
          </div>
        </div>
        {openAddUser && <AddUser closeModal={() => closeModal()} />}
      </Template>
    </DashboardLayout>
  )
}
