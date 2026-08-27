function Navbar({
  hasResult,
  darkMode,
  activeTab = "dashboard",
  onSelectTab,
  onToggleTheme,
  onBack,
  onLoadDemo,
}) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "assessment", label: "AI Assessment", icon: "🎯" },
    { id: "matcher", label: "AI Resume Matcher", icon: "⚡" },
    { id: "cover-letter", label: "Cover Letter", icon: "📝" },
    { id: "interview", label: "Mock Interview", icon: "🎙️" },
    { id: "tracker", label: "Job Tracker", icon: "📌" },
  ];

  return (
    <header className="navbar">
      <div className="brand" onClick={() => onSelectTab("dashboard")} style={{ cursor: "pointer" }}>
        <div className="brand-icon-wrapper">
          <div className="brand-icon">CP</div>
          <span className="pulse-indicator" title="AI Engine Online"></span>
        </div>

        <div className="brand-content">
          <div className="brand-title-row">
            <h1>
              CareerPilot <span className="brand-ai">AI</span>
            </h1>
            <a
              href="https://github.com/Areej663"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-pill"
              title="Designed & Developed by Areej Fatima"
              onClick={(e) => e.stopPropagation()}
            >
              by Areej Fatima
            </a>
          </div>
          <span className="brand-tagline">Smart Match & Career Intelligence</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tab-menu">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        {activeTab === "matcher" && !hasResult && (
          <button
            type="button"
            className="demo-button"
            onClick={onLoadDemo}
            title="Load sample data to test instantly"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Try Demo
          </button>
        )}

        {activeTab === "matcher" && hasResult && (
          <button type="button" className="nav-back" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            New Analysis
          </button>
        )}

        <button
          type="button"
          className="theme-button"
          onClick={onToggleTheme}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;