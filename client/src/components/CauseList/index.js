import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { QUERY_CAUSES } from "../../utils/queries";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObj = causesData?.causes || [];

  return (
    <div>
      {causesDataObj.map((cause, i) => (
        <div key={cause._id}>
          <SingleCause cause={cause} loading={causesLoading} />
        </div>
      ))}
    </div>
  );
};

export default CauseList;
