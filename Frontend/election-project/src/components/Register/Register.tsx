import React, {useState} from 'react'
import { useDispatch } from 'react-redux' 
import { AppDispatch } from '../../store/store';
import { registerUser } from '../../store/features/userSlice/userSlice';



const Register: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser({username, password}));
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
            placeholder='Passowrd'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register