import { makeAutoObservable } from 'mobx'
import { Users } from './users'
import { Supplier } from './supplier'

class RootViewModel {
  userModel: Users
  supplierModel: Supplier
  constructor() {
    makeAutoObservable(this)
    this.userModel = new Users()
    this.supplierModel = new Supplier()
  }
}

export const viewmodel = new RootViewModel()
