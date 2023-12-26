import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import Example from '../pages/test'
import React from 'react'
import { Me } from '../pages/Me'
import { Hero } from '../pages/Hero'
import { Travel } from '../projects/travel'
import { Editor } from '../projects/travel/editor'
import Home from '../projects/travel/Home'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />
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
    path: '/travel',
    element: <Travel />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'edit',
        element: <Editor />
      }
    ]
  },
  {
    path: '/me',
    element: <Me />
  }
])
