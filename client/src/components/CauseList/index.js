import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { QUERY_CAUSES } from "../../utils/queries";
import { useState } from "react";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObject = causesData?.causes || [];
  const [selectedState, setSelectedState] = useState('')
  const [filterswicth, setFilterSwitch] = useState(false)


 
  const handleChange = (e) => {
    setSelectedState(e.target.value)
    console.log(selectedState)
  }
  const handleFilterswitch = () => {
    setFilterSwitch(!filterswicth)
  }

  const causesDataObj = [...causesDataObject]
  causesDataObj.sort((a, b) => Number(b.points) - Number(a.points));
  const [states] = useState([
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]);

  return (
    <div>

      <label htmlFor="location">Filter by state:</label>
              <select
                key="location"
                name="location"
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Filter by state:
                </option>
                {states.map((state) => (
                  <option value={state}>{state}</option>
                  ))}
                  </select>
        {(() => {
          console.log(filterswicth)
        if(filterswicth){return(
        <button
        onClick={() => {
          handleFilterswitch();
        }}>Clear Filter</button>
      )}else{return(
        <button
        onClick={() => {
          handleFilterswitch();
        }}>Apply</button>
      )



      }
      })()}
      




      {(() => {

        if(filterswicth){
          let newCauseArr = []
          for(let i =0; i < causesDataObj.length; i++){
            if(causesDataObj[i].location === selectedState){
              newCauseArr.push(causesDataObj[i])
            }
          }
          return(
          newCauseArr.map((cause) => (
            <div>
              <SingleCause
                cause={cause}
                key={cause.title}
                loading={causesLoading}
              />
            </div>
          )))
          }
          else{
        return(

      causesDataObj.map((cause) => (
        <div>
          <SingleCause
            cause={cause}
            key={cause.title}
            loading={causesLoading}
          />

        </div>
      ))
        )}
    })()}





    </div>
  );
};

export default CauseList;
