import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { uuid } = useParams();
    const [user, setUser] = useState({ name: '', last_name: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error('Не удалось загрузить данные');
                }

                setUser(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [uuid]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        try {

            const response = await axios.put(
                `http://127.0.0.1:8000/api/users/${uuid}`,
                {
                    name: user.name,
                    last_name: user.last_name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                navigate('/users');
            }
        } catch (error) {
            setError('Ошибка при обновлении данных');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="login-form">
            <h2>Редактирование</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}  {}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Введите имя"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Фамилия</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={user.last_name}
                        onChange={handleChange}
                        placeholder="Введите фамилию"
                    />
                </div>

                <button type="submit">Изменить</button>
            </form>
        </div>
    );
};

export default User;
