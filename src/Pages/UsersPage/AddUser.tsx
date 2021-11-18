import React, { useState } from 'react'
import { AxiosError } from 'axios'
import { QueryKey } from 'types'
import { useSnackbar } from 'notistack'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { showSlideForm, useAxios, useIsMounted } from 'Lib'
import { useForm } from 'react-hook-form'
import { UserFormData, UserDataItem, UserRoleItem, UpdateUserItem } from './types'
import { useMutation, useQueryClient } from 'react-query'
import { ErrorMessage } from 'UI/Components'
import './styles.scss'

interface AddUserProps {
  closeModal: () => void
  editUser: UserDataItem | undefined
  userRoles: UserRoleItem[]
}

export function AddUser(props: AddUserProps) {
  const { closeModal, editUser, userRoles } = props
  const { t } = useTranslation()
  const axios = useAxios()
  const { enqueueSnackbar } = useSnackbar()
  const { setSafely } = useIsMounted()
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [flash, setFlash] = useState<boolean>(false)

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: UserFormData) => {
    if (!editUser) {
      mutationPostUser.mutate(data)
    } else {
      const editParam: UpdateUserItem = {
        Id: editUser.Id,
        PhoneNumber: data.PhoneNumber,
        RoleName: data.RoleName,
      }
      mutationUpdateUser.mutate(editParam)
    }
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

  const updateUser = async (params: UpdateUserItem): Promise<UpdateUserItem> => {
    let data: any = []
    data = await axios.post(`/api/users/Update`, params)
    return data
  }

  const mutationUpdateUser = useMutation(updateUser, {
    onSuccess: (data) => {
      closeModal()
      queryClient.refetchQueries([QueryKey.usersScreen])
      enqueueSnackbar(t('A user was successfully added!'), {
        variant: 'success',
      })
    },
    onError: (err: AxiosError) => {},
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
        <p className="mb-5 fs-3 fw-bold">{!editUser ? t('Add User') : t('Edit User')}</p>
        {flash && <ErrorMessage errorMessage={errorMessage} />}
        <form className="col g-3" onSubmit={handleSubmit(onSubmit)}>
          {!editUser && (
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
          )}
          {!editUser && (
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
          )}
          {!editUser && (
            <div className="col-auto mb-4 position-relative">
              <label className="position-absolute bg-white login_label">
                {t('ConfirmPassword')}
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder={t('ConfirmPassword')}
                required
                {...register('confirmPassword')}
              />
            </div>
          )}
          <div className="col-auto mb-4 position-relative">
            <label className="position-absolute bg-white login_label">{t('PhoneNumber')}</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder={t('PhoneNumber')}
              required
              defaultValue={editUser ? editUser.PhoneNumber : ''}
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
              {userRoles?.map((role: UserRoleItem, index: number) => (
                <option
                  selected={editUser?.RoleName === role.Name ? true : false}
                  value={role.Name}
                >
                  {role.Name}
                </option>
              ))}
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
