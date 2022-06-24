const SignupModal = ({ onClose }) => {



    return (
        <div id="sign-up-modal" class="modal">
        <div class="modal-content">
            <span class="close" onClick={onClose}>&times;</span>
            <div class="modal-top">
                <h3>Sign up</h3>
            </div>
            <div class="modal-bottom">
                <form>
                    <label for="username">Username</label>
                    <input class="input" type="text" id="username" name="username" />
                    <label for="email">Email Address</label>
                    <input class="input" type="text" id="email" name="email" />
                    <label for="password">Password</label>
                    <input class="input" type="password" id="password" name="password" />
                    <button type="submit" id="submit-btn" class="submit-btn">Sign up</button>
                    <p>Already have an account? <a href="">Log in!</a></p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default SignupModal;