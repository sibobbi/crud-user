import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
