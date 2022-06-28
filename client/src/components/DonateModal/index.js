import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_CAUSE_POINTS } from "../../utils/mutations";
import { QUERY_ME, QUERY_CAUSE } from "../../utils/queries";

const DonateModal = ({ onClose, causeId, title }) => {
  const { data } = useQuery(QUERY_CAUSE, {
    variables: {
      id: causeId,
    },
  });

  console.log(data);
  console.log(causeId);

  const { data: meQuery, loading: meQueryLoading } = useQuery(QUERY_ME);
  const meData = meQuery?.me || [];
  console.log(meData);

  const [addCausePoints, { loading, error }] = useMutation(ADD_CAUSE_POINTS);

  // const [addCausePoints, { error, loading }] = useMutation(ADD_CAUSE_POINTS, {
  //   update(cache, { data: { addCausePoints } }) {
  //     if (loading) return "Submitting...";
  //     // could potentially not exist yet, so wrap in a try/catch
  //     try {
  //       // update me array's cache
  //       const me = cache.readQuery({ query: QUERY_ME });
  //       console.log(me);
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: { ...me, points: [addCausePoints] } },
  //       });
  //     } catch (e) {
  //       console.warn("Blah");
  //     }

  //     // update thought array's cache
  //     const { causes } = cache.readQuery({ query: QUERY_CAUSE });
  //     cache.writeQuery({
  //       query: QUERY_CAUSE,
  //       variables: {
  //         id: causeId,
  //       },
  //       data: { causes: [addCausePoints, ...causes] },
  //     });
  //   },
  // });

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
                addCausePoints({
                  variables: {
                    causeId: causeId,
                    donationNumber: 100,
                  },
                });
              }}
            >
              100
            </button>
            <button>200</button>
            <button>300</button>
            <button>400</button>
            <button>500</button>
          </div>
          <button
            type="submit"
            onClick={() => {
              onClose();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
