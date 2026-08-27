import { useState } from "react";

function CareerAssessment({ onShowToast, onNavigateTab }) {
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState("BS Computer Science / Software Engineering");
  const [primarySkill, setPrimarySkill] = useState("Web Development (React / Python)");
  const [interestArea, setInterestArea] = useState("Full-Stack & AI Systems");
  const [experienceLevel, setExperienceLevel] = useState("0-2 Years (Entry / Associate)");

  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAssessment = () => {
    setIsAnalyzing(true);
    setAssessmentResult(null);

    setTimeout(() => {
      setAssessmentResult({
        primaryRole: {
          title: "Full-Stack AI Software Engineer",
          matchScore: 94,
          demand: "High Growth",
          avgSalary: "$125,000 - $160,000",
          desc: "Develop scalable web applications integrated with AI models, FastAPI microservices, and React frontends.",
        },
        alternateRoles: [
          { title: "AI Application Developer", matchScore: 88, demand: "Very High" },
          { title: "Frontend Specialist (React / TS)", matchScore: 85, demand: "High" },
          { title: "Backend API Engineer (FastAPI / Python)", matchScore: 82, demand: "High" },
        ],
        roadmap: [
          {
            phase: "Phase 1: Core Mastery",
            items: ["Deepen TypeScript & React 19 state patterns", "FastAPI Async Endpoints & Pydantic Validation", "Git & CI/CD Workflows"],
          },
          {
            phase: "Phase 2: AI & Cloud Integration",
            items: ["LangChain & OpenAI / Gemini API Integration", "Docker Containerization", "PostgreSQL Database Optimization"],
          },
          {
            phase: "Phase 3: Portfolio & Job Applications",
            items: ["Publish 3 Full-Stack AI SaaS projects on GitHub", "Use CareerPilot AI Resume Matcher to optimize ATS applications", "Target Remote & Global Hybrid Software Roles"],
          },
        ],
      });

      setIsAnalyzing(false);
      onShowToast("Career Assessment completed!", "success");
    }, 1200);
  };

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <div className="hero-badge small">
          <span className="badge-sparkle">🎯</span> AI CAREER EVALUATOR
        </div>
        <h2>AI Career Assessment & Roadmap</h2>
        <p>
          Analyze your education, technical skills, and career preferences to receive personalized role recommendations with match scores.
        </p>
      </div>

      {!assessmentResult ? (
        <div className="assessment-wizard-card">
          <div className="wizard-progress-bar">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`step-indicator ${step === s ? "active" : step > s ? "completed" : ""}`}
              >
                <span>{step > s ? "✓" : s}</span>
                <small>Step {s}</small>
              </div>
            ))}
          </div>

          <div className="wizard-step-content">
            {step === 1 && (
              <div className="quiz-step">
                <h3>Step 1: Educational Background</h3>
                <p>Select your highest completed or current level of study.</p>

                <div className="options-grid">
                  {[
                    "BS Computer Science / Software Engineering",
                    "BS Data Science / AI",
                    "Coding Bootcamp / Self-Taught Developer",
                    "Non-Tech Graduate transitioning to Tech",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-card ${education === option ? "selected" : ""}`}
                      onClick={() => setEducation(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="quiz-step">
                <h3>Step 2: Core Technical Competency</h3>
                <p>Which area best matches your current strongest skillset?</p>

                <div className="options-grid">
                  {[
                    "Web Development (React / Python)",
                    "AI & Machine Learning (Python / Scikit-learn)",
                    "Backend & Databases (FastAPI / SQL)",
                    "UI/UX Design & Frontend Engineering",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-card ${primarySkill === option ? "selected" : ""}`}
                      onClick={() => setPrimarySkill(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="quiz-step">
                <h3>Step 3: Preferred Career Focus</h3>
                <p>What type of projects excite you the most?</p>

                <div className="options-grid">
                  {[
                    "Full-Stack & AI Systems",
                    "Data Analytics & Machine Learning Models",
                    "High-Performance Cloud APIs & Microservices",
                    "Modern Frontend Web Products",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-card ${interestArea === option ? "selected" : ""}`}
                      onClick={() => setInterestArea(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="quiz-step">
                <h3>Step 4: Target Experience Level</h3>
                <p>Select your current experience level for targeted role matching.</p>

                <div className="options-grid">
                  {[
                    "0-2 Years (Entry / Associate)",
                    "2-5 Years (Mid-Level Developer)",
                    "5+ Years (Senior / Lead Architect)",
                    "Freelance / Contract Specialist",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-card ${experienceLevel === option ? "selected" : ""}`}
                      onClick={() => setExperienceLevel(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="wizard-actions">
            {step > 1 && (
              <button type="button" className="nav-back" onClick={() => setStep(step - 1)}>
                ← Previous Step
              </button>
            )}

            {step < 4 ? (
              <button type="button" className="share-button" onClick={() => setStep(step + 1)}>
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                className="analyze-button"
                style={{ width: "auto", padding: "0 32px" }}
                onClick={handleRunAssessment}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner" /> Analyzing Profile...
                  </>
                ) : (
                  "Generate Career Assessment →"
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Assessment Results & Step-by-Step Roadmap */
        <div className="assessment-results-card">
          <div className="primary-recommendation">
            <div className="rec-header">
              <div>
                <span className="hero-badge small">#1 RECOMMENDED MATCH</span>
                <h3>{assessmentResult.primaryRole.title}</h3>
                <p>{assessmentResult.primaryRole.desc}</p>
              </div>

              <div className="rec-score-box">
                <span className="rec-score-num">{assessmentResult.primaryRole.matchScore}%</span>
                <span className="score-subtitle">Match Score</span>
              </div>
            </div>

            <div className="rec-meta-row">
              <span className="meta-pill">📈 Market Demand: <strong>{assessmentResult.primaryRole.demand}</strong></span>
              <span className="meta-pill">💰 Est. Salary: <strong>{assessmentResult.primaryRole.avgSalary}</strong></span>
            </div>
          </div>

          <div className="alternate-roles-section">
            <h4>Alternative High-Match Career Options</h4>
            <div className="alt-roles-grid">
              {assessmentResult.alternateRoles.map((role) => (
                <div className="alt-role-card" key={role.title}>
                  <div className="alt-role-top">
                    <strong>{role.title}</strong>
                    <span className="alt-score">{role.matchScore}%</span>
                  </div>
                  <span className="alt-demand">Demand: {role.demand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Step-by-Step Roadmap */}
          <div className="roadmap-section">
            <h4>Your Strategic Career Roadmap</h4>
            <div className="roadmap-timeline">
              {assessmentResult.roadmap.map((phase, idx) => (
                <div className="roadmap-step-card" key={phase.phase}>
                  <div className="step-num-badge">0{idx + 1}</div>
                  <div className="step-body">
                    <h5>{phase.phase}</h5>
                    <ul>
                      {phase.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="assessment-actions-row">
            <button className="share-button" onClick={() => onNavigateTab("matcher")}>
              ⚡ Optimize Resume for this Role
            </button>
            <button className="nav-back" onClick={() => setAssessmentResult(null)}>
              ← Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerAssessment;
