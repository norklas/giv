import logo from "../../assets/givlogo.svg"

import { useState } from 'react'
import Auth from '../../utils/auth'

import LoginModal from "../LoginModal"
import SignupModal from "../SignupModal"
import CauseModal from "../CauseModal"

const Header = () => {

    const loggedIn = Auth.loggedIn()
    const logout = event => {
        event.preventDefault()
        Auth.logout()
      }

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen)
    }

    const [isSignupModalOpen, setIsSignupLoginModalOpen] = useState(false)
    const toggleSignupModal = () => {
        setIsSignupLoginModalOpen(!isSignupModalOpen)
    }

    const [isCauseModalOpen, setIsCauseLoginModalOpen] = useState(false)
    const toggleCauseModal = () => {
        setIsCauseLoginModalOpen(!isCauseModalOpen)
    }

    return (
        <div>
            {isLoginModalOpen && (<LoginModal onClose={toggleLoginModal} />)}
            {isSignupModalOpen && (<SignupModal onClose={toggleSignupModal} />)}
            {isCauseModalOpen && (<CauseModal onClose={toggleCauseModal} />)}
            <header>
                <div class="header-flex global-container">
                    <a href="/">
                        <img src={logo} alt="giv logo" />
                    </a>

                    <div class="search-bar">
                        <input class="search" type="text" placeholder="Search giv." />

                    </div>

                    <nav>
                        <ul>
                        {Auth.loggedIn() ? (
                            <>
                                <li><a href="/dashboard">Dashboard</a></li>
                                <li onClick={logout}>Logout</li>
                            </>
                        ) : (
                            <>
                                <li onClick={() => toggleSignupModal()}>Sign up</li>
                                <li onClick={() => toggleLoginModal()}>Log in</li>
                            </>
                        )}
                                <li onClick={() => toggleCauseModal()}><a class="nav-btn">Create a Cause</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section class="header-gradient"></section>
        </div>
        
    )
}

export default Header;