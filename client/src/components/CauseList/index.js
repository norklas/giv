import SingleCause from "../SingleCause";
import { useQuery } from "@apollo/client";
import { QUERY_CAUSES } from "../../utils/queries";
import { useState } from "react";

const CauseList = () => {
  const { data: causesData, loading: causesLoading } = useQuery(QUERY_CAUSES);
  const causesDataObject = causesData?.causes || [];
  const [selectedState, setSelectedState] = useState('')
  const [filterswitch, setFilterSwitch] = useState(false)



  const handleChange = (e) => {
    setSelectedState(e.target.value)
  }
  const handleFilterswitch = () => {
    setFilterSwitch(!filterswitch)
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
      <div className="filter">
      <label htmlFor="location">Filter by state:</label>
      <select
        className="filter-select"
        key="location"
        name="location"
        onChange={handleChange}
      >
        <option value="" disabled>
          Filter by state:
        </option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {(() => {
        if (filterswitch) {
          return (
            <button
              className="submit-btn"
              onClick={() => {
                handleFilterswitch();
              }}>Clear Filter</button>
          )
        } else {
          return (
            <button
              className="submit-btn"
              onClick={() => {
                handleFilterswitch();
              }}>Apply</button>
          )
        }
      })()}
      </div>
      {(() => {
        if (filterswitch) {
          let newCauseArr = []
          for (let i = 0; i < causesDataObj.length; i++) {
            if (causesDataObj[i].location === selectedState) {
              newCauseArr.push(causesDataObj[i])
            }
          }
          return (
            newCauseArr.map((cause) => (
              <div key={cause._id}>
                <SingleCause
                  cause={cause}
                  loading={causesLoading}
                />
              </div>
            )))
        }
        else {
          return (
            causesDataObj.map((cause) => (
              <div key={cause._id}>
                <SingleCause
                  cause={cause}
                  loading={causesLoading}
                />

              </div>
            ))
          )
        }
      })()}
    </div>
  );
};

export default CauseList;
