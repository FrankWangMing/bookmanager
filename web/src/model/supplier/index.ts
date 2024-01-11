import { makeAutoObservable } from 'mobx'
import { login, LoginProps, userInfo } from '../../service/users'
import { get } from 'lodash'
import { createSupplier, supplierList } from 'service/supplier'
import { RootViewModel } from 'model'

export class Supplier {
  public supplierList: [] = []
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

  async createSupplier(code: string, name: string) {
    const data = await createSupplier(code, name)
    this.fetchSupplierList()
    return data
  }
  async updateSupplier(code: string, name: string) {
    const data = await supplierList()
    this.supplierList = get(data, 'data.getSupplier', [])
    return this.supplierList
  }
}
