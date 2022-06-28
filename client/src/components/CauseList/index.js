import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_CAUSES, QUERY_CAUSE } from "../../utils/queries";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObj = causesData?.causes || [];
  console.log(causesDataObj);

  return (
    <div>
      {causesDataObj.map((cause) => (
        <div>
          <SingleCause cause={cause} key={cause.title} loading={causesLoading}/>
          <button></button>
        </div>
      ))}
    </div>
  );
};

export default CauseList;
