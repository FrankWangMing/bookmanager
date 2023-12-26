import { Map } from '../components/Map'
import { EditorList } from './EditorList'

export const Editor = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <EditorList />
      </div>
      <div className="flex-1">
        <Map />
      </div>
    </div>
  )
}
