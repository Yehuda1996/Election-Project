import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loginUser } from '../../store/features/userSlice/userSlice';

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({username, password}));  
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
            <input type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login