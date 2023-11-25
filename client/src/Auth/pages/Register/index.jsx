import React, { useEffect, useState } from "react";
import AuthWrapper from "auth/components/AuthWrapper";
import TextControl from "auth/components/TextControl";
import "styling/Auth/Register.css";

import { useNavigate } from "react-router-dom";
import { register } from "services/intuit";
const Index = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Name validations
    if (!userData.firstName.trim()) {
      errors.firstName = "First name is required";
      formIsValid = false;
    }

    if (!userData.lastName.trim()) {
      errors.lastName = "Last name is required";
      formIsValid = false;
    }

    // Email validations
    if (!userData.email) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email address is invalid";
      formIsValid = false;
    }

    // Password validations
    if (!userData.password) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (userData.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
      formIsValid = false;
    }

    if (!userData.confirmPassword) {
      errors.confirmPassword = "Confirming password is required";
      formIsValid = false;
    } else if (userData.confirmPassword !== userData.password) {
      errors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    // Phone number validations
    if (!userData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(userData.phoneNumber)) {
      errors.phoneNumber = "Phone number is invalid";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const body = {
          userData: userData,
          intuitEmail: localStorage.getItem("intuitEmail"),
        };
        const response = await register(body);
        console.log(response.data);
        navigate("verify-email");
        // const response = await axios.post(
        //   "http://localhost:5000/api/v1/auth/register",
        //   userData
        // );
        // console.log(response.data);
        // Redirect or handle response
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    document.title = "Kibi | Register";
  }, []);

  return (
    <AuthWrapper title="Welcome To Kibi">
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <TextControl
              id="firstName"
              className="text-control--text"
              type="text"
              onChange={handleChange("firstName")}
              placeholder="Your first name"
              value={userData.firstName}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <TextControl
              id="lastName"
              className="text-control--text"
              type="text"
              onChange={handleChange("lastName")}
              placeholder="Your last name"
              value={userData.lastName}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <TextControl
              id="email"
              className="text-control--text"
              type="email"
              onChange={handleChange("email")}
              placeholder="jessica.hanson@example.com"
              value={userData.email}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <TextControl
              id="password"
              className="text-control--password"
              type="password"
              onChange={handleChange("password")}
              placeholder="Password"
              value={userData.password}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <TextControl
              id="confirmPassword"
              className="text-control--password"
              type="password"
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm Password"
              value={userData.confirmPassword}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label htmlFor="phoneNumber">Phone (optional)</label>
            <TextControl
              id="phoneNumber"
              className="text-control--text"
              type="text"
              onChange={handleChange("phoneNumber")}
              placeholder="123-456-7890"
              value={userData.phoneNumber}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>

          {/* Terms of Agreement */}
          <div className="form-control form-control--checkbox">
            <input
              type="checkbox"
              id="agree-on-terms"
              onChange={handleCheckboxChange}
              checked={agreedToTerms}
            />
            <label htmlFor="agree-on-terms">
              Agreed to the terms of use and privacy policy.
            </label>
          </div>

          {/* Submit Button */}
          <div className="form__actions">
            <button className="register__submit" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Index;
