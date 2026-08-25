import { Breadcrumbs } from "@/components/ui";
import { services, states } from "@/lib/capability";

export default function CheckPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Can I do this online?" }]} />
      <p className="eyebrow">J1 · Capability Matrix</p>
      <h1>Can I do this online?</h1>
      <p className="lead">Pick a task and state. The verdict is shown before payment, authentication, or document upload.</p>
      <div className="search-panel">
        <form action="/check/result" method="get">
          <label htmlFor="service">Task</label>
          <select id="service" name="service">
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.title}</option>
            ))}
          </select>
          <label htmlFor="state">State</label>
          <select id="state" name="state" defaultValue="KA">
            {Object.entries(states).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
          <button type="submit">Get verdict</button>
        </form>
      </div>
    </>
  );
}
