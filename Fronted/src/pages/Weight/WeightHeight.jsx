import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WeightHeight.css"; // Import the CSS file

const WeightHeightForm = () => {
  const [weight, setWeight] = useState(70); // Default weight in kg
  const [height, setHeight] = useState(170); // Default height in cm
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("weight", JSON.stringify(weight));
    localStorage.setItem("height", JSON.stringify(height));
  }, [weight, height]);

  const handleContinue = () => {
    console.log("Selected Weight:", weight, "kg"); // Log the selected weight
    console.log("Selected Height:", height, "cm"); // Log the selected height
    navigate("/health"); // Navigate to the next form
  };

  return (
    <div className="weight-height-form-container">
      <div className="weight-height-form-content">
        <h2 className="weight-height-question">
          <b>What is your weight and height?</b>
        </h2>

        {/* Weight Slider */}
        <div className="slider-container">
          <label htmlFor="weight-slider">Weight: {weight} kg</label>
          <input
            type="range"
            id="weight-slider"
            min="0"
            max="200"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="slider"
          />
        </div>

        {/* Height Slider */}
        <div className="slider-container">
          <label htmlFor="height-slider">Height: {height} cm</label>
          <input
            type="range"
            id="height-slider"
            min="0"
            max="250"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="slider"
          />
        </div>

        {/* Continue Button */}
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WeightHeightForm;
