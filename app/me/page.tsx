import Link from "next/link";
import { Breadcrumbs, SummaryPill } from "@/components/ui";
import { seededLedger } from "@/lib/mock-data";

export default function MePage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "My Raah" }]} />
      <p className="eyebrow">Ledger</p>
      <h1>My Raah</h1>
      <p className="lead">One chronological record of every synthetic application, payment and notice, with an explicit next action.</p>
      <section className="ledger-list" aria-label="Your ledger">
        {seededLedger.map((item) => <article className="ledger-item" key={item.id}><div><p className="eyebrow">{item.kind} · {item.id}</p><h2>{item.title}</h2><p>{item.updated} · {item.nextAction}</p></div><div><span className={`ledger-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>{item.amount !== undefined ? <strong>₹{(item.amount / 100).toFixed(2)}</strong> : null}</div></article>)}
      </section>
      <section className="section-panel"><h2>What you can do here</h2><div className="summary-row"><SummaryPill>Applications</SummaryPill><SummaryPill>Payments</SummaryPill><SummaryPill>Documents</SummaryPill><SummaryPill>Notices</SummaryPill></div><p><Link className="text-link" href="/verify?ref=RAAH-NOTICE-0001">Verify the seeded notice</Link></p></section>
    </>
  );
}
