import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import CommentList from "../components/CommentList";
import AuthService from "../utils/auth";
import { pluralize } from "../utils/helpers";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { QUERY_CAUSE, QUERY_ME } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const SingleCause = () => {
  const { causeId: causeParam } = useParams();
  const { loading, data } = useQuery(QUERY_CAUSE, {
    variables: { id: causeParam },
  });
  const causeData = data?.cause || {};
  console.log(data)

  // useState for new comment
  const [commentState, setCommentState] = useState({ body: "" });
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // get username of logged in user for comment submit
  const { data: userData } = useQuery(QUERY_ME);
  const username = userData?.me.username || "";

  // handle comment change
  const handleComment = (event) => {
    setCommentState({ body: event.target.value });
  };

  // submit comment
  const submitComment = async (event) => {
    event.preventDefault();
    if (commentState.body.length) {
      try {
        const { data } = await addComment({
          variables: {
            body: commentState.body,
            username: username,
            causeId: causeParam,
          },
          refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
        });
      } catch (error) {
        console.log(error);
      }
      setCommentState({ body: "" });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-cause">
      <div className="card">
        <div className="single-card-top">
          <button className="category-btn category-btn-single-cause disaster-relief">
            Disaster Relief
          </button>
          <div className="point-count">
            <FontAwesomeIcon icon={faStar} className="icon" />
            <div className="bottom-text">{causeData.points}</div>
          </div>
        </div>
        <div className="single-card-bottom">
          <h3>{causeData.title}</h3>
          <p className="date">{causeData.createdAt}</p>
          <p>{causeData.description}</p>
          <div className="location">Location: {causeData.location}</div>
          <div className="location">Username: {causeData.username}</div>
          <button className="web-btn">
            <a href={causeData.url} target="_blank">Website</a>
          </button>
        </div>
      </div>


      {(() => {
        if (AuthService.loggedIn()) {
          return (
            <div className="card">
              <div className="post-comment-card">

                <form id="comment-form">
                  <h3>Add a Comment</h3>
                  <label htmlFor="add-comment">
                    <p>giv this Cause some love!</p>
                  </label>
                  <input
                    className="input"
                    type="text"
                    name="add-comment"
                    value={commentState.body}
                    onChange={handleComment}
                  />
                  <button
                    type="submit"
                    className="comment-btn"
                    onClick={submitComment}
                  >
                    Post Comment
                  </button>
                  {error && (
                    <div>
                      <p>Please enter a comment.</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )
        } else {
          return (
            <div className="card">
              <div className="post-comment-card">
                <h3>You must be logged in to comment!</h3>
              </div>
            </div>
          )
        }

      })()}
      <div className="card">
        <div className="comment-card-top">
          <h3>
            {causeData.comments.length}{" "}
            {pluralize("Comment", causeData.comments.length)}
          </h3>
        </div>
        <div className="comment-card-bottom">
          <CommentList causeData={causeData} contextUser={username} />
        </div>
      </div>
    </div>
  );
};

export default SingleCause;
