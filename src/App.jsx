import './App.css'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import { Footer, Header } from './components/index.js'
import { login, logout } from './store/authSlice.js'
import authService from './appwrite/auth.js'

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      // .catch(error => { console.error("Failed to get current user:", error); })
      .finally(() => setLoading(false))

  }, [])

  if (loading) {
    return (
      <div>Please Login</div>
    )
  }

  return (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App