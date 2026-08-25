import Link from "next/link";
import { cookies } from "next/headers";
import { Breadcrumbs } from "@/components/ui";
import { isStateCode, services, type StateCode } from "@/lib/capability";

export default async function AZPage() {
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("raah_state")?.value;
  const selectedState: StateCode = isStateCode(stateCookie) ? stateCookie : "KA";
  const rows = services
    .flatMap((service) => [
      { term: service.officialName, service },
      ...service.aliases.map((alias) => ({ term: alias, service }))
    ])
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: "A-Z" }]} />
      <p className="eyebrow">Statutory aliases</p>
      <h1>A-Z index</h1>
      <p className="lead">The words on forms, SMS messages and clerk notes resolve to plain-language tasks.</p>
      <div className="section-panel">
        {rows.map(({ term, service }) => (
          <Link className="index-row" href={`/check/${service.id}/${selectedState}`} key={`${term}-${service.id}`}>
            <strong>{term}</strong>
            <small>{service.plainEntry} · {service.title}</small>
          </Link>
        ))}
      </div>
    </>
  );
}
