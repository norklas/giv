import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_CAUSE_POINTS } from "../../utils/mutations";
import { QUERY_ME, QUERY_CAUSE } from "../../utils/queries";

const DonateModal = ({ onClose, causeId, title, donateModalToSingleCause }) => {
  const { data } = useQuery(QUERY_CAUSE, {
    variables: {
      id: causeId,
    },
  });

  const [donationNumber, setDonationNumber] = useState(0);

  console.log(data);
  console.log(causeId);

  const { data: meQuery, loading: meQueryLoading } = useQuery(QUERY_ME);
  const meData = meQuery?.me || [];
  console.log(meData);

  const [addCausePoints, { loading, error }] = useMutation(ADD_CAUSE_POINTS);

  return (
    <div id="donate-modal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={onClose}>
          &times;
        </span>
        <div class="modal-top">
          <h3>Donate to {title}</h3>
        </div>
        <div class="modal-bottom">
          <div class="points-container">
            <button
              onClick={() => {
                setDonationNumber(100);
                donateModalToSingleCause(100);
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
                setDonationNumber(200);
                donateModalToSingleCause(200);
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
                setDonationNumber(300);
                donateModalToSingleCause(300);
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
                setDonationNumber(400);
                donateModalToSingleCause(400);
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
                setDonationNumber(500);
                donateModalToSingleCause(500);
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
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
