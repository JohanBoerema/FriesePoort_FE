import React from 'react'
import { Loader } from 'UI/Components'
import { Helmet } from 'react-helmet-async'
import { APP_NAME } from 'Lib'
import { ErrorMessage } from 'UI/Components'
import { TemplateProps } from '../../types/props'

interface Props {
  title: string
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  children: React.ReactNode
}

export function Template(props: Props) {
  const { title, isLoading, isError, errorMessage, children } = props

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="position-relative px-4 mt-5">
          {isError && errorMessage !== undefined && (
            <div
              className="position-absolute w-100 d-flex justify-content-center"
              style={{ top: 40 }}
            >
              <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            </div>
          )}
          <div>
            <p className="fs-2">{title}</p>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
