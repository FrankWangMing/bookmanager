import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import 'index.css'
import { ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { client } from './service'
const BigSpinner = () => {
  return <div>123</div>
}

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} fallbackElement={<BigSpinner />} />
  </ApolloProvider>
)
