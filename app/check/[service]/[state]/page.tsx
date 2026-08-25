import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ClockNote, SummaryPill, VerdictBadge } from "@/components/ui";
import { getCapability, getService, isStateCode, money, states } from "@/lib/capability";

export default async function VerdictPage({ params }: { params: Promise<{ service: string; state: string }> }) {
  const { service: serviceId, state } = await params;
  if (!isStateCode(state)) notFound();
  const service = getService(serviceId);
  const row = getCapability(serviceId, state);
  if (!service || !row) notFound();

  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/check", label: "Check" }, { label: service.title }]} />
      <p className="eyebrow">Capability Matrix verdict</p>
      <h1>{service.plainEntry}</h1>
      <p className="lead">Answer for {states[state]} before login, upload, or payment.</p>

      <section className="verdict-panel">
        <VerdictBadge row={row} />
        <h2>{service.title}</h2>
        <p>{row.notes}</p>
        <div className="summary-row">
          <SummaryPill>{money(row.feePaise)}</SummaryPill>
          <SummaryPill>{row.duration}</SummaryPill>
          <SummaryPill>{row.visitCount ?? 0} visits</SummaryPill>
        </div>
        <ClockNote>Fee stays last. You will see the documents and every step before the payment simulator.</ClockNote>
      </section>

      <section>
        <div className="section-title">
          <h2>Prepare these before you start</h2>
        </div>
        <ul className="detail-list">
          {row.documents.map((document) => (
            <li key={document}>{document}</li>
          ))}
        </ul>
      </section>

      {service.built ? <section className="start-service-panel">
        <div><p className="eyebrow">Ready when you are</p><h2>Start {service.title.toLowerCase()}</h2><p>You will answer only the questions needed for this service. Documents are checked before payment.</p></div>
        <Link className="button" href={`/do/${service.id}?state=${state}`}>{service.id === "challan" ? "Find or dispute a fine" : "Start application"}</Link>
      </section> : null}

      <section className="section-panel">
        <h2>Why this answer</h2>
        <p>{row.statutoryBasis}</p>
        <p>The official name for this task is {service.officialName}.</p>
        <div className="summary-row">
          <Link className="button" href={`/services?state=${state}`}>Back to services</Link>
          <Link className="button secondary" href="/services/a-z">Open A-Z index</Link>
        </div>
      </section>
    </>
  );
}
