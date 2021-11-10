import React from 'react'
import { Loader } from 'UI/Components'
import { Sidebar } from './SidebarComponent'
import { Header } from './HeaderComponent'
import { Helmet } from 'react-helmet-async'
import { APP_NAME } from 'Lib'
import { TemplateProps } from 'types'

export function DashboardLayout(props: TemplateProps) {
  const { title, TitleComponent, isLoading, isError, errorMessage, children } = props

  return (
    <>
      <Helmet>
        <title>
          {title} | {APP_NAME}
        </title>
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="vh-100 d-flex">
          <Sidebar />
          <div className="col">
            <Header />
            {children}
          </div>
        </div>
      )}
    </>
  )
}
