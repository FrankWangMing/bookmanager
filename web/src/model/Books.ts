import { makeAutoObservable } from 'mobx'
import { get } from 'lodash'
import { bookList } from 'service/books'
import { RootViewModel } from 'model'

export class Books {
  public booksList: any
  root: RootViewModel
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.root = root
  }

  async fetchBooksList() {
    const data = await bookList()
    console.log(data)
    this.booksList = get(data, 'data.getBooks', [])
    return this.booksList
  }
}
