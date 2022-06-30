import Auth from "../../utils/auth";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAUSE_POINTS } from "../../utils/mutations";
import { QUERY_ME, QUERY_CAUSE, QUERY_CAUSES } from "../../utils/queries";
import { useState } from "react";

const DonateModal = ({ onClose, causeId, title }) => {
  const { data } = useQuery(QUERY_CAUSE, {
    variables: {
      id: causeId,
    },
  });
  const { data: meQuery, loading: meQueryLoading } = useQuery(QUERY_ME);
  const meData = meQuery?.me || [];

  const [addCausePoints, { loading, error }] = useMutation(ADD_CAUSE_POINTS);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  const loggedIn = Auth.loggedIn();

  return (
    <div id="donate-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-top">
          <h3>Donate to {title}</h3>
          <p>You have {meData.points} points.</p>
          {(() => {
            if (insufficientFunds) {
              return (
                <div>
                  <p>Not enough points!</p>
                </div>
              );
            }
          })()}
        </div>
        <div className="modal-bottom">
          {Auth.loggedIn() ? (
            <>
              <div className="points-container">
                <button
                  onClick={() => {
                    if (meData.points < 100) {
                      return setInsufficientFunds(true);
                    } else {
                      setInsufficientFunds(false);
                      addCausePoints({
                        variables: {
                          causeId: causeId,
                          donationNumber: 100,
                        },
                        refetchQueries: [
                          { query: QUERY_CAUSES },
                          { query: QUERY_ME },
                        ],
                      });
                      onClose();
                    }
                  }}
                >
                  100
                </button>
                <button
                  onClick={() => {
                    if (meData.points < 200) {
                      return setInsufficientFunds(true);
                    } else {
                      setInsufficientFunds(false);
                      addCausePoints({
                        variables: {
                          causeId: causeId,
                          donationNumber: 200,
                        },
                        refetchQueries: [
                          { query: QUERY_CAUSES },
                          { query: QUERY_ME },
                        ],
                      });
                      onClose();
                    }
                  }}
                >
                  200
                </button>
                <button
                  onClick={() => {
                    if (meData.points < 300) {
                      return setInsufficientFunds(true);
                    } else {
                      setInsufficientFunds(false);
                      addCausePoints({
                        variables: {
                          causeId: causeId,
                          donationNumber: 300,
                        },
                        refetchQueries: [
                          { query: QUERY_CAUSES },
                          { query: QUERY_ME },
                        ],
                      });
                      onClose();
                    }
                  }}
                >
                  300
                </button>
                <button
                  onClick={() => {
                    if (meData.points < 400) {
                      return setInsufficientFunds(true);
                    } else {
                      setInsufficientFunds(false);
                      addCausePoints({
                        variables: {
                          causeId: causeId,
                          donationNumber: 400,
                        },
                        refetchQueries: [
                          { query: QUERY_CAUSES },
                          { query: QUERY_ME },
                        ],
                      });
                      onClose();
                    }
                  }}
                >
                  400
                </button>
                <button
                  onClick={() => {
                    if (meData.points < 500) {
                      return setInsufficientFunds(true);
                    } else {
                      setInsufficientFunds(false);
                      addCausePoints({
                        variables: {
                          causeId: causeId,
                          donationNumber: 500,
                        },
                        refetchQueries: [
                          { query: QUERY_CAUSES },
                          { query: QUERY_ME },
                        ],
                      });
                      onClose();
                    }
                  }}
                >
                  500
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>You must be logged in to donate.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
