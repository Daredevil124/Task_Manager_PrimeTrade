import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const Profile = () => {
    const { user, login } = useContext(AuthContext); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setName(data.Name);
                    setEmail(data.email);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/auth/me', { Name: name });
            const data = await res.json();
            
            if (res.ok) {
                alert("Profile Updated Successfully");
             
                const token = localStorage.getItem('token');
                login({ token, user: data.user }); 
            } else {
                alert(data.message || "Update failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
             <nav className="bg-white shadow p-4 mb-8">
                <div className="container mx-auto">
                    <Link to="/" className="text-blue-500 hover:underline">← Back to Dashboard</Link>
                </div>
            </nav>

            <div className="container mx-auto p-4 max-w-lg">
                <div className="bg-white p-8 rounded shadow">
                    <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email (Read-only)</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;