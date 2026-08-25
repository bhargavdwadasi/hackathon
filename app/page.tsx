import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Gauge, MapPinned, ScanLine, ShieldCheck } from "lucide-react";
import { getCapability, isStateCode, services, states, type StateCode } from "@/lib/capability";
import { ServiceRow, SummaryPill } from "@/components/ui";

const lifeEvents = [
  "I got a fine",
  "My licence is expiring",
  "I want to start driving",
  "I've moved house",
  "I've paid off my vehicle loan",
  "I'm buying or selling a vehicle",
  "Something on my record is wrong",
  "Something else"
];

export default async function Home({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("raah_state")?.value;
  const selectedState: StateCode = isStateCode(params.state) ? params.state : isStateCode(stateCookie) ? stateCookie : "KA";
  const primaryServices = services.filter((service) => service.built).slice(0, 8);

  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Capability Matrix · Ledger · Pre-flight · Verifiable Notice</p>
          <h1>Tell me the truth before I pay.</h1>
          <p className="lead">
            Raah is a browser prototype for road-transport services. It starts with the answer people need first:
            whether a task can be completed online, what it costs, how long it takes, and what documents are required.
          </p>
          <div className="summary-row">
            <SummaryPill>AI_ENABLED=false ready</SummaryPill>
            <SummaryPill>JS-friendly forms</SummaryPill>
            <SummaryPill>Synthetic rule corpus</SummaryPill>
          </div>
        </div>
        <div className="command-card">
          <div className="command-card-header">
            <span>Answer console</span>
            <strong>{states[selectedState]}</strong>
          </div>
          <form action="/search" className="command-search">
            <ScanLine size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="q">What do you need to do?</label>
            <input id="q" name="q" placeholder="Form 35, challan, address change" />
            <button type="submit">Search</button>
          </form>
          <div className="signal-grid" aria-label="Prototype guarantees">
            <span><Gauge size={16} /> Fee last</span>
            <span><MapPinned size={16} /> State-aware</span>
            <span><ShieldCheck size={16} /> Synthetic only</span>
          </div>
          <Link className="console-link" href={`/check/hypothecation-removal/${selectedState}`}>
            Try the Form 35 loan-removal verdict <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Start with a life event</h2>
          <Link href="/services">All services</Link>
        </div>
        <div className="life-grid">
          {lifeEvents.map((event) => {
            const service = services.find((item) => item.plainEntry === event) ?? services.find((item) => item.id === "record-correction");
            return (
              <Link className="life-card" href={service ? `/check/${service.id}/${selectedState}` : `/services?state=${selectedState}`} key={event}>
                <strong>{event}</strong>
                <small>{service ? service.title : "Browse all services and statutory aliases."}</small>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>{states[selectedState]} quick answers</h2>
          <Link href={`/services?state=${selectedState}`}>Browse directory</Link>
        </div>
        <div className="section-panel">
          {primaryServices.map((service) => {
            const row = getCapability(service.id, selectedState);
            return row ? <ServiceRow key={service.id} service={service} row={row} state={selectedState} /> : null;
          })}
        </div>
      </section>
    </>
  );
}
