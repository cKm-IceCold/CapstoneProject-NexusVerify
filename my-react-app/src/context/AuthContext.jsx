import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth).then(() => {
            setUserRole(null);
            localStorage.removeItem('backend_token');
        });
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        console.log("Starting Google Sign-In...");

        // Detect if user is on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            console.log("Mobile detected, using signInWithRedirect");
            return signInWithRedirect(auth, provider);
        } else {
            console.log("Desktop detected, using signInWithPopup");
            return signInWithPopup(auth, provider);
        }
    }

    const fetchUserRole = async () => {
        const token = localStorage.getItem('backend_token');
        if (!token) return;
        try {
            const response = await fetch('https://backendcapstone-mhh2.onrender.com/api/users/me/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserRole(data.role);
            }
        } catch (err) {
            console.error("Failed to fetch role:", err);
        }
    };

    useEffect(() => {
        // Handle redirect result for mobile Google Sign-In
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    console.log("Redirect sign-in successful:", result.user.email);
                    // Sync with backend
                    try {
                        const response = await fetch('https://backendcapstone-mhh2.onrender.com/api/users/social_login/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: result.user.email })
                        });
                        if (response.ok) {
                            const data = await response.json();
                            localStorage.setItem('backend_token', data.token);
                            await fetchUserRole();
                        }
                    } catch (err) {
                        console.warn("Backend social sync failed:", err);
                    }
                }
            } catch (error) {
                console.error("Redirect result error:", error);
            }
        };

        handleRedirectResult();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserRole();
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        login,
        signup,
        logout,
        googleSignIn,
        fetchUserRole
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
