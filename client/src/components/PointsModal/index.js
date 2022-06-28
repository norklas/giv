import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_POINTS } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PointsModal = ({ onClose, pointsModalToUserDash }) => {
  const { data } = useQuery(QUERY_ME);

  const [addUserPoints, { error }] = useMutation(ADD_USER_POINTS);

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
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 100,
                  },
                  refetchQueries: [{ query: QUERY_ME }, "me"],
                });
              }}
            >
              100 Points
            </button>
            <button
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 200,
                  },
                  refetchQueries: [{ query: QUERY_ME }, "me"],
                });
              }}
            >
              200 Points
            </button>
            <button
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 300,
                  },
                  refetchQueries: [{ query: QUERY_ME }, "me"],
                });
              }}
            >
              300 Points
            </button>
            <button
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 400,
                  },
                  refetchQueries: [{ query: QUERY_ME }, "me"],
                });
              }}
            >
              400 Points
            </button>
            <button
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 500,
                  },
                  refetchQueries: [{ query: QUERY_ME }, "me"],
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
