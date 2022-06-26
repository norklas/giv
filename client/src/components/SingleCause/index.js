import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStar } from '@fortawesome/free-solid-svg-icons'


function SingleCause(props) {
  const { cause } = props;

  return (
    <div className="card">
      <div className="card-top">
          <h3>{cause.title}</h3>
          <p className="date">June 16, 2022</p>
          <p>{cause.description}</p>
          <div className="author">Erica Trenholm</div>
      </div>
      <div className="card-bottom">
          <button className="category-btn disaster-relief">{cause.category}</button>
            <div className="point-count">
            <FontAwesomeIcon icon={faStar} className='icon'/>
            <div className="bottom-text">7391 Points</div>
            </div>
            <div className="comment-count">
            <FontAwesomeIcon icon={faMessage} className='icon' />
            <div className="bottom-text">10 Comments</div>
            </div>
      </div>
    </div>
  )
}

export default SingleCause;