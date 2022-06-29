import { useState } from "react";
import { Link, Router } from "react-router-dom";
import Auth from '../utils/auth'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPenToSquare,
  faHeart,
  faStar,
  faCartShopping,
  faTrash,
  faGear
} from "@fortawesome/free-solid-svg-icons";

import { useQuery, useMutation } from "@apollo/client";
import { DELETE_CAUSE, UPDATE_USER, DELETE_USER } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import PointsModal from "../components/PointsModal";
import UpdateCauseModal from "../components/UpdateCauseModal";

const UserDashboard = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [updateUser, {updateUserError}] = useMutation(UPDATE_USER)
  const [deleteUser, {deleteUserError}] = useMutation(DELETE_USER)
  const userData = data?.me || {};
  const userCauses = userData.causes;
  const logout = () => {
    Auth.logout()
  }
  const [isUpdateCauseModalOpen, setIsUpdateCauseModalOpen] = useState(false);
  const toggleUpdateCauseModal = () => {
    setIsUpdateCauseModalOpen(!isUpdateCauseModalOpen);
  };

  const [formState, setFormState] = useState({ username: '', email: '', password: '', passwordConfirm: '' })
  const { username, email, password, pwConfirm } = formState;
  const [updateProfile, setUpdateProfile] = useState(false)
  const [deleteProfile, setDeleteProfile] = useState(false)
  const [settings, setSettings] = useState(false)
  const [deleteCause, { error }] = useMutation(DELETE_CAUSE);
  const [currentCauseId, setCurrentCauseId] = useState("");
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const togglePointsModal = () => {
    setIsPointsModalOpen(!isPointsModalOpen);
  };
  const handleSettings = () => {
    setSettings(!settings)
  }
  const handleUpdateProfile = () => {
    setUpdateProfile(!updateProfile)
  }
  const handleDeleteProfile = () => {
    setDeleteProfile(!deleteProfile)
  }
  const handleChange = (event) => {
    setFormState({...formState, [event.target.name]: event.target.value })
};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      {isPointsModalOpen && <PointsModal onClose={togglePointsModal} />}
      {isUpdateCauseModalOpen && (
        <UpdateCauseModal
          onClose={toggleUpdateCauseModal}
          causeId={currentCauseId}
        />
      )}

      <h2>{userData.username}'s Dashboard </h2>
      <FontAwesomeIcon
            icon={faGear}
            className="icon"
            onClick={handleSettings}
          />
      
      {(() => {
          if(settings){
            return(
              <div className="card">
        <div className="post-comment-card">
      
              <button
              onClick={handleUpdateProfile}>Edit Profile</button>
              <button
              onClick={handleDeleteProfile}>Delete Account</button>

          {(() => {
            console.log(formState)
            if(updateProfile){
              return(
                <div>
                  <h3>Update your profile:</h3>
                  <p>Fill out all fields you would like to change (you may leave them empty).</p>
                  <label htmlFor="Username">New Username</label>
                  <input onChange={handleChange} name='username' placeholder={userData.username}></input>
                  <label htmlFor="Email">New Email</label>
                  <input onChange={handleChange} name='email' placeholder={userData.email}></input>
                  <label htmlFor="Password">New Password</label>
                  <input onChange={handleChange} name= 'password' placeholder="*******" type="password"></input>
                  <label htmlFor="pwConfirm">Confirm New Password</label>
                  <input onChange={handleChange} name= 'pwConfirm' placeholder="*******" type="password"></input>
                  
                  {(() => {
                    console.log(formState.password, formState.pwConfirm)
                    if(formState.pwConfirm && formState.password != formState.pwConfirm){
                      return(
                        <div>
                          <p>Passwords don't match</p>
                        </div>
                      )
                    }else{return(<button onClick={() => {handleSettings(); updateUser({
                      variables: {username: formState.username, email: formState.email, password: formState.password}
                    }) 
                    }

                    }>Submit</button>)}
                    
                    })()}
                  
                </div>
              )
            }if(deleteProfile){
              return(
                <div>
                  <h2>Account Deletion</h2>
                  <h3>Are you sure you want to permanently delete your account?</h3>
            
                  <Link to="/">
                  <button onClick={()=>{deleteUser({variables: {userId: userData._id}}); logout();}}
                  >Yes</button>
                  </Link>
                
                </div>
              )
            }

            })()}
            
        </div>
      </div>
            )
          }
      })()}
             

      <div className="dashboard-top">
        <div className="small-card">
          <div className="left">
            <FontAwesomeIcon icon={faStar} className="dashboard-icon-1" />
          </div>

          <div className="right">
            {data ? <h3>{userData.points}</h3> : <h3>0</h3>}
            <p>Total Points</p>
          </div>
        </div>

        <div className="small-card">
          <div className="left">
            <FontAwesomeIcon icon={faHeart} className="dashboard-icon-2" />
          </div>

          <div className="right">
            <h3>{userData.causes.length}</h3>
            <p>Causes</p>
          </div>
        </div>

        <div className="small-card">
          <div className="left">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="dashboard-icon-3"
            />
          </div>

          <div className="right">
            <button className="buy-btn" onClick={() => togglePointsModal()}>
              Buy Points
            </button>
          </div>
        </div>
      </div>

      

      <h3>Your causes</h3>
      {userCauses.map((userCause) => (
        <div className="card">
          <div className="card-top">
            <button
              className="delete-btn edit"
              onClick={() => {
                deleteCause({ variables: { causeId: userCause._id } });
                refetch();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className="edit-btn edit"
              onClick={() => {
                setCurrentCauseId(userCause._id);
                toggleUpdateCauseModal();
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <h3>{userCause.title}</h3>
            <p className="date">Posted June 16, 2022</p>
            <p>{userCause.description}</p>
            <div className="author">{userCause.location}</div>
            <button className="web-btn">Visit website</button>
          </div>
          <div className="card-bottom">
            <button className="category-btn disaster-relief">
              {userCause.category}
            </button>
            <div className="point-count">
              <FontAwesomeIcon icon={faStar} className="icon" />
              <div className="bottom-text">{userCause.points} Points</div>
            </div>
            <div className="comment-count">
              <Link to={`/cause/${userCause._id}`}>
                <FontAwesomeIcon
                  icon={faMessage}
                  className="icon"
                />
              </Link>
              <div className="bottom-text">
                {userCause.comments.length} Comments
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
