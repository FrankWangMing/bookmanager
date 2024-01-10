import { makeAutoObservable } from 'mobx'
import {
  createUser,
  deleteUserById,
  getAllUsers,
  login,
  LoginProps,
  userInfo
} from '../../service/users'
import { get } from 'lodash'
import { RootViewModel } from 'model'

export class Users {
  userInfo: any = null
  allUsers: any[] = []
  root: RootViewModel
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.fetchUserInfo()
    this.getUsers()
    this.root = root
  }

  async login(params: LoginProps) {
    const { data } = await login(params)
    if (data) {
      localStorage.setItem('token', data.login.accessToken)
      this.root.init()
    }
    return data
  }
  async logout() {
    localStorage.removeItem('token')
  }

  async fetchUserInfo() {
    const { data } = await userInfo()
    this.userInfo = get(data, 'me', {})
    this.root.init()
    return data
  }
  async createUserInfo(data: { email: any; password: any; username: any }) {
    return await createUser(data)
  }

  async getUsers() {
    const { data } = await getAllUsers()
    this.allUsers = get(data, 'getAllUsers', [])
    return data
  }

  async deleteUserById(id: any) {
    return await deleteUserById(id)
  }
}
