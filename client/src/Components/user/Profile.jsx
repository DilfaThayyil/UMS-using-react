import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../Store/UserSlice';
import img from '../../../public/images/profile.jpg';
import './profile.css'; 

const Profile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.profileImage) {
      setImageURL(user.profileImage);
    }
  }, [user]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageURL(res.data.profileImage);
      dispatch(setUser({ name: user.name, email: user.email, profileImage: res.data.profileImage }));
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="page-content page-container center-content" id="page-content">
      <div className="profile-container">
        <div className="card user-card">
          <div className="row">
            <div className="col-sm-4 profile-left">
              <div className="profile-block text-center text-white">
                <div className="profile-img-container">
                  <img
                    className="rounded-circle profile-img"
                    alt="avatar"
                    src={imageURL ? `../../../public/uploads/${imageURL}` : img}
                  />
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <i className="mdi mdi-upload"></i> Change Avatar
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange} />
              </div>
            </div>
            <div className="col-sm-8 profile-right">
              <div className="card-block">
                <h6 className="section-title">Personal Information</h6>
                <div className="info-col">
                  <div className="info-row">
                    <p className="label-text">Name</p>
                    <h6 className="info-text"> {user ? user.name : ''} </h6>
                  </div>
                  <div className="info-row">
                    <p className="label-text">Email</p>
                    <h6 className="info-text"> {user ? user.email : ''} </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
