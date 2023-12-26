import { observer } from 'mobx-react-lite'
import MNavbar from '../../components/Navbar'
import { Map } from '../Map'
import { Button } from '@material-tailwind/react'
import { Footer } from '../../components/Footer'
import Banner from './Banner'
import { useEffect } from 'react'
import { viewmodel } from '../../model'

export const Hero = observer(() => {
  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  return (
    <>
      <MNavbar />
      {/* <Banner /> */}
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
})
