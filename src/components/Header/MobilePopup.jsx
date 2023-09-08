'use client'
import Link from 'next/link'
import styles from './Header.module.scss'
import LoginForm from '../Login/Login'

import { useRef } from 'react'

export const MobilePopup = () => {
  const menuRef = useRef(null)
  return (
    <>
      <div
        title="mobile nav"
        className={styles.mobileNav}
      >
        <button onClick={() => menuRef.current.showModal()}>MENU</button>
      </div>
      <dialog ref={menuRef}>
        <ul className={styles.mobileMenu}>
          <Link href="/">FORSIDE</Link>
          <Link href="/events">FORESTILLINGER & EVENTS</Link>
          <Link href="/skuespillere">SKUESPILLERE</Link>
          <LoginForm />
          <li>
            <button onClick={() => menuRef.current.close()}>LUK MENU</button>
          </li>
        </ul>
      </dialog>
    </>
  )
}
