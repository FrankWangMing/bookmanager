import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import Example from '../pages/test'
import React from 'react'
import { Me } from '../pages/Me'
import { Main } from '../pages/Main' 
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
    path: '/me',
    element: <Me />
  }
])
