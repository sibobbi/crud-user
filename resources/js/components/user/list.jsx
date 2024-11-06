import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';  // Импортируем axios для запросов

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Для навигации после удаления

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
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

    // Функция для удаления пользователя
    const handleDelete = async (uuid) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/users/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                // Удаляем пользователя из состояния, чтобы обновить список
                setUsers(users.filter(user => user.uuid !== uuid));
            } else {
                alert('Не удалось удалить пользователя');
            }
        } catch (err) {
            console.error('Ошибка при удалении пользователя:', err);
            alert('Произошла ошибка при удалении пользователя: ' + err.response.data.message);
        }
    };

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
                    <li key={user.uuid} style={{ margin: '50px'}}>
                        <strong>{user.name}</strong> - {user.email} -
                        <Link to={`/users/${user.uuid}`}> Подробней </Link>
                        <Link to={`/users/edit/${user.uuid}`}> Редактировать</Link>
                        <button onClick={() => handleDelete(user.uuid)} style={{ marginLeft: '10px', width: '100px', backgroundColor: 'red' }}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
