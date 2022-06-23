import logo from "../../assets/givlogo.svg"

const Header = () => {
    return (
        <div>
            <header>
                <div class="header-flex global-container">
                    <a href="/">
                        <img src={logo} alt="giv logo" />
                    </a>
                    <nav>
                        <ul>
                            <li>About</li>
                            <li>Sign in</li>
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