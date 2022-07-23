import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import authService from "./auth.service";
import Tweets from "./Tweets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/tweets"
          element={
            <RequireAuth>
              <Tweets />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export function RequireAuth({ children }) {
  if (!authService().isLoggedIn()) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
}

export default App;
