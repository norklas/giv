import logo from "../../assets/givlogo.svg"
import { useState } from 'react'
import LoginModal from "../LoginModal"
import SignupModal from "../SignupModal"
import CauseModal from "../CauseModal"

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div>
            {isModalOpen && (<LoginModal onClose={toggleModal} />)}
            {isModalOpen && (<SignupModal onClose={toggleModal} />)}
            {isModalOpen && (<CauseModal onClose={toggleModal} />)}
            <header>
                <div class="header-flex global-container">
                    <a href="/">
                        <img src={logo} alt="giv logo" />
                    </a>

                    <div class="search-bar">
                        <input class="search" type="text" placeholder="Search.." />
                        <button type="submit" class="search-button">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <nav>
                        <ul>
                            <li onClick={() => toggleModal()}>Sign up</li>
                            <li onClick={() => toggleModal()}>Log in</li>
                            <li onClick={() => toggleModal()}><a class="nav-btn">Create a Cause</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section class="header-gradient"></section>
        </div>
        
    )
}

export default Header;