import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <h3>Interview</h3>
        </Link>

        <Link to="/" className="btn btn-primary">
          Home
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link to="/people" className="btn btn-primary pr-3">
                People
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                {/* <span>{user.name}</span> */}
                <button className="btn btn-primary " onClick={handleClick}>
                  Log out
                </button>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
