import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Workout.css"; // Import the CSS file

const WorkoutForm = () => {
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("workoutFrequency", JSON.stringify(workoutFrequency));
  }, [workoutFrequency]);

  const workoutOptions = [
    "I don't",
    "1-3 times in a week",
    "3-5 times in a week",
    "6-7 times in a week",
  ];

  const handleContinue = () => {
    if (workoutFrequency) {
      console.log("Selected Workout Frequency:", workoutFrequency); // Log the selected frequency
      navigate("/goal"); // Navigate to the next form
    } else {
      alert("Please select a workout frequency option.");
    }
  };

  return (
    <div className="workout-form-container">
      <div className="workout-form-content">
        <h2 className="workout-question">
          <b>How many times do you workout?</b>
        </h2>

        {/* Workout Frequency Options */}
        <div className="workout-options">
          {workoutOptions.map((option, index) => (
            <div
              key={index}
              className={`workout-option ${
                workoutFrequency === option ? "selected" : ""
              }`}
              onClick={() => setWorkoutFrequency(option)}
            >
              <input
                type="radio"
                name="workout-frequency"
                value={option}
                checked={workoutFrequency === option}
                onChange={() => setWorkoutFrequency(option)}
                hidden
              />
              {option}
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

export default WorkoutForm;
