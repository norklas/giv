import { ADD_CAUSE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { capitalizeFirst } from '../../utils/helpers';

const CauseModal = ({ onClose }) => {
    const [formState, setFormState] = useState({ title: '', description: '', url: '', location: '', category: '' })
    const { title, description, url, location, category } = formState;
    const [addCause, { error }] = useMutation(ADD_CAUSE);
    const [errorMessage, setErrorMessage] = useState('All fields required');
    const [displayError, setDisplayError] = useState(false);

    const handleChange = (event) => {
        if(!event.target.value.length) {
            let missingField = event.target.name;
            if(missingField==="url") {
                missingField="Organization Website"
            }
            setErrorMessage(`${capitalizeFirst(missingField)} is required`)
        } else {
            setErrorMessage('');
        }
        
        setFormState({...formState, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (errorMessage) {
            setDisplayError(true);
        } else {
            setDisplayError(false);
            try {
                const { data } = await addCause ({
                    variables: { ...formState }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div id="cause-modal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <div className="modal-top">
                <h3>Create a Cause</h3>
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
                        <option value="" disabled selected>Select a category</option>
                        <option value="Cancer Research">Cancer Research</option>
                        <option value="Disaster Relief">Disaster Relief</option>
                    </select>

                    <label htmlFor="location">Location</label>
                    <input 
                        className="input" 
                        type="string" 
                        key="location" 
                        name="location"
                        value={formState.location}
                        onChange={handleChange}
                    />

                    <label 
                        htmlFor="description">Tell us more...</label>
                    <textarea
                        key="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                    />

                    {errorMessage && displayError && (
                        <p>{errorMessage}</p>
                    )}
                
                    <button type="submit" id="submit-btn" className="submit-btn">Post</button>
                    <p>Don't have an account? <a href="">Sign up!</a></p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CauseModal;