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
      </div>
    </div>
  )
}

export default SingleCause;