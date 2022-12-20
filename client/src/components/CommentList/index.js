import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT, UPDATE_COMMENT } from "../../utils/mutations";
import { QUERY_CAUSES } from "../../utils/queries";
import { useState } from "react";

const CommentList = (props) => {
  const [formState, setFormState] = useState({ body: "" });
  const [editComment, setEditComment] = useState(false);

  const [deleteComment, { error }] = useMutation(DELETE_COMMENT);
  const [updateComment, { updateError }] = useMutation(UPDATE_COMMENT);

  const comments = props.causeData.comments;
  const handleEditComment = () => {
    setEditComment(!editComment);
  };
  const handleChange = (event) => {
    setFormState({ body: event.target.value });
  };

  return (
    <div>
      {comments.map((comment) => (
        <div className="single-comment" key={comment._id}>
          {(() => {
            if (props.contextUser === comment.username) {
              return (
                <div>
                  <button
                    className="delete-btn edit"
                    onClick={() => {
                      deleteComment({
                        variables: {
                          causeId: props.causeData._id,
                          commentId: comment._id,
                        },
                        refetchQueries: [{ query: QUERY_CAUSES }],
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="edit-btn edit"
                    onClick={() => {
                      handleEditComment();
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              );
            }
          })()}
          <h4>{comment.username}</h4>
          <p className="date">Posted {comment.createdAt}</p>
          {(() => {
            if (editComment && props.contextUser === comment.username) {
              return (
                <form>
                  <input
                    placeholder={comment.body}
                    onChange={handleChange}
                  ></input>
                  <button
                    onClick={() => {
                      updateComment({
                        variables: {
                          causeId: props.causeData._id,
                          commentId: comment._id,
                          body: formState.body,
                        },
                      });
                    }}
                  >
                    Save changes
                  </button>
                </form>
              );
            } else {
              return (
                <div>
                  <p>{comment.body}</p>
                </div>
              );
            }
          })()}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
