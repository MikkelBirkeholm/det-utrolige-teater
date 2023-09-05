import ActorsList from '@/components/Actors/ActorsList'
import React from 'react'

async function getAllActors() {
  try {
    const res = await fetch(`http://localhost:4000/actors`)
    const data = await res.json()
    const actorIDs = data.map((actor) => actor.id)

    const actorArr = actorIDs.map(async (id) => {
      const showRes = await fetch(`http://localhost:4000/actors/${id}`)
      return showRes.json()
    })
    const compiledData = await Promise.all(actorArr)
    return compiledData
  } catch (error) {
    console.log(error)
  }
}

const actorData = await getAllActors()

export default async function Page() {
  return <main>{actorData && <ActorsList data={actorData} />}</main>
}
