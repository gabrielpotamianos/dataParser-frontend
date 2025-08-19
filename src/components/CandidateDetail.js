// src/components/CandidateDetail.jsx
import React, { useState } from "react";
import "./CandidateDetail.css";

export default function CandidateDetail({ candidate, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const about = candidate.about || "";
  if (!candidate) return null;

  return (
    <div>
      <section className="about-wrapper">
        <h3 className="font-semibold">About</h3>
        {about ? (
          <p className={`about-text${expanded ? " expanded" : ""}`}>{about}</p>
        ) : (
          <p className="not-found">Not Found</p>
        )}
        {about.length > 400 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="about-toggle"
          >
            {expanded ? "Less" : "More"}
          </button>
        )}
      </section>
      {Array.isArray(candidate.experience) && (
        <section>
          <h3 className="font-semibold">Experience</h3>
          <ul className="list-disc list-inside">
            {candidate.experience.map((exp, i) => (
              <li key={i} className="flex flex-wrap gap-2 mb-6">
                <strong>{`${exp.title} `}</strong>
                at
                <span>{` ${exp.company} `}</span>
                <span>
                  {exp.employmentType ? ` (${exp.employmentType})` : ""}
                </span>
                {(() => {
                  const [range, duration] = (exp.date || "")
                    .split("·")
                    .map((s) => s.trim());
                  return (
                    <>
                      <div className="date-badges">
                        <span className="skill-badge"> {range} </span>
                        {duration && (
                          <span className="skill-badge"> {duration} </span>
                        )}
                      </div>
                    </>
                  );
                })()}
              </li>
            ))}
          </ul>
        </section>
      )}
      {Array.isArray(candidate.skills) && (
        <section>
          <h3 className="font-semibold">Skills</h3>
          {candidate.skills.length === 0 ? (
            <p className="not-found">Not Found</p>
          ) : (
            <ul className="list-disc list-inside skills-list">
              {candidate.skills.map((skill, i) => (
                <li key={i} title={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {Array.isArray(candidate.education) && (
        <section>
          <h3 className="font-semibold">Education</h3>

          {candidate.education.length === 0 ? (
            <p className="not-found">Not Found</p>
          ) : (
            <ul className="list-disc list-inside">
              {candidate.education.map((edu, i) => (
                <li key={i}>
                  {edu.degree ? (
                    <>
                      <strong>{edu.degree}</strong> at {edu.school || "N/A"}
                    </>
                  ) : (
                    edu.school || "N/A"
                  )}
                  <div className="date-badges">
                    {edu.dateRange && (
                      <span className="skill-badge text-sm text-gray-600">
                        {edu.dateRange}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section>
        <h3 className="font-semibold">Notes</h3>
        {candidate.notes !== "" ? (
          <p className="not-found">Not Found</p>
        ) : (
          <p>{candidate.notes}</p>
        )}
      </section>
      <p>
        <strong>Profile Link:</strong>{" "}
        {candidate.url ? (
          <a
            href={candidate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {candidate.url}
          </a>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
}
