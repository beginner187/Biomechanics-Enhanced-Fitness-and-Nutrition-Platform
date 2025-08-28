import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Biomechanical.css";

// Biomechanical Models (simplified OpenSim concepts)
const biomechanicalModels = {
  "Lower Body": ["Full Body", "Lower Extremity", "Hip-Knee-Ankle"],
  "Upper Body": ["Shoulder-Elbow", "Spine", "Neck"],
  "Full Body": ["Full Body Detailed", "Simplified Full Body"],
};

// DARPA-inspired motion metrics
const motionMetrics = {
  "Stability Index": ["Excellent", "Good", "Fair", "Poor"],
  "Movement Smoothness": ["Very Smooth", "Smooth", "Moderate", "Jerky"],
  "Impact Force": ["Low", "Moderate", "High", "Very High"],
};

// Kinovea-inspired video analysis tools
const videoAnalysisTools = [
  "Angle Measurement",
  "Point Tracking",
  "Distance Measurement",
  "Temporal Analysis",
];

// Helper functions for advanced analysis
const getPostureAnalysis = (posture) => {
  const analysis = {
    Neutral: {
      advice: "Great! Maintain your neutral posture to reduce injury risk.",
      risk: "Low",
      model: "Neutral Spine Model",
    },
    "Forward Head": {
      advice:
        "Consider chin tucks and posture drills to correct forward head posture.",
      risk: "Moderate",
      model: "Cervical Spine Model",
    },
    "Rounded Shoulders": {
      advice:
        "Strengthen upper back and stretch chest muscles to improve rounded shoulders.",
      risk: "Moderate",
      model: "Thoracic Spine Model",
    },
    "Anterior Pelvic Tilt": {
      advice:
        "Strengthen glutes/hamstrings and stretch hip flexors to address pelvic tilt.",
      risk: "High",
      model: "Lumbar-Pelvic Model",
    },
    "Posterior Pelvic Tilt": {
      advice:
        "Strengthen hip flexors and stretch hamstrings to correct posterior tilt.",
      risk: "Moderate",
      model: "Lumbar-Pelvic Model",
    },
  };
  return analysis[posture] || {};
};

const getJointAnalysis = (joint, value) => {
  if (joint === "shoulder") {
    const analysis = {
      "Full Range": {
        torque: "Optimal",
        stability: "High",
        model: "Shoulder Complex Model",
      },
      Limited: {
        torque: "Suboptimal",
        stability: "Moderate",
        model: "Shoulder ROM Model",
      },
      Painful: {
        torque: "Compromised",
        stability: "Low",
        model: "Shoulder Injury Model",
      },
    };
    return analysis[value] || {};
  }

  if (joint === "ankle") {
    const cm = Number(value);
    if (cm >= 10)
      return {
        torque: "Optimal",
        stability: "High",
        model: "Ankle ROM Optimal Model",
      };
    if (cm >= 5)
      return {
        torque: "Moderate",
        stability: "Moderate",
        model: "Ankle ROM Limited Model",
      };
    return {
      torque: "Low",
      stability: "Low",
      model: "Ankle ROM Deficient Model",
    };
  }
  return {};
};

const getMovementAnalysis = (movement, value) => {
  const analyses = {
    hipHinge: {
      "Proper (Neutral Spine)": {
        efficiency: "High",
        risk: "Low",
        model: "Optimal Hip Hinge Model",
      },
      "Lumbar Flexion": {
        efficiency: "Moderate",
        risk: "High",
        model: "Spinal Flexion Risk Model",
      },
      Hyperextension: {
        efficiency: "Moderate",
        risk: "High",
        model: "Hyperextension Risk Model",
      },
    },
    kneeValgus: {
      None: {
        efficiency: "High",
        risk: "Low",
        model: "Optimal Knee Tracking Model",
      },
      "Mild Collapse": {
        efficiency: "Moderate",
        risk: "Moderate",
        model: "Knee Valgus Risk Model",
      },
      "Severe Collapse": {
        efficiency: "Low",
        risk: "High",
        model: "Knee Injury Risk Model",
      },
    },
    gait: {
      Neutral: {
        efficiency: "High",
        risk: "Low",
        model: "Optimal Gait Model",
      },
      Overpronation: {
        efficiency: "Moderate",
        risk: "Moderate",
        model: "Overpronation Model",
      },
      Supination: {
        efficiency: "Moderate",
        risk: "Moderate",
        model: "Supination Model",
      },
    },
  };
  return analyses[movement]?.[value] || {};
};

const BiomechanicsAnalysis = () => {
  const [form, setForm] = useState({
    posture: "",
    shoulderMobility: "",
    hipHinge: "",
    kneeValgus: "",
    ankleMobility: "",
    gaitPattern: "",
    forceDistribution: { leftLeg: 50, rightLeg: 50 },
    muscleActivation: { glutes: 0, quads: 0, hamstrings: 0 },
    movementEfficiency: 0,
    motionMetrics: {
      stabilityIndex: "",
      movementSmoothness: "",
      impactForce: "",
    },
    selectedModel: "",
    videoAnalysis: null,
    videoTools: [],
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [videoPreview, setVideoPreview] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Simulate analysis processing time
  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setAnalysisTime((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMotionMetricChange = (metric, value) => {
    setForm({
      ...form,
      motionMetrics: {
        ...form.motionMetrics,
        [metric]: value,
      },
    });
  };

  const handleForceDistributionChange = (side, value) => {
    setForm({
      ...form,
      forceDistribution: {
        ...form.forceDistribution,
        [side]: parseInt(value),
      },
    });
  };

  const handleMuscleActivationChange = (muscle, value) => {
    setForm({
      ...form,
      muscleActivation: {
        ...form.muscleActivation,
        [muscle]: parseInt(value),
      },
    });
  };

  const handleVideoToolToggle = (tool) => {
    setForm((prev) => ({
      ...prev,
      videoTools: prev.videoTools.includes(tool)
        ? prev.videoTools.filter((t) => t !== tool)
        : [...prev.videoTools, tool],
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
      setForm({ ...form, videoAnalysis: file });
    }
  };

  const calculateMovementEfficiency = () => {
    let score = 0;

    // Basic metrics
    if (form.posture === "Neutral") score += 15;
    if (form.shoulderMobility === "Full Range") score += 10;
    if (form.hipHinge === "Proper (Neutral Spine)") score += 15;
    if (form.kneeValgus === "None") score += 10;
    if (form.ankleMobility >= 10) score += 10;
    if (form.gaitPattern === "Neutral") score += 10;

    // Advanced metrics
    const imbalance = Math.abs(
      form.forceDistribution.leftLeg - form.forceDistribution.rightLeg
    );
    score += Math.max(0, 10 - imbalance);

    // Motion metrics
    if (form.motionMetrics.stabilityIndex === "Excellent") score += 10;
    if (form.motionMetrics.movementSmoothness === "Very Smooth") score += 10;
    if (form.motionMetrics.impactForce === "Low") score += 10;

    return Math.min(100, score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalysisTime(0);
    const efficiencyScore = calculateMovementEfficiency();
    setForm({ ...form, movementEfficiency: efficiencyScore });
    setSubmitted(true);
    localStorage.setItem("biomechanicsData", JSON.stringify(form));
  };

  const renderModelOptions = () => {
    return Object.entries(biomechanicalModels).map(([category, models]) => (
      <optgroup label={category} key={category}>
        {models.map((model) => (
          <option value={model} key={model}>
            {model}
          </option>
        ))}
      </optgroup>
    ));
  };

  return (
    <div
      className="biomech-main"
      style={{
        backgroundImage: "url('/BG.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        className="biomech-container"
        style={{
          // backgroundImage: "url('../../../public/w1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="biomech-title">🏋️‍♂️ Advanced Biomechanics Analysis</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="biomech-form">
            <div className="tab-nav">
              <button
                type="button"
                className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Assessment
              </button>
              <button
                type="button"
                className={`tab-btn ${
                  activeTab === "advanced" ? "active" : ""
                }`}
                onClick={() => setActiveTab("advanced")}
              >
                DARPA Metrics
              </button>
              <button
                type="button"
                className={`tab-btn ${
                  activeTab === "modeling" ? "active" : ""
                }`}
                onClick={() => setActiveTab("modeling")}
              >
                OpenSim Models
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
                onClick={() => setActiveTab("video")}
              >
                Kinovea Tools
              </button>
            </div>

            {activeTab === "basic" && (
              <>
                <div className="form-section">
                  <h3>Posture Analysis</h3>
                  <label>
                    Standing Posture:
                    <select
                      name="posture"
                      value={form.posture}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Forward Head">Forward Head</option>
                      <option value="Rounded Shoulders">
                        Rounded Shoulders
                      </option>
                      <option value="Anterior Pelvic Tilt">
                        Anterior Pelvic Tilt
                      </option>
                      <option value="Posterior Pelvic Tilt">
                        Posterior Pelvic Tilt
                      </option>
                    </select>
                  </label>
                </div>

                <div className="form-section">
                  <h3>Joint Mobility</h3>
                  <label>
                    Shoulder Mobility (Overhead Reach):
                    <select
                      name="shoulderMobility"
                      value={form.shoulderMobility}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Full Range">Full Range</option>
                      <option value="Limited">Limited</option>
                      <option value="Painful">Painful</option>
                    </select>
                  </label>

                  <label>
                    Ankle Dorsiflexion (Knee-to-Wall Test, cm):
                    <input
                      type="number"
                      name="ankleMobility"
                      value={form.ankleMobility}
                      onChange={handleChange}
                      placeholder="Distance in cm"
                      min="0"
                      required
                    />
                  </label>
                </div>

                <div className="form-section">
                  <h3>Movement Screening</h3>
                  <label>
                    Hip Hinge Pattern:
                    <select
                      name="hipHinge"
                      value={form.hipHinge}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Proper (Neutral Spine)">
                        Proper (Neutral Spine)
                      </option>
                      <option value="Lumbar Flexion">Lumbar Flexion</option>
                      <option value="Hyperextension">Hyperextension</option>
                    </select>
                  </label>

                  <label>
                    Knee Valgus in Squat:
                    <select
                      name="kneeValgus"
                      value={form.kneeValgus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="Mild Collapse">Mild Collapse</option>
                      <option value="Severe Collapse">Severe Collapse</option>
                    </select>
                  </label>
                </div>
              </>
            )}

            {activeTab === "advanced" && (
              <>
                <div className="form-section">
                  <h3>DARPA-Inspired Motion Metrics</h3>
                  <label>
                    Stability Index:
                    <select
                      value={form.motionMetrics.stabilityIndex}
                      onChange={(e) =>
                        handleMotionMetricChange(
                          "stabilityIndex",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      {motionMetrics["Stability Index"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Movement Smoothness:
                    <select
                      value={form.motionMetrics.movementSmoothness}
                      onChange={(e) =>
                        handleMotionMetricChange(
                          "movementSmoothness",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      {motionMetrics["Movement Smoothness"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Impact Force:
                    <select
                      value={form.motionMetrics.impactForce}
                      onChange={(e) =>
                        handleMotionMetricChange("impactForce", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {motionMetrics["Impact Force"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-section">
                  <h3>Force Plate Analysis</h3>
                  <p>Weight Distribution Between Legs:</p>
                  <div className="slider-container">
                    <label>Left Leg: {form.forceDistribution.leftLeg}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.forceDistribution.leftLeg}
                      onChange={(e) =>
                        handleForceDistributionChange("leftLeg", e.target.value)
                      }
                    />
                    <label>Right Leg: {form.forceDistribution.rightLeg}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.forceDistribution.rightLeg}
                      onChange={(e) =>
                        handleForceDistributionChange(
                          "rightLeg",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Muscle Activation (EMG Simulation)</h3>
                  <div className="slider-container">
                    <label>
                      Glutes Activation: {form.muscleActivation.glutes}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.muscleActivation.glutes}
                      onChange={(e) =>
                        handleMuscleActivationChange("glutes", e.target.value)
                      }
                    />
                    <label>
                      Quadriceps Activation: {form.muscleActivation.quads}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.muscleActivation.quads}
                      onChange={(e) =>
                        handleMuscleActivationChange("quads", e.target.value)
                      }
                    />
                    <label>
                      Hamstrings Activation: {form.muscleActivation.hamstrings}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={form.muscleActivation.hamstrings}
                      onChange={(e) =>
                        handleMuscleActivationChange(
                          "hamstrings",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "modeling" && (
              <div className="form-section">
                <h3>OpenSim Biomechanical Modeling</h3>
                <label>
                  Select Biomechanical Model:
                  <select
                    name="selectedModel"
                    value={form.selectedModel}
                    onChange={handleChange}
                  >
                    <option value="">Select Model</option>
                    {renderModelOptions()}
                  </select>
                </label>

                {form.selectedModel && (
                  <div className="model-preview">
                    <div className="model-visualization">
                      <div className="model-joints">
                        {form.selectedModel.includes("Full Body") && (
                          <>
                            <div className="joint head"></div>
                            <div className="joint shoulder"></div>
                            <div className="joint elbow"></div>
                            <div className="joint hip"></div>
                            <div className="joint knee"></div>
                            <div className="joint ankle"></div>
                          </>
                        )}
                        {form.selectedModel.includes("Lower") && (
                          <>
                            <div className="joint hip"></div>
                            <div className="joint knee"></div>
                            <div className="joint ankle"></div>
                          </>
                        )}
                        {form.selectedModel.includes("Upper") && (
                          <>
                            <div className="joint head"></div>
                            <div className="joint shoulder"></div>
                            <div className="joint elbow"></div>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="model-info">
                      Selected: <strong>{form.selectedModel}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "video" && (
              <div className="form-section">
                <h3>Kinovea-Inspired Video Analysis</h3>
                <div className="video-upload-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload Movement Video
                  </button>
                  {videoPreview && (
                    <div className="video-preview">
                      <video
                        ref={videoRef}
                        controls
                        src={videoPreview}
                        style={{ maxWidth: "100%" }}
                      />
                      <div className="video-tools-overlay">
                        {form.videoTools.includes("Angle Measurement") && (
                          <div className="angle-tool">
                            <div className="angle-line"></div>
                            <div className="angle-line"></div>
                            <div className="angle-value">90°</div>
                          </div>
                        )}
                        {form.videoTools.includes("Point Tracking") && (
                          <div
                            className="tracking-point"
                            style={{ top: "30%", left: "50%" }}
                          ></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="video-tools-selection">
                  <h4>Analysis Tools:</h4>
                  <div className="tools-grid">
                    {videoAnalysisTools.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        className={`tool-btn ${
                          form.videoTools.includes(tool) ? "active" : ""
                        }`}
                        onClick={() => handleVideoToolToggle(tool)}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="form-section">
              <label>
                Additional Notes:
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Describe any pain points or specific movement concerns..."
                />
              </label>
            </div>

            <div className="form-actions">
              {activeTab !== "basic" && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setActiveTab("basic")}
                >
                  Back to Basic
                </button>
              )}
              {activeTab !== "video" && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    if (activeTab === "basic") setActiveTab("advanced");
                    else if (activeTab === "advanced") setActiveTab("modeling");
                    else if (activeTab === "modeling") setActiveTab("video");
                  }}
                >
                  Continue
                </button>
              )}
              <button type="submit" className="submit-btn">
                Analyze Movement
              </button>
            </div>
          </form>
        ) : (
          <div className="results-section">
            {analysisTime < 100 ? (
              <div className="processing-screen">
                <h3>Running Biomechanical Analysis</h3>
                <div className="processing-visualization">
                  <div className="skeleton-model">
                    <div className="bone femur"></div>
                    <div className="bone tibia"></div>
                    <div className="bone spine"></div>
                    <div className="bone humerus"></div>
                  </div>
                  <div className="processing-progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${analysisTime}%` }}
                    ></div>
                    <p>Processing: {analysisTime}%</p>
                    <p className="processing-detail">
                      {analysisTime < 30 &&
                        "Initializing biomechanical model..."}
                      {analysisTime >= 30 &&
                        analysisTime < 60 &&
                        "Analyzing joint kinematics..."}
                      {analysisTime >= 60 &&
                        analysisTime < 90 &&
                        "Calculating muscle forces..."}
                      {analysisTime >= 90 && "Finalizing results..."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="results-header">
                  <h3>Comprehensive Biomechanics Report</h3>
                  <div className="efficiency-score">
                    <div className="score-circle">
                      <span>{form.movementEfficiency}</span>
                    </div>
                    <p>Movement Efficiency Score</p>
                  </div>
                </div>

                <div className="results-grid">
                  <div className="result-card">
                    <h4>Posture Analysis</h4>
                    <p>
                      <b>Assessment:</b> {form.posture}
                    </p>
                    <p>
                      <b>Model Used:</b>{" "}
                      {getPostureAnalysis(form.posture).model}
                    </p>
                    <p>
                      <b>Injury Risk:</b>{" "}
                      {getPostureAnalysis(form.posture).risk}
                    </p>
                    <p className="advice">
                      {getPostureAnalysis(form.posture).advice}
                    </p>
                  </div>

                  <div className="result-card">
                    <h4>Shoulder Mobility</h4>
                    <p>
                      <b>Assessment:</b> {form.shoulderMobility}
                    </p>
                    <p>
                      <b>Model Used:</b>{" "}
                      {
                        getJointAnalysis("shoulder", form.shoulderMobility)
                          .model
                      }
                    </p>
                    <p>
                      <b>Joint Torque:</b>{" "}
                      {
                        getJointAnalysis("shoulder", form.shoulderMobility)
                          .torque
                      }
                    </p>
                    <p className="advice">
                      {form.shoulderMobility === "Full Range"
                        ? "Excellent shoulder mobility. Maintain with regular stretching and strengthening."
                        : form.shoulderMobility === "Limited"
                        ? "Incorporate shoulder mobility drills and foam rolling into your routine."
                        : "Avoid overhead movements and consult a physiotherapist for assessment."}
                    </p>
                  </div>

                  <div className="result-card">
                    <h4>Ankle Mobility</h4>
                    <p>
                      <b>Measurement:</b> {form.ankleMobility} cm
                    </p>
                    <p>
                      <b>Model Used:</b>{" "}
                      {getJointAnalysis("ankle", form.ankleMobility).model}
                    </p>
                    <p>
                      <b>Stability:</b>{" "}
                      {getJointAnalysis("ankle", form.ankleMobility).stability}
                    </p>
                    <p className="advice">
                      {form.ankleMobility >= 10
                        ? "Good ankle mobility. This supports deep squats and lunges."
                        : form.ankleMobility >= 5
                        ? "Moderate mobility. Work on ankle dorsiflexion stretches for improvement."
                        : "Limited mobility. Prioritize ankle mobility drills before lower-body workouts."}
                    </p>
                  </div>

                  <div className="result-card">
                    <h4>Hip Hinge Pattern</h4>
                    <p>
                      <b>Assessment:</b> {form.hipHinge}
                    </p>
                    <p>
                      <b>Model Used:</b>{" "}
                      {getMovementAnalysis("hipHinge", form.hipHinge).model}
                    </p>
                    <p>
                      <b>Movement Efficiency:</b>{" "}
                      {
                        getMovementAnalysis("hipHinge", form.hipHinge)
                          .efficiency
                      }
                    </p>
                    <p className="advice">
                      {form.hipHinge === "Proper (Neutral Spine)"
                        ? "Excellent hip hinge pattern. Maintain for safe lifting."
                        : form.hipHinge === "Lumbar Flexion"
                        ? "Practice hip hinge drills to avoid rounding your lower back during lifts."
                        : "Focus on core bracing and avoid overarching your back during movement."}
                    </p>
                  </div>

                  <div className="result-card">
                    <h4>Knee Alignment</h4>
                    <p>
                      <b>Assessment:</b> {form.kneeValgus}
                    </p>
                    <p>
                      <b>Model Used:</b>{" "}
                      {getMovementAnalysis("kneeValgus", form.kneeValgus).model}
                    </p>
                    <p>
                      <b>Injury Risk:</b>{" "}
                      {getMovementAnalysis("kneeValgus", form.kneeValgus).risk}
                    </p>
                    <p className="advice">
                      {form.kneeValgus === "None"
                        ? "Great knee alignment. Maintain strong glutes and proper squat form."
                        : form.kneeValgus === "Mild Collapse"
                        ? "Strengthen glutes and focus on knee tracking during squats."
                        : "Prioritize corrective exercises and consult a coach for squat technique."}
                    </p>
                  </div>

                  {form.gaitPattern && (
                    <div className="result-card">
                      <h4>Gait Analysis</h4>
                      <p>
                        <b>Pattern:</b> {form.gaitPattern}
                      </p>
                      <p>
                        <b>Model Used:</b>{" "}
                        {getMovementAnalysis("gait", form.gaitPattern).model}
                      </p>
                      <p>
                        <b>Efficiency:</b>{" "}
                        {
                          getMovementAnalysis("gait", form.gaitPattern)
                            .efficiency
                        }
                      </p>
                      <p className="advice">
                        {form.gaitPattern === "Neutral"
                          ? "Normal gait pattern detected. Maintain with balanced training."
                          : form.gaitPattern === "Overpronation"
                          ? "Strengthen foot intrinsics and consider stability shoes."
                          : "Focus on mobility work and consider cushioned shoes."}
                      </p>
                    </div>
                  )}

                  <div className="result-card full-width">
                    <h4>DARPA Motion Metrics</h4>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <h5>Stability Index</h5>
                        <div
                          className={`metric-value ${form.motionMetrics.stabilityIndex?.toLowerCase()}`}
                        >
                          {form.motionMetrics.stabilityIndex || "Not assessed"}
                        </div>
                      </div>
                      <div className="metric-card">
                        <h5>Movement Smoothness</h5>
                        <div
                          className={`metric-value ${form.motionMetrics.movementSmoothness
                            ?.replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          {form.motionMetrics.movementSmoothness ||
                            "Not assessed"}
                        </div>
                      </div>
                      <div className="metric-card">
                        <h5>Impact Force</h5>
                        <div
                          className={`metric-value ${form.motionMetrics.impactForce?.toLowerCase()}`}
                        >
                          {form.motionMetrics.impactForce || "Not assessed"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="result-card full-width">
                    <h4>Force Distribution Analysis</h4>
                    <div className="force-distribution">
                      <div
                        className="force-bar left"
                        style={{ width: `${form.forceDistribution.leftLeg}%` }}
                      >
                        <span>Left: {form.forceDistribution.leftLeg}%</span>
                      </div>
                      <div
                        className="force-bar right"
                        style={{ width: `${form.forceDistribution.rightLeg}%` }}
                      >
                        <span>Right: {form.forceDistribution.rightLeg}%</span>
                      </div>
                    </div>
                    <p className="advice">
                      {Math.abs(
                        form.forceDistribution.leftLeg -
                          form.forceDistribution.rightLeg
                      ) < 5
                        ? "Excellent weight distribution between legs."
                        : Math.abs(
                            form.forceDistribution.leftLeg -
                              form.forceDistribution.rightLeg
                          ) < 10
                        ? "Moderate imbalance - focus on unilateral exercises."
                        : "Significant imbalance detected - consult a specialist for assessment."}
                    </p>
                  </div>

                  <div className="result-card full-width">
                    <h4>Muscle Activation Pattern</h4>
                    <div className="muscle-activation-chart">
                      <div
                        className="muscle-bar glutes"
                        style={{ height: `${form.muscleActivation.glutes}%` }}
                      >
                        <span>
                          Glutes
                          <br />
                          {form.muscleActivation.glutes}%
                        </span>
                      </div>
                      <div
                        className="muscle-bar quads"
                        style={{ height: `${form.muscleActivation.quads}%` }}
                      >
                        <span>
                          Quads
                          <br />
                          {form.muscleActivation.quads}%
                        </span>
                      </div>
                      <div
                        className="muscle-bar hamstrings"
                        style={{
                          height: `${form.muscleActivation.hamstrings}%`,
                        }}
                      >
                        <span>
                          Hamstrings
                          <br />
                          {form.muscleActivation.hamstrings}%
                        </span>
                      </div>
                    </div>
                    <p className="advice">
                      {form.muscleActivation.glutes /
                        (form.muscleActivation.quads +
                          form.muscleActivation.hamstrings) >
                      0.4
                        ? "Excellent glute activation pattern."
                        : form.muscleActivation.glutes /
                            (form.muscleActivation.quads +
                              form.muscleActivation.hamstrings) >
                          0.3
                        ? "Moderate glute activation - focus on mind-muscle connection."
                        : "Low glute activation - prioritize glute-specific exercises."}
                    </p>
                  </div>

                  {form.selectedModel && (
                    <div className="result-card full-width">
                      <h4>OpenSim Biomechanical Model</h4>
                      <div className="model-report">
                        <p>
                          <b>Model Selected:</b> {form.selectedModel}
                        </p>
                        <div className="model-visualization-report">
                          <div className="model-joints">
                            {form.selectedModel.includes("Full Body") && (
                              <>
                                <div className="joint head"></div>
                                <div className="joint shoulder"></div>
                                <div className="joint elbow"></div>
                                <div className="joint hip"></div>
                                <div className="joint knee"></div>
                                <div className="joint ankle"></div>
                              </>
                            )}
                            {form.selectedModel.includes("Lower") && (
                              <>
                                <div className="joint hip"></div>
                                <div className="joint knee"></div>
                                <div className="joint ankle"></div>
                              </>
                            )}
                            {form.selectedModel.includes("Upper") && (
                              <>
                                <div className="joint head"></div>
                                <div className="joint shoulder"></div>
                                <div className="joint elbow"></div>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="model-insight">
                          This model was used to analyze joint torques and
                          muscle forces during your movement assessment.
                        </p>
                      </div>
                    </div>
                  )}

                  {form.videoAnalysis && (
                    <div className="result-card full-width">
                      <h4>Kinovea Video Analysis</h4>
                      <div className="video-analysis">
                        <video
                          controls
                          src={videoPreview}
                          style={{ maxWidth: "100%" }}
                        />
                        {form.videoTools.length > 0 && (
                          <div className="video-tools-used">
                            <h5>Analysis Tools Applied:</h5>
                            <ul>
                              {form.videoTools.map((tool) => (
                                <li key={tool}>{tool}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="video-tip">
                          Review your movement pattern for any asymmetries or
                          compensations
                        </p>
                      </div>
                    </div>
                  )}

                  {form.notes && (
                    <div className="result-card full-width">
                      <h4>Additional Notes</h4>
                      <p>{form.notes}</p>
                    </div>
                  )}
                </div>

                <div className="recommendations-section">
                  <h4>Personalized Recommendations</h4>
                  <div className="recommendations-grid">
                    <div className="recommendation-card">
                      <h5>Corrective Exercises</h5>
                      <ul>
                        {form.posture !== "Neutral" && (
                          <li>Posture correction drills</li>
                        )}
                        {form.shoulderMobility === "Limited" && (
                          <li>Shoulder mobility routine</li>
                        )}
                        {form.ankleMobility < 10 && (
                          <li>Ankle dorsiflexion exercises</li>
                        )}
                      </ul>
                    </div>
                    <div className="recommendation-card">
                      <h5>Strength Training</h5>
                      <ul>
                        {form.kneeValgus !== "None" && (
                          <li>Glute strengthening program</li>
                        )}
                        {Math.abs(
                          form.forceDistribution.leftLeg -
                            form.forceDistribution.rightLeg
                        ) > 5 && <li>Unilateral training focus</li>}
                        {form.muscleActivation.glutes < 40 && (
                          <li>Glute activation exercises</li>
                        )}
                      </ul>
                    </div>
                    <div className="recommendation-card">
                      <h5>Movement Practice</h5>
                      <ul>
                        {form.hipHinge !== "Proper (Neutral Spine)" && (
                          <li>Hip hinge technique drills</li>
                        )}
                        {form.motionMetrics.movementSmoothness === "Jerky" && (
                          <li>Movement control exercises</li>
                        )}
                        {form.motionMetrics.impactForce === "High" && (
                          <li>Impact reduction techniques</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="results-actions">
                  <button
                    className="back-btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Edit Analysis
                  </button>
                  <button
                    className="save-btn"
                    onClick={() => navigate("/summary")}
                  >
                    Save to Profile
                  </button>
                  <button
                    className="export-btn"
                    onClick={() => alert("Exporting report...")}
                  >
                    Export Full Report
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BiomechanicsAnalysis;
