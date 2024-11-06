import React, { useState } from 'react';
import '../../css/main.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!email || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }


        const responce = await axios.post('http://127.0.0.1:8000/api/login',{
            email: email,
            password: password,
        });
        if (responce.status === 200) {
            localStorage.setItem('token', responce.data.token);

            setEmail('');
            setPassword('');
            setError('');
        }

    };

    return (
        <div className="login-form">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;
