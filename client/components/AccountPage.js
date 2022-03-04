import react, { useState } from 'react'
import { useAccount } from './AccountProvider'

const AccountPage = () => {
  const [user, isLoading] = useAccount()
  console.log('user: ', user)

  return (
    <div id='user_page' className='something'>
      {isLoading
      ? <div className='loading'>Loading your account</div>
      : <div className='user_card'>
        Username: {user.Username}
        Name: {user.full_name}
        Email: {user.email}
        Address: {user.street_address, user.city, user.state, user.zip_code}
        </div>
    }
    {/* WILL HAVE TO REFACTOR */}
    </div>
  )
}

export default AccountPage
