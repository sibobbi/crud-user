import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import User from "./user.jsx";
const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsers = async () => {

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status !== 200) {
                    throw new Error('Не удалось загрузить данные');
                }
                const data = await response.data.data;
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map(user => (
                    <li key={user.uuid}>
                        <strong>{user.name}</strong> - {user.email} -
                        <Link to={`/users/${user.uuid}`}> Подробней </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
