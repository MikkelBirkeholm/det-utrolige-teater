'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const SearchField = () => {
  const router = useRouter()
  function handleSubmit(e) {
    e.preventDefault()
    router.push(`/search-result?s=${e.target[0].value}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="INDTAST SØGORD"
      />
    </form>
  )
}
