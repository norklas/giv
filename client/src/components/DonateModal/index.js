import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_CAUSE_POINTS } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const DonateModal = ({ onClose, causeId, title } ) => {
  const { data: userData } = useQuery(QUERY_ME);

  const [donationNumber, setDonationNumber] = useState(0);
  const [addCausePoints, { error }] = useMutation(ADD_CAUSE_POINTS);

  const submitDonation = async (event) => {
    try {
      const { data } = await addCausePoints({
        variables: {
          causeId: causeId, 
          donationNumber: donationNumber
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

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
            <button onClick={() => {
              setDonationNumber(100);
              submitDonation();
            }}>
              100
            </button>
            <button onClick={() => {
              setDonationNumber(200);
              submitDonation();
            }}>
              200
            </button>
            <button onClick={() => {
              setDonationNumber(300);
              submitDonation();
            }}>
              300
            </button>
            <button onClick={() => {
              setDonationNumber(400);
              submitDonation();
            }}>
              400
            </button>
            <button onClick={() => {
              setDonationNumber(500);
              submitDonation();
            }}>
              500
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
