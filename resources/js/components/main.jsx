import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from "./login.jsx";
import List from "./user/list.jsx";

import User from "./user/user.jsx";
import Edit from "./user/edit.jsx";
const Main = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <Router>
            <nav>
                <ul>
                    <li><Link to="/users">Список</Link></li>
                    <li><Link to="/login">Логин</Link></li>
                </ul>
            </nav>
                <Routes>
                    <Route path='/users' element={<List/>}></Route>
                    <Route path='/users/:uuid' element={<User/>}></Route>
                    <Route path='/users/edit/:uuid' element={<Edit/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='*' element={<h1>404</h1>}></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default Main;
