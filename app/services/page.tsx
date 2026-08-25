import { cookies } from "next/headers";
import Link from "next/link";
import { Breadcrumbs, ServiceRow, SummaryPill, VerdictBadge } from "@/components/ui";
import { getCapability, isStateCode, money, services, states, type ServiceCategory, type StateCode } from "@/lib/capability";

const categories: ServiceCategory[] = ["Driving & licences", "Your vehicle", "Fines & compliance", "Records & problems"];

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ state?: string; online?: string; category?: string }> }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("raah_state")?.value;
  const selectedState: StateCode = isStateCode(params.state) ? params.state : isStateCode(stateCookie) ? stateCookie : "KA";
  const onlineOnly = params.online === "1";
  const selectedCategory = categories.includes(params.category as ServiceCategory) ? params.category as ServiceCategory : "All";
  const rows = services
    .map((service) => ({ service, row: getCapability(service.id, selectedState) }))
    .filter((item) => item.row)
    .filter((item) => selectedCategory === "All" || item.service.category === selectedCategory)
    .filter((item) => !onlineOnly || item.row?.verdict === "fully_online");
  const fullyOnlineCount = rows.filter((item) => item.row?.verdict === "fully_online").length;
  const visitCount = rows.filter((item) => item.row && item.row.visitCount && item.row.visitCount > 0).length;
  const stubCount = rows.filter((item) => item.row?.verdict === "prototype_stub").length;

  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Services" }]} />
      <section className="directory-hero">
        <div>
          <p className="eyebrow">Service directory</p>
          <h1>Every service, with the answer first.</h1>
          <p className="lead">
            Verdicts, fees, time and expected visits for {states[selectedState]}. Prototype stubs stay visible so the directory never becomes a dead end.
          </p>
        </div>
        <div className="directory-summary" aria-label="Directory summary">
          <SummaryPill>{rows.length} shown</SummaryPill>
          <SummaryPill>{fullyOnlineCount} fully online</SummaryPill>
          <SummaryPill>{visitCount} need a visit</SummaryPill>
          <SummaryPill>{stubCount} prototype stubs</SummaryPill>
        </div>
      </section>

      <section className="directory-toolbar" aria-label="Directory controls">
        <form action="/services" className="directory-form">
          <label>
            <span>State</span>
            <select name="state" defaultValue={selectedState}>
              {Object.entries(states).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Filter</span>
            <select name="online" defaultValue={onlineOnly ? "1" : "0"}>
              <option value="0">Show all services</option>
              <option value="1">Fully online only</option>
            </select>
          </label>
          {selectedCategory !== "All" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
          <button type="submit">Update</button>
        </form>
        <div className="category-strip" aria-label="Service categories">
          <Link className={selectedCategory === "All" ? "active" : ""} href={`/services?state=${selectedState}${onlineOnly ? "&online=1" : ""}`}>All</Link>
          {categories.map((category) => (
            <Link
              className={selectedCategory === category ? "active" : ""}
              href={`/services?state=${selectedState}${onlineOnly ? "&online=1" : ""}&category=${encodeURIComponent(category)}`}
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="directory-table" aria-label="Services">
        <div className="directory-head">
          <span>Service</span>
          <span>Verdict</span>
          <span>Fee</span>
          <span>Time</span>
        </div>
        {rows.map(({ service, row }) => row ? (
          <Link className="directory-row" href={`/check/${service.id}/${selectedState}`} key={service.id}>
            <span className="directory-service">
              <strong>{service.title}</strong>
              <small>{service.plainEntry}</small>
              <small>Official name: {service.officialName}</small>
            </span>
            <span><VerdictBadge row={row} /></span>
            <span className="directory-money">{money(row.feePaise)}</span>
            <span className="directory-time">{row.duration}<small>{row.visitCount ?? 0} visits</small></span>
          </Link>
        ) : null)}
      </section>

      {categories.map((category) => {
        const items = services
          .filter((service) => service.category === category)
          .map((service) => ({ service, row: getCapability(service.id, selectedState) }))
          .filter((item) => item.row && (!onlineOnly || item.row.verdict === "fully_online"));

        if (!items.length) return null;

        return (
          <section className="directory-category" key={category}>
            <div className="section-title">
              <h2>{category}</h2>
            </div>
            <div className="section-panel">
              {items.map(({ service, row }) => row ? <ServiceRow key={service.id} service={service} row={row} state={selectedState} /> : null)}
            </div>
          </section>
        );
      })}
    </>
  );
}
