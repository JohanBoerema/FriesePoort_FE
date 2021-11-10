import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { setLogin, refreshTimestamp, setExpiresIn } from 'Data/Auth'
import { setUser, setUserRoles } from 'Data/User'
import { AuthTemplate } from 'UI'
import LoginSideImage from '../../Images/img_admin_side.png'
import Logo from '../../Images/logo.svg'
import { FormDataItem, FetchLoginDataResponse } from './types'
import { useIsMounted, HOME_URL } from 'Lib'
import './styles.scss'

export function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { setSafely } = useIsMounted()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setErrorMessage] = useState<string | null>(null)

  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }
  const axios = Axios.create({
    baseURL: process.env.REACT_APP_API,
  })

  const { register, handleSubmit } = useForm()

  const storeLoginData = (loginData: FetchLoginDataResponse) => {
    dispatch(setLogin(loginData.access_token))
    dispatch(refreshTimestamp(''))
    dispatch(setExpiresIn(loginData.expires_in))
    dispatch(setUser(loginData.userName))
    dispatch(setUserRoles(loginData.roles))
  }

  const onSubmit = (data: FormDataItem) => {
    setSafely(setIsLoading, true)
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('userName', data.userName)
    params.append('password', data.password)

    axios
      .post('/token', params, config)
      .then((res: AxiosResponse) => {
        const data = res.data as FetchLoginDataResponse
        storeLoginData(data)
        setSafely(setErrorMessage, null)
        setSafely(setIsLoading, false)
        history.push(HOME_URL)
        console.log('res', res)
        return
      })
      .catch((err: AxiosError) => {
        setSafely(setErrorMessage, err.response?.data.error_description)
        setSafely(setIsLoading, false)
        console.log('22222', err.response)
      })
  }

  return (
    <>
      <AuthTemplate
        title="Login"
        isLoading={isLoading}
        isError={error !== null}
        errorMessage={error ?? ''}
      >
        <div className="login vw-100 vh-100 position-relative">
          <div className="col-xl-5 col-lg-7 col-sm-12 bg-white rounded-1 shadow-lg position-absolute top-50 start-50 translate-middle login_main">
            <div className="d-flex">
              <div className="w-25 text-center login_side d-none d-sm-block">
                <img src={LoginSideImage} alt="side-img" className="start-0 login_side_img"></img>
              </div>
              <div className="col">
                <div className="text-center login_logo">
                  <img src={Logo} alt="logo"></img>
                </div>
                <form className="col g-3 px-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-auto mb-4 position-relative">
                    <label className="position-absolute bg-white login_label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="userName"
                      placeholder="E-mail"
                      required
                      {...register('userName')}
                    />
                  </div>
                  <div className="col-auto mb-4 position-relative">
                    <label className="position-absolute bg-white login_label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                      {...register('password')}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary w-100">
                      LogIn
                    </button>
                    <p className="text-xs-center" style={{ marginTop: 10 }}>
                      <Link to="/forgot-password" className="login_forgot">
                        Forgot Password
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthTemplate>
    </>
  )
}
