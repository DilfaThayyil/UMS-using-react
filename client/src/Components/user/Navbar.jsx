
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {clearUser} from '../../Store/UserSlice'
const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logout=()=>{
    dispatch(clearUser())
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#563d7c' }}>
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand ms-5 text-light">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse me-5" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto me-5">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PROFILE
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to={'/profile'} className="dropdown-item " role='button' >
                    <i className="bi bi-person-circle me-2"></i> Profile
                  </Link>
                </li>
                <li>
                  <p role='button' className="dropdown-item"  onClick={logout}>
                    <i className="bi bi-box-arrow-left"></i><span className="ms-3">Log Out</span>
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

     

    </nav>

    </>
  );
};

export default Navbar;
