import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const url = `http://localhost:3000/admin`;

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Password validation
        if (trimmedPassword.length < 6) {
            setMessage('Password should be at least 6 characters long.');
            setIsError(true);
            return;
        }

        // Email validation
        const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
        const emailParts = trimmedEmail.split('@');
        if (emailParts.length !== 2 || emailParts[0].length === 0 || !validDomains.includes(emailParts[1])) {
            setMessage('Email should be from Gmail, Yahoo, Outlook, or iCloud domains.');
            setIsError(true);
            return;
        }

        const adminData = {
            email: trimmedEmail,
            password: trimmedPassword
        };

        try {
            const response = await axios.post(`${url}/adminlogin`, adminData);

            if (response.data.message) {
                setIsError(true);
                setMessage(response.data.message);
            } else if (response.data.success) {
                setIsError(false);
                localStorage.setItem('admintoken', response.data.token);
                navigate('/admin');
            }
        } catch (error) {
            console.error(error);
            setMessage('Login failed. Please check your credentials.');
            setIsError(true);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                    <p className={isError ? 'text-danger' : 'text-success'}>{message}</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-outline-light btn-lg px-5"
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;
