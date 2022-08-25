import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Buffer } from "buffer";
import { useSignup } from "../hooks/useSignup";

const AccountForm = () => {
  const { user } = useAuthContext();
  const { updateUser, error, isLoading, success } = useSignup();
  const [userDetail, setUserDeatils] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("photo", photo);
    fd.append("name", name);
    fd.append("password", password);
    await updateUser(fd);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/single/${user.email}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setUserDeatils(json);
        setName(json.name);
        setProfilePhoto(
          `data:${json.photo.contentType};base64, ${Buffer.from(
            json.photo.data.data
          ).toString("base64")} `
        );
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return userDetail ? (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 text-center">
            <img
              src={profilePhoto}
              className="rounded mb-3"
              width="200"
              height="200"
              objectfit="cover"
              alt="photo"
            />

            <div className="text-center">
              <input
                type="file"
                onChange={onChange}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-lg-6 align-items-center">
            <div className="text-center mt-3">
              <h5 className="fw-bold pb-3">ACCOUNT DETAILS</h5>
            </div>

            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={userDetail.email}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label htmlFor="inputGender" className="form-label">
                  Gender
                </label>
                <select
                  id="inputGender"
                  name="gender"
                  className="form-select"
                  defaultValue={userDetail.gender}
                  disabled
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-2">
                <label htmlFor="inputDate" className="form-label">
                  Birth Date
                </label>

                <DatePicker
                  className="form-control"
                  id="inputDate"
                  selected={new Date(userDetail.dateofbirth)}
                  onChange={(date) => setBirthDate(date)}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12  mb-2 text-center">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
          </div>
        </div>
      </form>
    </div>
  ) : null;
};

export default AccountForm;
