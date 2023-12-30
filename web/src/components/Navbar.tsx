import { Button } from "antd";
import { uniqueId } from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import { router } from "router/router";
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from "antd"
import { useLocation, useRoutes } from "react-router-dom";
import { useHistoryTravel } from "ahooks";
const Menu = observer(() => {
  const items: MenuProps['items'] = [
    {
      label: '供应商管理',
      key: '/supplier',
    },
    {
      label: '图书管理',
      key: '/books',
    },
    {
      label: '用户管理',
      key: '/users',
    },
  ];
  let location = useLocation();

  const [current, setCurrent] = useState(location.pathname)

  useEffect(() => {
    // Google Analytics
    setCurrent(location.pathname)

  }, [location]);
  const onClick = (i) => {
    router.navigate(`${i.key}`)
  }
  return <AntdMenu className="menu menu-vertical lg:menu-horizontal  rounded-box" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
})

export default observer(
  () => {
    return <div className="navbar bg-base-100 fixed top-0 z-10 shadow-xl ring-1 ring-gray-900/5">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">图书管理系统</a>
      </div>
      <div className="flex-1">
        <Menu />
      </div>
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


