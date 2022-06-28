import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import DonateModal from "../DonateModal";
import CommentList from "../CommentList";

import goldmedal from "../../assets/medal-01.svg";
import silvermedal from "../../assets/medal-02.svg";
import bronzemedal from "../../assets/medal-03.svg";

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
    } else {
      platinums++;
    }
  }
  console.log(bronzes, silvers, golds, platinums);

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationNumber, setDonationNumber] = useState(0);

  const toggleDonateModal = () => {
    setDonateModalOpen(!donateModalOpen);
  };

  const donateModalToSingleCause = (childData) => {
    console.log(childData);
    setDonationNumber(childData);
  };

  const [commentListOpen, setCommentListOpen] = useState(false);
  const toggleCommentList = () => {
    setCommentListOpen(!commentListOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      {donateModalOpen && (
        <DonateModal
          onClose={toggleDonateModal}
          donateModalToSingleCause={donateModalToSingleCause}
          causeId={cause._id}
          title={cause.title}
        />
      )}
      <div className="card-top">
        {(() => {
          if (bronzes) {
            return (
              <div>
                <img
                  src={bronzemedal}
                  className="bronzemedal"
                  alt="Gold Medal"
                />
                <p>Bronze: {bronzes}</p>
              </div>
            );
          }
        })()}
        {(() => {
          if (silvers) {
            return (
              <div>
                <img
                  src={silvermedal}
                  className="silvermedal"
                  alt="Silver Medal"
                />
                <p>Silver: {silvers}</p>
              </div>
            );
          }
        })()}
        {(() => {
          if (golds) {
            return (
              <div>
                <img src={goldmedal} className="goldmedal" alt="Gold Medal" />
                <p>Gold: {golds}</p>
              </div>
            );
          }
        })()}
        {(() => {
          if (platinums) {
            return (
              <div>
                <img
                  src={silvermedal}
                  className="platmedal"
                  alt="Platinum Medal"
                />
                <p>Platinum: {platinums}</p>
              </div>
            );
          }
        })()}
        <h3>{cause.title}</h3>
        <p className="date">June 16, 2022</p>
        <p>
          {cause.description}{" "}
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
          <div className="bottom-text">
            {cause.points + donationNumber} Points
          </div>
        </div>
        <div className="comment-count">
          <FontAwesomeIcon
            icon={faMessage}
            className="icon"
            onClick={() => toggleCommentList()}
          />
          <div className="bottom-text">{cause.comments.length} Comments</div>
        </div>
      </div>
      {commentListOpen && <CommentList comments={cause.comments} />}
    </div>
  );
};

export default SingleCause;
