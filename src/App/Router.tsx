import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { TakenPage, UsersPage } from 'Pages'
import { Login } from 'Auth'
import { Register } from 'Auth'
import { GuardedRoute } from 'types'
import { AppState } from 'App/reducers'
import { ExpiryGuard, LOGIN_URL, SIGNUP_URL, HOME_URL, USERS_URL } from 'Lib'

function Guarded(props: GuardedRoute) {
  const { path, exact, component } = props
  const loggedIn = useSelector((state: AppState) => state.auth.loggedIn)
  if (loggedIn === false) {
    return <Redirect to={LOGIN_URL} />
  }

  return (
    <ExpiryGuard gate="main">
      <Route path={path} exact={exact} component={component} />
    </ExpiryGuard>
  )
}

export function Router() {
  const loggedIn = useSelector((state: AppState) => state.auth.loggedIn)
  return (
    <BrowserRouter>
      <Route>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to={HOME_URL} /> : <Redirect to={LOGIN_URL} />}
          </Route>
          {/* Auth Routes */}
          <Route path={LOGIN_URL} exact component={Login} />
          <Route path={SIGNUP_URL} exact component={Register} />
          {/* Dashboard Route */}
          <Guarded path={HOME_URL} exact component={TakenPage} />
          <Guarded path={USERS_URL} exact component={UsersPage} />
        </Switch>
      </Route>
    </BrowserRouter>
  )
}
