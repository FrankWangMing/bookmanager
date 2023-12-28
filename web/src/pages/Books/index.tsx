import { observer } from 'mobx-react-lite'
import { Footer } from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useEffect } from 'react'
import { viewmodel } from '../../model'
import { BookContent } from './table'

export const Books = observer(() => {
    useEffect(() => {
        console.log(viewmodel.userModel.userInfo)
    }, [])
    return (
        <div className="relative flex h-auto min-h-screen flex-col ">
            <Navbar />
            <div className="my-28 flex h-auto flex-1 flex-col items-center justify-center pt-10">
                <BookContent />
            </div>
            <Footer />
        </div>
    )
})
