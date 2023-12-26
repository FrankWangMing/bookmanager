import { editor } from '../store/editor'
import { observer } from 'mobx-react-lite'

export const EditorList = observer(() => {
  return (
    <div>
      {editor.city.map((i, idx) => {
        return (
          <div key={idx}>
            <input
              value={i}
              onChange={(r) => {
                editor.city[idx] = r.target.value
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        )
      })}
      <button
        onClick={() => {
          editor.city.push('')
        }}
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      >
        添加
      </button>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
        一键生成
      </button>
    </div>
  )
})
