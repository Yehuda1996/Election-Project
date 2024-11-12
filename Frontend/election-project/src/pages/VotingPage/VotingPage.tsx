import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates } from '../../store/features/candidateSlice/candidateSlice';
import { castVote, selectVoteState, resetVoteState } from '../../store/features/voteSlice/voteSlice';
import { logout } from '../../store/features/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

const VotingPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { candidates } = useSelector((state: RootState) => state.candidate);
    const { successMessage, error, loading } = useSelector(selectVoteState) || {}; 
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            alert(successMessage);
            dispatch(resetVoteState());
        }
        if (error) {
            alert(`Error: ${error}`);
            dispatch(resetVoteState());
        }
    }, [successMessage, error, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleVote = (candidateId: string | null) => {
        if (user && user._id) {
            dispatch(castVote({ userId: user._id, candidateId }));
        } else {
            alert("User  not found or not logged in.");
        }
    };

    return (
        <div>
            <h1>Vote for your new Defense Against the Dark Arts Professor</h1>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate._id}>
                        <img src={candidate.image} alt={candidate.name} />
                        <h3>{candidate.name}</h3>
                        {user && user.votedFor === candidate._id ? (
                            <button
                                onClick={() => handleVote(null)} 
                                disabled={loading}
                            >
                                Revoke Vote
                            </button>
                        ) : (
                            <button
                                onClick={() => handleVote(candidate._id)}
                                disabled={loading}
                            >
                                Vote
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingPage;