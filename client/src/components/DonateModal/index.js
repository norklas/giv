import Auth from "../../utils/auth";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAUSE_POINTS } from "../../utils/mutations";
import { QUERY_ME, QUERY_CAUSE } from "../../utils/queries";

const DonateModal = ({ onClose, causeId, title }) => {
  const { data } = useQuery(QUERY_CAUSE, {
    variables: {
      id: causeId,
    },
  });
  const { data: meQuery, loading: meQueryLoading } = useQuery(QUERY_ME);
  const meData = meQuery?.me || [];

  const [addCausePoints, { loading, error }] = useMutation(ADD_CAUSE_POINTS);

  const loggedIn = Auth.loggedIn();

  return (
    <div id="donate-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-top">
          <h3>Donate to {title}</h3>
        </div>
        <div className="modal-bottom">

          {Auth.loggedIn() ? (
            <>
              <div className="points-container">
                <button
                  onClick={() => {
                    addCausePoints({
                      variables: {
                        causeId: causeId,
                        donationNumber: 100,
                      },
                      refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
                    });
                  }}
                >
                  100
                </button>
                <button
                  onClick={() => {
                    addCausePoints({
                      variables: {
                        causeId: causeId,
                        donationNumber: 200,
                      },
                      refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
                    });
                  }}
                >
                  200
                </button>
                <button
                  onClick={() => {
                    addCausePoints({
                      variables: {
                        causeId: causeId,
                        donationNumber: 300,
                      },
                      refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
                    });
                  }}
                >
                  300
                </button>
                <button
                  onClick={() => {
                    addCausePoints({
                      variables: {
                        causeId: causeId,
                        donationNumber: 400,
                      },
                      refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
                    });
                  }}
                >
                  400
                </button>
                <button
                  onClick={() => {
                    addCausePoints({
                      variables: {
                        causeId: causeId,
                        donationNumber: 500,
                      },
                      refetchQueries: [{ query: QUERY_CAUSE }, "cause"],
                    });
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
