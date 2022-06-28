import { useState } from "react";
import { Link } from "react-router-dom";

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
import { DELETE_CAUSE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import PointsModal from "../components/PointsModal";
import UpdateCauseModal from "../components/UpdateCauseModal";

const UserDashboard = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  
  const userData = data?.me || {};
  const userCauses = userData.causes;

  const [isUpdateCauseModalOpen, setIsUpdateCauseModalOpen] = useState(false);
  const toggleUpdateCauseModal = () => {
    setIsUpdateCauseModalOpen(!isUpdateCauseModalOpen);
  };

  const [deleteCause, { error }] = useMutation(DELETE_CAUSE);
  const [currentCauseId, setCurrentCauseId] = useState("");
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const togglePointsModal = () => {
    setIsPointsModalOpen(!isPointsModalOpen);
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
          />

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
