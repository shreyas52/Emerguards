import React, { useState } from "react";
import { FontAwesomeIcon } from "";
import { faTimes } from "";
import "./App.css"; // Import your stylesheet
import Logo from "";
import CS from "";
import C from "";
import U from "";
import SC from "";
import axios from "axios";

const AdminHomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceIcon, setServiceIcon] = useState(null);
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceFeatures, setServiceFeatures] = useState("");
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
    mobileNo: "",
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const handleCancel = (e) => {
    setServiceName("");
    setServiceType("");
    setServiceIcon(null);
    setServiceDescription("");
    setServiceFeatures("");
    setOtpSent(false);
    setEnteredOtp("");
    // alert(""+enteredOtp)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file as needed (e.g., upload to server or display preview)
    console.log("Selected file:", file);
    setServiceIcon(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      try {
        const response = axios.post("http://localhost:3002/api/admin-login", {
          username: adminCredentials.username,
          password: adminCredentials.password,
        });

        if (response.data.success) {
          setOtpSent(true);
        } else {
          console.error("Admin login failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error in admin login:", error);
      }
    } else {
      // Handle form submission for other sections
      // ...

      // Reset form inputs
      setAdminCredentials({ username: "", password: "", mobileNo: "" });
    }
    // Perform actions with the form data (e.g., send to server)
    console.log("Service Name:", serviceName);
    console.log("Service Type:", serviceType);
    console.log("Service Icon:", serviceIcon);
    console.log("Service Description:", serviceDescription);
    console.log("Service Features:", serviceFeatures);
  };
  // Reset form inputs

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/send-otp", {
        phone: adminCredentials.mobileNo,
      });
      handleLogin();

      if (response.data.success) {
        console.log("OTP sent successfully");
      } else {
        console.error("Error sending OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
    }
  };
  // Function to toggle the login modal
  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/verify-otp",
        {
          otp1: enteredOtp,
        }
      );

      if (response.data.success) {
        // OTP verification successful
        console.log("helllo");
        handleLogin(); // You may want to replace this with the appropriate action
      } else {
        console.error("OTP verification failed:", response.data.message);
        // Handle OTP verification failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Error in OTP verification:", error);
      // Handle the error, e.g., display an error message
    }
  };
  // Function to handle login
  const handleLogin = async () => {
    try {
      // Call the OTP verification function
      await handleVerifyOtp();
      // If OTP verification is successful, set isLoggedIn to true
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }

    setShowOTPModal(!showOTPModal);
  };
  const handleLogout = () => {
    // Perform any logout actions, e.g., clearing tokens, etc.
    setIsLoggedIn(false);
    setSelectedMenuItem("Home"); // Set the default selected menu item to 'Home'
  };
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setOtpSent(false);
    setEnteredOtp("");
  };
  const toggleOTPModal = () => {
    setShowOTPModal(!showOTPModal);
    setOtpSent(false);
    setEnteredOtp("");
  };
  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem) => {
    if (isLoggedIn) {
      setSelectedMenuItem(menuItem);
    }
  };

  // Function to render the selected content based on the selected menu item
  const renderSelectedContent = () => {
    if (!isLoggedIn) {
      if (selectedMenuItem === "Home") {
        return (
          <div className="homepage">
            <h1>Welcome to the EMERGAURD Admin Portal</h1>
            <p>Manage your service providers and users here.</p>
            <p>
              Login to this portal with valid credentials.
              <button2 type="button" onClick={toggleLoginModal}>
                Login
              </button2>
            </p>
            <div className="homepage-footer">
              <p className="first-slide">
                <span>
                  *Note: Any illegal activities that occur will be punishable.
                </span>
              </p>
            </div>
          </div>
        );
      }
    } else {
      if (selectedMenuItem === "AdminDashboard") {
        // Render Admin Dashboard content here
        return (
          <div>
            <div className="admindashboard">
              <h2>Admin Dashboard</h2>
              <div className="card-container">
                <div className="card1">
                  <div className="cardinfo">
                    <div className="icon">
                      <img src={CS} alt="icon1" width={40} />
                    </div>
                    <p style={{ paddingTop: 12 }}>No. of Services</p>
                  </div>
                  <div className="value">
                    <h3>3</h3>
                  </div>
                </div>
                <div className="card2">
                  <div className="cardinfo">
                    <div className="icon">
                      <img src={C} alt="icon2" width={40} />
                    </div>
                    <p style={{ paddingTop: 12 }}>Types of Services</p>
                  </div>
                  <div className="value">
                    <h3>3</h3>
                  </div>
                </div>
                <div className="card3">
                  <div className="cardinfo">
                    <div className="icon">
                      <img src={U} alt="icon3" width={40} />
                    </div>
                    <p style={{ paddingTop: 12 }}>No. of Users</p>
                  </div>
                  <div className="value">
                    <h3>3</h3>
                  </div>
                </div>
                <div className="card4">
                  <div className="cardinfo">
                    <div className="icon">
                      <img src={SC} alt="icon3" width={40} />
                    </div>
                    <p style={{ paddingTop: 12 }}>No. of Service Center</p>
                  </div>
                  <div className="value">
                    <h3>3</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (selectedMenuItem === "AddServices") {
        // Render Handle Users content here
        return (
          <div className="add-service-form">
            <div className="add-service">
              <h2>Add Services</h2>
              <form onSubmit={handleSubmit}>
                Service Name:
                <input
                  type="text"
                  placeholder="Enter Service Name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                Service Type:
                <input
                  type="text"
                  placeholder="Enter Service Type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                />
                Service Icon:
                <div>
                  <label
                    className="custom-file-upload"
                    onChange={handleFileChange}
                  >
                    Add Icon
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                Service Description:
                <input
                  type="textfield"
                  placeholder="Enter Service Description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                />
                Service Features:
                <input
                  type="textfield"
                  placeholder="Enter Service Features"
                  value={serviceFeatures}
                  onChange={(e) => setServiceFeatures(e.target.value)}
                />
                <div>
                  <button1 type="submit" onClick={handleSubmit}>
                    Submit
                  </button1>
                  <button2 type="button" onClick={handleCancel}>
                    Cancel
                  </button2>
                </div>
              </form>
            </div>
          </div>
        );
      } else if (selectedMenuItem === "HandleUsers") {
        // Render Handle Users content here
        return (
          <div>
            {/* Content for Handle Users */}
            <h2>Handle Users</h2>
            {/* Add content to handle users here */}
          </div>
        );
      } else if (selectedMenuItem === "HandleServiceProviders") {
        // Render Handle Service Providers content here
        return (
          <div>
            {/* Content for Handle Service Providers */}
            <h2>Handle Service Providers</h2>
            {/* Add content to handle service providers here */}
          </div>
        );
      } else if (selectedMenuItem === "VerifyUserCredentials") {
        // Render Verify User Credentials content here
        return (
          <div>
            {/* Content for Verify User Credentials */}
            <h2>Verify User Credentials</h2>
            {/* Add content to verify user credentials here */}
          </div>
        );
      } else if (selectedMenuItem === "VerifyServiceProvidersCredentials") {
        // Render Verify Service Providers Credentials content here
        return (
          <div>
            {/* Content for Verify Service Providers Credentials */}
            <h2>Verify Service Providers Credentials</h2>
            {/* Add content to verify service providers' credentials here */}
          </div>
        );
      } else if (selectedMenuItem === "UserReviews") {
        // Render User Reviews content here
        return (
          <div>
            {/* Content for User Reviews */}
            <h2>User Reviews</h2>
            {/* Add content to view user reviews here */}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="Project Logo" />
        </div>
        {isLoggedIn && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="sidecontent">
            {!isLoggedIn && (
              <button onClick={() => handleMenuItemClick("Home")}>
                Home Page
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleMenuItemClick("AdminDashboard")}
                enabled={!isLoggedIn}
              >
                Admin Dashboard
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleMenuItemClick("AddServices")}
                enabled={!isLoggedIn}
              >
                Add Services
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleMenuItemClick("HandleUsers")}
                enabled={!isLoggedIn}
              >
                Handle Users
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleMenuItemClick("HandleServiceProviders")}
                enabled={!isLoggedIn}
              >
                Handle Service Providers
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleMenuItemClick("VerifyUserCredentials")}
              >
                Verify User Credentials
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() =>
                  handleMenuItemClick("VerifyServiceProvidersCredentials")
                }
              >
                Verify Service Providers Credentials
              </button>
            )}
            {isLoggedIn && (
              <button onClick={() => handleMenuItemClick("UserReviews")}>
                User Reviews
              </button>
            )}
          </div>
        </div>
        <div className="main-content">{renderSelectedContent()}</div>
      </div>
      {showLoginModal && (
        <div className="login-modal">
          <div className="close-button" onClick={toggleLoginModal}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="login-form">
            {/* Your login form content goes here */}
            <h2>Admin Login</h2>
            {!otpSent ? (
              // Render login form with OTP section
              <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>
                <div className="btn">
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Render OTP section
              <form></form>
            )}
            <form></form>
          </div>
        </div>
      )}
      {showOTPModal && (
        <div className="login-modal">
          <div className="close-button" onClick={toggleOTPModal}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="login-form">
            {/* Your login form content goes here */}
            <h2>Admin Login</h2>
            {!otpSent ? (
              <form>
                <p className="message">
                  Enter the OTP sent to your registered mobile number
                </p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />
                <button type="button" onClick={handleLogin && handleVerifyOtp}>
                  Login
                </button>
                <div className="btn">
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Render OTP section
              <form></form>
            )}
            <form></form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};
export default AdminHomePage;
