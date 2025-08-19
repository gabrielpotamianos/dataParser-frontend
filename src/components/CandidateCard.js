// CandidateCard.jsx
import React from "react";
import "./CandidateCard.css";
import defaultAvatar from "../assets/user.png";

export default function CandidateCard({ candidate }) {
  const isProd = false;
  const PROD_API = "https://dataparser.gabri-the-dev.com";
  const DEV_API = "http://localhost:8000";
  const IMG_BASE = isProd ? PROD_API : DEV_API;

  return (
    <div>
      <div className="candidate-header">
        <img
          src={IMG_BASE + candidate.avatarUrl}
          alt={defaultAvatar}
          className="candidate-avatar"
          onError={(e) => (e.currentTarget.src = defaultAvatar)}
        />
        <div className="header-text">
          <h3 className="candidate-name">{candidate.full_name}</h3>
          <p title={candidate.head_line} className="candidate-headline">
            {candidate.head_line}
          </p>
          <p className="candidate-location">{candidate.location}</p>
        </div>
      </div>
      <div className="candidate-info">
        {Array.isArray(candidate.skills) && (
          <div className="candidate-skills">
            {candidate.skills.length > 0 ? (
              candidate.skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="skill-badge">
                  {skill}
                </span>
              ))
            ) : (
              <span className="skill-badge-not-found">Not Found</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
