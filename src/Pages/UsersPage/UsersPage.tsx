import React from 'react'
// import { useAxios } from 'Lib'
// import { useSelector } from 'react-redux'
// import { useQuery } from 'react-query'
// import { isAccountUser, isCaseManager } from 'Lib'
// import { AppState } from 'App/reducers'
// import { AccountUserDashboard } from './AccountUserDashboard'
// import { CaseUserDashboard } from './CaseUserDashboard'
// import { DashboardScreen, QueryKey } from 'types'
import { DashboardLayout } from 'UI'

export function UsersPage() {
  // const axios = useAxios()
  // const role = useSelector((state: AppState) => state.user.role)

  // const screen = async (): Promise<DashboardScreen> => {
  //   const { data } = await axios.get('/v1/dashboard_screen')
  //   return data
  // }
  // const { isLoading, data: dashboardData } = useQuery(QueryKey.dashboardScreen, screen)

  return (
    <DashboardLayout title="Users">
      <>Users</>
    </DashboardLayout>
  )
}
