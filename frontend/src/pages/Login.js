import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-lg-6 align-items-center">
                  <div className="text-center mt-3">
                    <h5 className="fw-bold pb-3">Sign In</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        id="password"
                        className="form-control"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12  mb-2 text-center">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                  {error && <div className="error">{error}</div>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
