import { useState } from 'react'
import axios from 'axios'

const LogIn = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_AUTH_API}/login`, {username, password}, { withCredentials: true })
            onLogin()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <h2>Log In</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogIn}>Log In</button>
        </div>
    )
}

export default LogIn