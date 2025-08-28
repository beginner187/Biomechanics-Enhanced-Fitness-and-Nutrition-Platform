import React, { useState, useEffect, useRef } from "react";
import "./SuggestWorkout.css";
import Benchdips from "./videos/Benchdips.mp4";
import Chinup from "./videos/Chinup.mp4";
import KneePushUp from "./videos/Kneepush.mp4";
import Squats from "./videos/squats.mp4";
import Lungs from "./videos/lunges.mp4";
import Glutes from "./videos/bridgeglutes.mp4";
import HandPlank from "./videos/hand_plank.mp4";
import InclinePush from "./videos/inclinepush.mp4";
import Leg_raise from "./videos/leg raise.mp4";
import Push from "./videos/push.mp4";
import Row_side from "./videos/row side.mp4";
import Curl from "./videos/curl.mp4";
import Cableabs from "./videos/cableabs.mp4";
import Calve from "./videos/calve.mp4";
import Overheadpress from "./videos/overheadpress.mp4";
import Shrugs from "./videos/shrugs.mp4";
import KettleWalk from "./videos/kettlewalk.mp4";
import latepulldown from "./videos/lattpulldown.mp4";
import benchpress from "./videos/benchpress.mp4";

class WorkoutRecommender {
  constructor(userData) {
    this.user = {
      age: parseInt(userData.ageYears) || 25,
      weight: parseInt(userData.weight) || 70,
      height: parseInt(userData.height) || 170,
      gender: userData.gender || "Male",
      conditions: userData.conditions || [],
      goal: userData.goal || "General Fitness",
      frequency: userData.frequency || "3-4 times/week",
    };

    this.allExercises = [
      {
        name: "Bench Dips",
        muscle: "Triceps",
        difficulty: 2,
        impact: 3,
        video: Benchdips,
      },
      {
        name: "Body Assisted Chin Up",
        muscle: "Back",
        difficulty: 3,
        impact: 4,
        video: Chinup,
      },
      {
        name: "Knee Pushup",
        muscle: "Chest",
        difficulty: 1,
        impact: 2,
        video: KneePushUp,
      },
      {
        name: "Bodyweight Squats",
        muscle: "Legs",
        difficulty: 2,
        impact: 3,
        video: Squats,
      },
      {
        name: "Lunges",
        muscle: "Legs",
        difficulty: 3,
        impact: 4,
        video: Lungs,
      },
      {
        name: "Bodyweight Glutes",
        muscle: "Glutes",
        difficulty: 2,
        impact: 3,
        video: Glutes,
      },
      {
        name: "Hand Plank",
        muscle: "Core",
        difficulty: 2,
        impact: 3,
        video: HandPlank,
      },
      {
        name: "Incline Push",
        muscle: "Chest",
        difficulty: 2,
        impact: 3,
        video: InclinePush,
      },
      {
        name: "Laying Leg Raises",
        muscle: "Core",
        difficulty: 3,
        impact: 4,
        video: Leg_raise,
      },
      {
        name: "Push Up",
        muscle: "Chest",
        difficulty: 3,
        impact: 4,
        video: Push,
      },
      {
        name: "Bodyweight Ring Row Side",
        muscle: "Back",
        difficulty: 3,
        impact: 4,
        video: Row_side,
      },
      {
        name: "Cable Biceps Curl",
        muscle: "Arms",
        difficulty: 2,
        impact: 3,
        video: Curl,
      },
      {
        name: "Kneeling Crunches",
        muscle: "Core",
        difficulty: 1,
        impact: 2,
        video: Cableabs,
      },
      {
        name: "Calves Stretch",
        muscle: "Legs",
        difficulty: 1,
        impact: 1,
        video: Calve,
      },
      {
        name: "Overhead Press",
        muscle: "Shoulders",
        difficulty: 4,
        impact: 4,
        video: Overheadpress,
      },
      {
        name: "Inclined Shrugs",
        muscle: "Traps",
        difficulty: 3,
        impact: 3,
        video: InclinePush,
      },
      {
        name: "Walking Farmer March",
        muscle: "Full Body",
        difficulty: 3,
        impact: 4,
        video: KettleWalk,
      },
      {
        name: "Machine Pull Down",
        muscle: "Back",
        difficulty: 4,
        impact: 4,
        video: latepulldown,
      },
      {
        name: "Barbell Press",
        muscle: "Chest",
        difficulty: 5,
        impact: 5,
        video: benchpress,
      },
    ];
  }

  calculateFitnessScore() {
    let score = 50;
    if (this.user.age < 18) score -= 10;
    else if (this.user.age >= 18 && this.user.age <= 30) score += 15;
    else if (this.user.age > 30 && this.user.age <= 50) score += 5;
    else score -= (this.user.age - 50) * 0.5;

    const heightM = this.user.height / 100;
    const bmi = this.user.weight / (heightM * heightM);
    if (bmi >= 18.5 && bmi <= 24.9) score += 15;
    else if (bmi < 18.5) score -= (18.5 - bmi) * 2;
    else score -= (bmi - 24.9) * 1.5;

    score += this.user.gender === "Female" ? -5 : 0;

    const frequencyScores = {
      Never: -20,
      "1-2 times/week": 5,
      "3-4 times/week": 15,
      "5+ times/week": 25,
    };
    score += frequencyScores[this.user.frequency] || 0;

    const conditionPenalties = {
      "Heart problems": -20,
      "High blood pressure": -15,
      Diabetes: -10,
      "Joint pain": -10,
      "Back pain": -15,
      "Knee problems": -10,
    };

    this.user.conditions.forEach((condition) => {
      score += conditionPenalties[condition] || -5;
    });

    return Math.min(100, Math.max(0, score));
  }

  getWorkoutLevel() {
    const score = this.calculateFitnessScore();
    if (score < 40) return "beginner";
    if (score < 75) return "intermediate";
    return "advanced";
  }

  exerciseSuitability(exercise) {
    let score = 0.5;
    const level = this.getWorkoutLevel();
    if (level === "beginner" && exercise.difficulty <= 2) score += 0.3;
    else if (level === "intermediate" && exercise.difficulty <= 3) score += 0.2;
    else if (level === "advanced") score += exercise.difficulty * 0.1;

    if (this.user.goal.includes("Strength") && exercise.impact >= 4)
      score += 0.2;
    if (this.user.goal.includes("Endurance") && exercise.muscle === "Legs")
      score += 0.1;
    if (
      this.user.goal.includes("Weight Loss") &&
      ["Full Body", "Legs"].includes(exercise.muscle)
    )
      score += 0.15;

    if (
      this.user.conditions.includes("Knee problems") &&
      ["Lunges", "Squats"].includes(exercise.name)
    )
      score -= 0.4;
    if (
      this.user.conditions.includes("Back pain") &&
      exercise.muscle === "Back" &&
      exercise.difficulty > 2
    )
      score -= 0.3;
    if (
      this.user.conditions.includes("Shoulder pain") &&
      ["Overhead Press", "Barbell Press"].includes(exercise.name)
    )
      score -= 0.5;

    if (
      this.user.gender === "Female" &&
      ["Glutes", "Legs"].includes(exercise.muscle)
    )
      score += 0.1;
    if (
      this.user.gender === "Male" &&
      ["Chest", "Arms"].includes(exercise.muscle)
    )
      score += 0.1;

    return Math.min(1, Math.max(0, score));
  }

  generateWorkoutPlan() {
    const level = this.getWorkoutLevel();
    const { sets, reps } = this.getRepsSets();

    const scoredExercises = this.allExercises
      .map((ex) => ({
        ...ex,
        score: this.exerciseSuitability(ex),
      }))
      .sort((a, b) => b.score - a.score);

    const upperBody = scoredExercises.filter((ex) =>
      ["Chest", "Back", "Arms", "Shoulders", "Traps"].includes(ex.muscle)
    );
    const lowerBody = scoredExercises.filter((ex) =>
      ["Legs", "Glutes"].includes(ex.muscle)
    );
    const core = scoredExercises.filter((ex) => ex.muscle === "Core");
    const fullBody = scoredExercises.filter((ex) => ex.muscle === "Full Body");

    return {
      "Day 1": {
        focus: "Upper Body Focus",
        workouts: this.selectExercises(
          [
            ...upperBody.slice(0, 4),
            ...core.slice(0, 2),
            ...fullBody.slice(0, 1),
          ],
          6
        ),
        sets,
        reps,
      },
      "Day 2": {
        focus: "Lower Body Focus",
        workouts: this.selectExercises(
          [
            ...lowerBody.slice(0, 4),
            ...core.slice(2, 4),
            ...fullBody.slice(0, 1),
          ],
          6
        ),
        sets,
        reps,
      },
      "Day 3": {
        focus: "Full Body Circuit",
        workouts: this.selectExercises(
          [
            ...upperBody.slice(2, 4),
            ...lowerBody.slice(2, 4),
            ...core.slice(1, 3),
            ...fullBody,
          ],
          6
        ),
        sets,
        reps,
      },
    };
  }

  selectExercises(pool, count) {
    const selected = [];
    const muscleGroups = new Set();

    for (const ex of pool) {
      if (!muscleGroups.has(ex.muscle) || selected.length < 3) {
        selected.push(ex);
        muscleGroups.add(ex.muscle);
      }
      if (selected.length >= count) break;
    }

    while (selected.length < count && pool.length > 0) {
      selected.push(pool.shift());
    }

    return selected.slice(0, count);
  }

  getRepsSets() {
    const level = this.getWorkoutLevel();
    const goal = this.user.goal;

    if (goal.includes("Strength")) {
      return {
        sets: level === "beginner" ? 3 : level === "intermediate" ? 4 : 5,
        reps:
          level === "beginner"
            ? "6-8"
            : level === "intermediate"
            ? "4-6"
            : "3-5",
        rest: "2-3 min",
      };
    }
    if (goal.includes("Endurance")) {
      return {
        sets: level === "beginner" ? 2 : 3,
        reps:
          level === "beginner"
            ? "12-15"
            : level === "intermediate"
            ? "15-20"
            : "20-25",
        rest: "30-60 sec",
      };
    }
    if (goal.includes("Weight Loss")) {
      return {
        sets: level === "beginner" ? 3 : 4,
        reps:
          level === "beginner"
            ? "10-12"
            : level === "intermediate"
            ? "12-15"
            : "15-20",
        rest: "45-90 sec",
      };
    }
    return {
      sets: level === "beginner" ? 3 : level === "intermediate" ? 4 : 5,
      reps:
        level === "beginner"
          ? "8-12"
          : level === "intermediate"
          ? "10-15"
          : "12-20",
      rest: "60-90 sec",
    };
  }
}

const ExerciseVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, [src]);

  return (
    <video ref={videoRef} key={src} autoPlay loop muted playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
};

const WorkoutPlanner = () => {
  const [userData, setUserData] = useState({
    ageYears: localStorage.getItem("ageYears") || 25,
    gender: localStorage.getItem("gender") || "Male",
    weight: localStorage.getItem("weight") || 70,
    height: localStorage.getItem("height") || 170,
    conditions: JSON.parse(localStorage.getItem("selectedConditions")) || [],
    goal: localStorage.getItem("selectedGoal") || "General Fitness",
    frequency: localStorage.getItem("workoutFrequency") || "3-4 times/week",
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [activeDay, setActiveDay] = useState("Day 1");
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("workoutProgress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const recommender = new WorkoutRecommender(userData);
    setWorkoutPlan(recommender.generateWorkoutPlan());
  }, [userData]);

  const toggleExerciseCompletion = (day, exerciseName) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      const key = `${day}-${exerciseName}`;
      newProgress[key] = !newProgress[key];
      localStorage.setItem("workoutProgress", JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const calculateCompletion = (day) => {
    if (!workoutPlan?.[day]?.workouts) return 0;
    const completed = workoutPlan[day].workouts.filter(
      (ex) => progress[`${day}-${ex.name}`]
    ).length;
    return Math.round((completed / workoutPlan[day].workouts.length) * 100);
  };

  if (!workoutPlan) {
    return (
      <div className="loading">
        <h3>Generating your AI-powered workout plan...</h3>
        <p>Analyzing your fitness profile and goals</p>
      </div>
    );
  }

  return (
    <div className="workout-planner">
      <div className="user-profile">
        <div className="user-avatar">
          {userData.gender === "Male" ? "♂" : "♀"}
        </div>
        <div className="user-details">
          <h2>AI-Powered Workout Plan</h2>
          <div className="user-stats-grid">
            <div className="stat-item">
              <span className="stat-label">Age</span>
              <span className="stat-value">{userData.ageYears}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Weight</span>
              <span className="stat-value">{userData.weight} kg</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Height</span>
              <span className="stat-value">{userData.height} cm</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Level</span>
              <span className="stat-value">
                {new WorkoutRecommender(userData).getWorkoutLevel()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Goal</span>
              <span className="stat-value">{userData.goal}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Frequency</span>
              <span className="stat-value">{userData.frequency}</span>
            </div>
            {userData.conditions.length > 0 && (
              <div className="stat-item full-width">
                <span className="stat-label">Health Considerations</span>
                <span className="stat-value">
                  {userData.conditions.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="day-navigation">
        {Object.keys(workoutPlan).map((day) => (
          <button
            key={day}
            className={`day-btn ${activeDay === day ? "active" : ""}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
            <div className="day-progress">
              <div
                className="progress-fill"
                style={{ width: `${calculateCompletion(day)}%` }}
              ></div>
            </div>
          </button>
        ))}
      </div>

      <div className="workout-day-container">
        <h3 className="workout-day-title">
          {activeDay} - {workoutPlan[activeDay].focus}
        </h3>
        <div className="workout-meta">
          <div className="meta-item">
            <span>Sets:</span> <strong>{workoutPlan[activeDay].sets}</strong>
          </div>
          <div className="meta-item">
            <span>Reps:</span> <strong>{workoutPlan[activeDay].reps}</strong>
          </div>
          <div className="meta-item">
            <span>Rest:</span>{" "}
            <strong>{workoutPlan[activeDay].rest || "60-90 sec"}</strong>
          </div>
        </div>

        <div className="exercises-grid">
          {workoutPlan[activeDay].workouts.map((exercise, index) => (
            <div
              key={`${activeDay}-${index}`}
              className={`exercise-card ${
                progress[`${activeDay}-${exercise.name}`] ? "completed" : ""
              }`}
              onClick={() => toggleExerciseCompletion(activeDay, exercise.name)}
            >
              <div className="video-container">
                <ExerciseVideo src={exercise.video} />
              </div>

              <div className="exercise-info">
                <h4>{exercise.name}</h4>
                <p className="muscle-group">{exercise.muscle}</p>

                <div className="exercise-meta-box">
                  <div className="meta-row">
                    <span>Sets:</span>
                    <span>{workoutPlan[activeDay].sets}</span>
                  </div>
                  <div className="meta-row">
                    <span>Reps:</span>
                    <span>{workoutPlan[activeDay].reps}</span>
                  </div>
                  <div className="completion-btn">
                    {progress[`${activeDay}-${exercise.name}`] ? (
                      <span className="completed-text">✓ Completed</span>
                    ) : (
                      <span className="complete-text">Mark Complete</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;
