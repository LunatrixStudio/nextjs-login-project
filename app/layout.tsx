import './styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'Simple Auth Demo',
  description: 'Login with Iran mobile and view dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <main className="min-h-screen flex items-center justify-center p-4">{children}</main>
      </body>
    </html>
  )
}
