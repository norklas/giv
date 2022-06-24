const PointsModal = ({ onClose }) => {
  return (
    <div id="log-in-modal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={onClose}>
          &times;
        </span>
        <div class="modal-top">
          <h3>Log in</h3>
        </div>
        <div class="modal-bottom">
          <form>
            <label for="email">Email Address</label>
            <input class="input" type="email" id="email" name="email" />
            <label for="password">Password</label>
            <input
              class="input"
              type="password"
              id="password"
              name="password"
            />
            <button type="submit" id="submit-btn" class="submit-btn">
              Log in
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

export default PointsModal;
