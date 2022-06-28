import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { QUERY_CAUSES } from "../../utils/queries";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObj = causesData?.causes || [];
  console.log(causesDataObj);

  return (
    <div>
      {causesDataObj.map((cause) => (
        <div>
          <SingleCause
            cause={cause}
            key={cause.title}
            loading={causesLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default CauseList;
