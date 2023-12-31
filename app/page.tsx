import Image from 'next/image'
import DefaultPage from './components/DefaultPage'
import MainLayout from './components/layouts/MainLayout'

export default function Home() {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-900 h-screen w-full flex items-center justify-center transition'>
      <MainLayout/>
    </div>
  )
}
