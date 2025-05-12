import { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_AUTH_API}/signup`, {username, password})
            alert(`Signup successfully`)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUp