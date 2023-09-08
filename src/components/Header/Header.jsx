import Image from 'next/image'
import LoginForm from '../Login/Login'
import Link from 'next/link'
import styles from './Header.module.scss'
import { MobilePopup } from './MobilePopup'
import { SearchField } from './SearchField'

export default function Header() {
  return (
    <div className={styles.header}>
      <Image
        src="/DUT_logo.png"
        width={400}
        height={100}
        style={{ objectFit: 'contain', margin: 'auto' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="Logo"
        priority={true}
      />
      <div>
        <SearchField />
        <nav className={styles.desktopNav}>
          <ul title="dekstop nav">
            <Link href="/">FORSIDE</Link>
            <Link href="/events">FORESTILLINGER & EVENTS</Link>
            <Link href="/skuespillere">SKUESPILLERE</Link>
            <LoginForm />
          </ul>
        </nav>
        <MobilePopup />
      </div>
    </div>
  )
}
