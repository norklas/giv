import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faStar } from '@fortawesome/free-solid-svg-icons'


function SingleCause(props) {
  const { cause } = props;

  return (
    <div class="card">
      <div class="card-top">
          <h3>{cause.title}</h3>
          <p class="date">June 16, 2022</p>
          <p>{cause.description}</p>
          <div class="author">Erica Trenholm</div>
      </div>
      <div class="card-bottom">
          <button class="category-btn disaster-relief">{cause.category}</button>
            <div class="point-count">
            <FontAwesomeIcon icon={faStar} className='icon'/>
            <div class="bottom-text">7391 Points</div>
            </div>
            <div class="comment-count">
            <FontAwesomeIcon icon={faMessage} className='icon' />
            <div class="bottom-text">10 Comments</div>
            </div>
      </div>
    </div>
  )
}

export default SingleCause;