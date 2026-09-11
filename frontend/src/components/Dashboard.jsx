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
            <div>⚡ Run AI Resume Matcher</div>
            <span className="dash-btn-sub">Instant ATS score in 30s</span>
          </button>
          <button className="dash-action-btn secondary" onClick={() => onNavigateTab("cover-letter")}>
            <div>📝 Create Cover Letter</div>
            <span className="dash-btn-sub">JD matched cover letter in 10s</span>
          </button>
          <button className="dash-action-btn secondary" onClick={() => onNavigateTab("tracker")}>
            <div>📌 Job Application Tracker</div>
            <span className="dash-btn-sub">Track pipeline & local jobs</span>
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
            {applications.length > 0 ? (
              applications.slice(0, 4).map((app) => (
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
              ))
            ) : (
              <div className="empty-column-state" style={{ padding: "32px 16px", textAlign: "center" }}>
                <span style={{ fontSize: "32px", display: "block", marginBottom: "10px" }}>📂</span>
                <strong style={{ fontSize: "15px", color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                  Upload your first resume to get started
                </strong>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px" }}>
                  Analyze your compatibility against target roles and track your progress.
                </p>
                <button className="share-button" style={{ padding: "8px 16px", fontSize: "12px" }} onClick={() => onNavigateTab("matcher")}>
                  + Upload Your First Resume
                </button>
              </div>
            )}
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

      {/* Placement Prediction & Skills Improved Row */}
      <div className="dash-content-grid" style={{ marginTop: "24px" }}>
        {/* Placement Prediction Analytics */}
        <div className="dash-card" style={{ border: "1px solid rgba(99, 102, 241, 0.3)", background: "linear-gradient(135deg, rgba(30, 27, 75, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)" }}>
          <div className="dash-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px" }}>Placement Prediction Analytics</h3>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI predictive model based on current resume & skill index</span>
              </div>
            </div>
            <span className="priority-tag priority-high" style={{ padding: "4px 10px", fontSize: "11px" }}>High Match Probability</span>
          </div>

          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-main)" }}>Estimated Selection Rate for Target Roles</span>
              <span style={{ fontSize: "24px", fontWeight: "800", color: "#818cf8" }}>82%</span>
            </div>

            {/* Gauge progress bar */}
            <div style={{ width: "100%", height: "10px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ width: "82%", height: "100%", background: "linear-gradient(90deg, #6366f1 0%, #10b981 100%)", borderRadius: "10px", transition: "width 1s ease-in-out" }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>Interview Callback Rate</span>
                <strong style={{ fontSize: "14px", color: "#34d399" }}>3.4x Average</strong>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>ATS Keyword Match</span>
                <strong style={{ fontSize: "14px", color: "#60a5fa" }}>88% Optimized</strong>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>Recommended Focus</span>
                <strong style={{ fontSize: "14px", color: "#fbbf24" }}>System Architecture</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Skills & Readiness Velocity */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>⚡</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px" }}>Learning Velocity</h3>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Weekly progress tracking</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "12px", borderRadius: "10px" }}>
              <div>
                <strong style={{ fontSize: "14px", color: "#34d399", display: "block" }}>+4 Skills Improved This Week</strong>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>React Hooks, Web Speech API, Docker, FastAPI</span>
              </div>
              <span style={{ fontSize: "20px" }}>📈</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "12px", borderRadius: "10px" }}>
              <div>
                <strong style={{ fontSize: "14px", color: "#818cf8", display: "block" }}>Mock Interviews Completed</strong>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>2 voice simulations (Avg. Score: 85%)</span>
              </div>
              <span style={{ fontSize: "20px" }}>🎙️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
