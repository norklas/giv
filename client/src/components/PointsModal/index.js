import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_POINTS } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PointsModal = ({ onClose }) => {
  const { data } = useQuery(QUERY_ME);

  const [addUserPoints] = useMutation(ADD_USER_POINTS);

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
            <button
              onClick={(e) => {
                addUserPoints({
                  variables: { userId: data.me._id, purchaseNumber: 100 },
                });
              }}
            >
              100 Points
            </button>
            <button
              onClick={(e) => {
                addUserPoints({
                  variables: { userId: data.me._id, purchaseNumber: 200 },
                });
              }}
            >
              200 Points
            </button>
            <button
              onClick={(e) => {
                addUserPoints({
                  variables: { userId: data.me._id, purchaseNumber: 300 },
                });
              }}
            >
              300 Points
            </button>
            <button
              onClick={(e) => {
                addUserPoints({
                  variables: { userId: data.me._id, purchaseNumber: 400 },
                });
              }}
            >
              400 Points
            </button>
            <button
              onClick={(e) => {
                addUserPoints({
                  variables: { userId: data.me._id, purchaseNumber: 500 },
                });
              }}
            >
              500 Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsModal;
