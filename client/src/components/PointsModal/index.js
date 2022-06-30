import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_POINTS } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PointsModal = ({ onClose }) => {
  const { data } = useQuery(QUERY_ME);

  const [addUserPoints, { error }] = useMutation(ADD_USER_POINTS);

  return (
    <div id="points-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-top">
          <h3>Buy Points</h3>
        </div>
        <div className="modal-bottom">
          <div className="points-container">
            <button
              onClick={() => {
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 100,
                  },
                  refetchQueries: [{ query: QUERY_ME }],
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
                  refetchQueries: [{ query: QUERY_ME }],
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
                  refetchQueries: [{ query: QUERY_ME }],
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
                  refetchQueries: [{ query: QUERY_ME }],
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
                  refetchQueries: [{ query: QUERY_ME }],
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
