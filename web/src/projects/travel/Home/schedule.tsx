import { observer } from 'mobx-react-lite'

export const Schedule = observer(() => {
  return (
    <div className="flex justify-center p-5">
      <ul className="menu rounded-box w-56 bg-base-200">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
      <div className="h-10 w-1/2 max-w-full bg-blue-50"></div>
    </div>
  )
})
