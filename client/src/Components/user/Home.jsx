import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux'

function Home() {
  const user=useSelector((state)=>state.user)

  console.log(user.name);
  return (
    <div className="container mt-5">
    <div className="text-center">
      <div className="alert" role="alert" style={{ height: '200px' }}>
        <h4 className="alert-heading">Welcome back {user.name} </h4>
        <p>Thank you for returning!</p>
      </div>
    </div>
  </div>
  )
}

export default Home
