import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuth = useSelector(({ isAuth }) => isAuth)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}