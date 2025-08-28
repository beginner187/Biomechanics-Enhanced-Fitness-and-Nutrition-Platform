import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // For styling

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/gender"); // Navigate to the form page
  };

  return (
    <div className="home-container">
      <h1 className="company-name">Bodymend</h1>
      <div className="quotes">
        <p>
          "Strength does not come from physical capacity. It comes from an
          indomitable will."
        </p>
        <p>"The body achieves what the mind believes."</p>
      </div>
      <button className="arrow-button" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Home;
