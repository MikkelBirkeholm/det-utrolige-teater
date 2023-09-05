'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Logout = () => {
  const router = useRouter()

  function LogUserOut() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  return <button onClick={LogUserOut}>Logout</button>
}
