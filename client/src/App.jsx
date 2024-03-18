import Chat from "@/components/chat";
import Login from "@/components/login";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [passcode, setPasscode] = useState(null);
  const isAuthorized = Boolean(user) && Boolean(passcode);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthorized ? (
                <Navigate to="/chat" />
              ) : (
                <Login setUser={setUser} setPasscode={setPasscode}/>
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuthorized ? (
                <Chat user={user} passcode={passcode} />
              ) : (
                //navigate to chat application only if authorized
                <Navigate to="/ " />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
