import React, { createContext, useContext, useState, useEffect } from 'react';

// Контекст авторизации
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    const isAuthenticated = !!authToken;

    return (
        <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста в компонентах
export const useAuth = () => useContext(AuthContext);
