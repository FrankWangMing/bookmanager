import { observer } from 'mobx-react-lite'
import { Footer } from '../../components/Footer'
import MNavbar from '../../components/Navbar'
import { useEffect } from 'react'
import { viewmodel } from '../../model'

export const Me = observer(() => {
  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  return (
    <div className="relative flex h-auto min-h-screen flex-col ">
      <MNavbar />
      <div className="my-28 flex h-auto flex-1 flex-col items-center justify-center pt-10">
        <img
          className="h-80 w-80 rounded-full border-2 bg-amber-500 shadow-2xl transition duration-200 hover:scale-105"
          src={'https://picsum.photos/600?random=3'}
          alt=""
        />
        <div className={'text-4xl  font-black'}>you name</div>
        <div className={'text-4xl  font-black'}>
          {viewmodel.userModel.userInfo?.email}/
          {viewmodel.userModel.userInfo?.firstname}
        </div>
        feature //平凡之路
        <div className="grow">1</div>
      </div>
      <Footer />
    </div>
  )
})
