import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import Example from '../pages/test'
import { Me } from '../pages/Me'
import { Main } from '../pages/Main'
import { Users } from 'pages/Users'
import { Books } from 'pages/Books'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/test',
    element: <Example />
  },
  {
    path: '/users',
    element: <Users />
  },
  {
    path: '/books',
    element: <Books />
  },
  {
    path: '/me',
    element: <Me />
  }
])
