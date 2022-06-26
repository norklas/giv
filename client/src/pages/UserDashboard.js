import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faHeart, faStar, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import PointsModal from "../components/PointsModal";


import icon3 from "../assets/DashboardIcon-3.svg";

const UserDashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const [points, setPoints] = useState(0);

  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const togglePointsModal = () => {
    setIsPointsModalOpen(!isPointsModalOpen);
  };

  const pointsModalToUserDash = (childData) => {
    setPoints(childData);
  };

  return (
    <div class="dashboard">
      {isPointsModalOpen && (
        <PointsModal
          pointsModalToUserDash={pointsModalToUserDash}
          onClose={togglePointsModal}
        />
      )}
      <h2>{userData.username}'s Dashboard</h2>

      <div class="dashboard-top">
        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon icon={faStar} className="dashboard-icon-1" />
          </div>

          <div class="right">
            {data ? (
              <h3>{userData.points + points}</h3>
            ) : (
              <h3>0</h3>
            )}
            <p>Total Points</p>
          </div>
        </div>

        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon icon={faHeart} className="dashboard-icon-2" />
          </div>

          <div class="right">
            <h3>2</h3>{" "}
            {/* this will be userData.causes.length once we get submission on causes done */}
            <p>Causes Posted</p>
          </div>
        </div>

        <div class="small-card">
          <div class="left">
            <FontAwesomeIcon icon={faCartShopping} className="dashboard-icon-3" />
          </div>

          <div class="right">
            <button class="buy-btn" onClick={() => togglePointsModal()}>
              Buy Points
            </button>
          </div>
        </div>
      </div>

      <h3>Your causes</h3>
      <div class="card">
        <div class="card-top">
        <button class="delete-btn edit">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button class="edit-btn edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <h3>Sample cause</h3>
          <p class="date">June 16, 2022</p>
          <p>Sample cause body</p>
        </div>
        <div class="card-bottom">
          <button class="category-btn disaster-relief">category</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
