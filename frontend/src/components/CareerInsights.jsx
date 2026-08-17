function CareerInsights({
  insight,
  missingSkills = [],
  getRecommendation,
}) {
  const getPriorityBadge = (index) => {
    if (index === 0) return { label: "High Priority", class: "priority-high" };
    if (index === 1) return { label: "Quick Win", class: "priority-quick" };
    return { label: "Recommended", class: "priority-rec" };
  };

  return (
    <section className="career-insights-v2">
      <div className="insights-header">
        <div className="insights-icon-container">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
        </div>

        <div className="insights-header-text">
          <span className="insights-kicker">AI CAREER ROADMAP</span>
          <h3>Strategic Growth Plan</h3>
        </div>
      </div>

      <p className="insight-text">{insight}</p>

      {missingSkills.length > 0 ? (
        <div className="priority-box">
          <div className="priority-title">
            <div className="priority-title-text">
              <h4>Recommended Action Plan</h4>
              <p>Top skill gaps to address to boost your job match percentage</p>
            </div>

            <span className="gap-badge">
              {missingSkills.length} {missingSkills.length === 1 ? "Skill Gap" : "Skill Gaps"}
            </span>
          </div>

          <div className="action-grid">
            {missingSkills.slice(0, 4).map((skill, index) => {
              const recommendation =
                typeof getRecommendation === "function"
                  ? getRecommendation(skill)
                  : {
                      icon: "🎯",
                      title: skill,
                      description:
                        "Learn this skill and demonstrate it through a practical project.",
                    };

              const priority = getPriorityBadge(index);

              return (
                <article className="action-card-v2" key={skill}>
                  <div className="action-card-top">
                    <div className="action-icon-wrapper">
                      <span className="action-emoji">{recommendation.icon}</span>
                    </div>
                    <span className={`priority-tag ${priority.class}`}>
                      {priority.label}
                    </span>
                  </div>

                  <div className="action-content">
                    <h5 className="action-title">{recommendation.title}</h5>
                    <p className="action-desc">{recommendation.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="success-insight-box">
          <div className="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <div>
            <strong>100% Skill Coverage Achieved!</strong>
            <p>
              Your resume covers all key requirements for this position. Focus on adding quantifiable metrics and project links to stand out even further.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CareerInsights;