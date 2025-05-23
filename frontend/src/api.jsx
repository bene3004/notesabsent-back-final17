import axios from 'axios';

const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
});

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
    withCredentials: true,
});

// auth
export const login    = (username, password) => authClient.post('/login',  { username, password });
export const signup   = (username, password) => authClient.post('/signup', { username, password });
export const validate = ()                     => authClient.get('/validate');

// generic entity helpers
const makeList    = entity => (page = 1, limit = 5) => apiClient.get(`/${entity}`, { params: { page, limit } });
const makeById    = entity => id             => apiClient.get(`/${entity}/${id}`);
const makeAdd     = entity => data           => apiClient.post(`/${entity}`, data);
const makeUpdate  = entity => (id, data)     => apiClient.put(`/${entity}/${id}`, data);
const makeDelete  = entity => id             => apiClient.delete(`/${entity}/${id}`);

export const getAllNotes     = makeList('notes');
export const getNoteByID     = makeById('notes');
export const addNote         = makeAdd('notes');
export const updateNote      = makeUpdate('notes');
export const deleteNote      = makeDelete('notes');

export const getAllComments  = makeList('comments');
export const getCommentByID  = makeById('comments');
export const addComment      = makeAdd('comments');
export const updateComment   = makeUpdate('comments');
export const deleteComment   = makeDelete('comments');

export const getAllStatus    = makeList('status');
export const getStatusByID   = makeById('status');
export const addStatus       = makeAdd('status');
export const updateStatus    = makeUpdate('status');
export const deleteStatus    = makeDelete('status');