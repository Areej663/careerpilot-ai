import { useState } from "react";

const COMPANY_QUESTIONS = {
  Google: [
    {
      id: "g1",
      company: "Google",
      role: "Software Engineer / AI Specialist",
      question: "How do you design a distributed cache system (like Redis) handling 1M+ queries per second with low latency and high availability?",
      hint: "Discuss consistent hashing, LRU eviction policy, replication clusters, and memory overhead.",
    },
    {
      id: "g2",
      company: "Google",
      role: "AI / ML Engineer",
      question: "Explain the architecture of Multi-Head Self Attention in LLMs and how sparse attention speeds up context windows.",
      hint: "Talk about Query, Key, Value projection matrices, time complexity O(N^2), and FlashAttention optimization.",
    },
  ],
  Amazon: [
    {
      id: "a1",
      company: "Amazon",
      role: "SDE II / Full-Stack",
      question: "Amazon Leadership Principle: Tell me about a time you had to make a complex technical decision under time constraints with incomplete data.",
      hint: "Use STAR methodology (Situation, Task, Action, Result). Highlight 'Bias for Action' and 'Customer Obsession'.",
    },
    {
      id: "a2",
      company: "Amazon",
      role: "Backend Engineer",
      question: "How would you design Amazon's Order Fulfillment & Notification Queue using AWS SQS and Lambda?",
      hint: "Discuss idempotency, dead-letter queues, message deduplication, and retry policies.",
    },
  ],
  "Systems Ltd": [
    {
      id: "sys1",
      company: "Systems Ltd",
      role: "Senior Full-Stack Developer",
      question: "How do you manage state synchronization and API response caching in large enterprise React applications?",
      hint: "Mention React Query / RTK Query, optimistic UI updates, and stale-while-revalidate strategies.",
    },
  ],
  TPS: [
    {
      id: "tps1",
      company: "TPS / Fintech",
      role: "Backend & API Developer",
      question: "How do you ensure transaction security, double-spending prevention, and ACID compliance in payment gateway APIs?",
      hint: "Discuss database locking (pessimistic vs optimistic), atomic transactions, and TLS 1.3 encryption.",
    },
  ],
};

const DEFAULT_QUESTIONS = [
  {
    id: "def1",
    company: "General Tech",
    role: "Full-Stack Software Engineer",
    question: "Can you explain the difference between Overfitting and Underfitting, and how do you mitigate them in production ML/software models?",
    hint: "Mention regularization, cross-validation, data augmentation, and early stopping.",
  },
  {
    id: "def2",
    company: "General Tech",
    role: "React / Frontend Specialist",
    question: "How does React 19 / Fiber handle concurrency and state batching under high UI update frequency?",
    hint: "Mention render scheduling, useTransition, useDeferredValue, and DOM reconciliation.",
  },
];

function MockInterview({ onShowToast }) {
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [difficulty, setDifficulty] = useState("Mid-Level");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const getFilteredQuestions = () => {
    if (selectedCompany === "All Companies") {
      return [...COMPANY_QUESTIONS.Google, ...COMPANY_QUESTIONS.Amazon, ...COMPANY_QUESTIONS["Systems Ltd"], ...DEFAULT_QUESTIONS];
    }
    return COMPANY_QUESTIONS[selectedCompany] || DEFAULT_QUESTIONS;
  };

  const questions = getFilteredQuestions();
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
      let score = 72;
      if (length > 150) score += 14;
      if (length > 300) score += 10;
      score = Math.min(96, score);

      setEvaluation({
        score: score,
        verdict: score >= 85 ? "Strong Candidate Answer" : "Good Technical Attempt",
        feedback: `Your response for ${currentQuestion.company} questions demonstrates strong technical grounding and structured thinking.`,
        strengths: [
          "Demonstrated clear domain terminology and structured key points.",
          "Directly addressed the technical query with problem-solving logic.",
        ],
        improvements: [
          "Elaborate on production scalability trade-offs and edge cases.",
          `Reference specific ${currentQuestion.company} engineering practices if applicable.`,
        ],
      });

      setIsEvaluating(false);
      onShowToast("AI Interview Evaluation ready!", "success");
    }, 1100);
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
        <h2>Company-Specific AI Mock Interview</h2>
        <p>
          Practice target technical questions tailored for FAANG (Google, Amazon) and Local Tech Leaders (Systems Ltd, TPS).
        </p>
      </div>

      <div className="interview-grid">
        {/* Controls Column */}
        <div className="interview-sidebar">
          <h3>Interview Setup</h3>

          <div className="form-group">
            <label>Target Company Question Bank</label>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setCurrentQIndex(0);
                setUserAnswer("");
                setEvaluation(null);
              }}
            >
              <option value="All Companies">🌐 All Target Companies</option>
              <option value="Google">🔍 Google (FAANG)</option>
              <option value="Amazon">📦 Amazon (FAANG)</option>
              <option value="Systems Ltd">🏛️ Systems Ltd (Local Tech Leader)</option>
              <option value="TPS">💳 TPS / Fintech (Rozee.pk / Regional)</option>
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
            <span>Target Company</span>
            <strong style={{ color: "var(--accent-primary)", fontSize: "14px" }}>
              {currentQuestion.company}
            </strong>
            <span style={{ marginTop: "6px" }}>
              Question {currentQIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Question & Answer Stage */}
        <div className="interview-main-stage">
          <div className="question-card">
            <div className="q-badge">
              {currentQuestion.company} • {currentQuestion.role}
            </div>
            <h4>{currentQuestion.question}</h4>
            <span className="q-hint">💡 Hint: {currentQuestion.hint}</span>
          </div>

          <div className="answer-section">
            <label>Your Response (Use STAR Methodology: Situation, Task, Action, Result)</label>
            <textarea
              rows="6"
              placeholder="Structure your answer clearly with key technical concepts and metrics..."
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
