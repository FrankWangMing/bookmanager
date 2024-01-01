import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { viewmodel } from '../../model'
import { assign } from 'lodash'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
export const Login = observer(() => {
  const [isShowing, setIsShowing] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '928783975@qq.com',
    password: 'secret42'
  })
  const navigate = useNavigate()
  return (
    <>
      <LoginForm></LoginForm>
    </>
  )
})
