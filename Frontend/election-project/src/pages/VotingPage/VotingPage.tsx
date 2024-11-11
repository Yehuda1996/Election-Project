import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates } from '../../store/features/candidateSlice/candidateSlice';
import { logout } from '../../store/features/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';


const VotingPage: React.FC = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {candidates} = useSelector((state: RootState) => state.candidate)

    useEffect(() => {
        dispatch(fetchCandidates());
    },[dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    const handleVote = () => {
        
    }

  return (
    <div>
        <h1>Vote for your new Defense against the Dark Arts Professor</h1>
        <button onClick={handleLogout}>Logout</button>
        <ul>
            {candidates.map((candidate: any) => {
                <li key={candidate._id}>
                    <img src={candidate.image} alt={candidate.name} />
                    <h3>{candidate.name}</h3>
                    <button onClick={handleVote}>Vote</button>
                </li>
            })}
        </ul>
    </div>
  )
}

export default VotingPage