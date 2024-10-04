import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Store/UserSlice';

const url = `http://localhost:3000`;

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!isLogin && trimmedName.length < 3) {
      setMessage('Name should be at least 3 letters long.');
      setIsError(true);
      return false;
    }
    if (trimmedPassword.length < 6) {
      setMessage('Password should be at least 6 letters long.');
      setIsError(true);
      return false;
    }
    const validDomains = ['icloud.com', 'outlook.com', 'yahoo.com', 'gmail.com'];
    const emailParts = trimmedEmail.split('@');
    if (emailParts.length !== 2 || emailParts[0].length === 0 || !validDomains.includes(emailParts[1])) {
      setMessage('Email should contain a valid domain: "iCloud.com", "Outlook.com", "Yahoo.com", or "Gmail.com".');
      setIsError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      setMessage('Email is required.');
      setIsError(true);
      return;
    }
    if (!trimmedPassword) {
      setMessage('Password is required.');
      setIsError(true);
      return;
    }
    if (!isLogin && !trimmedName) {
      setMessage('Name is required.');
      setIsError(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    const userData = {
      email: trimmedEmail,
      password: trimmedPassword
    };

    if (!isLogin) {
      userData.name = trimmedName;
    }

    try {
      let response;
      if (isLogin) {
        response = await axios.post(`${url}/api/login`, userData);
        if (response.data.notMatch) {
          setIsError(true);
          setMessage(response.data.notMatch);
        } else if (response.data.success) {
          setIsError(false);
          let img = response.data.user.profileImage ? response.data.user.profileImage : null;
          dispatch(setUser({ name: response.data.user.name, email: response.data.user.email, profileImage: img, id: response.data.user._id }));
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      } else {
        response = await axios.post(`${url}/api/signup`, userData);
        if (response.data.error) {
          setMessage(response.data.error);
          setIsError(true);
        } else {
          setMessage(response.data.message);
          setIsError(false);
          setEmail('');
          setName('');
          setPassword('');
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
    setMessage('');
    setIsError(false);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">{isLogin ? 'Login' : 'Sign Up'}</h2>
                  <p className={isError ? 'text-danger' : 'text-success'}>{message}</p>
                  {!isLogin && (
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="text" id="typeName" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} />
                      <label className="form-label" htmlFor="typeName">Name</label>
                    </div>
                  )}
                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>
                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>
                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>{isLogin ? 'Login' : 'Sign Up'}</button>
                </div>
                <div>
                  <p className="mb-0">{isLogin ? "Don't have an account? " : 'Already have an account? '}<button className="text-white-50 fw-bold btn" onClick={handleSwitch}>{isLogin ? 'Sign Up' : 'Login'}</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
