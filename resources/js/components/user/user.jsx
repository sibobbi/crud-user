import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const { uuid } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/' + uuid,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status !== 200) {
                throw new Error('Не удалось загрузить данные');
            }
            const data = await response.data;
            setUser(data);
        } catch (err) {
            setError(err.message);
        }
    };
        fetchUser();
}, []);

    return (
        <div>
            <h1>Информация о пользователе {user.uuid}</h1>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Фамилия:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => navigate('/users')}>Назад</button>
        </div>
    );

};

export default User;
