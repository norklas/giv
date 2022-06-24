const PointsModal = ({ onClose }) => {
  return (
    <div id="points-modal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={onClose}>
          &times;
        </span>
        <div class="modal-top">
          <h3>Buy Points</h3>
        </div>
        <div class="modal-bottom">
          <div class="points-container">
            <button>100 Points</button>
            <button>200 Points</button>
            <button>300 Points</button>
            <button>400 Points</button>
            <button>500 Points</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsModal;
