import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Add external CSS

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

        if (trimmedPassword.length < 6) {
            setMessage('Password should be at least 6 characters long.');
            setIsError(true);
            return;
        }

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
        <section className="vh-100 gradient-custom-girlish">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-light text-dark girlish-card" style={{ borderRadius: '1.5rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase girlish-heading">Admin Login</h2>
                                    <p className={isError ? 'text-danger' : 'text-success'}>{message}</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-pink mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg girlish-input"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder=" "
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>
                                        <div className="form-outline form-pink mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg girlish-input"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder=" "
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-girlish btn-lg px-5"
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
