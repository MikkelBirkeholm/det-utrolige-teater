import Header from '@/components/Header/Header'
import '../../styles/globals.scss'
import { Playfair_Display, Titillium_Web } from 'next/font/google'
import Footer from '@/components/Footer/Footer'

// Gør fonts tilgængelig som CSS variabler
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
export const titillium = Titillium_Web({
  subsets: ['latin'],
  variable: '--font-titillium',
  display: 'swap',
  weight: ['400', '700'],
})
// ----------------------------------------

export const metadata = {
  title: 'Det Utrolige Teater',
  description: 'De mest utrolige forestillinger',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="da-DK"
      className={`${playfair.variable} ${titillium.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
