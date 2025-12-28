import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
    signOut as firebaseSignOut,
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

    const API_BASE = 'https://backendcapstone-mhh2.onrender.com/api';

    // Django email/password signup
    async function signup(username, email, password, role = 'CUSTOMER') {
        try {
            const response = await fetch(`${API_BASE}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.email ? error.email[0] : 'Registration failed');
            }

            const data = await response.json();

            // Store token and set user
            if (data.token) {
                localStorage.setItem('backend_token', data.token);
                setCurrentUser({ email: data.email, username: data.username });
                setUserRole(data.role);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Django email/password login
    async function login(email, password) {
        try {
            const response = await fetch(`${API_BASE}/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const data = await response.json();
            localStorage.setItem('backend_token', data.token);

            // Fetch user details
            await fetchUserProfile();

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Logout (clear token and Firebase if Google was used)
    async function logout() {
        try {
            // If user signed in with Google, sign out from Firebase too
            if (auth.currentUser) {
                await firebaseSignOut(auth);
            }
        } catch (err) {
            console.log("Firebase sign out skipped:", err);
        }

        // Clear Django token
        localStorage.removeItem('backend_token');
        setCurrentUser(null);
        setUserRole(null);
    }

    // Google Sign-In (uses Firebase popup, then syncs with Django)
    async function googleSignIn() {
        const provider = new GoogleAuthProvider();

        // Force popup mode for all devices to avoid redirect timeout
        const isMobile = false;

        console.log("🔐 Starting Google Sign-In...");

        try {
            const result = await signInWithPopup(auth, provider);

            if (result?.user) {
                // Sync with Django backend
                const response = await fetch(`${API_BASE}/users/social_login/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: result.user.email })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('backend_token', data.token);
                    setCurrentUser({ email: data.email, username: data.username });
                    setUserRole(data.role);
                }
            }

            return result;
        } catch (error) {
            throw error;
        }
    }

    // Fetch user profile from Django
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('backend_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/users/me/`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser({ email: data.email, username: data.username });
                setUserRole(data.role);
            } else {
                // Invalid token, clear it
                localStorage.removeItem('backend_token');
                setCurrentUser(null);
                setUserRole(null);
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
            localStorage.removeItem('backend_token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check for existing token on mount
        fetchUserProfile();
    }, []);

    const value = {
        currentUser,
        userRole,
        login,
        signup,
        logout,
        googleSignIn,
        fetchUserRole: fetchUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
