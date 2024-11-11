import React from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import VotingPage from './pages/VotingPage/VotingPage'
import ProtectedRoute from './components/ProtectedRoute'
import {Routes, Route} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/vote"
          element={
          <ProtectedRoute>
            <VotingPage/>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
    </div>
  )
}

export default App