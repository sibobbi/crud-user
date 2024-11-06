import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from "./login.jsx";
import List from "./user/list.jsx";

import User from "./user/user.jsx";
import Edit from "./user/edit.jsx";
import Logout from "./logout.jsx";
const Main = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [show, setShow] = useState(true);

    return (
        <div>
            <Router>
            <nav>
                <ul>
                    <Link to="/users" hidden={!token}>Список</Link>
                    <br/>
                    <Link to="/login" hidden={token}>Логин</Link>
                    <br/>
                    <Link to="/logout" hidden={!token}>Выход</Link>
                </ul>
            </nav>
                <Routes>
                    <Route path='/users' element={<List/>}></Route>
                    <Route path='/users/:uuid' element={<User/>}></Route>
                    <Route path='/users/edit/:uuid' element={<Edit/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/logout' element={<Logout/>}></Route>
                    <Route path='/*' element={<List/>}></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default Main;
