import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = async () => {
        // Perform login and set token
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123',
        });
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/notes">Notes</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home handleLogin={handleLogin} />} />
                    <Route path="/notes" element={<Notes token={token} />} />
                </Routes>
            </div>
        </Router>
    );
};

const Home = ({ handleLogin }) => (
    <div>
        <h1>Home</h1>
        <button onClick={handleLogin}>Login</button>
    </div>
);

const Notes = ({ token }) => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:5000/api/notes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(response.data);
    };

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={fetchNotes}>Load Notes</button>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
