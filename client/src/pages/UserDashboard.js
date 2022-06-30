import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPenToSquare,
  faHeart,
  faStar,
  faCartShopping,
  faTrash,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useQuery, useMutation } from "@apollo/client";
import { DELETE_CAUSE, UPDATE_USER, DELETE_USER } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import PointsModal from "../components/PointsModal";
import UpdateCauseModal from "../components/UpdateCauseModal";

const UserDashboard = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [currentCauseId, setCurrentCauseId] = useState("");
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [isUpdateCauseModalOpen, setIsUpdateCauseModalOpen] = useState(false);
  const [currentCause, setCurrentCause] = useState({});

  const { loading, data, refetch } = useQuery(QUERY_ME);

  const [updateUser, { updateUserError }] = useMutation(UPDATE_USER);
  const [deleteUser, { deleteUserError }] = useMutation(DELETE_USER);
  const [deleteCause, { error }] = useMutation(DELETE_CAUSE);

  const userData = data?.me || {};
  const userCauses = userData.causes;
  const logout = () => {
    Auth.logout();
  };

  const toggleUpdateCauseModal = () => {
    setIsUpdateCauseModalOpen(!isUpdateCauseModalOpen);
  };

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { username, email, password, pwConfirm } = formState;

  const togglePointsModal = () => {
    setIsPointsModalOpen(!isPointsModalOpen);
  };
  const handleSettings = () => {
    setSettings(!settings);
  };
  const handleUpdateProfile = () => {
    setUpdateProfile(!updateProfile);
  };
  const handleDeleteProfile = () => {
    setDeleteProfile(!deleteProfile);
  };
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
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
          cause={currentCause}
        />
      )}

      

      <div className="dashboard-flex">
        <h2>{userData.username}'s Dashboard</h2>

        <FontAwesomeIcon
          icon={faGear}
          className="icon"
          onClick={handleSettings}
        />
      </div>

      {(() => {
        if (settings) {
          return (
            <div className="card">
              <div className="post-comment-card">
      
                <h3><center>What would you like to do?</center></h3>

                <div className="settings">
                <button 
                  className="edit-btn"
                  onClick={handleUpdateProfile}>Edit Profile
                </button>
                <button 
                  className="delete-btn"
                  onClick={handleDeleteProfile}>Delete Account
                </button>
                </div>

                {(() => {
                  if (updateProfile) {
                    return (
                      <div>
                        <h3>Update your profile:</h3>
                        <p>
                          Fill out all fields you would like to change (you may
                          leave them empty).
                        </p>
                        <label htmlFor="Username">New Username</label>
                        <input
                          className="input"
                          onChange={handleChange}
                          name="username"
                          placeholder={userData.username}
                        ></input>
                        <label htmlFor="Email">New Email</label>
                        <input
                          className="input"
                          onChange={handleChange}
                          name="email"
                          placeholder={userData.email}
                        ></input>
                        <label htmlFor="Password">New Password</label>
                        <input
                          className="input"
                          onChange={handleChange}
                          name="password"
                          placeholder="*******"
                          type="password"
                        ></input>
                        <label htmlFor="pwConfirm">Confirm New Password</label>
                        <input
                          onChange={handleChange}
                          name="pwConfirm"
                          placeholder="*******"
                          type="password"
                        ></input>

                        {(() => {
                          if (
                            formState.pwConfirm &&
                            formState.password != formState.pwConfirm
                          ) {
                            return (
                              <div>
                                <p>Passwords don't match</p>
                              </div>
                            );
                          } else {
                            return (
                              <button
                                className="submit-btn"
                                onClick={() => {
                                  handleSettings();
                                  updateUser({
                                    variables: {
                                      username: formState.username,
                                      email: formState.email,
                                      password: formState.password,
                                    },
                                  });
                                }}
                              >
                                Submit
                              </button>
                            );
                          }
                        })()}
                      </div>
                    );
                  }
                  if (deleteProfile) {
                    return (
                      <div><center>
                        <h4>
                          Are you sure you want to permanently delete your
                          account?
                        </h4>

                        <Link to="/">
                          <button
                            className="delete-btn"
                            onClick={() => {
                              deleteUser({
                                variables: { userId: userData._id },
                              });
                              logout();
                            }}
                          >
                            Yes
                          </button>
                        </Link>
                        </center>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          );
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
        <div className="card" key={userCause._id}>
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
                setCurrentCause(userCause);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <h3>{userCause.title}</h3>
            <p className="date">Posted June 16, 2022</p>
            <p>{userCause.description}</p>
            <div className="location">{userCause.location}</div>
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
                <FontAwesomeIcon icon={faMessage} className="icon" />
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
