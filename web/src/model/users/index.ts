import { makeAutoObservable } from 'mobx'
import { login, LoginProps, userInfo } from '../../service/users'
import { get } from 'lodash'
import { RootViewModel } from 'model'

export class Users {
  userInfo: any = null
  constructor(root: RootViewModel) {
    makeAutoObservable(this)
    this.fetchUserInfo()
  }

  async login(params: LoginProps) {
    const { data } = await login(params)
    // console.log(data)
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
