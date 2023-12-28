import { observer } from 'mobx-react-lite'
import { Footer } from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useEffect } from 'react'
import { viewmodel } from '../../model'

export const Users = observer(() => {
    useEffect(() => {
        console.log(viewmodel.userModel.userInfo)
    }, [])
    return (
        <div className="relative flex h-auto min-h-screen flex-col ">
            <Navbar />
            <div className="my-28 flex h-auto flex-1 flex-col items-center justify-center pt-10">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
})
