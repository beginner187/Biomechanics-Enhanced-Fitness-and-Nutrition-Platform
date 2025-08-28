import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SummaryPage.css"; // Import the CSS file

const SummaryPage = () => {
  const [ageYears, setAgeYears] = useState(25); // Default age in years
  const [ageMonths, setAgeMonths] = useState(0); // Default age in months
  const [gender, setGender] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [weight, setWeight] = useState(70); // Default weight in kg
  const [height, setHeight] = useState(170); // Default height in cm
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve data from localStorage and parse JSON strings
    setAgeYears(localStorage.getItem("ageYears") || 25);
    setAgeMonths(localStorage.getItem("ageMonths") || 0);
    setGender(localStorage.getItem("gender") || "");
    setSelectedGoal(localStorage.getItem("selectedGoal") || "");
    setSelectedConditions(
      JSON.parse(localStorage.getItem("selectedConditions")) || []
    );
    setWeight(localStorage.getItem("weight") || 70);
    setHeight(localStorage.getItem("height") || 170);
    setWorkoutFrequency(localStorage.getItem("workoutFrequency") || "");
  }, []);

  // Format the data for display
  const formData = {
    Age: `${ageYears} years ${ageMonths} months`,
    Gender: gender,
    Weight: `${weight} kg`,
    Height: `${height} cm`,
    "Workout Frequency": workoutFrequency,
    "Health Conditions": selectedConditions.join(", ") || "None",
    Goal: selectedGoal,
  };

  const handleSuggestWorkout = () => {
    navigate("/suggest-workout");
  };

  const handleCaloryTracker = () => {
    navigate("/calory-tracker");
  };

  const handleBiomechanicsAnalysis = () => {
    navigate("/biomechanics-analysis");
  };

  return (
    <div className="summary-page-container">
      <div className="summary-page-content">
        <h2 className="summary-title">
          <b>Your Details</b>
        </h2>

        {/* Summary Table */}
        <table className="summary-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons */}
        <div className="button-container">
          <button className="action-button" onClick={handleSuggestWorkout}>
            Suggest Workout
          </button>
          <button className="action-button" onClick={handleCaloryTracker}>
            Calorie Tracker
          </button>
          <button
            className="action-button"
            onClick={handleBiomechanicsAnalysis}
          >
            Biomechanics Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
