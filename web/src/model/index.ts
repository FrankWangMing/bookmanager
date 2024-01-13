import { autorun, makeAutoObservable } from 'mobx'
import { Users } from './users'
import { Supplier } from './supplier'
import { Books } from './Books'

export class RootViewModel {
  userModel: Users
  supplierModel: Supplier
  booksModel: Books
  constructor() {
    makeAutoObservable(this)
    this.userModel = new Users(this)
    this.supplierModel = new Supplier(this)
    this.booksModel = new Books(this)
  }
  async init() {
    await this.supplierModel.fetchSupplierList()
    await this.booksModel.fetchBooksList()
  }
}

export const viewmodel = new RootViewModel()
