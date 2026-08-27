import { useState, useEffect } from "react";

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    company: "Google",
    role: "Senior AI Engineer",
    status: "Interviewing",
    salary: "$160,000 - $190,000",
    date: "2026-08-15",
    location: "Remote / Mountain View",
    notes: "Technical Round 2 scheduled for next Tuesday.",
  },
  {
    id: "app-2",
    company: "Microsoft",
    role: "Full Stack Developer",
    status: "Applied",
    salary: "$140,000",
    date: "2026-08-18",
    location: "Hybrid / Redmond",
    notes: "Applied via referral link.",
  },
  {
    id: "app-3",
    company: "Stripe",
    role: "Frontend Engineer",
    status: "Wishlist",
    salary: "$150,000",
    date: "2026-08-20",
    location: "Remote",
    notes: "Preparing resume match optimization.",
  },
  {
    id: "app-4",
    company: "Meta",
    role: "AI Product Engineer",
    status: "Offered",
    salary: "$175,000",
    date: "2026-08-10",
    location: "Seattle, WA",
    notes: "Offer letter received! Reviewing benefits.",
  },
];

const COLUMNS = ["Wishlist", "Applied", "Interviewing", "Offered", "Rejected"];

function ApplicationTracker({ onShowToast, onNavigateToMatcher }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("cp_applications");
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [viewMode, setViewMode] = useState("kanban"); // "kanban" or "table"
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("Applied");
  const [newSalary, setNewSalary] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    localStorage.setItem("cp_applications", JSON.stringify(applications));
  }, [applications]);

  const handleAddApplication = (e) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) {
      onShowToast("Please enter both Company and Role title.", "error");
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      company: newCompany.trim(),
      role: newRole.trim(),
      status: newStatus,
      salary: newSalary.trim() || "Not specified",
      location: newLocation.trim() || "Remote / Onsite",
      date: new Date().toISOString().split("T")[0],
      notes: newNotes.trim(),
    };

    setApplications([newApp, ...applications]);
    setShowAddModal(false);

    setNewCompany("");
    setNewRole("");
    setNewSalary("");
    setNewLocation("");
    setNewNotes("");

    onShowToast(`Tracked application for ${newCompany}!`, "success");
  };

  const handleUpdateStatus = (id, nextStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: nextStatus } : app))
    );
    onShowToast("Status updated successfully!", "info");
  };

  const handleDelete = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    onShowToast("Application removed from tracker.", "info");
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Wishlist":
        return "status-wishlist";
      case "Applied":
        return "status-applied";
      case "Interviewing":
        return "status-interview";
      case "Offered":
        return "status-offer";
      case "Rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div>
          <div className="hero-badge small">
            <span className="badge-sparkle">📌</span> PIPELINE MANAGER
          </div>
          <h2>Job Application Tracker</h2>
          <p>
            Track your job hunt progress, manage interview stages, and organize candidate pipelines.
          </p>
        </div>

        <div className="tracker-actions">
          <div className="view-toggle">
            <button
              type="button"
              className={`toggle-btn ${viewMode === "kanban" ? "active" : ""}`}
              onClick={() => setViewMode("kanban")}
            >
              Board View
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              Table View
            </button>
          </div>

          <button
            type="button"
            className="share-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Application
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tracker-filter-bar">
        <div className="search-input-wrapper">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by company or role title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tracker-stats-pills">
          <span className="stat-pill">Total: <strong>{applications.length}</strong></span>
          <span className="stat-pill">Interviewing: <strong>{applications.filter(a => a.status === "Interviewing").length}</strong></span>
          <span className="stat-pill">Offers: <strong>{applications.filter(a => a.status === "Offered").length}</strong></span>
        </div>
      </div>

      {/* Board Kanban View */}
      {viewMode === "kanban" ? (
        <div className="kanban-grid">
          {COLUMNS.map((col) => {
            const colApps = filteredApplications.filter((app) => app.status === col);
            return (
              <div className="kanban-column" key={col}>
                <div className="column-header">
                  <h4>{col}</h4>
                  <span className="col-count">{colApps.length}</span>
                </div>

                <div className="column-cards">
                  {colApps.length > 0 ? (
                    colApps.map((app) => (
                      <div className="app-card" key={app.id}>
                        <div className="app-card-top">
                          <strong className="app-role">{app.role}</strong>
                          <button
                            type="button"
                            className="card-delete-btn"
                            onClick={() => handleDelete(app.id)}
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>

                        <span className="app-company">🏢 {app.company}</span>

                        {app.salary && <span className="app-meta">💰 {app.salary}</span>}
                        {app.location && <span className="app-meta">📍 {app.location}</span>}

                        {app.notes && <p className="app-notes">"{app.notes}"</p>}

                        <div className="app-card-footer">
                          <span className="app-date">{app.date}</span>

                          <select
                            className="status-select"
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                          >
                            {COLUMNS.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-column-state">No jobs in {col}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="table-container-card">
          <table className="tracker-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role Title</th>
                <th>Status</th>
                <th>Location</th>
                <th>Salary Range</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td><strong>{app.company}</strong></td>
                    <td>{app.role}</td>
                    <td>
                      <span className={`status-badge-pill ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{app.location}</td>
                    <td>{app.salary}</td>
                    <td>{app.date}</td>
                    <td>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Track New Application</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>

            <form onSubmit={handleAddApplication} className="modal-form">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon / Airbnb"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer / Product Manager"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    {COLUMNS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Salary Range</label>
                  <input
                    type="text"
                    placeholder="e.g. $120k - $140k"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote / San Francisco, CA"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Notes & Reminders</label>
                <textarea
                  rows="3"
                  placeholder="e.g. HR call on Thursday. Prepared resume for AI Matcher."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="nav-back" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="share-button">
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationTracker;
