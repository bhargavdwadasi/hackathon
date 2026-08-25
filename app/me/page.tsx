import { Breadcrumbs, SummaryPill } from "@/components/ui";

export default function MePage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "My Raah" }]} />
      <p className="eyebrow">Ledger</p>
      <h1>My Raah</h1>
      <p className="lead">The ledger will hold applications, payments, documents, notices and grievances in one timeline.</p>
      <section className="section-panel">
        <h2>Next slice</h2>
        <p>Build the mock backend entities and fee-last state machine, then connect J4/J5 address change to this ledger.</p>
        <div className="summary-row">
          <SummaryPill>Applications</SummaryPill>
          <SummaryPill>Payments</SummaryPill>
          <SummaryPill>Documents</SummaryPill>
          <SummaryPill>Notices</SummaryPill>
        </div>
      </section>
    </>
  );
}
