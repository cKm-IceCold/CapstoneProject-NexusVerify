import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RedirectHandler() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        // If user just signed in via redirect and we're on login/register page, redirect to profile
        if (currentUser && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
            console.log("Redirect handler: User authenticated, navigating to profile");
            navigate('/profile');
        }
    }, [currentUser, navigate]);

    return null; // This component doesn't render anything
}

export default RedirectHandler;
