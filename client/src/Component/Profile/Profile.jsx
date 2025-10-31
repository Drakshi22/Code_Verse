import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Style.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FiSave, FiUser, FiBriefcase, FiBook, FiCalendar, FiPhone, FiMapPin } from "react-icons/fi";

export default function Profile() {
  const [profile, setProfile] = useState({
    userId: "",
    fName: "",
    lName: "",
    companyName: "",
    collegeName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    imageUrl: "",
  });
  
  const [img, setImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [date, setDate] = useState("");
  
  let [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/modifyProfile/" + JSON.parse(localStorage.getItem("user"))._id);
        setProfile(res.data);
        if (res.data.dateOfBirth) {
          const curr = new Date(res.data.dateOfBirth);
          setDate(curr.toISOString().substr(0, 10));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    
    fetchProfile();
  }, [flag]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  }

  const ModifyProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const updatedProfile = { ...profile, imageUrl: img };
      const res = await axios.put("http://localhost:5000/modifyProfile/", updatedProfile);
      
      setSuccessMessage(res.data.message);
      setFlag(!flag);
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-gradient-primary text-black">
              <h3 className="mb-0">Profile Settings</h3>
              <p className="mb-0">Update your personal information</p>
            </div>
            
            <div className="card-body p-4">
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
                </div>
              )}
              
              <div className="row">
                <div className="col-md-8">
                  <form>
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        <FiUser className="me-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="fName"
                        value={profile.fName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        <FiUser className="me-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="lName"
                        value={profile.lName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-bold">
                          <FiBriefcase className="me-2" />
                          Company
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="companyName"
                          value={profile.companyName}
                          onChange={handleChange}
                          placeholder="Where you work"
                        />
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-bold">
                          <FiBook className="me-2" />
                          College
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="collegeName"
                          value={profile.collegeName}
                          onChange={handleChange}
                          placeholder="Your alma mater"
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-bold">
                          <FiCalendar className="me-2" />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          name="dateOfBirth"
                          value={profile.dateOfBirth}
                          onChange={handleChange}
                          defaultValue={date}
                        />
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-bold d-block">
                          <FiUser className="me-2" />
                          Gender
                        </label>
                        <div className="btn-group" role="group">
                          <input
                            type="radio"
                            className="btn-check"
                            id="male"
                            value="MALE"
                            name="gender"
                            checked={profile.gender === "MALE"}
                            onChange={handleChange}
                          />
                          <label className="btn btn-outline-primary" htmlFor="male">
                            Male
                          </label>
                          
                          <input
                            type="radio"
                            className="btn-check"
                            id="female"
                            value="FEMALE"
                            name="gender"
                            checked={profile.gender === "FEMALE"}
                            onChange={handleChange}
                          />
                          <label className="btn btn-outline-primary" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        <FiPhone className="me-2" />
                        Contact Number
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        name="contactNumber"
                        placeholder="Enter phone number"
                        className="form-control form-control-lg p-0 border-0"
                        value={profile.contactNumber}
                        onChange={(value) => setProfile({ ...profile, contactNumber: value })}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        <FiMapPin className="me-2" />
                        Address
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Your current address"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      onClick={ModifyProfile}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        <FiSave className="me-2" />
                      )}
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
                
                <div className="col-md-4">
                  <div className="d-flex flex-column align-items-center text-center p-4">
                    <ImageUpload profile={profile} setProfile={setProfile} />
                    <div className="mt-3">
                      <h5>{profile.fName} {profile.lName}</h5>
                      <p className="text-muted mb-1">{profile.companyName}</p>
                      <p className="text-muted mb-0">{profile.collegeName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}