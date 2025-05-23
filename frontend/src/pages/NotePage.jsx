import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8081';

export default function NotePage() {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({ heading: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [fetchedNote, setFetchedNote] = useState(null);

    useEffect(() => {
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        try {
            const res = await axios.get(`${API_BASE}/notes`);
            setNotes(res.data.data); // Response: { total, page, limit, data }
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    const getNoteById = async (id) => {
        if (!id) return;
        try {
            const res = await axios.get(`${API_BASE}/notes/${id}`);
            setFetchedNote(res.data);
        } catch (err) {
            console.error('Error fetching note by ID:', err);
            setFetchedNote(null);
        }
    };

    const addNote = async () => {
        try {
            await axios.post(`${API_BASE}/notes`, currentNote);
            setCurrentNote({ heading: '', description: '' });
            getAllNotes();
        } catch (err) {
            console.error('Error adding note:', err);
        }
    };

    const updateNote = async () => {
        if (!editingId) return;
        try {
            await axios.put(`${API_BASE}/notes/${editingId}`, currentNote);
            setEditingId(null);
            setCurrentNote({ heading: '', description: '' });
            getAllNotes();
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_BASE}/notes/${id}`);
            getAllNotes();
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editingId ? updateNote() : addNote();
    };

    const startEdit = (note) => {
        setEditingId(note.id);
        setCurrentNote({ heading: note.heading, description: note.description });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Notemanagement</h1>
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Heading"
                    value={currentNote.heading}
                    onChange={(e) => setCurrentNote({ ...currentNote, heading: e.target.value })}
                    className="border p-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={currentNote.description}
                    onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
                    className="border p-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editingId ? 'Update' : 'Add'}
                </button>
            </form>

            <section className="mb-6">
                <h2 className="text-xl mb-2">All Notes</h2>
                {notes.length === 0 ? (
                    <p>No Notes found.</p>
                ) : (
                    <ul>
                        {notes.map((note) => (
                            <li key={note.id} className="mb-2 flex items-center justify-between">
                                <div>
                                    <strong>{note.heading}</strong>: {note.description}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(note)} className="text-yellow-600">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteNote(note.id)} className="text-red-600">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2 className="text-xl mb-2">Notes for ID</h2>
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Note-ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={() => getNoteById(searchId)} className="bg-green-500 text-white p-2 rounded">
                        Search
                    </button>
                </div>
                {fetchedNote && (
                    <div className="mt-4 p-2 border rounded">
                        <h3 className="font-bold">{fetchedNote.heading}</h3>
                        <p>{fetchedNote.description}</p>
                    </div>
                )}
            </section>
        </div>
    );
}