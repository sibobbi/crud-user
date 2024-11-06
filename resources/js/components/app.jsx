import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./main.jsx";


function App() {
    return (
        <div>
            <Main></Main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
