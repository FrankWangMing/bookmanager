import { makeAutoObservable } from 'mobx'
import { login, LoginProps, userInfo } from '../../service/users'
import { get } from 'lodash'

export class Users {
  userInfo: any
  constructor() {
    makeAutoObservable(this)
    this.init()
  }
  async init() {
    await this.fetchUserInfo()
  }

  async login(params: LoginProps) {
    const { data } = await login(params)
    console.log(data)
    if (data) {
      localStorage.setItem('token', data.login.accessToken)
    }
    return data
  }
  async fetchUserInfo() {
    const { data } = await userInfo()
    console.log(data)
    this.userInfo = get(data, 'me', {})
    return data
  }
}
