import { useState, useEffect } from "react";

function Navbar({
  hasResult,
  darkMode,
  activeTab = "dashboard",
  onSelectTab,
  onToggleTheme,
  onBack,
  onLoadDemo,
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPwaModal, setShowPwaModal] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      setShowPwaModal(true);
    }
  };

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
        {/* PWA Mobile App Install Button */}
        <button
          type="button"
          className="pwa-install-btn"
          onClick={handleInstallPwa}
          title="Install CareerPilot AI Mobile App"
        >
          📱 Install App
        </button>

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

      {/* PWA App Installation Guide Modal */}
      {showPwaModal && (
        <div className="modal-overlay" onClick={() => setShowPwaModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📱 Install CareerPilot AI Mobile App</h3>
              <button className="modal-close" onClick={() => setShowPwaModal(false)}>×</button>
            </div>
            <div style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)", margin: "16px 0" }}>
              <p style={{ marginBottom: "12px" }}>
                <strong>On Mobile (Android / iPhone):</strong>
              </p>
              <ol style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                <li>Tap your browser menu icon (3 dots on Chrome / Share icon on Safari).</li>
                <li>Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.</li>
                <li>Launch CareerPilot AI directly from your phone app grid!</li>
              </ol>
              <p>
                <strong>On Desktop Chrome / Edge:</strong> Click the ⊕ install icon in your browser URL address bar.
              </p>
            </div>
            <div className="modal-footer">
              <button className="share-button" onClick={() => setShowPwaModal(false)}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;