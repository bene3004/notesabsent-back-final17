import { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = () => {
    const [comments, setComments] = useState([])
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')

    const getComments = async () => {
        const res = await axios.get(`${import.meta.env.VITE_NOTE_API}/comments`, { withCredentials: true })
        setComments(res.data.data)
    }

    const addComment = async () => {
        await axios.post(`${import.meta.env.VITE_NOTE_API}/comments`, {heading, description}, { withCredentials: true })
        getComments()
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <div>
            <h2>Comments</h2>
            <input placeholder={heading} onChange={e => setHeading(e.target.value)} />
            <input placeholder={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={addComment}>Add</button>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.heading}: {comment.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default CommentList()