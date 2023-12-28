import { Button } from "antd";
import { uniqueId } from "lodash";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { router } from "router/router";

const Menu = observer(() => {

  // const [menu, setMenu] = useState()
  const menu = [{
    name: "用户管理",
    path: "/users"
  }, {
    name: "图书管理",
    path: "/books"
  }]
  return <ul className="flex-1 menu menu-horizontal px-1 active:{}">
    {
      menu.map(i => {
        console.log(
          router.state.location.pathname
        );
        return <li key={uniqueId()}>
          <a onClick={() => {
            router.navigate(i.path)
          }} >{i.name}</a>
          <Button>{i.name}</Button>
        </li>
      })
    }
    {/* <li>
      <details>
        <summary>
          图书管理
        </summary>
        <ul className="p-2 bg-base-100 rounded-t-none">
          <li><a>Link 1</a></li>
          <li><a>Link 2</a></li>
        </ul>
      </details>
    </li> */}
  </ul>
})

export default observer(
  () => {
    return <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">图书管理系统</a>
      </div>
      <Menu />
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  }
)