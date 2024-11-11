import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../../components/Login/Login'

const LoginPage: React.FC = () => {
  return (
    <div>
        <h1>Login Page</h1>
        <Login/>
        <p className="switch-auth">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default LoginPage