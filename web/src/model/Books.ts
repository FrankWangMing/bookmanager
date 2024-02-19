import { makeAutoObservable } from 'mobx'
import { concat, get, reduce } from 'lodash'
import {
  bookList,
  fetchDashBoardBookList,
  getBooksBySearch,
  uploadBooks,
  uploadManyBooks
} from 'service/books'
import { RootViewModel } from 'model'

export class Books {
  public booksList: any = []
  root: RootViewModel

  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.root = root
  }

  async fetchBooksList() {
    const data = await bookList()
    this.booksList = get(data, 'data.getBooks', [])
    return await get(data, 'data.getBooks', [])
  }

  async fetchDashBoardBookList() {
    return get(await fetchDashBoardBookList(), 'data.dashBoard', {})
  }

  async getBooksBySearch(params: any) {
    const data = await getBooksBySearch(params)
    return get(data, 'data.getBooksBySearch', {})
  }

  async upload(data: any) {
    return await uploadBooks(data)
  }

  async uploadManyBooks(data: any) {
    return await uploadManyBooks(
      reduce(
        data,
        (pre, item) => {
          console.log(item)
          pre = pre.concat(item)
          console.log(pre)
          return pre
        },
        []
      )
    )
  }
}
