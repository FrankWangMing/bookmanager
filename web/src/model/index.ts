import { makeAutoObservable } from 'mobx'
import { Users } from './users'

class RootViewModel {
  userModel: Users
  constructor() {
    makeAutoObservable(this)
    this.userModel = new Users()
  }
}

export const viewmodel = new RootViewModel()
