import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPenToSquare,
  faHeart,
  faStar,
  faCartShopping,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useQuery, useMutation } from "@apollo/client";
import { DELETE_CAUSE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import PointsModal from "../components/PointsModal";
import UpdateCauseModal from "../components/UpdateCauseModal";

const UserDashboard = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  console.log(userData);

  const userCauses = userData.causes;
  console.log(userCauses);

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
    <div class="dashboard">
      {isPointsModalOpen && <PointsModal onClose={togglePointsModal} />}
      {isUpdateCauseModalOpen && (
        <UpdateCauseModal
          onClose={toggleUpdateCauseModal}
          causeId={currentCauseId}
        />
      )}

      <h2>{userData.username}'s Dashboard</h2>

      <div class="dashboard-top">
        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon icon={faStar} className="dashboard-icon-1" />
          </div>

          <div class="right">
            {data ? <h3>{userData.points}</h3> : <h3>0</h3>}
            <p>Total Points</p>
          </div>
        </div>

        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon icon={faHeart} className="dashboard-icon-2" />
          </div>

          <div class="right">
            <h3>{userData.causes.length}</h3>
            <p>Causes</p>
          </div>
        </div>

        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="dashboard-icon-3"
            />
          </div>

          <div class="right">
            <button class="buy-btn" onClick={() => togglePointsModal()}>
              Buy Points
            </button>
          </div>
        </div>
      </div>

      <h3>Your causes</h3>
      {userCauses.map((userCause) => (
        <div class="card">
          <div class="card-top">
            <button
              class="delete-btn edit"
              onClick={() => {
                deleteCause({ variables: { causeId: userCause._id } });
                refetch();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              class="edit-btn edit"
              onClick={() => {
                setCurrentCauseId(userCause._id);
                toggleUpdateCauseModal();
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <h3>{userCause.title}</h3>
            <p class="date">June 16, 2022</p>
            <p>{userCause.description}</p>
            <div className="author">{userCause.location}</div>
            <button class="web-btn">Visit website</button>
          </div>
          <div class="card-bottom">
            <button class="category-btn disaster-relief">
              {userCause.category}
            </button>
            <div className="point-count">
              <FontAwesomeIcon icon={faStar} className="icon" />
              <div className="bottom-text">{userCause.points} Points</div>
            </div>
            <div className="comment-count">
              <FontAwesomeIcon icon={faMessage} className="icon" />
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
