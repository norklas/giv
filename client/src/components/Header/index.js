import logo from "../../assets/givlogo.svg"
import { useState } from 'react'
import LoginModal from "../LoginModal"
import SignupModal from "../SignupModal"
import CauseModal from "../CauseModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

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
                        <input class="search" type="text" placeholder="Search.." />
                        <button type="submit" class="search-button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                        </button>
                    </div>

                    <nav>
                        <ul>
                            <li onClick={() => toggleSignupModal()}>Sign up</li>
                            <li onClick={() => toggleLoginModal()}>Log in</li>
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