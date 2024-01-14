import { makeAutoObservable } from 'mobx'
import { get } from 'lodash'
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
    console.log(data)

    return await get(data, 'data.getBooksBySearch', {})
  }

  async upload(data: any) {
    return await uploadBooks(data)
  }
  async uploadManyBooks(data: any) {
    return await uploadManyBooks(data)
  }
}
