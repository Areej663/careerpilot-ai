import { useEffect } from "react";

function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" ? "✓" : type === "error" ? "!" : "ℹ"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}

export default Toast;
