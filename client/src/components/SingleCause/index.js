import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function SingleCause(props) {
  const { cause } = props;

  return (
    <div className="card">
      <div className="card-top">
          <h3>{cause.title}</h3>
          <p className="date">June 16, 2022</p>
          <p>{cause.description} <Link to={`/cause/${cause._id}`}>
              Learn more.
            </Link></p>
          <div className="author">{cause.location}</div>
      </div>

      <div className="card-bottom">
          <button className="category-btn disaster-relief">{cause.category}</button>
            <div className="point-count">
            <FontAwesomeIcon icon={faStar} className='icon'/>
            <div className="bottom-text">{cause.points} Points</div>
            </div>
            <div className="comment-count">
            <FontAwesomeIcon icon={faMessage} className='icon' />
            <div className="bottom-text">{cause.comments.length} Comments</div>
            </div>
      </div>
    </div>
  )
}

export default SingleCause;