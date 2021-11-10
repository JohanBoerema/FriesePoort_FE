import React from 'react'
import LoaderSpinner from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export function Loader() {
  return (
    <div className="vh-100 position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <LoaderSpinner type="Puff" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )
}
