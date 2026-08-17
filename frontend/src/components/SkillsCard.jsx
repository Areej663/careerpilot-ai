import { useState } from "react";

function SkillsCard({
  type,
  skills = [],
  onCopy,
  copied,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const isMatched = type === "matched";

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`skills-card-v2 ${isMatched ? "matched-card" : "missing-card"}`}>
      <div className="card-heading">
        <div className="title-group">
          <span className={`heading-badge ${isMatched ? "matched-badge" : "missing-badge"}`}>
            {isMatched ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </span>

          <h3>{isMatched ? "Matched Skills" : "Missing Skill Gaps"}</h3>
          <span className="count-pill">{skills.length}</span>
        </div>

        {!isMatched && skills.length > 0 && (
          <button
            type="button"
            className="copy-button"
            onClick={onCopy}
            title="Copy missing skills to clipboard"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            {copied ? "Copied!" : "Copy Gaps"}
          </button>
        )}
      </div>

      {skills.length > 4 && (
        <div className="skill-search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder={`Search ${isMatched ? "matched" : "missing"} skills...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>×</button>
          )}
        </div>
      )}

      <div className="skill-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <span key={skill} className={`skill-chip ${isMatched ? "chip-matched" : "chip-missing"}`}>
              <span className="chip-bullet"></span>
              {skill}
            </span>
          ))
        ) : (
          <div className="empty-state">
            {searchTerm ? (
              <span>No skills match "{searchTerm}"</span>
            ) : isMatched ? (
              <span>No matching skills detected in uploaded resume.</span>
            ) : (
              <span>🎉 Excellent! No missing skill gaps identified.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillsCard;