
const CommentList = ({ comments }) => {
    const sampleComments = [
        {
            username: "testuser",
            body: "Morbi eleifend nibh eu.",
            createdAt: "June 23, 2022",
        },
        {
            username: "testuser2",
            body: "Nulla eget porta erat.",
            createdAt: "June 23, 2022",
        },
        {
            username: "testuser3",
            body: "Sed arcu nibh, dapibus sit amet imperdiet a, sollicitudin ac risus.",
            createdAt: "June 23, 2022",
        }
    ]

    return (
        <div>
            {comments.map((comment) => (
                <div class="single-comment">
                    <h4>{comment.username}</h4>
                    <p class="date">{comment.createdAt}</p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentList;