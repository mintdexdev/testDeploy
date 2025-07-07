import React from 'react'
import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite'
import { logout } from '../../store/authSlice'

function LogoutButton() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
  }
  return (
    <button
      className='inline-bock mx-2 px-6 py-2 duration-200 rounded-full bg-red-900/50  hover:bg-red-700/50 active:bg-red-900/30'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutButton