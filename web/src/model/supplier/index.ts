import { makeAutoObservable } from 'mobx'
import { login, LoginProps, userInfo } from '../../service/users'
import { get } from 'lodash'
import { supplierList } from 'service/supplier'
import { RootViewModel } from 'model'

export class Supplier {
  public supplierList: any
  root: RootViewModel
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.root = root
  }

  async fetchSupplierList() {
    const data = await supplierList()
    this.supplierList = get(data, 'data.getSupplier', [])
    return this.supplierList
  }

  async fetchBooksBySupplierCode(code: string) {
    const data = await supplierList()
    this.supplierList = get(data, 'data.getSupplier', [])
    return this.supplierList
  }
}
