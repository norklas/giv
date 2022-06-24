import logo from "../../assets/givlogo.svg"
import { useState } from 'react'
import LoginModal from "../LoginModal"

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div>
            {isModalOpen && (<LoginModal onClose={toggleModal}/>)}
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
                            <li>Sign up</li>
                            <li onClick={() => toggleModal()}>Log in</li>
                            <li><a href="" class="nav-btn">Create a Cause</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section class="header-gradient"></section>
        </div>
        
    )
}

export default Header;