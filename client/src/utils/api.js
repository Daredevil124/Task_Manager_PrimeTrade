// Simple API wrapper
const API_BASE_URL = 'http://localhost:3000/api/v1'; // Adjusted to match server port

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    get: async (endpoint) => {
        console.log(`Fetching: ${API_BASE_URL}${endpoint}`);
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        return res;
    },
    post: async (endpoint, body) => {
        console.log(`Posting to: ${API_BASE_URL}${endpoint}`);
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return res;
    },
    put: async (endpoint, body) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return res;
    },
    delete: async (endpoint, body) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
            body: JSON.stringify(body), // Some delete ops might need body, though usually params
        });
        return res;
    }
};