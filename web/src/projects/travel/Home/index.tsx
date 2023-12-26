import { Footer } from '../../../components/Footer'
import { Schedule } from './schedule'
import { useNavigate } from 'react-router-dom'
import { useLocalStore } from 'mobx-react-lite'
import { assign, get } from 'lodash'
import { Input } from '@material-tailwind/react'
const Home = () => {
  const navigate = useNavigate()
  const state = useLocalStore(() => ({
    createTravelData: {
      title: '',
      content: ''
    },
    update(value: never) {
      this.createTravelData = assign(this.createTravelData, value)
    }
  }))

  return (
    <div>
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            {/*<h1 className="mb-5 text-5xl font-bold">去旅行</h1>*/}
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div>
              <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input size="lg" label="Name" />
                  <Input size="lg" label="Email" />
                  <Input type="password" size="lg" label="Password" />
                </div>
              </form>
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
                defaultValue={state.createTravelData.title}
                onInput={(i) => {
                  console.log(i)
                  state.createTravelData
                }}
              />
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
                defaultValue={state.createTravelData.content}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('/travel/edit')
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <Schedule />
      <Footer />
    </div>
  )
}
export default Home
