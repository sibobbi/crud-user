import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');


    const token = localStorage.getItem('token');


    const fetchUsers = async (page = 1) => {
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/users?page=${page}&sortField=${sortField}&sortOrder=${sortOrder}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                const data = response.data;
                setUsers(data.data);
                setPagination(data);
                setCurrentPage(data.current_page);
            } else {
                throw new Error('Не удалось загрузить данные');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleDelete = async (uuid) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/users/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                setUsers(users.filter(user => user.uuid !== uuid));
            } else {
                alert('Не удалось удалить пользователя');
            }
        } catch (err) {
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

            <div>
                <label>Сортировать по: </label>
                <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
                    <option value="name">Имя</option>
                    <option value="last_name">Фамилия</option>
                    <option value="created_at">Дата создания</option>
                </select>

                <label> Направление: </label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </select>
               <br/>
                <button onClick={() => fetchUsers(currentPage)} style={{ width: '300px', margin: '50px 0px 20px 0px'}}>Применить сортировку</button>
                <br/>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.uuid} style={{ margin: '50px' }}>
                        <strong>{user.name}</strong> - {user.email} -
                        <Link to={`/users/${user.uuid}`}>
                            <button style={{marginLeft: '10px', width: '100px', backgroundColor: 'orange'}}>
                                Карточка
                            </button>
                        </Link>
                        <Link to={`/users/edit/${user.uuid}`}>
                            <button style={{marginLeft: '10px', width: '100px', backgroundColor: 'blue' }}>
                                Редактировать
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(user.uuid)}
                                style={{marginLeft: '10px', width: '100px', backgroundColor: 'red'}}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                {pagination.prev_page_url && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                        Назад
                    </button>
                )}
                <span>Страница {pagination.current_page} из {pagination.last_page}</span>
                {pagination.next_page_url && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                        Вперед
                    </button>
                )}
            </div>
        </div>
    );
};

export default UsersList;
