import { Inter } from 'next/font/google'
import './globals.css'
import PasswordProtection from './components/PasswordProtection'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordProtection>
          {children}
        </PasswordProtection>
      </body>
    </html>
  )
}
