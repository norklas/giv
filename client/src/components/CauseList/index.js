import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_CAUSES, QUERY_CAUSE } from "../../utils/queries";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObj = causesData?.causes || [];
  console.log(causesDataObj);

  const { loading, data } = useQuery(QUERY_CAUSE, {
    variables: { id: "62b8aadaf6f0f4b2212cdab8" },
  });
  const causeData = data?.cause || {};
  console.log(causeData);
  console.log(causeData.title);

  return (
    <div>
      {causesDataObj.map((cause) => (
        <div>
          <SingleCause cause={cause} key={cause.title} />
          <button></button>
        </div>
      ))}
    </div>
  );
};

export default CauseList;
