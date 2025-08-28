import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Goal.css"; // Import the CSS file

const GoalForm = () => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedGoal", JSON.stringify(selectedGoal));
  }, [selectedGoal]);

  const goals = [
    {
      id: "lose-weight",
      label: "Lose Weight",
      description: "Shed extra pounds and achieve a healthier body.",
    },
    {
      id: "gain-weight",
      label: "Gain Weight",
      description: "Build muscle and increase body mass.",
    },
    {
      id: "stamina-mobility",
      label: "Stamina & Mobility",
      description: "Improve endurance, flexibility, and movement.",
    },
    {
      id: "strength",
      label: "Strength",
      description: "Build physical power and confidence.",
    },
    {
      id: "injury-rehab",
      label: "Injury Rehab",
      description: "Recover from injuries and regain strength.",
    },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      console.log("Selected Goal:", selectedGoal); // Log the selected goal
      navigate("/summary"); // Navigate to the next form
    } else {
      alert("Please select a goal.");
    }
  };

  return (
    <div className="goal-form-container">
      <div className="goal-form-content">
        <h2 className="goal-question">
          <b>What is your goal?</b>
        </h2>
        <p className="goal-subtext">Select any one and proceed</p>

        {/* Goal Options */}
        <div className="goal-options">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`goal-option ${
                selectedGoal === goal.id ? "selected" : ""
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <span className="goal-label">{goal.label}</span>
              <p className="goal-description">{goal.description}</p>
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

export default GoalForm;
