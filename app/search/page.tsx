import Link from "next/link";
import { cookies } from "next/headers";
import { Breadcrumbs, ServiceRow } from "@/components/ui";
import { getCapability, isStateCode, searchServices, states, type StateCode } from "@/lib/capability";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; state?: string }> }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("raah_state")?.value;
  const selectedState: StateCode = isStateCode(params.state) ? params.state : isStateCode(stateCookie) ? stateCookie : "KA";
  const query = params.q ?? "";
  const results = searchServices(query);

  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Search" }]} />
      <p className="eyebrow">Keyword search · No AI required</p>
      <h1>{query ? `Results for "${query}"` : "Search services"}</h1>
      <p className="lead">Showing verdicts for {states[selectedState]}.</p>
      <div className="search-panel">
        <form action="/search">
          <label htmlFor="q">Search again</label>
          <input id="q" name="q" defaultValue={query} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="section-title">
        <h2>{results.length ? `${results.length} matching services` : "Browse all services"}</h2>
        <Link href="/services/a-z">A-Z index</Link>
      </div>
      <div className="section-panel">
        {results.map((service) => {
          const row = getCapability(service.id, selectedState);
          return row ? <ServiceRow key={service.id} service={service} row={row} state={selectedState} /> : null;
        })}
        {!results.length ? <p className="empty-search">We could not match that wording yet. Browse the directory or the A–Z index; this page never ends at zero results.</p> : null}
      </div>
    </>
  );
}
