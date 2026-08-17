import { useEffect, useState } from "react";

function MatchScore({ score = 0, status, color }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Smooth count-up animation for score
    const duration = 1000;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedScore(Math.min(score, Math.round(progress * score)));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG Gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="score-card-v2">
      <div className="score-header">
        <span className="score-label">MATCH COMPATIBILITY</span>
        <span className="score-status-chip" style={{ backgroundColor: `${color}18`, color: color, borderColor: `${color}40` }}>
          {status}
        </span>
      </div>

      <div className="score-gauge-container">
        <svg className="score-gauge-svg" width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={score < 50 ? "#EF4444" : score < 75 ? "#F59E0B" : "#10B981"} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            className="score-track"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="10"
          />

          {/* Progress circle */}
          <circle
            className="score-progress"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="10"
            stroke="url(#scoreGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />
        </svg>

        <div className="score-value-overlay">
          <span className="score-number" style={{ color: color }}>
            {animatedScore}
            <span className="score-percent">%</span>
          </span>
          <span className="score-subtitle">Overall Match</span>
        </div>
      </div>
    </div>
  );
}

export default MatchScore;