import { useState } from "react";

function CoverLetterGenerator({ onShowToast }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!jobTitle.trim() || !companyName.trim()) {
      onShowToast("Please enter the Job Title and Company Name.", "error");
      return;
    }

    setIsGenerating(true);
    setGeneratedLetter("");

    setTimeout(() => {
      const skillsArray = userSkills.trim()
        ? userSkills.split(",").map((s) => s.trim())
        : ["Full-Stack Development", "Problem Solving", "Modern Software Architecture"];

      const dateStr = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const letterText = `${dateStr}

Hiring Manager
${companyName}

Subject: Application for ${jobTitle} Position

Dear Hiring Team at ${companyName},

I am writing to express my strong enthusiasm for the ${jobTitle} position at ${companyName}. With a solid foundation in ${skillsArray.slice(0, 3).join(", ")}, I am confident in my ability to make an immediate, impactful contribution to your engineering and product goals.

Throughout my career, I have focused on building scalable, clean, and user-centric software solutions. What excites me most about ${companyName} is your commitment to innovation and delivering exceptional value. My background aligns closely with your key requirements:

• Core Expertise: Hands-on experience delivering projects using ${skillsArray.join(", ")}.
• Problem Solving: Proven ability to translate complex requirements into robust, high-performance software.
• Collaboration: Strong track record of working in agile, collaborative team environments to deliver high-quality products on schedule.

${
  jobDetails.trim()
    ? `Having reviewed the key objectives for this role—specifically "${jobDetails.slice(0, 120)}..."—I am excited to bring my proactive mindset and technical expertise to solve these challenges at ${companyName}.`
    : `I am eager to bring my technical skills and enthusiasm for continuous learning to the ${jobTitle} team.`
}

Thank you for your time and consideration. I would welcome the opportunity to discuss how my background, skills, and passion for engineering align with the goals of ${companyName}.

Sincerely,

Areej Fatima
Software Engineer & AI Solutions Architect
areejnaeem910@gmail.com | github.com/Areej663`;

      setGeneratedLetter(letterText);
      setIsGenerating(false);
      onShowToast("Cover Letter generated successfully!", "success");
    }, 1200);
  };

  const handleCopy = async () => {
    if (!generatedLetter) return;
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      onShowToast("Cover letter copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast("Failed to copy text.", "error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cover-letter-container">
      <div className="cover-letter-header">
        <div className="hero-badge small">
          <span className="badge-sparkle">📝</span> AI DOCUMENT SUITE
        </div>
        <h2>AI Cover Letter Generator</h2>
        <p>
          Generate a tailored, high-converting cover letter customized for any target position in seconds.
        </p>
      </div>

      <div className="cover-letter-grid">
        {/* Form Controls Card */}
        <div className="cl-form-card">
          <h3>Target Role Information</h3>

          <div className="form-group">
            <label>Target Job Title *</label>
            <input
              type="text"
              placeholder="e.g. Senior Full-Stack Engineer / AI Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Google / Microsoft / Innovative Startup"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Your Key Skills (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Python, FastAPI, Docker, SQL"
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Job Description / Key Requirements (Optional)</label>
            <textarea
              rows="4"
              placeholder="Paste key responsibilities or job description snippets to personalize further..."
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Writing Tone</label>
            <div className="tone-selector">
              {["Professional", "Enthusiastic", "Executive", "Creative"].map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`tone-pill ${tone === t ? "active" : ""}`}
                  onClick={() => setTone(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            className="analyze-button"
            style={{ width: "100%", marginTop: "12px" }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                ⚡ Generate Cover Letter
              </>
            )}
          </button>
        </div>

        {/* Preview Output Card */}
        <div className="cl-preview-card">
          <div className="preview-header">
            <h3>Generated Document Preview</h3>
            {generatedLetter && (
              <div className="preview-actions">
                <button type="button" className="copy-button" onClick={handleCopy}>
                  {copied ? "✓ Copied!" : "📋 Copy Text"}
                </button>
                <button type="button" className="copy-button" onClick={handlePrint}>
                  🖨️ Print / PDF
                </button>
              </div>
            )}
          </div>

          {generatedLetter ? (
            <div className="letter-paper">
              <pre className="letter-text">{generatedLetter}</pre>
            </div>
          ) : (
            <div className="letter-placeholder">
              <div className="placeholder-icon">📄</div>
              <h4>No Document Generated Yet</h4>
              <p>
                Fill in the job details on the left and click <strong>Generate Cover Letter</strong> to view your custom document.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoverLetterGenerator;
