import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Health.css"; // Import the CSS file

const HealthDetailsForm = () => {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "selectedConditions",
      JSON.stringify(selectedConditions)
    );
  }, [selectedConditions]);

  const healthConditions = [
    "None",
    "Obesity",
    "Diabetes",
    "PCOD",
    "High Cholesterol/BP",
    "Thyroid Issues",
    "Other",
  ];

  const handleConditionChange = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(
        selectedConditions.filter((item) => item !== condition)
      );
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleContinue = () => {
    console.log("Selected Health Conditions:", selectedConditions); // Log the selected conditions
    if (selectedConditions.length > 0) {
      navigate("/workout"); // Navigate to the next form
    } else {
      alert("please choose a Health-info");
    }
  };

  return (
    <div className="health-details-form-container">
      <div className="health-details-form-content">
        <h2 className="health-details-question">
          <b>Share more health details</b>
        </h2>
        <p className="health-details-subtext">
          This will help us create the right plans for you.
        </p>

        {/* Health Conditions */}
        <div className="health-options">
          {healthConditions.map((condition, index) => (
            <div
              key={index}
              className={`health-option ${
                selectedConditions.includes(condition) ? "selected" : ""
              }`}
              onClick={() => handleConditionChange(condition)}
            >
              <input
                type="checkbox"
                value={condition}
                checked={selectedConditions.includes(condition)}
                onChange={() => handleConditionChange(condition)}
                hidden
              />
              {condition}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default HealthDetailsForm;
