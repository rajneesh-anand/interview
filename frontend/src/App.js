import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

// pages & components
import Home from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import People from "./pages/People";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/account" /> : <Home />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/account" /> : <Login />}
            />

            <Route
              path="/account"
              element={!user ? <Navigate to="/login" /> : <Account />}
            />
            <Route path="/people" element={<People />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
