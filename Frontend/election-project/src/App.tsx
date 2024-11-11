import React from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import {Routes, Route} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route
          path="/"
          element={
          <ProtectedRoute>
            </>
          </ProtectedRoute>
        }
      /> */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
    </div>
  )
}

export default App