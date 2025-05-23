import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
});

// authentication
export const login = (username, password) =>
    client.post('/login', { username, password });
export const signup = (username, password) =>
    client.post('/signup', { username, password });
export const validate = () => client.get('/validate');

export const getAllNotes = (page = 1, limit = 5) =>
    client.get('/notes', { params: { page, limit } });
export const getNoteByID = id => client.get(`/notes/${id}`);
export const addNote = data => client.post('/notes', data);
export const updateNote = (id, data) => client.put(`/notes/${id}`, data);
export const deleteNote = id => client.delete(`/notes/${id}`);

export const getAllComments = (page = 1, limit = 5) =>
    client.get('/comments', { params: { page, limit } });
export const getCommentByID = id => client.get(`/comments/${id}`);
export const addComment = data => client.post('/comments', data);
export const updateComment = (id, data) => client.put(`/comments/${id}`, data);
export const deleteComment = id => client.delete(`/comments/${id}`);

export const getAllStatus = (page = 1, limit = 5) =>
    client.get('/status', { params: { page, limit } });
export const getStatusByID = id => client.get(`/status/${id}`);
export const addStatus = data => client.post('/status', data);
export const updateStatus = (id, data) => client.put(`/status/${id}`, data);
export const deleteStatus = id => client.delete(`/status/${id}`);