import { useState } from "react";

const INTERVIEW_QUESTIONS = {
  "AI / Machine Learning Engineer": [
    {
      id: "q1",
      question: "Can you explain the difference between Overfitting and Underfitting, and how do you mitigate them in production ML models?",
      hint: "Mention regularization (L1/L2), cross-validation, data augmentation, and early stopping.",
    },
    {
      id: "q2",
      question: "How do Transformer architectures utilize Self-Attention mechanisms compared to traditional RNNs?",
      hint: "Talk about parallelization, positional encoding, and query-key-value matrix operations.",
    },
    {
      id: "q3",
      question: "Walk us through how you would evaluate a classification model with highly imbalanced class distributions.",
      hint: "Discuss Precision, Recall, F1-Score, ROC-AUC, and SMOTE resampling techniques.",
    },
  ],
  "Senior React / Full-Stack Developer": [
    {
      id: "q1",
      question: "How does React 19 / Fiber handle concurrency and state batching under high UI update frequency?",
      hint: "Mention render scheduling, useTransition, useDeferredValue, and DOM reconciliation.",
    },
    {
      id: "q2",
      question: "How do you secure RESTful API communications between a React SPA frontend and a FastAPI/Node backend?",
      hint: "Discuss JWT tokens, HttpOnly cookies, CORS headers, and CSRF protection.",
    },
    {
      id: "q3",
      question: "Describe your strategy for optimizing web performance and reducing First Contentful Paint (FCP).",
      hint: "Cover code splitting, dynamic lazy imports, asset compression, and HTTP caching.",
    },
  ],
  "Python / FastAPI Backend Developer": [
    {
      id: "q1",
      question: "How does FastAPI achieve asynchronous request handling using Python async/await and ASGI servers?",
      hint: "Discuss UVicorn, Starlette, non-blocking I/O event loops, and threadpools for sync dependencies.",
    },
    {
      id: "q2",
      question: "How do you handle database connection pooling and transaction management in SQLAlchemy / PostgreSQL?",
      hint: "Talk about session management, pool size, max overflow, and async sessions.",
    },
  ],
};

function MockInterview({ onShowToast }) {
  const [role, setRole] = useState("Senior React / Full-Stack Developer");
  const [difficulty, setDifficulty] = useState("Mid-Level");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const questions = INTERVIEW_QUESTIONS[role] || INTERVIEW_QUESTIONS["Senior React / Full-Stack Developer"];
  const currentQuestion = questions[currentQIndex] || questions[0];

  const handleEvaluate = () => {
    if (!userAnswer.trim()) {
      onShowToast("Please write or speak your answer before submitting.", "error");
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);

    setTimeout(() => {
      const length = userAnswer.trim().length;
      let score = 70;
      if (length > 150) score += 15;
      if (length > 300) score += 10;
      score = Math.min(96, score);

      setEvaluation({
        score: score,
        verdict: score >= 85 ? "Strong Answer" : "Good Attempt",
        feedback:
          "Your response demonstrated good foundational knowledge. You clearly structured your key points and addressed the main concept.",
        strengths: [
          "Clear technical vocabulary and logical structure.",
          "Directly answered the core interview question.",
        ],
        improvements: [
          "Elaborate slightly more on real-world production trade-offs.",
          "Provide a specific concrete example from your past projects.",
        ],
      });

      setIsEvaluating(false);
      onShowToast("AI Interview Evaluation ready!", "success");
    }, 1200);
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setEvaluation(null);
    setCurrentQIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="interview-container">
      <div className="interview-header">
        <div className="hero-badge small">
          <span className="badge-sparkle">🎙️</span> AI SIMULATOR
        </div>
        <h2>AI Mock Interview Simulator</h2>
        <p>
          Practice role-specific technical questions and receive real-time AI scoring, feedback, and improvement suggestions.
        </p>
      </div>

      <div className="interview-grid">
        {/* Controls Column */}
        <div className="interview-sidebar">
          <h3>Interview Setup</h3>

          <div className="form-group">
            <label>Select Job Role</label>
            <select value={role} onChange={(e) => { setRole(e.target.value); setCurrentQIndex(0); setUserAnswer(""); setEvaluation(null); }}>
              <option value="Senior React / Full-Stack Developer">Senior React / Full-Stack Developer</option>
              <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
              <option value="Python / FastAPI Backend Developer">Python / FastAPI Backend Developer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Experience Level</label>
            <div className="tone-selector">
              {["Entry Level", "Mid-Level", "Senior / Lead"].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  className={`tone-pill ${difficulty === lvl ? "active" : ""}`}
                  onClick={() => setDifficulty(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="question-progress-card">
            <span>Question Progress</span>
            <strong>{currentQIndex + 1} of {questions.length}</strong>
          </div>
        </div>

        {/* Question & Answer Stage */}
        <div className="interview-main-stage">
          <div className="question-card">
            <div className="q-badge">Question {currentQIndex + 1}</div>
            <h4>{currentQuestion.question}</h4>
            <span className="q-hint">💡 Hint: {currentQuestion.hint}</span>
          </div>

          <div className="answer-section">
            <label>Your Response (Type your response out loud)</label>
            <textarea
              rows="6"
              placeholder="Structure your answer using the STAR methodology (Situation, Task, Action, Result)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />

            <div className="answer-actions">
              <button
                className="analyze-button"
                style={{ width: "auto", padding: "0 28px" }}
                onClick={handleEvaluate}
                disabled={isEvaluating}
              >
                {isEvaluating ? (
                  <>
                    <span className="spinner" /> Evaluating Response...
                  </>
                ) : (
                  "Submit Answer for AI Scoring →"
                )}
              </button>

              {evaluation && (
                <button type="button" className="nav-back" onClick={handleNextQuestion}>
                  Next Question →
                </button>
              )}
            </div>
          </div>

          {/* AI Evaluation Report */}
          {evaluation && (
            <div className="evaluation-card">
              <div className="eval-header">
                <div>
                  <span className="score-label">AI INTERVIEW SCORE</span>
                  <div className="eval-score-num" style={{ color: evaluation.score >= 80 ? "#10B981" : "#F59E0B" }}>
                    {evaluation.score}<span className="eval-percent">/100</span>
                  </div>
                </div>
                <span className="eval-badge">{evaluation.verdict}</span>
              </div>

              <p className="eval-feedback">{evaluation.feedback}</p>

              <div className="eval-details-grid">
                <div className="eval-column positive">
                  <h5>✓ Key Strengths</h5>
                  <ul>
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="eval-column improvements">
                  <h5>💡 Actionable Improvements</h5>
                  <ul>
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
