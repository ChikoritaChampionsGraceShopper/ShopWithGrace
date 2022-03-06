import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'
import me from '../store/auth'

const SHOW_USER = 'SHOW_USER'

export const AccountContext = createContext()

export function useAccount() {
  const { user, isLoading, setisLoading, fetchUser, dispatch } = useContext(AccountContext)

  return {
    user,
    isLoading,
    async fetchUser(id) {
      const { data: user } = await axios.get(`/api/users/${id}`, {headers: {authorization: window.localStorage.getItem('token')}})
      console.log(user)
      dispatch({ type: SHOW_USER, user})
      setisLoading(false)
    }
  }
}

const reducer = (state, action) => {
  console.log('state: ', state)
  console.log('action: ', action)
  switch(action.type) {
    case SHOW_USER: {
      return { ...state, user: action.user }
    }
    default:
      return state
    }
  }

  const initialState = { user: {} }

export default function AccountProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setisLoading] = useState(true)

  //User
  // useEffect(() => {
  //   async function fetchUser(id) {
  //     const { data: user } = await axios.get(`/api/users/${id}`)
  //     console.log(user)
  //     dispatch({ type: SHOW_USER, user})
  //     setisLoading(false)
  //   }
  //   fetchUser()
  // },[])

  const contextValue = {
    user: state.user,
    dispatch,
    setisLoading,
    isLoading
  }
  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  )
}
