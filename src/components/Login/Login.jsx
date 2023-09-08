'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Login.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
    }
  }, [])

  const onSubmit = async (data) => {
    const user = await login(data.username, data.password)
    if (user.access_token) {
      localStorage.setItem('token', user.access_token)
      setIsVisible(false)
      setIsLoggedIn(true)
      router.push('/min-side')
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <li className={styles.loginWrapper}>
      {isLoggedIn ? (
        <Link href={'/min-side'}>Min Side</Link>
      ) : (
        <>
          <a
            href="#"
            onClick={() => setIsVisible(!isVisible)}
          >
            Login
          </a>
          {isVisible && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.loginForm}
            >
              {/* register your input into the hook by invoking the "register" function */}
              <input
                placeholder="Brugernavn eller email"
                defaultValue={'klausbundgaard@r8dio.dk'}
                {...register('username', { required: true })}
              />{' '}
              {errors.username && <span>This field is required</span>}
              {/* include validation with required or other standard HTML validation rules */}
              <input
                placeholder="Password"
                type="password"
                defaultValue={'1234password'}
                {...register('password', { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.password && <span>This field is required</span>}
              <input type="submit" />
            </form>
          )}
        </>
      )}
    </li>
  )
}

export async function login(username, password) {
  const apiUrl = process.env.API_URL || 'http://localhost:4000' // Use environment variables for the API URL

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  // headers.append('Authorization', `Bearer ${process.env.API_TOKEN}`)

  const body = new URLSearchParams()
  body.append('username', username)
  body.append('password', password)

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${apiUrl}/login`, requestOptions)

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error.message)
  }
}
