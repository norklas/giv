import { useState } from 'react'
import Auth from '../../utils/auth'

import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../utils/mutations'

const SignupModal = ({ onClose }) => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' })

    const [addUser, { error }] = useMutation(ADD_USER)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleSignupSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await addUser ({
                variables: { ...formState }
            })
            Auth.login(data.addUser.token);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div id="sign-up-modal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <div className="modal-top">
                <h3>Sign up</h3>
            </div>
            <div className="modal-bottom">
                <form onSubmit={handleSignupSubmit}>
                    
                    <label for="username">Username</label>
                    <input 
                        className="input" 
                        type="username" 
                        id="username" 
                        name="username"
                        value={formState.username} 
                        onChange={handleChange}
                    />

                    <label for="email">Email Address</label>
                    <input 
                        className="input" 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleChange}
                    />

                    <label for="password">Password</label>
                    <input 
                        className="input" 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formState.password} 
                        onChange={handleChange}
                        />

                    <button type="submit" id="submit-btn" className="submit-btn">
                        Sign up
                    </button>
                    {error && <div><p>Sign up failed.</p></div>}
                    {/* <p>Already have an account? <a href="">Log in!</a></p> */}
                </form>
            </div>
        </div>
    </div>
    )
}

export default SignupModal;