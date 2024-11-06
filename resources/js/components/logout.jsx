import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
   localStorage.removeItem('token');
    const navigate = useNavigate();
    navigate('/login');
    return (
        <div className="login-form">

        </div>
    );
};

export default User;
