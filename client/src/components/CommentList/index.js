const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div class="single-comment">
          <h4>{comment.username}</h4>
          <p class="date">Posted {comment.createdAt}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
