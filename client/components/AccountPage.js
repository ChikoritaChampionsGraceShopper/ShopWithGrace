import React, { useState, useEffect, useContext } from 'react'
import { AccountContext, useAccount } from './AccountProvider'

const AccountPage = ({match}) => {
  const { user, isLoading } = useContext(AccountContext)
  const {fetchUser} = useAccount()
  const { id } = match.params
  useEffect(() => {
    fetchUser(id)
  }, [])

  return (
    <div  className='userProfile'>
      <div className='profileContainer' >
      {isLoading
      ? <div className='loading'>Loading your account</div>
      : <div className='userContainer'>
          <div className='profileLabel'>Profile Info</div>
          <div className='profileAndBlank'>
            <div className='userProfileContainer' >
              <div className='userProfileInfo'>
              <span>Username: </span>
              <span>{user.Username}</span>
              </div>
              <div className='userProfileInfo'>
              <span>Name: </span>
              <span>{user.full_name}</span>
              </div>
              <div className='userProfileInfo'>
              <span>Email: </span>
              <span>{user.email}</span>
              </div>
              <div className='userProfileInfo'>
              <span>Address: </span>
              <span>{user.street_address}</span>
              </div>
              <div className='userProfileInfo'>
              <span></span>
              <span>{user.city}, {user.state}, {user.zip_code}</span>
              </div>
            </div>
          </div>
        </div>
    }
    </div>
  </div>
  )
}

export default AccountPage
