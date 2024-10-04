import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserDetailsModal from './UserDetailsModal';
import CreateUserModal from './CreateUserModal';
import './Admin.css';
import defaultImg from '../../../public/images/profile.jpg';

const url = `http://localhost:3000`;

const AdminHome = () => {
  const [userData, setUserData] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('hjhjfggyhj');
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(`${url}/admin/allusers`);
      setUserData(response.data.userData);
      console.log(response.data.userData); // Add this line to check userData
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.post(`${url}/admin/deleteUser`, { userId });
      setUserData(userData.filter(user => user._id !== userId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        );
      }
    });
  };

  const handleShowUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleCloseUserDetails = () => setShowUserDetails(false);

  const handleShowCreateUser = () => setShowCreateUser(true);
  const handleCloseCreateUser = () => setShowCreateUser(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = userData.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const logout = () => {
    localStorage.removeItem('admintoken');
    navigate('/adminlogin');
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-5">
                <h2>User <b>Management</b></h2>
              </div>
              <div className="col-sm-7">
                <button onClick={logout} className='btn bg-danger text-light'>Logout</button>
                <button onClick={handleShowCreateUser} className="btn btn-secondary">
                  <i className="material-icons">&#xE147;</i> <span>Add New User</span>
                </button>
                <input
                  className="btn btn-secondary"
                  type="text"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <p role='button'>
                      <img
                        src={user.profileImage ? `../../../public/uploads/${user.profileImage}` : defaultImg}
                        className="avatar"
                        width={50}
                        height={50}
                        alt="Profile"
                      />
                      {user.name}
                    </p>
                  </td>
                  <td>{user.email}</td>
                  <td className='d-flex pb-5'>
                    <div onClick={() => handleShowUserDetails(user)} role='button' className="settings text-primary" title="Settings" data-toggle="tooltip">
                      <i className="material-icons">&#xE8B8;</i>
                    </div>
                    <div onClick={() => handleDelete(user._id)} role='button' className="delete text-danger" title="Delete" data-toggle="tooltip">
                      <i className="material-icons">&#xE5C9;</i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsModal show={showUserDetails} handleClose={handleCloseUserDetails} user={selectedUser} />
      <CreateUserModal show={showCreateUser} handleClose={handleCloseCreateUser} refreshUserData={fetchUserData} />
    </div>
  );
}

export default AdminHome;
