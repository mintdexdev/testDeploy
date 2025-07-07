import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function AuthContainer({
  children,
  authRequired = true
}) {
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.authReducer.status)

  useEffect(() => {
    if (authRequired !== authStatus) {
      navigate(authRequired ? "/login" : "/")
    } 
    setLoader(false)
  }, [authRequired, authStatus, navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthContainer