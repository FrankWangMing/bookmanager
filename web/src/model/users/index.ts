import { makeAutoObservable } from 'mobx'
import {
  createUser,
  deleteUserById,
  getAllUsers,
  login,
  LoginProps,
  updateUser,
  userInfo
} from '../../service/users'
import { get } from 'lodash'
import { RootViewModel } from 'model'
type UserInfo = {
  email: string
  username: string
  password: string
  role:"ADMIN"|"a"
}
export class Users {
  userInfo: UserInfo | null = null
  allUsers: any[] = []
  root: RootViewModel
  update:number = 1
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.fetchUserInfo()
    this.getUsers()
    this.root = root
  }

  get isAdmin():boolean{
    if(this.userInfo){
      return this.userInfo.role=="ADMIN"
    }
    return false
  }

  async login(params: LoginProps) {
    const { data } = await login(params)
    if (data) {
      localStorage.setItem('token', data.login.accessToken)
      this.fetchUserInfo()
      this.update++
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

  async updateUserInfo(data: { email: any; password: any; username: any }) {
    return await updateUser(data)
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
