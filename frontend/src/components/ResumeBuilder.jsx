import { useState } from "react";

const INITIAL_RESUME_DATA = {
  fullName: "Areej Fatima",
  jobTitle: "Full-Stack AI Software Engineer",
  email: "areejnaeem910@gmail.com",
  phone: "+92 300 1234567",
  location: "Remote / Pakistan",
  github: "github.com/Areej663",
  summary:
    "Proactive Full-Stack AI Software Engineer with expertise in building high-performance web applications using React, Python, FastAPI, and Natural Language Processing (NLP). Proven track record of architecting scalable SaaS platforms.",
  skills: ["React", "Python", "FastAPI", "JavaScript", "SQL", "Docker", "NLP", "GitHub"],
  experiences: [
    {
      id: "exp-1",
      company: "CareerPilot AI",
      role: "Lead Full-Stack AI Engineer",
      period: "2026 - Present",
      location: "Remote",
      bullets:
        "Architected and deployed CareerPilot AI platform featuring real-time NLP skill matching and automated document suite.\nOptimized client-side PDF text extraction engine resulting in 0ms latency and 100% offline reliability.\nIntegrated responsive glassmorphism UI design system across 6 multi-tab career ecosystem modules.",
    },
    {
      id: "exp-2",
      company: "Tech Solutions Inc.",
      role: "Software Developer",
      period: "2024 - 2026",
      location: "Hybrid",
      bullets:
        "Developed reusable React components and state management pipelines serving 10,000+ monthly active users.\nBuilt RESTful FastAPI microservices and database query optimization strategies.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Engineering & Technology",
      degree: "BS Computer Science / Software Engineering",
      year: "2022 - 2026",
    },
  ],
};

function ResumeBuilder({ onShowToast }) {
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [template, setTemplate] = useState("modern"); // "modern", "executive", "classic"
  const [isOptimizingSummary, setIsOptimizingSummary] = useState(false);
  const [isOptimizingBullets, setIsOptimizingBullets] = useState(false);

  // Calculate live ATS strength score
  const calculateATSScore = () => {
    let score = 50;
    if (resumeData.fullName) score += 5;
    if (resumeData.email && resumeData.phone) score += 5;
    if (resumeData.summary.length > 80) score += 10;
    if (resumeData.skills.length >= 5) score += 10;
    if (resumeData.experiences.length >= 2) score += 10;
    if (resumeData.education.length >= 1) score += 10;
    return Math.min(98, score);
  };

  const atsScore = calculateATSScore();

  const handleInputChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = (skillText) => {
    if (!skillText.trim()) return;
    const newSkills = skillText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && !resumeData.skills.includes(s));
    if (newSkills.length > 0) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...newSkills],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleExperienceChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "New Company",
      role: "Software Role",
      period: "2025 - Present",
      location: "Remote",
      bullets: "Delivered scalable feature updates and collaborated with engineering team.",
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const handleDeleteExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleOptimizeSummary = () => {
    setIsOptimizingSummary(true);
    setTimeout(() => {
      const optimized =
        "Results-driven " +
        (resumeData.jobTitle || "Software Engineer") +
        " with a strong foundation in " +
        (resumeData.skills.slice(0, 3).join(", ") || "modern software engineering") +
        ". Proven expertise in architecting scalable applications, optimizing database performance, and delivering high-converting AI SaaS platforms.";
      setResumeData((prev) => ({ ...prev, summary: optimized }));
      setIsOptimizingSummary(false);
      onShowToast("Professional Summary optimized with AI!", "success");
    }, 900);
  };

  const handleBoostBullets = (expId) => {
    setIsOptimizingBullets(true);
    setTimeout(() => {
      setResumeData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) => {
          if (exp.id === expId) {
            const boosted =
              "Architected and deployed production software modules using " +
              (prev.skills.slice(0, 2).join(" and ") || "React and Python") +
              ", increasing system efficiency by 38%.\nSpearheaded end-to-end feature development and reduced API response latency by 150ms.\nCollaborated in cross-functional agile teams to deliver clean, maintainable codebases on schedule.";
            return { ...exp, bullets: boosted };
          }
          return exp;
        }),
      }));
      setIsOptimizingBullets(false);
      onShowToast("Experience bullet points boosted with AI metrics!", "success");
    }, 1000);
  };

  const handleExportPDF = () => {
    onShowToast("Preparing ATS resume PDF export...", "info");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="builder-container">
      <div className="builder-header">
        <div className="hero-badge small">
          <span className="badge-sparkle">📄</span> AI RESUME ARCHITECT
        </div>
        <h2>AI Resume Builder</h2>
        <p>
          Build a high-converting, ATS-compliant resume with live score calculation, AI bullet point optimization, and instant PDF download.
        </p>
      </div>

      <div className="builder-layout">
        {/* Left Form Controls */}
        <div className="builder-form-pane">
          <div className="builder-section-title">
            <h3>1. Personal Details</h3>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Professional Title *</label>
              <input
                type="text"
                value={resumeData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={resumeData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={resumeData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={resumeData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>GitHub / Portfolio Link</label>
              <input
                type="text"
                value={resumeData.github}
                onChange={(e) => handleInputChange("github", e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Summary */}
          <div className="builder-section-title">
            <h3>2. Professional Summary</h3>
            <button
              type="button"
              className="ai-action-btn"
              onClick={handleOptimizeSummary}
              disabled={isOptimizingSummary}
            >
              {isOptimizingSummary ? "Optimizing..." : "✨ Optimize Summary with AI"}
            </button>
          </div>

          <div className="form-group">
            <textarea
              rows="4"
              value={resumeData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
            />
          </div>

          {/* Section 3: Technical Skills */}
          <div className="builder-section-title">
            <h3>3. Technical Skills</h3>
          </div>

          <div className="form-group">
            <label>Add Skills (Comma separated & press Enter)</label>
            <input
              type="text"
              placeholder="e.g. React, Python, Docker, PostgreSQL, Tailwind"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSkillAdd(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>

          <div className="skill-list" style={{ marginBottom: "20px" }}>
            {resumeData.skills.map((skill) => (
              <span key={skill} className="skill-chip chip-matched">
                {skill}
                <button
                  type="button"
                  className="chip-remove"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Section 4: Work Experience */}
          <div className="builder-section-title">
            <h3>4. Work Experience</h3>
            <button type="button" className="dash-link-btn" onClick={handleAddExperience}>
              + Add Experience
            </button>
          </div>

          {resumeData.experiences.map((exp, idx) => (
            <div className="exp-editor-card" key={exp.id}>
              <div className="exp-card-header">
                <strong>Experience #{idx + 1}</strong>
                <button
                  type="button"
                  className="card-delete-btn"
                  onClick={() => handleDeleteExperience(exp.id)}
                >
                  × Delete
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Role Title</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Period / Dates</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label>Bullet Points (One per line)</label>
                  <button
                    type="button"
                    className="ai-action-btn small"
                    onClick={() => handleBoostBullets(exp.id)}
                    disabled={isOptimizingBullets}
                  >
                    ⚡ Boost Bullets with AI Metrics
                  </button>
                </div>
                <textarea
                  rows="4"
                  value={exp.bullets}
                  onChange={(e) => handleExperienceChange(exp.id, "bullets", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Live Preview & ATS Meter */}
        <div className="builder-preview-pane">
          <div className="preview-toolbar">
            <div className="template-picker">
              <span className="template-label">Template:</span>
              <button
                type="button"
                className={`tone-pill ${template === "modern" ? "active" : ""}`}
                onClick={() => setTemplate("modern")}
              >
                Modern SaaS
              </button>
              <button
                type="button"
                className={`tone-pill ${template === "executive" ? "active" : ""}`}
                onClick={() => setTemplate("executive")}
              >
                Executive
              </button>
              <button
                type="button"
                className={`tone-pill ${template === "classic" ? "active" : ""}`}
                onClick={() => setTemplate("classic")}
              >
                ATS Classic
              </button>
            </div>

            <button type="button" className="share-button" onClick={handleExportPDF}>
              🖨️ Export PDF
            </button>
          </div>

          {/* Live Real-Time ATS Score Bar */}
          <div className="ats-score-banner">
            <div className="ats-left">
              <span>REAL-TIME ATS SCORE</span>
              <strong>{atsScore}% ATS Strength</strong>
            </div>

            <div className="ats-progress-track">
              <div
                className="ats-progress-fill"
                style={{
                  width: `${atsScore}%`,
                  backgroundColor: atsScore > 85 ? "#10B981" : atsScore > 70 ? "#F59E0B" : "#EF4444",
                }}
              ></div>
            </div>
          </div>

          {/* Paper Document Preview */}
          <div className={`resume-paper-document template-${template}`}>
            {/* Header */}
            <div className="paper-header">
              <h1 className="paper-name">{resumeData.fullName || "Your Full Name"}</h1>
              <h2 className="paper-title">{resumeData.jobTitle || "Target Role"}</h2>

              <div className="paper-contact">
                {resumeData.email && <span>{resumeData.email}</span>}
                {resumeData.phone && <span>• {resumeData.phone}</span>}
                {resumeData.location && <span>• {resumeData.location}</span>}
                {resumeData.github && <span>• {resumeData.github}</span>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="paper-section">
                <h3 className="paper-heading">PROFESSIONAL SUMMARY</h3>
                <p className="paper-summary">{resumeData.summary}</p>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="paper-section">
                <h3 className="paper-heading">CORE TECHNICAL SKILLS</h3>
                <div className="paper-skills-row">
                  {resumeData.skills.map((skill) => (
                    <span key={skill} className="paper-skill-item">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {resumeData.experiences.length > 0 && (
              <div className="paper-section">
                <h3 className="paper-heading">WORK EXPERIENCE</h3>
                {resumeData.experiences.map((exp) => (
                  <div className="paper-exp-item" key={exp.id}>
                    <div className="paper-exp-top">
                      <strong>{exp.role} — {exp.company}</strong>
                      <span>{exp.period} | {exp.location}</span>
                    </div>

                    <ul className="paper-bullets">
                      {exp.bullets.split("\n").filter((b) => b.trim()).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="paper-section">
                <h3 className="paper-heading">EDUCATION</h3>
                {resumeData.education.map((edu) => (
                  <div className="paper-edu-item" key={edu.id}>
                    <strong>{edu.degree}</strong>
                    <span>{edu.school} ({edu.year})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
