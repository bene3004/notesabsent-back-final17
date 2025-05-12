import { useState, useEffect } from 'react'
import axios from 'axios'

const NoteList = () => {
    const [notes, setNotes] = useState([])
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')

    const getNotes = async () => {
        const res = await axios.get(`${import.meta.env.VITE_NOTE_API}/notes`, { withCredentials: true })
        setNotes(res.data.data)
    }

    const addNote = async () => {
        await axios.post(`${import.meta.env.VITE_NOTE_API}/notes`, {heading, description}, { withCredentials: true })
        getNotes()
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div>
            <h2>Notes</h2>
            <input placeholder={heading} onChange={e => setHeading(e.target.value)} />
            <input placeholder={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={addNote}>Add</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.heading}: {note.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default NoteList()