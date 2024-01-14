import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { entries, fromPairs, uniqueId } from 'lodash'
import UploadTable from '../Books/Upload/UploadTable'
import { getChineseKey } from '../Supplier'
import { useEffect, useState } from 'react'
import { viewmodel } from 'model'
type DashBoardBefore = {
  num: number
  before: number
}
type DashBoard = {
  data: any[]
  bookType: DashBoardBefore
  quantity: DashBoardBefore
}
export default observer(() => {
  const [books, setBooks] = useState<DashBoard>({
    data: [],
    bookType: {
      num: 0,
      before: 0
    },
    quantity: {
      num: 0,
      before: 0
    }
  })
  useEffect(() => {
    viewmodel.booksModel.fetchDashBoardBookList().then((r) => {
      setBooks({
        data: r.data.map((book: any) => {
          return {
            key: uniqueId(),
            ...fromPairs(
              entries(book).map((i) => {
                return [getChineseKey(i[0]), i[1]]
              })
            )
          }
        }),
        bookType: r.bookType,
        quantity: r.quantity
      })
    })
  }, [])
  return (
    <div className="min-h-full">
      <h1>今日新增</h1>
      <div className="flex flex-row w-full  ">
        <div className=" flex flex-col w-52">
          <div className="relative flex mt-10 flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1559"
                width="200"
                height="200"
              >
                <path
                  d="M273.7 98.8v619.9c0 4.5-3.6 8.1-8.1 8.1h-82.9v-628h91z"
                  fill="#1296db"
                  p-id="1560"
                ></path>
                <path
                  d="M185.8 823.4h-36.1V140.9c0-42.3 34.4-76.7 76.7-76.7h571.2c42.3 0 76.7 34.4 76.7 76.7V723h-36.1V140.9c0-22.4-18.2-40.6-40.6-40.6H226.4c-22.4 0-40.6 18.2-40.6 40.6v682.5z"
                  fill="#1296db"
                  p-id="1561"
                ></path>
                <path
                  d="M873.5 956.8H284.6c-74.4 0-134.9-60.5-134.9-134.9S210.2 687 284.6 687h559.2v36H284.6c-54.5 0-98.8 44.3-98.8 98.8s44.3 98.8 98.8 98.8h588.9v36.2z"
                  fill="#1296db"
                  p-id="1562"
                ></path>
                <path
                  d="M246.7 810.5h626.9v24.1H246.7zM480.4 211.5H775v24.1H480.4zM480.4 318.3H775v24.1H480.4z"
                  fill="#13227a"
                  p-id="1563"
                ></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                书本种类
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {books.quantity.num}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              比昨天多&nbsp;&nbsp;
              <strong className="text-green-500 font-black text-1xl">
                {books.quantity.before} &nbsp;
              </strong>
              种
            </div>
          </div>
          <div className="relative flex mt-10 flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                书本种类
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {books.bookType.num}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              比昨天多&nbsp;&nbsp;
              <strong className="text-green-500 font-black text-1xl">
                {books.bookType.before} &nbsp;
              </strong>
              本
            </div>
          </div>
          {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">

                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    New Clients
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    3,462
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-red-500">-2%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Sales
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    $103,430
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+5%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div> */}
        </div>
        <div className="ml-6 flex-1">
          <UploadTable data={books.data}></UploadTable>
        </div>
      </div>
    </div>
  )
})
//
