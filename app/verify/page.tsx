import { Breadcrumbs } from "@/components/ui";

export default function VerifyPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Verify" }]} />
      <p className="eyebrow">Verifiable Notice</p>
      <h1>Is this notice real?</h1>
      <p className="lead">Phase 1 authenticity is deterministic: a reference must resolve inside the ledger or it is not from Raah.</p>
      <div className="search-panel">
        <form action="/verify" method="get">
          <label htmlFor="ref">Notice or challan reference</label>
          <input id="ref" name="ref" placeholder="Example: RAAH-NOTICE-0001" />
          <button type="submit">Verify</button>
        </form>
      </div>
    </>
  );
}
