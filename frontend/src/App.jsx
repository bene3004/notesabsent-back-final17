import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/ui/navbar.jsx';
import LogInPage from './pages/LogInPage.jsx';
import NotePage from './pages/NotePage.jsx';
import axios from 'axios';

const AUTH_VALIDATE_URL = 'http://localhost:8080/validate'

export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(AUTH_VALIDATE_URL, { withCredentials: true })
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false));
    }, []);

    const handleAuthSuccess = () => {
        setIsAuth(true);
        navigate('/notes');
    };

    const handleAuthLogout = () => {
        setIsAuth(false);
        navigate('/login');
    };

    return (
        <>
            <Navbar onLogout={handleAuthLogout}/>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuth
                            ? <Navigate to="/notes" replace />
                            : <LogInPage onAuthSuccess={handleAuthSuccess} />
                    }
                />

                <Route
                    path="/notes"
                    element={
                        isAuth
                            ? <NotePage />
                            : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </>
    );
}