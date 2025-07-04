import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

export default function AuthLayout({
  children,
  authRequired = true
}) {
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.authReducer.status)


  useEffect(() => {
    if (authRequired && authStatus !== authRequired) {
      navigate("/login");
    } else if (!authRequired && authStatus !== authRequired) {
      navigate("/");
    }
    setLoader(false)
  }, [authStatus, navigate, authRequired])

  return (
    loader ? <h1>Loading</h1> : <>{children}</>
  )
}

