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
    if (data) {
      localStorage.setItem('token', data.login.accessToken)
    }
    return data
  }
  async fetchUserInfo() {
    const { data } = await userInfo()
    this.userInfo = get(data, 'me', {})
    console.log(this.userInfo)

    return data
  }
}
