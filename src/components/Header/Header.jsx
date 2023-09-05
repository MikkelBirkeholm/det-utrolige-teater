import Image from 'next/image'
import styles from './Header.module.scss'
import LoginForm from '../Login/Login'
import Link from 'next/link'

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
        <input
          type="search"
          name="search"
          id="search"
          placeholder="INDTAST SØGORD"
        />
        <nav>
          <ul
            title="dekstop nav"
            className={styles.desktopNav}
          >
            <Link href="/">FORSIDE</Link>
            <Link href="/events">FORESTILLINGER & EVENTS</Link>
            <Link href="/skuespillere">SKUESPILLERE</Link>
            <LoginForm />
          </ul>
          <ul
            title="mobile nav"
            className={styles.mobileNav}
          >
            burger icon
          </ul>
        </nav>
      </div>
    </div>
  )
}
