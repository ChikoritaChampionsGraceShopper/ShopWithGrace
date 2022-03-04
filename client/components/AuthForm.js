import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {authenticate} from '../store'

const AuthForm = ({ name, displayName }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const updateEmail = (event) => setEmail(event.target.value)
  const updatePassword = (event) => setPassword(event.target.value)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" onChange={(event)=> setEmail(event)} />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" onChange={(event)=> setPassword(event)}/>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = <AuthForm name="login" displayName="Login" />
export const Signup = <AuthForm name="signup" displayName="Sign Up" />
