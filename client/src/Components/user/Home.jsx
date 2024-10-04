import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './Home.css';

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="container mt-5 home-container">
      <div className="welcome-box">
        <h1 className="greeting-text">Hey {user.name || 'Buddy'},</h1>
        <h3 className="sub-heading">Welcome Home! 🌸</h3>
      </div>
    </div>
  );
}

export default Home;
