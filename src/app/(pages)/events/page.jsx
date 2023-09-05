import AllEvents from '@/components/Events/AllEvents'
import { PromoBanner } from '@/components/PromoBanner/PromoBanner'
import React from 'react'

async function getAllShows() {
  try {
    const res = await fetch(
      `http://localhost:4000/events?orderby=startdate&dir=ASC`
    )
    const data = await res.json()
    const showIDs = data.map((show) => show.id)

    const showArr = showIDs.map(async (id) => {
      const showRes = await fetch(`http://localhost:4000/events/${id}`)
      return showRes.json()
    })
    const compiledData = await Promise.all(showArr)
    return compiledData
  } catch (error) {
    console.log(error)
  }
}

const showData = await getAllShows()

export default async function Page() {
  return (
    <main>
      <PromoBanner />
      <AllEvents />
    </main>
  )
}
