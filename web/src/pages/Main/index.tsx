import { observer } from 'mobx-react-lite'
import Navbar from '../../components/Navbar'
import { useEffect } from 'react'
import { viewmodel } from '../../model'
import Banner from './Banner'

export const Main = observer(() => {
  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          </div>
        </main>
      </div>
    </>
  )
})
