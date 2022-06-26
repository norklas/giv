import SingleCause from '../SingleCause';
import { useQuery } from '@apollo/client';
import { QUERY_CAUSES } from '../../utils/queries';

const CauseList = () => {     
    const { loading, data } = useQuery(QUERY_CAUSES);
    const causeData = data?.causes || [];

    return (
        <div>
            {causeData.map((cause) => ( 
                <SingleCause cause = {cause} key = {cause.title}/>
            ))}
        </div>
    )
}

export default CauseList;