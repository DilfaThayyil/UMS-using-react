import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserDetailsModal from './UserDetailsModal';
import CreateUserModal from './CreateUserModal';
import './AdminHome.css';
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
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(`${url}/admin/allusers`);
      setUserData(response.data.userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch user data!',
      });
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.post(`${url}/admin/deleteUser`, { userId });
      setUserData(userData.filter(user => user._id !== userId));
      Swal.fire(
        'Deleted!',
        'The user has been deleted.',
        'success'
      );
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the user.',
      });
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#a3a3a3',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
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
    <div className="container-xl admin-home-container">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>User <b>Management</b></h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <div className="button-group">
                  <button onClick={handleShowCreateUser} className="btn btn-create ms-3" title='Add new user'>
                    <i className="material-icons">&#xE147;</i> <span></span>
                  </button>
                  <button onClick={logout} className='btn btn-logout ms-3' title='Logout Admin'>
                    <i className="material-icons">&#xE879;</i> 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover girlish-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="user-name">
                      <img
                        src={user.profileImage ? `${url}/uploads/${user.profileImage}` : defaultImg}
                        className="avatar me-2"
                        alt="Profile"
                      />
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td className='d-flex justify-content-center align-items-center'>
                      <div onClick={() => handleShowUserDetails(user)} role='button' className="action-icon me-3" title="View Details">
                        <i className="material-icons">edit</i>
                      </div>
                      <div onClick={() => handleDelete(user._id)} role='button' className="action-icon delete-icon" title="Delete User">
                        <i className="material-icons">&#xE872;</i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No users found.</td>
                </tr>
              )}
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
