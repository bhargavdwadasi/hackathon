import { Breadcrumbs, SummaryPill } from "@/components/ui";

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <p className="eyebrow">Prototype posture</p>
      <h1>What this is</h1>
      <p className="lead">
        Raah is an independent concept prototype. It is not affiliated with, endorsed by, or connected to any government service.
      </p>
      <section className="section-panel">
        <h2>Mocked in this build</h2>
        <ul className="detail-list">
          <li>All records, identifiers, fees, durations, notices and payment states are synthetic.</li>
          <li>The Capability Matrix is hand-authored for prototype demonstration.</li>
          <li>AI is not enabled in Phase 1. The product remains usable without model calls.</li>
        </ul>
        <div className="summary-row">
          <SummaryPill>AI_ENABLED=false</SummaryPill>
          <SummaryPill>No real payments</SummaryPill>
          <SummaryPill>No legal effect</SummaryPill>
        </div>
      </section>
    </>
  );
}
