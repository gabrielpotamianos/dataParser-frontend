import React, { useState, useEffect } from "react";
import { getCandidates } from "../api.js";
import CandidateDetail from "./CandidateDetail.js";
import CandidateCard from "./CandidateCard.js";
import "./MainPage.css"; // ← import component-scoped CSS
import FilterBar from "./FilterBar/FilterBar.js";
import * as Accordion from "@radix-ui/react-accordion";

// Main container
export default function MainPage({ token }) {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCandidates(token);
      setCandidates(data);
    }
    load();
  },[token]);

  const normalize = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtered = candidates.filter((c) => {
    const term = normalize(search);

    const allFields = [
      c.full_name,
      c.head_line,
      c.location,
      c.about,
      c.notes,
      ...(c.skills || []),
      ...(c.education || []).flatMap((edu) => [
        edu.degree,
        edu.school,
        edu.dateRange,
        edu.description,
      ]),
      ...(c.experience || []).flatMap((exp) => [
        exp.title,
        exp.company,
        exp.employmentType,
        exp.date,
      ]),
    ];

    return allFields
      .filter(Boolean)
      .map(normalize)
      .some((value) => value.includes(term));
  });

  return (
    <>
      <FilterBar value={search} onSearch={setSearch} />
      <Accordion.Root className="main-container" type="single" collapsible>
        <div className="cards-grid">
          {filtered.map((c) => (
            <Accordion.Item value={c.id} key={c.id}>
              <Accordion.Header>
                <Accordion.Trigger asChild>
                  <div className="card">
                    <CandidateCard key={c.id} candidate={c} />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <div className="card detail">
                  <CandidateDetail candidate={c} />
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </div>
      </Accordion.Root>
    </>
  );
}
