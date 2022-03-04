import axios from 'axios'
import React, {useReducer, useContext, createContext, useEffect, useState} from 'react'

const SHOW_USER = 'SHOW_USER'

const AccountContext = createContext()

export function useAccount() {
  const { user, isLoading, setisLoading, dispatch } = useContext(AccountContext)

  return {
    user,
    isLoading
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
  useEffect(() => {
    async function fetchUser(userId) {
      if (userId) {
          const { data: user } = await axios.get(`/api/users/${userId}`)
          dispatch({
            type: SHOW_USER,
            user
          })
          setisLoading(false)
        }
    }
    fetchUser()
  }, [])

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
