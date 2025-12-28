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

    // Logout - clear Django token
    async function logout() {
        localStorage.removeItem('backend_token');
        setCurrentUser(null);
        setUserRole(null);
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
        fetchUserRole: fetchUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
