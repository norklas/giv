import { useMutation, useQuery } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { ADD_USER_POINTS } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PointsModal = ({ onClose, pointsModalToUserDash }) => {
  const { data } = useQuery(QUERY_ME);

  const [purchaseNumber, setPurchaseNumber] = useState(0);

  const [addUserPoints, { error }] = useMutation(ADD_USER_POINTS, {
    update(cache, { data: { addUserPoints } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        console.log(me);
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { points: [...me, addUserPoints] },
          },
        });
      } catch (e) {
        console.warn("First point insertion by user!");
      }
    },
  });

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
                setPurchaseNumber(
                  (prevPurchaseNumber) => prevPurchaseNumber + 100
                );
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 100,
                  },
                });
                pointsModalToUserDash(
                  (prevPurchaseNumber) => prevPurchaseNumber + 100
                );
              }}
            >
              100 Points
            </button>
            <button
              onClick={() => {
                setPurchaseNumber(
                  (prevPurchaseNumber) => prevPurchaseNumber + 200
                );
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 200,
                  },
                });
                pointsModalToUserDash(
                  (prevPurchaseNumber) => prevPurchaseNumber + 200
                );
              }}
            >
              200 Points
            </button>
            <button
              onClick={() => {
                setPurchaseNumber(
                  (prevPurchaseNumber) => prevPurchaseNumber + 300
                );
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 300,
                  },
                });
                pointsModalToUserDash(
                  (prevPurchaseNumber) => prevPurchaseNumber + 300
                );
              }}
            >
              300 Points
            </button>
            <button
              onClick={() => {
                setPurchaseNumber(
                  (prevPurchaseNumber) => prevPurchaseNumber + 400
                );
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 400,
                  },
                });
                pointsModalToUserDash(
                  (prevPurchaseNumber) => prevPurchaseNumber + 400
                );
              }}
            >
              400 Points
            </button>
            <button
              onClick={() => {
                setPurchaseNumber(
                  (prevPurchaseNumber) => prevPurchaseNumber + 500
                );
                addUserPoints({
                  variables: {
                    userId: data.me._id,
                    purchaseNumber: 500,
                  },
                });
                pointsModalToUserDash(
                  (prevPurchaseNumber) => prevPurchaseNumber + 500
                );
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
