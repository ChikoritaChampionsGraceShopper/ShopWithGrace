import React, { useState, useEffect, useContext } from 'react'
import { AccountContext, useAccount } from './AccountProvider'

const AccountPage = () => {
  const { user, isLoading } = useContext(AccountContext)
  const {fetchUser} = useAccount()
  const id = window.localStorage.getItem('id')
  useEffect(() => {
    fetchUser(id)
  }, [])

  return (
    <div id='user_page' className='something'>
      {isLoading
      ? <div className='loading'>Loading your account</div>
      : <div className='user_card'>
        Username: {user.Username}
        Name: {user.full_name}
        Email: {user.email}
        Address: {user.street_address}{user.city}{user.state}{user.zip_code}
        </div>
    }
    {/* WILL HAVE TO REFACTOR */}
    </div>
  )
}

export default AccountPage
