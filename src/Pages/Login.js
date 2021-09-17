import React from 'react';
import LoginForm from '../Components/LoginForm';

function Login({ setToken }) {

    const initialValues = {
        username: "",
        password: "",
    };

    return (
        <div>
            <h1 style={{marginTop:"20px"}}>Turing Tech Test </h1>
            <LoginForm
                initialValues={initialValues}
                setToken={setToken}
            />
        </div>
    );
}

export default Login;