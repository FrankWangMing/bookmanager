import { makeAutoObservable } from 'mobx'
import { login, LoginProps, userInfo } from '../../service/users'
import { get } from 'lodash'

export class Supplier {
  supplierList: any
  constructor() {
    makeAutoObservable(this)
    this.init()
  }
  async init() {
    await this.fetchSupplierList()
  }

  async fetchSupplierList() {
    const { data } = await userInfo()
    console.log(data)
    this.supplierList = get(data, 'me', {})
    return data
  }
}
