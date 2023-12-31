import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import UploadModal from './components/modals/UploadModal'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProvider/>
        <Navbar currentUser={currentUser}/>
        {children}
        <LoginModal/> 
        <RegisterModal/>
        <UploadModal/>
      </body>
    </html>
  )
}
