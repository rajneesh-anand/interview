import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSignup } from "../hooks/useSignup";

const Registration = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { signup, error, isLoading } = useSignup();

  const onChange = (e) => setProfilePhoto(e.target.files[0]);
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    return (
      today.getMonth() -
      birthDate.getMonth() +
      12 * (today.getFullYear() - birthDate.getFullYear())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getAge(birthDate) < 60) {
      alert(
        "You are too young to use this awesome software. Check your birth date !"
      );
      return;
    }
    const fd = new FormData(e.target);
    fd.append("dob", birthDate);
    fd.append("photo", profilePhoto);
    await signup(fd);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 text-center">
                  <img
                    src={
                      profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
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
                    <h5 className="fw-bold pb-3">REGISTRATION</h5>
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
                        placeholder="Enter your name "
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
                        placeholder="Enter your email"
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
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Enter your password "
                        required
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
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12  mb-2 text-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
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

export default Registration;
