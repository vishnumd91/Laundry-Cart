import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useUser } from '../context/user';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [userProfile, setUserProfile] = useState({});
  const [photo, setPhoto] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/users`)
      .then((response) => {
        // console.log("API Response:", response.data.data[0]);
        setUserProfile(response.data.data[0]);
        //Testing
        // console.log("After fetching data: ",userProfile);
      })
      .catch((error) => {
        // console.error("Error fetching user details:", error);
        toast.error("Error fetching user details");
      });
  }, []);

  const handleLogout = () => {
    setUser({
      ...user,
      currUser: null,
      token: ""
    })
    localStorage.removeItem("currUser");
    toast.success("Logout Successfully!");
    navigate('/signin');
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const  data  = await axios.put(`${process.env.REACT_APP_API}/api/v1/users/update/${user.currUser._id}`, {photo});
      // console.log("data received while updating photo: ", data);
      if (!data.success) {
          toast.error(data.message);
          // toast.error("Error updating Profile Photo");
      } else {
          toast.success("Profile Photo Updated Successfully");        
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
};

  return (
    <>
      <Layout title={"User Profile - Laundry Cart"}>
        <div style={{height: "100vh"}}>
          <div className='user-profile-data'>
            <div className='sec1'>
              <div className='user-data'>
                <h3>Name: </h3>
                <h4>{userProfile.name}</h4>
              </div>

              <div className='user-data'>
                <h3>Email: </h3>
                <h4>{userProfile.email}</h4>
              </div>

              <div className='user-data'>
                <h3>Phone: </h3>
                <h4>{userProfile.phone}</h4>
              </div>
            </div>
            <div className='sec2'>
              <div className='user-data'>
                <h3>Address: </h3>
                <h4>{userProfile.address}</h4>
              </div>

              <div className='user-data'>
                <h3>District: </h3>
                <h4>{userProfile.district}</h4>
              </div>

              <div className='user-data'>
                <h3>State: </h3>
                <h4>{userProfile.state}</h4>
              </div>

              <div className='user-data'>
                <h3>Pincode: </h3>
                <h4>{userProfile.pincode}</h4>
              </div>  
            </div>
          </div>
          <div>
            {/* {photo ? photo.name : "Upload Photo"} */}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}          
            />
            <button className="update-btn" onClick={handleUpdate}>
                UPLOAD PHOTO
            </button>
          </div>

          <button className='logout-btn' onClick={handleLogout}>Logout</button>      
        
        </div>
      
      </Layout>
    </>
  )
}

export default UserProfile
