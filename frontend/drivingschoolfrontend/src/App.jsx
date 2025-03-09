import React from 'react'
import LandingPage from './Pages/LandingPage'
import Login from './Components/Login/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <div>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App
