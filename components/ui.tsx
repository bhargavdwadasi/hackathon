import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleHelp, Clock, FileCheck2, Home, Languages, ListChecks, Search, ShieldCheck, UserRound } from "lucide-react";
import { CapabilityRow, Service, StateCode, money, states, verdictLabel } from "@/lib/capability";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: ListChecks },
  { href: "/me", label: "My Raah", icon: UserRound },
  { href: "/verify", label: "Verify", icon: ShieldCheck },
  { href: "/about", label: "Help", icon: CircleHelp }
];

export function AppShell({ children, selectedState = "KA", language = "en" }: { children: React.ReactNode; selectedState?: StateCode; language?: string }) {
  return (
    <div className="shell">
      <aside className="rail" aria-label="Primary navigation">
        <Link className="brand" href="/">Raah</Link>
        <nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <item.icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="page">
        <header className="topbar">
          <Link className="mobile-brand" href="/">Raah</Link>
          <form action="/search" className="top-search">
            <Search size={17} aria-hidden="true" />
            <input name="q" placeholder="Search services" aria-label="Search services" />
            <button type="submit">Search</button>
          </form>
          <form action="/preferences" className="selectors" aria-label="Preferences">
            <label>
              <span className="sr-only">State</span>
              <select name="state" defaultValue={selectedState} aria-label="State">
                {Object.entries(states).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </label>
            <label className="language-select">
              <Languages size={16} aria-hidden="true" />
              <span className="sr-only">Language</span>
              <select name="language" defaultValue={language} aria-label="Language">
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </label>
            <button type="submit">Set</button>
          </form>
        </header>
        <main>{children}</main>
        <footer className="disclosure">Raah is an independent design prototype. Not a government service. All data shown is synthetic.</footer>
      </div>
      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <item.icon size={18} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PrototypeStrip() {
  return <div className="prototype-strip">Independent concept prototype · Mock data · No legal effect</div>;
}

export function VerdictBadge({ row }: { row: CapabilityRow }) {
  const icon = row.verdict === "fully_online" ? <CheckCircle2 size={15} /> : row.verdict === "prototype_stub" ? <FileCheck2 size={15} /> : <AlertTriangle size={15} />;
  return <span className={`verdict ${row.verdict}`}>{icon}{verdictLabel(row.verdict)}</span>;
}

export function ServiceRow({ service, row, state = "KA" }: { service: Service; row: CapabilityRow; state?: StateCode }) {
  return (
    <Link className="service-row" href={`/check/${service.id}/${state}`}>
      <span>
        <strong>{service.title}</strong>
        <small>The official name is {service.officialName}.</small>
      </span>
      <span className="service-meta">
        <VerdictBadge row={row} />
        <small>{money(row.feePaise)} · {row.duration} · {row.visitCount ?? 0} visits</small>
      </span>
    </Link>
  );
}

export function StatePicker({ selected = "KA", pathPrefix = "/services" }: { selected?: StateCode; pathPrefix?: string }) {
  return (
    <form action={pathPrefix} className="filter-row">
      <label>
        <span>State</span>
        <select name="state" defaultValue={selected}>
          {Object.entries(states).map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
        </span>
      ))}
    </nav>
  );
}

export function SummaryPill({ children }: { children: React.ReactNode }) {
  return <span className="summary-pill">{children}</span>;
}

export function ClockNote({ children }: { children: React.ReactNode }) {
  return <p className="clock-note"><Clock size={16} aria-hidden="true" />{children}</p>;
}
