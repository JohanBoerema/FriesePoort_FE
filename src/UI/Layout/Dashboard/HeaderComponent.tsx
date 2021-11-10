import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { Dropdown } from 'react-bootstrap'
import { AppState } from 'App/reducers'
import { LOGIN_URL } from 'Lib'
import Logo from '../../../Images/logo.svg'
import Avatar from '../../../Images/avatar.jpg'
import './styles.scss'

export function Header() {
  const userName = useSelector((state: AppState) => state.user.userName)
  const history = useHistory()
  const dispatch = useDispatch()
  const langOption = [
    { value: 'en_US', label: 'En' },
    { value: 'nl_BE', label: 'Nl' },
  ]

  const changeLanguage = (val) => {
    console.log(val)
  }

  const logOut = () => {
    dispatch({ type: 'RESET' })
    history.push(LOGIN_URL)
  }

  const openSideBar = () => {
    const sideBar = document.querySelector('.sidebar')
    const btnBurger = document.querySelector('.header__burger-btn')
    sideBar?.classList.toggle('open')
    btnBurger?.classList.toggle('open')
  }

  const openMenu = () => {
    const header = document.querySelector('.header__controls')
    header?.classList.toggle('open')
  }

  return (
    <div>
      <header className="header">
        <div className="header__burger-btn" onClick={() => openSideBar()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href="/" className="header__logo-mob">
          <img src={Logo} alt="logo" />
        </a>
        <div className="header__controls">
          <Select
            name="lan"
            options={langOption}
            className="select-lang-class"
            value={{ label: 'en_US', value: 'En' }}
            onChange={(val) => changeLanguage(val)}
          />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ color: '#585858' }}>
              {userName}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ marginLeft: 15 }}>
              <Dropdown.Item onClick={() => logOut()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="header__user">
          <span className="header__user-name"></span>
          <img
            src={Avatar}
            alt="User avatar"
            className="header__user-img"
            onClick={() => openMenu()}
          />
        </div>
      </header>
    </div>
  )
}
