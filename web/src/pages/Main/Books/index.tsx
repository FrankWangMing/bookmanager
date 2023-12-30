import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import BookContent from './table'

export const Books = observer(() => {
    useEffect(() => {
        // console.log(viewmodel.userModel.userInfo)
    }, [])
    return (
        <div className="">
            <BookContent />
            {/* <BookContent /> */}
            {/* <BookContent /> */}
        </div>
    )
})
