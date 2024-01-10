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
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.fetchUserInfo()
    this.getUsers()
  }

  async login(params: LoginProps) {
    const { data } = await login(params)
    if (data) {
      localStorage.setItem('token', data.login.accessToken)
    }
    return data
  }
  async fetchUserInfo() {
    const { data } = await userInfo()
    this.userInfo = get(data, 'me', {})
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
