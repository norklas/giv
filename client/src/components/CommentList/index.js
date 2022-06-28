import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div class="single-comment">
              <button
              className="delete-btn edit"
              onClick={() => {
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button> 
            <button
              className="edit-btn edit"
              onClick={() => {

              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          <h4>{comment.username}</h4>
          <p class="date">Posted {comment.createdAt}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
