import React, { useState } from 'react';
import axios from 'axios';

const AUTH_BASE = 'http://localhost:8080';

export default function LoginPage({ onAuthSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${AUTH_BASE}/login`,
                { username, password },
                { withCredentials: true }
            );
            setMessage('Login successful');
            onAuthSuccess && onAuthSuccess();
        } catch (err) {
            setMessage(err.response?.data?.error || 'Login failed');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${AUTH_BASE}/signup`,
                { username, password }
            );
            setMessage(res.data.message || 'Signup successful');
        } catch (err) {
            setMessage(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">
                {mode === 'login' ? 'Login' : 'Signup'}
            </h1>
            <form
                onSubmit={mode === 'login' ? handleLogin : handleSignUp}
                className="flex flex-col gap-4"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
            <div className="mt-4 text-center">
                {mode === 'login' ? (
                    <p>
                        No account yet?{' '}
                        <button
                            onClick={() => { setMode('signup'); setMessage(''); }}
                            className="text-blue-500 underline"
                        >
                            Signup
                        </button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <button
                            onClick={() => { setMode('login'); setMessage(''); }}
                            className="text-blue-500 underline"
                        >
                            Login
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}