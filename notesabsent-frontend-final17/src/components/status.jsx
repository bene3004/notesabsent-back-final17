import { useState, useEffect } from 'react'
import axios from 'axios'

const StatusList = () => {
    const [status, setStatus] = useState([])
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')

    const getStatus = async () => {
        const res = await axios.get(`${import.meta.env.VITE_NOTE_API}/status`, { withCredentials: true })
        setStatus(res.data.data)
    }

    const addStatus = async () => {
        await axios.post(`${import.meta.env.VITE_NOTE_API}/status`, {heading, description}, { withCredentials: true })
        getStatus()
    }

    useEffect(() => {
        getStatus()
    }, [])

    return (
        <div>
            <h2>Status</h2>
            <input placeholder={heading} onChange={e => setHeading(e.target.value)} />
            <input placeholder={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={addStatus}>Add</button>
            <ul>
                {status.map((status) => (
                    <li key={status.id}>{status.heading}: {status.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default StatusList()