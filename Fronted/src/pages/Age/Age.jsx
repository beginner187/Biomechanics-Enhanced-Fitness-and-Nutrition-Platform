import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Age.css"; // Import the CSS file

const AgeForm = () => {
  const [ageYears, setAgeYears] = useState(25); // Default age in years
  const [ageMonths, setAgeMonths] = useState(0); // Default age in months
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("ageYears", JSON.stringify(ageYears));
    localStorage.setItem("ageMonths", JSON.stringify(ageMonths));
  }, [ageYears, ageMonths]);

  const handleContinue = () => {
    console.log("Selected Age:", ageYears, "years", ageMonths, "months"); // Log the selected age
    navigate("/weightHeight"); // Navigate to the next form
  };

  return (
    <div className="age-form-container">
      <div className="age-form-content">
        <h2 className="age-question">
          <b>How old are you?</b>
        </h2>

        {/* Years Slider */}
        <div className="slider-container">
          <label htmlFor="years-slider">Years: {ageYears}</label>
          <input
            type="range"
            id="years-slider"
            min="0"
            max="100"
            value={ageYears}
            onChange={(e) => setAgeYears(Number(e.target.value))}
            className="slider"
          />
        </div>

        {/* Months Dropdown */}
        <div className="months-dropdown">
          <label htmlFor="months-select">Months:</label>
          <select
            id="months-select"
            value={ageMonths}
            onChange={(e) => setAgeMonths(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i} months
              </option>
            ))}
          </select>
        </div>

        {/* Continue Button */}
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AgeForm;
