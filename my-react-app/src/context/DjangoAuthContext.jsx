import React, { useContext, useState, useEffect } from "react";

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
                throw new Error(error.email?.[0] || error.username?.[0] || "Signup failed");
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('backend_token', data.token);
                setCurrentUser({ email: data.email, username: data.username });
                setUserRole(data.role);
            }
            return data;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    }

    // FIXED LOGIN FUNCTION
    async function login(email, password) {
        try {
            console.log("Attempting login with:", email);

            const response = await fetch(`${API_BASE}/users/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Sending 'email' key to match the backend request.data.get('email')
                body: JSON.stringify({ email, password }) 
            });

            if (!response.ok) {
                const error = await response.json();
                // Check for different error formats
                const errorMessage = error.non_field_errors?.[0] || error.error || 'Invalid email or password';
                throw new Error(errorMessage);
            }

            const data = await response.json();
            localStorage.setItem('backend_token', data.token);

            // Set user data directly from login response
            if (data.user) {
                setCurrentUser({ email: data.user.email, username: data.user.username });
                setUserRole(data.user.role);
            } else {
                await fetchUserProfile();
            }

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async function logout() {
        localStorage.removeItem('backend_token');
        setCurrentUser(null);
        setUserRole(null);
    }

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
                localStorage.removeItem('backend_token');
                setCurrentUser(null);
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const value = { currentUser, userRole, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}