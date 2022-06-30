import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import DonateModal from "../DonateModal";

import goldmedal from "../../assets/medal-01.svg";
import silvermedal from "../../assets/medal-02.svg";
import bronzemedal from "../../assets/medal-03.svg";
import platmedal from "../../assets/medal-04.svg";

const SingleCause = (props) => {
  const { cause, loading } = props;

  let bronzes = 0;
  let silvers = 0;
  let golds = 0;
  let platinums = 0;

  const medalArr = cause.medals;

  for (let i = 0; i < medalArr.length; i++) {
    if (medalArr[i].body === "Bronze") {
      bronzes++;
    }
    if (medalArr[i].body === "Silver") {
      silvers++;
    }
    if (medalArr[i].body === "Gold") {
      golds++;
    }
    if (medalArr[i].body === "Platinum") {
      platinums++;
    }
  }

  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const toggleDonateModal = () => {
    setDonateModalOpen(!donateModalOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      {donateModalOpen && (
        <DonateModal
          onClose={toggleDonateModal}
          causeId={cause._id}
          title={cause.title}
        />
      )}
      <div className="card-top">
        <div className="medals">
          {(() => {
            if (platinums) {
              return (
                <div className="platmedal">
                  <img src={platmedal} alt="Platinum Medal" />
                  <span className="plat-amount">{platinums}</span>
                </div>
              );
            }
          })()}
          {(() => {
            if (golds) {
              return (
                <div className="goldmedal">
                  <img src={goldmedal} alt="Gold Medal" />
                  <span className="gold-amount">{golds}</span>
                </div>
              );
            }
          })()}
          {(() => {
            if (silvers) {
              return (
                <div className="silvermedal">
                  <img src={silvermedal} alt="Silver Medal" />
                  <span className="silver-amount">{silvers}</span>
                </div>
              );
            }
          })()}
          {(() => {
            if (bronzes) {
              return (
                <div className="bronzemedal">
                  <img src={bronzemedal} alt="Gold Medal" />
                  <span className="bronze-amount">{bronzes}</span>
                </div>
              );
            }
          })()}
        </div>

        <h3>{cause.title}</h3>
        <p className="date">Posted {cause.createdAt}</p>
        <p>
          {cause.description}
          {"  "}
          <Link to={`/cause/${cause._id}`}>Learn more.</Link>
        </p>
        <div className="author">{cause.location}</div>
      </div>

      <div className="card-bottom">
        <button className="category-btn disaster-relief">
          {cause.category}
        </button>
        <div className="point-count">
          <FontAwesomeIcon
            icon={faStar}
            className="icon"
            onClick={() => toggleDonateModal()}
          />
          <div className="bottom-text">{cause.points} Points</div>
        </div>
        <div className="comment-count">
          <Link to={`/cause/${cause._id}`}>
            <FontAwesomeIcon icon={faMessage} className="icon" />
          </Link>
          <div className="bottom-text">{cause.comments.length} Comments</div>
        </div>
      </div>
    </div>
  );
};

export default SingleCause;
