import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Me } from '../pages/Me'
import { Main } from '../pages/Main'
import { Users } from 'pages/Main/Users'
import { Books } from 'pages/Main/Books'
import Supplier from 'pages/Main/Supplier'
import Dashboard from 'pages/Main/Dashboard'
export const router = createHashRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true,
        path: 'dashboard',
        Component: Dashboard
      },
      {
        path: 'users',
        Component: Users
      },
      {
        path: 'supplier',
        Component: Supplier
      },
      {
        path: 'books',
        Component: Books
      }
    ]
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/me',
    element: <Me />
  }
])
