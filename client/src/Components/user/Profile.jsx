import { useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {setUser} from '../../Store/UserSlice'
import img from '../../../public/images/profile.jpg'
import './profile.css';
const Profile = () => {
    const dispatch=useDispatch()
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const user= useSelector((state)=>state.user)
    useEffect(()=>{
        if(user.profileImage){
            setImageURL(user.profileImage)
        }
    },[])
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
            dispatch(setUser({name:user.name,email:user.email,profileImage:res.data.profileImage}))
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    return (
        <div className="page-content page-container center-content" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                         <img className="rounded-circle" width={100} height={100} style={{objectFit:'cover'}} alt="avatar1" src={imageURL?`../../../public/uploads/${imageURL}`:img} />
                                        </div>
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            <i className="mdi mdi-upload"></i> Upload Image
                                        </label>
                                        <input id="file-upload" type="file" onChange={handleFileChange} />
                                        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8 p-">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400"> {user?user.email:''} </h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Name</p>
                                                <h6 className="text-muted f-w-400 "> {user?user.name:''} </h6>
                                            </div>
                                             <div className=''>
                                             </div>
                                          <div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
