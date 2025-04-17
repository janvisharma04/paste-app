import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Pastes from './components/pastes'
import Navbar from './components/navbar'
import Viewpaste from './components/viewpaste'
import Home from './components/home'
const router= createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <Navbar/>
        <Viewpaste/>
      </div>
    },
  ]
)

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
