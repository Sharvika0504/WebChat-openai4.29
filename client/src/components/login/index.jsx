import gptImg from '@/assets/gptImage.jpeg';
import { usePostLoginMutation, usePostSignupMutation } from "@/state/api";
import { useEffect, useState } from "react";

const Login = ({ setUser, setPasscode }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignup] = usePostSignupMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };
  const handleSignup = () => {
    triggerSignup({ username, password });
  };

  useEffect(() => {
    //making sure user  received in the response is validated and then updated
    if (resultLogin.data?.response) {
      setUser(username);
      setPasscode(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
      <img  src = {gptImg}/>
        <h2 className="title">Web ChatGpt(OpenAi 4.29)</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>
        <div>
          <input
            className="login-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
