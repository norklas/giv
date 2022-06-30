import { UPDATE_CAUSE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { capitalizeFirst } from "../../utils/helpers";

const UpdateCauseModal = (props) => {
  const [updateCause, { loading, error }] = useMutation(UPDATE_CAUSE);

  const [errorMessage, setErrorMessage] = useState("All fields required");
  const [displayError, setDisplayError] = useState(false);

  const onClose = props.onClose;
  const causeId = props.causeId;
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    url: "",
    location: "",
    category: "",
  });
  const { title, description, url, location, category } = formState;

  const [categories] = useState([
    "Animal Welfare",
    "Disaster Relief",
    "Education",
    "Environmental",
    "Housing",
    "Hunger",
    "Medical Research",
    "Medical Support",
    "Veterans Support",
    "Other",
  ]);
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

  const handleChange = (event) => {
    if (!event.target.value.length) {
      let missingField = event.target.name;
      if (missingField === "url") {
        missingField = "Organization Website";
      }
      setErrorMessage(`${capitalizeFirst(missingField)} is required`);
    } else {
      setErrorMessage("");
    }

    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorMessage) {
      setDisplayError(true);
    } else if (formState.description.length > 280) {
      setErrorMessage("Description cannot be over 280 characters");
      setDisplayError(true);
    } else {
      setDisplayError(false);
      try {
        console.log(formState);
        updateCause({
          variables: { causeId: causeId, ...formState },
        });
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div id="cause-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-top">
          <h3>Update a Cause</h3>
        </div>
        <div className="modal-bottom">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              className="input"
              type="text"
              key="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
            />

            <label htmlFor="url">Organization Website</label>
            <input
              className="input"
              type="link"
              key="url"
              name="url"
              value={formState.url}
              onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <select
              key="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                  Select a category
              </option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>

            <label htmlFor="location">Location</label>
            <select
              key="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a location
              </option>
              {states.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </select>

            <label htmlFor="description">Description</label>
            <textarea
              key="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Tell us more..."
            />

            {errorMessage && displayError && <p>{errorMessage}</p>}

            <button type="submit" id="submit-btn" className="submit-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCauseModal;
