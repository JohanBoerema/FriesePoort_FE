import React, { useState } from 'react'
import { AxiosError } from 'axios'
import { QueryKey } from 'types'
import { useSnackbar } from 'notistack'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { showSlideForm, useAxios, useIsMounted } from 'Lib'
import { useForm } from 'react-hook-form'
import { UserFormData } from './types'
import { useMutation, useQueryClient } from 'react-query'
import { ErrorMessage } from 'UI/Components'
import './styles.scss'

interface AddUserProps {
  closeModal: () => void
}

export function AddUser(props: AddUserProps) {
  const { closeModal } = props
  const { t } = useTranslation()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const { setSafely } = useIsMounted()
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [flash, setFlash] = useState<boolean>(false)
  // const axios = useAxios()
  // const role = useSelector((state: AppState) => state.user.role)

  // const screen = async (): Promise<DashboardScreen> => {
  //   const { data } = await axios.get('/v1/dashboard_screen')
  //   return data
  // }
  // const { isLoading, data: dashboardData } = useQuery(QueryKey.dashboardScreen, screen)

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: UserFormData) => {
    enqueueSnackbar('A user was successfully added!', {
      variant: 'success',
    })
    // mutationPostUser.mutate(data)
  }

  const postUser = async (params: object): Promise<void> => {
    let data: any = []
    data = await axios.post(`/api/Users`, params)
    return data
  }

  const mutationPostUser = useMutation(postUser, {
    onSuccess: (data) => {
      closeModal()
      queryClient.refetchQueries([QueryKey.usersScreen])
      enqueueSnackbar('A user was successfully added!', {
        variant: 'success',
      })
    },
    onError: (err: AxiosError) => {
      let errorMessageStr: string = ''
      if (err.response?.data.ModelState['']) {
        errorMessageStr = err.response.data.ModelState['']
      } else if (
        err.response?.data.ModelState['model.Password'] &&
        !err.response?.data.ModelState['model.ConfirmPassword']
      ) {
        errorMessageStr = err.response.data.ModelState['model.Password']
      } else if (err.response?.data.ModelState['model.ConfirmPassword'])
        errorMessageStr = err.response.data.ModelState['model.ConfirmPassword']
      setSafely(setErrorMessage, errorMessageStr)
      setSafely(setFlash, true)
      setTimeout(() => {
        setSafely(setFlash, false)
      }, 5000)
    },
  })

  return (
    <div className="slide-form__controls open">
      <div className="mb-4">
        <i
          className="fas fa-times slide-close"
          style={{ fontSize: 20, cursor: 'pointer' }}
          onClick={() => closeModal()}
        ></i>
      </div>
      <div className="px-3">
        <div className="mb-5 fs-3 fw-bold">{t('Add User')}</div>
        {flash && <ErrorMessage errorMessage={errorMessage} />}
        <form className="col g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('Email')}</label>
            <input
              type="email"
              className="form-control"
              id="userName"
              placeholder={t('Email')}
              required
              {...register('Email')}
            />
          </div>
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('Password')}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={t('Password')}
              required
              {...register('password')}
            />
          </div>
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('ConfirmPassword')}</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder={t('ConfirmPassword')}
              required
              {...register('confirmPassword')}
            />
          </div>
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('PhoneNumber')}</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder={t('PhoneNumber')}
              required
              {...register('PhoneNumber')}
            />
          </div>
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('Role')}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('RoleName')}
              required
            >
              <option value="Administrator">Administrator</option>
              <option value="Orderverwerker">Orderverwerker</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary d-flex align-items-center">
              {t('Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
