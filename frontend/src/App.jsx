import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import UploadCard from "./components/UploadCard";
import MatchScore from "./components/MatchScore";
import SkillsCard from "./components/SkillsCard";
import CareerInsights from "./components/CareerInsights";
import Toast from "./components/Toast";
import FAQSection from "./components/FAQSection";
import Dashboard from "./components/Dashboard";
import CoverLetterGenerator from "./components/CoverLetterGenerator";
import ApplicationTracker from "./components/ApplicationTracker";
import CareerChatbot from "./components/CareerChatbot";

import { SAMPLE_ANALYSIS_RESULT } from "./utils/demoData";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const SKILL_RECOMMENDATIONS = {
  docker: {
    icon: "🐳",
    title: "Docker",
    description:
      "Learn Docker fundamentals and containerize a small React or Python application.",
  },
  github: {
    icon: "🐙",
    title: "GitHub",
    description:
      "Publish 2–3 projects with clear README files, screenshots, and setup instructions.",
  },
  linux: {
    icon: "🐧",
    title: "Linux",
    description:
      "Practice essential Linux commands, permissions, package management, and development workflows.",
  },
  pandas: {
    icon: "🐼",
    title: "Pandas",
    description:
      "Build a small data-analysis project demonstrating data cleaning, filtering, and transformation.",
  },
  "power bi": {
    icon: "📊",
    title: "Power BI",
    description:
      "Create a dashboard from a real dataset and showcase meaningful insights through visualizations.",
  },
  react: {
    icon: "⚛️",
    title: "React",
    description:
      "Build a small React application using reusable components, state management, and API integration.",
  },
  javascript: {
    icon: "🟨",
    title: "JavaScript",
    description:
      "Strengthen modern JavaScript skills by building an interactive web application.",
  },
  typescript: {
    icon: "🔷",
    title: "TypeScript",
    description:
      "Convert a JavaScript project to TypeScript and practice interfaces, types, and reusable components.",
  },
  python: {
    icon: "🐍",
    title: "Python",
    description:
      "Create a practical Python project demonstrating clean code, data handling, APIs, and error handling.",
  },
  "machine learning": {
    icon: "🤖",
    title: "Machine Learning",
    description:
      "Build an end-to-end ML project covering preprocessing, model training, evaluation, and results.",
  },
  "deep learning": {
    icon: "🧠",
    title: "Deep Learning",
    description:
      "Develop a small neural-network project and document the architecture, training process, and results.",
  },
  "scikit-learn": {
    icon: "📈",
    title: "Scikit-learn",
    description:
      "Train and evaluate a machine-learning model using Scikit-learn and document the results.",
  },
  sql: {
    icon: "🗄️",
    title: "SQL",
    description:
      "Practice joins, aggregation, filtering, and database queries through a small data project.",
  },
  postgresql: {
    icon: "🐘",
    title: "PostgreSQL",
    description:
      "Create a small PostgreSQL project demonstrating relational database design and SQL queries.",
  },
  "node.js": {
    icon: "🟢",
    title: "Node.js",
    description:
      "Build a simple Node.js API and connect it to a frontend application.",
  },
  azure: {
    icon: "☁️",
    title: "Azure",
    description:
      "Learn Azure fundamentals and deploy a small application using an Azure service.",
  },
  aws: {
    icon: "☁️",
    title: "AWS",
    description:
      "Learn AWS fundamentals and deploy a small application using a basic AWS service.",
  },
  nlp: {
    icon: "💬",
    title: "NLP",
    description:
      "Build a practical NLP project such as text classification, sentiment analysis, or keyword extraction.",
  },
  "artificial intelligence": {
    icon: "🤖",
    title: "Artificial Intelligence",
    description:
      "Develop a practical AI project and document its problem statement, data, model, and evaluation.",
  },
};

const DEFAULT_RECOMMENDATION = {
  icon: "🎯",
  description:
    "Learn the fundamentals of this skill and demonstrate it through a practical project that can be added to your portfolio.",
};

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });

  const matchingResult = result?.matching_result || {};

  const matchedSkills = Array.isArray(matchingResult.matched_skills)
    ? matchingResult.matched_skills
    : [];

  const missingSkills = Array.isArray(matchingResult.missing_skills)
    ? matchingResult.missing_skills
    : [];

  const matchScore = Number(matchingResult.match_score ?? 0);
  const totalSkills = matchedSkills.length + missingSkills.length;

  const matchStatus =
    matchScore < 40
      ? "Low Match"
      : matchScore < 70
        ? "Moderate Match"
        : "Strong Match";

  const scoreColor =
    matchScore < 40
      ? "#EF4444"
      : matchScore < 70
        ? "#F59E0B"
        : "#10B981";

  const analysisDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const normalizeSkill = (skill) => {
    if (!skill) return "";
    return String(skill).toLowerCase().trim().replace(/\s+/g, " ");
  };

  const getRecommendation = (skill) => {
    const normalizedSkill = normalizeSkill(skill);
    return (
      SKILL_RECOMMENDATIONS[normalizedSkill] || {
        ...DEFAULT_RECOMMENDATION,
        title: skill,
      }
    );
  };

  const getCareerInsight = () => {
    if (missingSkills.length === 0) {
      return `Excellent alignment! Your resume covers all ${matchedSkills.length} identified skills for this position. Focus on highlighting quantifiable achievements in your work history.`;
    }

    if (matchedSkills.length === 0) {
      return "Your resume currently shows minimal overlap with key requirements. Prioritize learning 2–3 high-frequency skills listed below to build core qualification.";
    }

    if (matchScore < 40) {
      return `You match ${matchedSkills.length} of ${totalSkills} core skills. Target your highest-priority gaps first to quickly move your match score above 60%.`;
    }

    if (matchScore < 70) {
      return `Solid match rate! You match ${matchedSkills.length} key skills. Closing the top 2 missing skill gaps will significantly increase your callback rate.`;
    }

    return `Strong profile match! You satisfy ${matchedSkills.length} out of ${totalSkills} requirements. Showcase your matching skills prominently on your resume summary.`;
  };

  const handleMatch = async () => {
    if (!resume || !job) {
      const msg = "Please upload both your resume and job description.";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job", job);

    try {
      const response = await fetch(`${API_URL}/match/files`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to analyze the uploaded documents."
        );
      }

      setResult(data);
      showToast("Resume analysis complete!", "success");
    } catch (err) {
      let errMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing your documents.";

      if (errMsg.toLowerCase().includes("failed to fetch") || err?.name === "TypeError") {
        errMsg =
          "Backend API is currently offline. If testing locally, start FastAPI (uvicorn) on port 8000, or click '⚡ Test with Sample Data' below for an instant live analysis!";
      }

      setError(errMsg);
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    setTimeout(() => {
      setResult(SAMPLE_ANALYSIS_RESULT);
      setLoading(false);
      showToast("Demo analysis loaded successfully!", "success");
    }, 600);
  };

  const resetAnalysis = () => {
    setResume(null);
    setJob(null);
    setResult(null);
    setError("");
    setCopied(false);
  };

  const copyMissingSkills = async () => {
    if (missingSkills.length === 0) return;

    try {
      await navigator.clipboard.writeText(missingSkills.join(", "));
      setCopied(true);
      showToast("Missing skills copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Unable to copy missing skills.", "error");
    }
  };

  const shareResults = async () => {
    const shareText = `My CareerPilot AI Job Match Score is ${matchScore}% (${matchStatus}). Matched ${matchedSkills.length} skills!`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareCopied(true);
        showToast("Analysis summary copied to clipboard!", "success");
        setTimeout(() => setShareCopied(false), 2500);
      }

      if (navigator.share) {
        await navigator.share({
          title: "CareerPilot AI Results",
          text: shareText,
        });
      }
    } catch {
      // Fallback handled via clipboard toast
    }
  };

  const downloadReport = () => {
    showToast("Preparing printable report...", "info");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Background Glow Mesh */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <Navbar
        hasResult={Boolean(result)}
        darkMode={darkMode}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onToggleTheme={() => setDarkMode((current) => !current)}
        onBack={resetAnalysis}
        onLoadDemo={handleLoadDemo}
      />

      <main className="main-content">
        {/* TAB 1: Unified Personal Dashboard */}
        {activeTab === "dashboard" && (
          <Dashboard onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {/* TAB 2: AI Cover Letter Generator */}
        {activeTab === "cover-letter" && (
          <CoverLetterGenerator onShowToast={showToast} />
        )}

        {/* TAB 3: Job Application Tracker */}
        {activeTab === "tracker" && (
          <ApplicationTracker
            onShowToast={showToast}
            onNavigateToMatcher={() => setActiveTab("matcher")}
          />
        )}

        {/* TAB 4: AI Resume Matcher */}
        {activeTab === "matcher" && (
          <>
            {!result ? (
              <>
                <section className="hero">
                  <div className="hero-badge">
                    <span className="badge-sparkle">✨</span> AI-POWERED CAREER ASSISTANT
                  </div>

                  <h2>
                    Optimize Your Resume for <span>Target Job Roles</span>
                  </h2>

                  <p>
                    Upload your resume alongside any job description to get an instant AI skill gap analysis, match percentage, and actionable resume optimization roadmap.
                  </p>

                  <div className="hero-metrics">
                    <div className="metric-item">
                      <strong>⚡ Instant</strong>
                      <span>Analysis in Seconds</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                      <strong>🎯 Accurate</strong>
                      <span>NLP Skill Extractor</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                      <strong>💡 Actionable</strong>
                      <span>Custom Learning Path</span>
                    </div>
                  </div>
                </section>

                <section className="upload-grid">
                  <UploadCard
                    title="Your Resume"
                    description="Upload your current resume (PDF format)"
                    accept=".pdf"
                    file={resume}
                    onChange={setResume}
                    type="resume"
                  />

                  <UploadCard
                    title="Job Description"
                    description="Upload target job posting (PDF or Image)"
                    accept=".pdf,.jpg,.jpeg,.png"
                    file={job}
                    onChange={setJob}
                    type="job"
                  />
                </section>

                <div className="action-button-group">
                  <button
                    className="analyze-button"
                    onClick={handleMatch}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Analyzing Documents...
                      </>
                    ) : (
                      <>
                        Run AI Skill Match
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="secondary-demo-button"
                    onClick={handleLoadDemo}
                    disabled={loading}
                  >
                    ⚡ Test with Sample Data
                  </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <section className="features-v2">
                  <div className="feature-card">
                    <div className="feature-step">01</div>
                    <div className="feature-icon">📁</div>
                    <h4>Upload Documents</h4>
                    <p>Attach your resume and target job file securely.</p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-step">02</div>
                    <div className="feature-icon">🧠</div>
                    <h4>AI Extraction</h4>
                    <p>Natural Language Processing isolates required skills.</p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-step">03</div>
                    <div className="feature-icon">🚀</div>
                    <h4>Bridge Skill Gaps</h4>
                    <p>Get prioritized recommendations to beat ATS filters.</p>
                  </div>
                </section>

                <FAQSection />
              </>
            ) : (
              <section className="results-page">
                <div className="results-header-card">
                  <div className="results-header-info">
                    <div className="hero-badge small">
                      <span className="badge-sparkle">✓</span> ANALYSIS READY
                    </div>

                    <h2>Career Compatibility Breakdown</h2>

                    <p>
                      Here is your tailored resume match evaluation for the uploaded position.
                    </p>

                    <div className="analysis-meta">
                      <span className="meta-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {analysisDate}
                      </span>

                      <span className="meta-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        NLP Engine v2.4
                      </span>
                    </div>
                  </div>

                  <MatchScore
                    score={matchScore}
                    status={matchStatus}
                    color={scoreColor}
                  />
                </div>

                <div className="document-summary-v2">
                  <div className="doc-item">
                    <span className="doc-label">RESUME DOCUMENT</span>
                    <strong className="doc-value">
                      📄 {result.resume?.filename || "Uploaded Resume"}
                    </strong>
                  </div>

                  <div className="doc-item">
                    <span className="doc-label">TARGET JOB POSITION</span>
                    <strong className="doc-value">
                      💼 {result.job?.filename || "Job Description"}
                    </strong>
                  </div>
                </div>

                <div className="skills-grid">
                  <SkillsCard
                    title="Matched Skills"
                    skills={matchedSkills}
                    type="matched"
                  />

                  <SkillsCard
                    title="Missing Skill Gaps"
                    skills={missingSkills}
                    type="missing"
                    copied={copied}
                    onCopy={copyMissingSkills}
                  />
                </div>

                <CareerInsights
                  insight={getCareerInsight()}
                  missingSkills={missingSkills}
                  getRecommendation={getRecommendation}
                />

                <div className="result-actions-v2">
                  <button className="share-button" onClick={shareResults}>
                    {shareCopied ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    )}
                    {shareCopied ? "Summary Copied!" : "Share Summary"}
                  </button>

                  <button className="download-report-button" onClick={downloadReport}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Print / Export PDF
                  </button>

                  <button
                    className="analyze-button secondary"
                    onClick={resetAnalysis}
                  >
                    ← Analyze Another Job
                  </button>
                </div>

                <div className="disclaimer-v2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  This report is generated using AI NLP analysis for career guidance. Review official job listings for complete criteria.
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* 24/7 Floating AI Career Chatbot */}
      <CareerChatbot />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <strong>CareerPilot AI</strong>
            <p>Smart resume optimization & career intelligence platform.</p>
          </div>

          <div className="footer-developer">
            <span>Designed & Developed by</span>
            <a
              href="https://github.com/Areej663"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
              title="View Areej Fatima's GitHub Profile"
            >
              <strong>Areej Fatima</strong>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          <div className="footer-status-col">
            <div className="footer-status">
              <span className="status-dot"></span> System Operational
            </div>
            <span className="footer-copyright">© {new Date().getFullYear()} CareerPilot AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;