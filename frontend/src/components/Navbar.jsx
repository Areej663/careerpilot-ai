import { useState, useEffect } from "react";

function Navbar({
  hasResult,
  darkMode,
  lang = "en",
  onToggleLang,
  activeTab = "dashboard",
  onSelectTab,
  onToggleTheme,
  onBack,
  onLoadDemo,
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleGoogleSignIn = () => {
    setUser({
      name: "Areej Fatima",
      email: "areejnaeem910@gmail.com",
      avatar: "AF",
    });
    setShowAuthModal(false);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const isResumeSuiteActive = ["matcher", "builder", "cover-letter", "assessment"].includes(activeTab);
  const isCareerSuiteActive = ["interview", "tracker"].includes(activeTab);

  const handleSelectTab = (tabId) => {
    setActiveDropdown(null);
    onSelectTab(tabId);
  };

  return (
    <header className="navbar">
      <div className="brand" onClick={() => handleSelectTab("dashboard")} style={{ cursor: "pointer" }}>
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
          <span className="brand-tagline">
            {lang === "ur" ? "سمارٹ کیریئر انٹیلی جنس پلیٹ فارم" : "Smart Match & Career Intelligence"}
          </span>
        </div>
      </div>

      {/* Categorized Suite Navigation Menu */}
      <nav className="nav-tab-menu">
        {/* Category 1: Dashboard */}
        <button
          type="button"
          className={`nav-tab-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => handleSelectTab("dashboard")}
        >
          <span className="tab-icon">🏠</span>
          <span className="tab-label">{lang === "ur" ? "ڈیش بورڈ" : "Dashboard"}</span>
        </button>

        {/* Category 2: AI Resume Suite Dropdown */}
        <div className="nav-dropdown-wrapper" onMouseLeave={() => setActiveDropdown(null)}>
          <button
            type="button"
            className={`nav-tab-item ${isResumeSuiteActive ? "active" : ""}`}
            onClick={() => {
              if (activeDropdown === "resume") setActiveDropdown(null);
              else setActiveDropdown("resume");
            }}
            onMouseEnter={() => setActiveDropdown("resume")}
          >
            <span className="tab-icon">⚡</span>
            <span className="tab-label">{lang === "ur" ? "رزومے سوئیٹ" : "AI Resume Suite"}</span>
            <span className="dropdown-caret">▾</span>
          </button>

          {activeDropdown === "resume" && (
            <div className="nav-dropdown-menu">
              <button
                type="button"
                className={`dropdown-item ${activeTab === "matcher" ? "active" : ""}`}
                onClick={() => handleSelectTab("matcher")}
              >
                <span>⚡</span> {lang === "ur" ? "رزومے میچر" : "AI Resume Matcher"}
              </button>
              <button
                type="button"
                className={`dropdown-item ${activeTab === "builder" ? "active" : ""}`}
                onClick={() => handleSelectTab("builder")}
              >
                <span>📄</span> {lang === "ur" ? "رزومے بلڈر" : "Resume Builder"}
              </button>
              <button
                type="button"
                className={`dropdown-item ${activeTab === "cover-letter" ? "active" : ""}`}
                onClick={() => handleSelectTab("cover-letter")}
              >
                <span>📝</span> {lang === "ur" ? "کور لیٹر" : "Cover Letter Generator"}
              </button>
              <button
                type="button"
                className={`dropdown-item ${activeTab === "assessment" ? "active" : ""}`}
                onClick={() => handleSelectTab("assessment")}
              >
                <span>🎯</span> {lang === "ur" ? "کیریئر تجزیہ" : "AI Skill Assessment"}
              </button>
            </div>
          )}
        </div>

        {/* Category 3: Interview & Job Hub Dropdown */}
        <div className="nav-dropdown-wrapper" onMouseLeave={() => setActiveDropdown(null)}>
          <button
            type="button"
            className={`nav-tab-item ${isCareerSuiteActive ? "active" : ""}`}
            onClick={() => {
              if (activeDropdown === "career") setActiveDropdown(null);
              else setActiveDropdown("career");
            }}
            onMouseEnter={() => setActiveDropdown("career")}
          >
            <span className="tab-icon">🎙️</span>
            <span className="tab-label">{lang === "ur" ? "انٹرویو و جاب" : "Interview & Jobs"}</span>
            <span className="dropdown-caret">▾</span>
          </button>

          {activeDropdown === "career" && (
            <div className="nav-dropdown-menu">
              <button
                type="button"
                className={`dropdown-item ${activeTab === "interview" ? "active" : ""}`}
                onClick={() => handleSelectTab("interview")}
              >
                <span>🎙️</span> {lang === "ur" ? "موک انٹرویو" : "Voice Mock Interview"}
              </button>
              <button
                type="button"
                className={`dropdown-item ${activeTab === "tracker" ? "active" : ""}`}
                onClick={() => handleSelectTab("tracker")}
              >
                <span>📌</span> {lang === "ur" ? "جاب ٹریکر" : "Job Application Tracker"}
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="nav-actions">
        {/* Language Switcher */}
        <button
          type="button"
          className="pwa-install-btn"
          onClick={onToggleLang}
          title="Toggle Urdu / English Language"
        >
          {lang === "ur" ? "🇵🇰 اردو" : "🌐 EN"}
        </button>

        {/* Pro Plan Trigger */}
        <button
          type="button"
          className="pwa-install-btn"
          style={{ borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}
          onClick={() => setShowProModal(true)}
        >
          ⚡ Pro Plan
        </button>

        {/* User Auth Avatar / Sign-In Button */}
        {user ? (
          <div className="company-avatar" style={{ cursor: "pointer", width: "34px", height: "34px", fontSize: "12px" }}>
            {user.avatar}
          </div>
        ) : (
          <button
            type="button"
            className="pwa-install-btn"
            onClick={() => setShowAuthModal(true)}
          >
            Sign in
          </button>
        )}

        {/* PWA Mobile App Install Button */}
        <button
          type="button"
          className="pwa-install-btn"
          onClick={handleInstallPwa}
          title="Install CareerPilot AI Mobile App"
        >
          📱 App
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

      {/* Pro Plan Modal */}
      {showProModal && (
        <div className="modal-overlay" onClick={() => setShowProModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h3>⚡ Upgrade to CareerPilot Pro</h3>
              <button className="modal-close" onClick={() => setShowProModal(false)}>×</button>
            </div>
            <div className="form-row" style={{ marginTop: "16px" }}>
              <div className="plan-card free" style={{ padding: "20px", background: "var(--bg-primary)", borderRadius: "12px", border: "1px solid var(--border-light)" }}>
                <h4>Free Starter</h4>
                <div style={{ fontSize: "24px", fontWeight: "800", margin: "8px 0" }}>$0 / mo</div>
                <ul style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.8", paddingLeft: "16px" }}>
                  <li>✓ 3 Full Resume Matches per month</li>
                  <li>✓ Basic Cover Letter Generator</li>
                  <li>✓ Standard ATS Templates</li>
                </ul>
              </div>

              <div className="plan-card pro" style={{ padding: "20px", background: "var(--accent-light)", borderRadius: "12px", border: "2px solid var(--accent-primary)" }}>
                <span className="hero-badge small" style={{ marginBottom: "6px" }}>RECOMMENDED</span>
                <h4>Pro Ecosystem</h4>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--accent-primary)", margin: "8px 0" }}>$9 / mo</div>
                <ul style={{ fontSize: "12px", color: "var(--text-main)", lineHeight: "1.8", paddingLeft: "16px" }}>
                  <li>✓ Unlimited AI Resume Matches</li>
                  <li>✓ FAANG & Local Question Banks (Google, Systems Ltd)</li>
                  <li>✓ 1-Click AI Bullet Point Metrics Rewriter</li>
                  <li>✓ Priority 24/7 AI Chatbot Assistant</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="share-button" onClick={() => setShowProModal(false)}>
                Unlock Pro Access ($9/mo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Sign In Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Sign in to CareerPilot AI</h3>
              <button className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "14px 0 24px" }}>
              Sign in with 1-click Google account to save your resume reports, track job applications, and sync interview notes across devices.
            </p>
            <button className="analyze-button" onClick={handleGoogleSignIn}>
              Continue with Google Account →
            </button>
          </div>
        </div>
      )}

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