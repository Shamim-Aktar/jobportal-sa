import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import Home from './component/Home/'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Jobs from './component/Jobs'
import Browse from './component/Browse'
import Profile from './component/Profile'
import JobDescription from './component/JobDescription'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },

  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  }
])

function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
