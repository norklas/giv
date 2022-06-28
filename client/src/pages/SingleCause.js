import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStar } from '@fortawesome/free-solid-svg-icons'

import CommentList from "../components/CommentList";
import { useParams } from 'react-router-dom';
import { QUERY_CAUSE, QUERY_ME } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { useState } from 'react';
import { pluralize } from '../utils/helpers'

const SingleCause = () => {
    const { causeId: causeParam } = useParams();
    console.log("causeId: " + causeParam)
    const { loading, data } = useQuery(QUERY_CAUSE, {
        variables: { id: causeParam }
    });
    const causeData = data?.cause || {};
    console.log(causeData);
    console.log(causeData.title);

    // useState for new comment
    const[commentState, setCommentState] = useState({ body: '' })
    const [addComment, { error } ] = useMutation(ADD_COMMENT);

    // get username of logged in user for comment submit
    const { data: userData } = useQuery(QUERY_ME);
    const username = userData?.me.username || '';

    // handle comment change
    const handleComment = (event) => {
        setCommentState({ body: event.target.value });
    }

    // submit comment
    const submitComment = async (event) => {
        event.preventDefault();
        if(commentState.body.length) {
            try {
                const { data } = await addComment ({
                    variables: {
                        body: commentState.body,
                        username: username,
                        causeId: causeParam
                    } 
                })
            } catch (error) {
                console.log(error);
            }
            setCommentState({ body: '' })
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div class="single-cause">
        <div class="card">
            <div class="single-card-top">
                <button class="category-btn category-btn-single-cause disaster-relief">Disaster Relief</button>
                <div class="point-count">
                    <FontAwesomeIcon icon={faStar} className='icon'/>
                    <div class="bottom-text">{causeData.points}</div>
                    </div>
                </div>
            <div class="single-card-bottom">
                <h3>{causeData.title}</h3>
                <p class="date">{causeData.createdAt}</p>
                <p>{causeData.description}</p>
                <div class="author">{causeData.location}</div>
                <button class="web-btn"><a href={causeData.url}>Visit website</a></button>
            </div>
        </div>

        <div class="card">
            {Auth.loggedIn() && (
                <form id='comment-form'>
                    <label htmlFor='add-comment'>Add Comment</label>
                    <input
                        className='input'
                        type='text'
                        name='add-comment'
                        value={commentState.body}
                        onChange={handleComment}
                    />
                    <button
                        type='submit'
                        onClick={submitComment}
                    >
                        Submit Comment
                    </button>
                </form>
            )}
            <div class="comment-card-top">
                <h3>{causeData.comments.length} {pluralize('Comment', causeData.comments.length)}</h3>
            </div>
            <div class="comment-card-bottom">
                <CommentList comments = {causeData.comments}/>
            </div>
        </div>
    </div>
    )
}

export default SingleCause;