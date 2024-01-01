import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import BookContent from './table'
import { viewmodel } from 'model'

export const Books = observer(() => {
  return (
    <div className="">
      <BookContent />
      {/* <BookContent /> */}
      {/* <BookContent /> */}
    </div>
  )
})
