import ActorPage from '@/components/Actors/ActorPage'
import Link from 'next/link'

async function getActor(id) {
  const showRes = await fetch(`http://localhost:4000/actors/${id}`)
  return showRes.json()
}

export default async function Page({ params }) {
  const actorID = params.id
  const actorData = await getActor(actorID)

  return (
    <main>
      <ActorPage data={actorData} />
      <Link href={'/skuespillere'}>
        <button>Alle Skuespillere</button>
      </Link>
    </main>
  )
}
