const CauseModal = ({ onClose }) => {
  return (
    <div id="cause-modal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={onClose}>
          &times;
        </span>
        <div class="modal-top">
          <h3>Create a Cause</h3>
        </div>
        <div class="modal-bottom">
          <form>
            <label for="title">Title</label>
            <input
              class="input"
              type="text"
              id="cause-title"
              name="cause-title"
            />

            <label for="website">Organization Website</label>
            <input
              class="input"
              type="link"
              id="charity-website"
              name="charity-website"
            />

            <label for="category">Category</label>
            <select id="category" name="category">
              <option value="cancer-research">Cancer Research</option>
              <option value="disaster-relief">Disaster Relief</option>
            </select>

            <label for="title">Tell us more...</label>
            <textarea></textarea>

            <button type="submit" id="submit-btn" class="submit-btn">
              Post
            </button>
            <p>
              Don't have an account? <a href="">Sign up!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CauseModal;
