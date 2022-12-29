import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./style.scss";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Authenticate from "./components/Authenticate";
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path="/">
      <Route index element={<Authenticate><Home /></Authenticate>}/>
        <Route path="login" element={<Login />} />
        <Route path="sigup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
