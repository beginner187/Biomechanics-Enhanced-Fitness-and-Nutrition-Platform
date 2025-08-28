import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Gender from "./pages/Gender/Gender";
import Age from "./pages/Age/Age";
import WeightHeight from "./pages/Weight/WeightHeight";
import Health from "./pages/Health/Health";
import Workout from "./pages/Workout/Workout";
import Goal from "./pages/Goal/Goal";
import Summary from "./pages/SummaryPage/SummaryPage";
import SuggestWorkout from "./pages/SuggestWorkout/SuggestWorkout";
import CaloryTracker from "./pages/CaloryTracker/CaloryTracker";
import BiomechanicsAnalysis from "./pages/Biomechanical/Biomechanical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/age" element={<Age />} />
        <Route path="/weightHeight" element={<WeightHeight />} />
        <Route path="/health" element={<Health />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/suggest-workout" element={<SuggestWorkout />} />
        <Route path="/calory-tracker" element={<CaloryTracker />} />
        <Route path="/suggest-workout" element={<SuggestWorkout />} />
        <Route
          path="/biomechanics-analysis"
          element={<BiomechanicsAnalysis />}
        />
      </Routes>
    </Router>
  );
}

export default App;
