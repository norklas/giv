import { useState } from "react";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

const LoginModal = ({ onClose }) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div id="log-in-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-top">
          <h3>Log in</h3>
        </div>
        <div className="modal-bottom">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button type="submit" id="submit-btn" className="submit-btn">
              Log in
            </button>
            {error && (
              <div>
                <p>Login failed. Please check your credentials.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
