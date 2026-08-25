import { Breadcrumbs } from "@/components/ui";
import { verifiedReference } from "@/lib/mock-data";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref = "" } = await searchParams;
  const match = ref ? verifiedReference(ref) : undefined;
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Verify" }]} />
      <p className="eyebrow">Verifiable Notice</p>
      <h1>Is this notice real?</h1>
      <p className="lead">Phase 1 authenticity is deterministic: a reference must resolve inside the ledger or it is not from Raah.</p>
      <div className="search-panel">
        <form action="/verify" method="get">
          <label htmlFor="ref">Notice or challan reference</label>
          <input id="ref" name="ref" defaultValue={ref} placeholder="Example: RAAH-NOTICE-0001" />
          <button type="submit">Verify</button>
        </form>
      </div>
      {ref ? <section className={`verification-result ${match ? "verified" : "unverified"}`}><h2>{match ? "This notice is from Raah" : "We could not verify this reference"}</h2><p>{match ? `${match.id} is a synthetic ${match.kind}. ${match.nextAction}` : "A genuine Raah reference resolves inside this prototype. Do not make a payment or share information based on an unverified message."}</p><p className="machine-line">Deterministic lookup against Raah&apos;s synthetic notice ledger · no legal effect</p></section> : null}
    </>
  );
}
