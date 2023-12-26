import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { viewmodel } from '../../model'
import { assign } from 'lodash'
import { useNavigate } from 'react-router-dom'
export const Login = observer(() => {
  const [isShowing, setIsShowing] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '928783975@qq.com',
    password: 'secret42'
  })
  const navigate = useNavigate()
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input-bordered input"
                defaultValue={loginData.email}
                onChange={(r) => {
                  setLoginData(assign(loginData, { email: r.target.value }))
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input-bordered input"
                defaultValue={loginData.password}
                onChange={(r) => {
                  setLoginData(assign(loginData, { password: r.target.value }))
                }}
              />
              <label className="label">
                <a href="#" className="link-hover label-text-alt link">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn-primary btn"
                onClick={() => {
                  viewmodel.userModel
                    .login({
                      email: loginData.email,
                      password: loginData.password
                    })
                    .then((r) => {
                      console.log(r)
                      if (r) {
                        navigate('/')
                        // history.replace('/')
                      }
                    })
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
