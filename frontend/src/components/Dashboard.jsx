function Dashboard({ onNavigateTab }) {
  const applications = JSON.parse(localStorage.getItem("cp_applications") || "[]");
  const totalApps = applications.length || 4;
  const interviewing = applications.filter((a) => a.status === "Interviewing").length || 1;
  const offers = applications.filter((a) => a.status === "Offered").length || 1;

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-hero">
        <div className="dash-hero-content">
          <div className="hero-badge small">
            <span className="badge-sparkle">👋</span> WELCOME BACK, AREEJ
          </div>
          <h2>Your Personal Career Command Center</h2>
          <p>
            Track your job application pipeline, optimize resume match scores, generate cover letters, and consult 24/7 AI career intelligence.
          </p>
        </div>

        <div className="dash-hero-quick-actions">
          <button className="dash-action-btn primary" onClick={() => onNavigateTab("matcher")}>
            ⚡ Run AI Resume Matcher
          </button>
          <button className="dash-action-btn secondary" onClick={() => onNavigateTab("cover-letter")}>
            📝 Create Cover Letter
          </button>
          <button className="dash-action-btn secondary" onClick={() => onNavigateTab("tracker")}>
            📌 Job Application Tracker
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="dash-metrics-grid">
        <div className="dash-metric-card">
          <div className="metric-header">
            <span className="metric-icon-box indigo">🎯</span>
            <span className="metric-trend positive">+12%</span>
          </div>
          <span className="dash-metric-num">78%</span>
          <span className="dash-metric-label">Average Match Score</span>
        </div>

        <div className="dash-metric-card">
          <div className="metric-header">
            <span className="metric-icon-box emerald">📌</span>
            <span className="metric-trend positive">Active</span>
          </div>
          <span className="dash-metric-num">{totalApps}</span>
          <span className="dash-metric-label">Job Applications Tracked</span>
        </div>

        <div className="dash-metric-card">
          <div className="metric-header">
            <span className="metric-icon-box amber">⚡</span>
            <span className="metric-trend positive">High Demand</span>
          </div>
          <span className="dash-metric-num">{interviewing}</span>
          <span className="dash-metric-label">Active Interviews</span>
        </div>

        <div className="dash-metric-card">
          <div className="metric-header">
            <span className="metric-icon-box purple">🏆</span>
            <span className="metric-trend positive">Offer Stage</span>
          </div>
          <span className="dash-metric-num">{offers}</span>
          <span className="dash-metric-label">Job Offers Received</span>
        </div>
      </div>

      {/* Grid Content: Activity & Skill Gaps */}
      <div className="dash-content-grid">
        {/* Recent Applications Widget */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Recent Applications</h3>
            <button className="dash-link-btn" onClick={() => onNavigateTab("tracker")}>
              View All Pipeline →
            </button>
          </div>

          <div className="dash-app-list">
            {applications.slice(0, 4).map((app) => (
              <div className="dash-app-item" key={app.id || app.company}>
                <div className="dash-app-left">
                  <div className="company-avatar">{app.company[0]}</div>
                  <div>
                    <strong>{app.role}</strong>
                    <span>{app.company} • {app.location}</span>
                  </div>
                </div>

                <span className={`status-badge-pill status-${app.status?.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Priority Summary */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Skill Gap Priority Radar</h3>
            <button className="dash-link-btn" onClick={() => onNavigateTab("matcher")}>
              Analyze Resume →
            </button>
          </div>

          <div className="dash-skill-radar-list">
            <div className="radar-item">
              <div className="radar-top">
                <strong>TypeScript</strong>
                <span className="priority-tag priority-high">High Priority</span>
              </div>
              <p>Found in 85% of target AI / Full-Stack job listings.</p>
            </div>

            <div className="radar-item">
              <div className="radar-top">
                <strong>AWS / Cloud Services</strong>
                <span className="priority-tag priority-quick">Quick Win</span>
              </div>
              <p>Required for production application deployments.</p>
            </div>

            <div className="radar-item">
              <div className="radar-top">
                <strong>Machine Learning / Scikit-learn</strong>
                <span className="priority-tag priority-rec">Recommended</span>
              </div>
              <p>Enhance model evaluation and preprocessing skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
