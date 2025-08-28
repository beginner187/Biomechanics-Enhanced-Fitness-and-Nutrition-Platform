import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Gender.css"; // For styling

const Gender = () => {
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("gender", JSON.stringify(gender));
  }, [gender]);

  const handleContinue = () => {
    if (gender) {
      console.log("Selected Gender:", gender); // Log the selected gender (you can store it in state/context later)
      navigate("/Age"); // Navigate to the next form
    } else {
      alert("Please select a gender option.");
    }
  };

  return (
    <div className="gender-form-container">
      <div className="gender-form-content">
        <div className="gender-icons">
          {/* Updated Male SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 511.01"
            width="80"
            height="80"
            fill="none"
            stroke={gender === "male" ? "#B9DEFA" : "#ccc"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => setGender("male")}
            style={{ cursor: "pointer", marginRight: "20px" }}
          >
            <path
              fillRule="nonzero"
              d="m456.72 96.62-115.49 115.5c22.46 31.03 35.72 69.17 35.72 110.41 0 52.04-21.1 99.17-55.2 133.27-34.11 34.1-81.23 55.21-133.28 55.21-52.03 0-99.17-21.11-133.27-55.21C21.1 421.7 0 374.57 0 322.53c0-52.04 21.1-99.17 55.2-133.27 34.1-34.1 81.23-55.21 133.27-55.21 42.91 0 82.47 14.35 114.16 38.5L419.89 55.28h-62.84V0H512v158.91h-55.28V96.62zM282.66 228.35c-24.1-24.1-57.41-39.02-94.19-39.02s-70.08 14.92-94.18 39.02c-24.1 24.1-39.01 57.4-39.01 94.18 0 36.78 14.91 70.09 39.01 94.19 24.1 24.1 57.4 39.01 94.18 39.01 36.78 0 70.09-14.91 94.19-39.01 24.1-24.1 39.01-57.41 39.01-94.19s-14.91-70.08-39.01-94.18z"
            />
          </svg>

          {/* Female SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke={gender === "female" ? "pink" : "#ccc"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => setGender("female")}
            style={{ cursor: "pointer" }}
          >
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z" />
            <path d="M12 14v7M9 18h6" />
          </svg>
        </div>
        <p className="gender-question">What is your gender?</p>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="unspecified"
              checked={gender === "unspecified"}
              onChange={() => setGender("unspecified")}
            />
            Don't want to specify
          </label>
        </div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Gender;
