"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import { createApplication } from "@/lib/mock-data";
import { getCapability, getService, money, states, type StateCode } from "@/lib/capability";

export function JourneyFlow({ serviceId, state }: { serviceId: string; state: StateCode }) {
  if (serviceId === "hypothecation-removal") return <LoanRemovalFlow state={state} />;
  if (serviceId === "dl-address" || serviceId === "rc-address") return <AddressFlow state={state} />;
  if (serviceId === "challan") return <ChallanFlow state={state} />;
  if (serviceId === "vehicle-transfer") return <TransferFlow state={state} />;
  if (serviceId === "dl-renewal") return <RenewalFlow state={state} />;
  if (serviceId === "learners-licence") return <LearnerFlow state={state} />;
  if (serviceId === "record-correction" || serviceId === "payment-problem") return <ProblemFlow serviceId={serviceId} state={state} />;
  return <GenericJourneyFlow serviceId={serviceId} state={state} />;
}

function GenericJourneyFlow({ serviceId, state }: { serviceId: string; state: StateCode }) {
  const service = getService(serviceId)!;
  const row = getCapability(serviceId, state)!;
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [documents, setDocuments] = useState<Record<string, boolean>>({});
  const [payment, setPayment] = useState<"idle" | "processing" | "done">("idle");
  const [application, setApplication] = useState<ReturnType<typeof createApplication> | null>(null);
  const completeDocs = row.documents.every((item) => documents[item]);
  const review = () => { setApplication(createApplication(serviceId, state)); setStep(3); };
  const pay = () => { setPayment("processing"); window.setTimeout(() => setPayment("done"), 900); };
  const labels = ["Your details", "Pre-flight", "Review", "Finish"];

  if (step === 3 && application) return <section className="flow-card success-card"><CheckCircle2 size={34} /><p className="eyebrow">Application saved</p><h1>You are ready to continue.</h1><p>Your reference is <strong>{application.id}</strong>. {application.nextAction}</p>
    <div className="receipt"><span>Service</span><strong>{application.title}</strong><span>State</span><strong>{states[state]}</strong><span>Fee</span><strong>{application.fee}</strong></div>
    {row.feePaise && payment !== "done" ? <button onClick={pay} disabled={payment === "processing"}>{payment === "processing" ? "Processing simulator…" : `Pay ${money(row.feePaise)} (simulated)`}</button> : null}
    {payment === "done" ? <p className="good-note"><ShieldCheck size={18} /> Payment simulator complete. A synthetic receipt has been added to My Raah.</p> : null}
    <div className="summary-row"><Link className="button secondary" href="/me">Open My Raah</Link><Link className="button secondary" href={`/check/${serviceId}/${state}`}>Back to verdict</Link></div>
  </section>;

  return <section className="flow-card"><div className="flow-progress"><span>Step {step + 1} of 4</span><strong>{labels[step]}</strong><i style={{ width: `${(step + 1) * 25}%` }} /></div>
    {step === 0 && <><h2>A few details first</h2><p>These stay on this device in the prototype. You can edit them before anything is submitted.</p><label className="field"><span>Your name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label><label className="field"><span>Reference (optional)</span><input placeholder="Synthetic DL / RC reference" /></label><button onClick={() => setStep(1)} disabled={!name.trim()}>Continue</button></>}
    {step === 1 && <><h2>Check documents before payment</h2><p>Answer honestly. If something is missing, we tell you before you reach payment.</p><div className="checklist">{row.documents.map((document) => <label key={document}><input type="checkbox" checked={!!documents[document]} onChange={(e) => setDocuments({ ...documents, [document]: e.target.checked })} /><span><FileCheck2 size={18} />{document}</span></label>)}</div>
      {!completeDocs && <p className="warning-note">You still need to confirm every required document. Nothing has been charged.</p>}<div className="flow-actions"><button className="secondary-button" onClick={() => setStep(0)}>Back</button><button onClick={() => setStep(2)} disabled={!completeDocs}>Continue to review</button></div></>}
    {step === 2 && <><h2>Review before the final step</h2><p>For {name}, {service.title} in {states[state]}. Your documents are marked ready.</p><div className="receipt"><span>Outcome</span><strong>{row.visitCount ? `Online, then ${row.visitCount} visit` : "Fully online"}</strong><span>Fee, paid last</span><strong>{money(row.feePaise)}</strong><span>Expected time</span><strong>{row.duration}</strong></div><p className="machine-line">Generated from Raah’s synthetic rule corpus · deterministic prototype output · no legal effect</p><div className="flow-actions"><button className="secondary-button" onClick={() => setStep(1)}>Back</button><button onClick={review}>Save application</button></div></>}
  </section>;
}

function LoanRemovalFlow({ state }: { state: StateCode }) {
  const [screen, setScreen] = useState<"vehicle" | "upload" | "failed" | "passed" | "review" | "done">("vehicle");
  const [stamped, setStamped] = useState(false);
  const done = () => setScreen("done");
  if (screen === "done") return <Completion title="Loan removal application saved" state={state} reference="RAAH-APP-2051" fee="₹135.00" next="We will update the synthetic vehicle record in 3–7 days." />;
  return <JourneyFrame step={screen === "vehicle" ? 1 : screen === "upload" || screen === "failed" ? 2 : screen === "passed" ? 3 : 4} title={screen === "vehicle" ? "Which vehicle have you paid off?" : screen === "upload" ? "Upload the bank’s NOC and Form 35" : screen === "failed" ? "We found a problem before payment" : screen === "passed" ? "Your documents are ready" : "What will change on your vehicle record"}>
    {screen === "vehicle" && <><p>Pick the record with the loan you have finished paying.</p><button className="choice-row" onClick={() => setScreen("upload")}><span><strong>KA-01-XX-0000</strong><small>Hatchback · Synthetic registration</small></span><span>Choose →</span></button></>}
    {screen === "upload" && <><p>We check for the items that routinely cause a rejection: the right form, signature, bank stamp, authorised signatory and matching registration.</p><label className="upload-box"><input type="checkbox" checked={stamped} onChange={(e) => setStamped(e.target.checked)} /><span><FileCheck2 size={24} /><strong>Form 35 + bank NOC</strong><small>Demo: tick “bank stamp present” to simulate the corrected document.</small></span></label><div className="flow-actions"><button className="secondary-button" onClick={() => setScreen("vehicle")}>Back</button><button onClick={() => setScreen(stamped ? "passed" : "failed")}>Check documents</button></div></>}
    {screen === "failed" && <><div className="failure-box"><h3>No bank stamp detected</h3><p><strong>What happened:</strong> the Form 35 does not show a bank stamp in the authorisation block.</p><p><strong>What it means:</strong> this would likely be rejected after payment.</p><p><strong>What to do:</strong> ask the bank to stamp and sign Form 35, then upload it again.</p></div><button onClick={() => setScreen("upload")}>Upload corrected Form 35</button></>}
    {screen === "passed" && <><div className="pass-box"><CheckCircle2 size={24} /><div><strong>Passed before payment</strong><p>Form 35, NOC, signature, bank stamp and registration match are all present in this synthetic check.</p></div></div><button onClick={() => setScreen("review")}>Continue to review</button></>}
    {screen === "review" && <><p>The loan holder’s name will be removed from the vehicle record. Your physical RC may take a few days to match the online record.</p><div className="receipt"><span>Vehicle</span><strong>KA-01-XX-0000</strong><span>Fee, paid last</span><strong>₹135.00</strong><span>Expected time</span><strong>3–7 days</strong></div><button onClick={done}>Continue to payment</button></>}
  </JourneyFrame>;
}

function AddressFlow({ state }: { state: StateCode }) {
  const [screen, setScreen] = useState(0); const [dl, setDl] = useState(true); const [rc, setRc] = useState(true);
  if (screen === 3) return <Completion title="Address update saved" state={state} reference="RAAH-APP-2052" fee={dl && rc ? "₹550.00" : "₹230.00"} next="Each selected record is tracked separately in My Raah." />;
  return <JourneyFrame step={screen + 1} title={screen === 0 ? "Which records should we update?" : screen === 1 ? "Your new address" : "Combined verdict"}>
    {screen === 0 && <><p>One move, one set of answers. We will create a separate application for every selected record.</p><label className="record-choice"><input type="checkbox" checked={dl} onChange={e => setDl(e.target.checked)} /><span><strong>Driving licence</strong><small>KA-03 synthetic record · fully online</small></span></label><label className="record-choice"><input type="checkbox" checked={rc} onChange={e => setRc(e.target.checked)} /><span><strong>Vehicle KA-01-XX-0000</strong><small>Registration record · fully online</small></span></label><button disabled={!dl && !rc} onClick={() => setScreen(1)}>Continue</button></>}
    {screen === 1 && <><p>Tell us the new address once. We will use it on every selected record.</p><label className="field"><span>New address</span><input defaultValue="42, Demo Street" /></label><label className="field"><span>Pincode</span><input defaultValue="560001" inputMode="numeric" /></label><p className="good-note"><ShieldCheck size={18} /> Karnataka · Bengaluru Urban matched from pincode</p><div className="flow-actions"><button className="secondary-button" onClick={() => setScreen(0)}>Back</button><button onClick={() => setScreen(2)}>Check records</button></div></>}
    {screen === 2 && <><div className="pass-box"><CheckCircle2 size={24} /><div><strong>Both selected records can be updated online</strong><p>No visit required. Address proof is checked before the payment step.</p></div></div><div className="receipt"><span>Applications</span><strong>{Number(dl) + Number(rc)} tracked separately</strong><span>Total fee, paid last</span><strong>{dl && rc ? "₹550.00" : "₹230.00"}</strong></div><button onClick={() => setScreen(3)}>Continue to payment</button></>}
  </JourneyFrame>;
}

function ChallanFlow({ state }: { state: StateCode }) {
  const [screen, setScreen] = useState(0); const [reference, setReference] = useState("");
  if (screen === 2) return <Completion title="Challan payment recorded" state={state} reference="RAAH-PAY-0912" fee="₹500.00" next="A synthetic receipt is available in My Raah." />;
  return <JourneyFrame step={screen + 1} title={screen === 0 ? "Find a fine" : "Your fine, in plain language"}>
    {screen === 0 && <><p>Look up a fine without signing in. Use a synthetic vehicle or challan reference.</p><label className="field"><span>Vehicle or challan reference</span><input value={reference} onChange={e => setReference(e.target.value)} placeholder="Example: KA-01-XX-0000" /></label><button disabled={!reference} onClick={() => setScreen(1)}>Find fine</button><p className="machine-line">Use any example value in this prototype. No real identifiers are accepted.</p></>}
    {screen === 1 && <><div className="fine-card"><p className="eyebrow">1 unpaid challan · SYN-CH-0001</p><h3>Speed recorded above the posted limit</h3><p>Your synthetic vehicle was recorded at 68 km/h in a 50 km/h zone on Hosur Road, 3 August at 10:42.</p><strong>₹500.00 · due 2 September 2026</strong></div><div className="flow-actions"><button className="secondary-button" onClick={() => setScreen(0)}>Search again</button><button onClick={() => setScreen(2)}>Continue to payment</button></div><button className="link-button" onClick={() => alert("Synthetic dispute draft: I would like this challan reviewed.")}>Dispute this fine</button></>}
  </JourneyFrame>;
}

function TransferFlow({ state }: { state: StateCode }) {
  const [screen, setScreen] = useState(0); const [side, setSide] = useState<"seller" | "buyer" | null>(null);
  if (screen === 2) return <Completion title="Vehicle transfer started" state={state} reference="RAAH-APP-2053" fee="₹600.00" next="A verifiable hand-off notice has been created for the other person." />;
  return <JourneyFrame step={screen + 1} title={screen === 0 ? "Are you buying or selling?" : "Check dues before the transfer"}>
    {screen === 0 && <><p>The two sides have different responsibilities. Choose your side first.</p><button className={`choice-row ${side === "seller" ? "selected" : ""}`} onClick={() => setSide("seller")}><strong>I’m selling a vehicle</strong><span>→</span></button><button className={`choice-row ${side === "buyer" ? "selected" : ""}`} onClick={() => setSide("buyer")}><strong>I’m buying a vehicle</strong><span>→</span></button><button disabled={!side} onClick={() => setScreen(1)}>Continue</button></>}
    {screen === 1 && <><p>Before forms 29 and 30, Raah checks what needs clearing first.</p><div className="pass-box"><CheckCircle2 size={24} /><div><strong>No dues found in this synthetic record</strong><p>No challans, tax, loan or fitness block is preventing this transfer.</p></div></div><div className="receipt"><span>Your role</span><strong>{side === "seller" ? "Seller · Form 29" : "Buyer · Form 30"}</strong><span>Fee, paid last</span><strong>₹600.00</strong></div><button onClick={() => setScreen(2)}>Create hand-off and pay</button></>}
  </JourneyFrame>;
}

function RenewalFlow({ state }: { state: StateCode }) {
  const [screen, setScreen] = useState(0); const [age, setAge] = useState("43");
  if (screen === 3) return <Completion title="Renewal application saved" state={state} reference="RAAH-APP-2054" fee="₹416.00" next="Your renewal is now visible in My Raah." />;
  return <JourneyFrame step={screen + 1} title={screen === 0 ? "Confirm your details" : screen === 1 ? "Medical certificate needed" : "Review your renewal"}>
    {screen === 0 && <><p>We ask this first because people aged 40 or over need a Form 1A.</p><label className="field"><span>Your age</span><input value={age} onChange={e => setAge(e.target.value)} inputMode="numeric" /></label><button onClick={() => setScreen(Number(age) >= 40 ? 1 : 2)}>Continue</button></>}
    {screen === 1 && <><p>Because you are {age}, you need Form 1A from a registered medical practitioner before payment.</p><label className="upload-box"><input type="checkbox" /><span><FileCheck2 size={24} /><strong>Form 1A uploaded</strong><small>Demo document check · all identifiers are synthetic.</small></span></label><button onClick={() => setScreen(2)}>Check and continue</button></>}
    {screen === 2 && <><div className="pass-box"><CheckCircle2 size={24} /><div><strong>Ready to renew</strong><p>Your existing licence and Form 1A are ready for the simulated application.</p></div></div><div className="receipt"><span>Fee, paid last</span><strong>₹416.00</strong><span>Expected time</span><strong>2–4 days</strong></div><button onClick={() => setScreen(3)}>Pay ₹416.00 (simulated)</button></>}
  </JourneyFrame>;
}

function LearnerFlow({ state }: { state: StateCode }) { const [screen, setScreen] = useState(0); if (screen === 3) return <Completion title="Learner’s licence application saved" state={state} reference="RAAH-APP-2055" fee="₹350.00" next="Choose your test slot from My Raah." />; return <JourneyFrame step={screen + 1} title={screen === 0 ? "Verify your identity" : screen === 1 ? "Pick a learner’s test slot" : "Review your learner’s licence"}>{screen === 0 ? <><p>Use the authentication option that works for you. This is a simulator; no identity data leaves your device.</p><button className="choice-row" onClick={() => setScreen(1)}><strong>Continue with synthetic OTP</strong><span>→</span></button><button className="choice-row" onClick={() => setScreen(1)}><strong>I need in-person help</strong><span>→</span></button></> : screen === 1 ? <><p>Tests are held 10:00–12:30. Choose a synthetic appointment before payment.</p><button className="choice-row" onClick={() => setScreen(2)}><span><strong>Tuesday, 10:30</strong><small>Bengaluru East · 4 places available</small></span><span>Choose →</span></button></> : <><div className="receipt"><span>Test slot</span><strong>Tuesday, 10:30</strong><span>Fee, paid last</span><strong>₹350.00</strong></div><button onClick={() => setScreen(3)}>Pay ₹350.00 (simulated)</button></>}</JourneyFrame>; }

function ProblemFlow({ serviceId, state }: { serviceId: string; state: StateCode }) { const [screen, setScreen] = useState(0); const isPayment = serviceId === "payment-problem"; if (screen === 2) return <Completion title={isPayment ? "Payment check started" : "Correction request saved"} state={state} reference={isPayment ? "RAAH-PAY-0913" : "RAAH-APP-2056"} fee="₹0.00" next={isPayment ? "We will reconcile the synthetic payment within 30 minutes." : "We will review the evidence and keep you updated."} />; return <JourneyFrame step={screen + 1} title={isPayment ? "Find a payment that did not go through" : "What is wrong on your record?"}>{screen === 0 ? <><p>{isPayment ? "Enter the synthetic payment reference. We explain the state and recover it without another charge." : "Tell us which field needs fixing. You can attach evidence before sending the request."}</p><label className="field"><span>{isPayment ? "Payment reference" : "Field to correct"}</span><input placeholder={isPayment ? "RAAH-PAY-0908" : "Example: spelling of my name"} /></label><button onClick={() => setScreen(1)}>Continue</button></> : <><div className="pass-box"><CheckCircle2 size={24} /><div><strong>{isPayment ? "Payment found — reconciliation is safe" : "Your correction request is ready"}</strong><p>{isPayment ? "No second payment is needed. We will check the original attempt first." : "You can see the exact change before submitting."}</p></div></div><button onClick={() => setScreen(2)}>{isPayment ? "Start reconciliation" : "Save correction request"}</button></>}</JourneyFrame>; }

function JourneyFrame({ step, title, children }: { step: number; title: string; children: React.ReactNode }) { return <section className="flow-card"><div className="flow-progress"><span>Step {step} of 4 · details · check · review · fee</span><strong>{title}</strong><i style={{ width: `${step * 25}%` }} /></div><h2>{title}</h2>{children}</section>; }
function Completion({ title, state, reference, fee, next }: { title: string; state: StateCode; reference: string; fee: string; next: string }) {
  const [paid, setPaid] = useState(fee === "₹0.00");
  return <section className="flow-card success-card">
    {!paid ? <PaymentSimulator amount={fee} onPaid={() => setPaid(true)} /> : <><CheckCircle2 size={34} /><p className="eyebrow">Saved in the Ledger</p><h1>{title}</h1><p><strong>{reference}</strong> · {next}</p><div className="receipt"><span>State</span><strong>{states[state]}</strong><span>Payment receipt</span><strong>{fee}</strong></div><p className="machine-line">Synthetic state-machine result · no real payment or legal effect</p><Link className="button secondary" href="/me">Open My Raah</Link></>}
  </section>;
}

function PaymentSimulator({ amount, onPaid }: { amount: string; onPaid: () => void }) {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [processing, setProcessing] = useState(false);
  const pay = () => { setProcessing(true); window.setTimeout(onPaid, 800); };
  return <><p className="eyebrow">Fee, final step · payment simulator</p><h1>Choose how to pay</h1><p>No payment is sent anywhere. This checkout is a realistic prototype only.</p><div className="payment-methods">
    <button className={method === "upi" ? "selected" : ""} onClick={() => setMethod("upi")}><strong>UPI</strong><small>Use a UPI ID or scan a QR code</small></button>
    <button className={method === "card" ? "selected" : ""} onClick={() => setMethod("card")}><strong>Debit / credit card</strong><small>Visa, Mastercard, RuPay</small></button>
    <button className={method === "netbanking" ? "selected" : ""} onClick={() => setMethod("netbanking")}><strong>Netbanking</strong><small>Choose your bank</small></button>
  </div>
  {method === "upi" ? <label className="field"><span>UPI ID</span><input placeholder="name@bank" /></label> : method === "card" ? <div className="payment-fields"><label className="field"><span>Card number</span><input inputMode="numeric" placeholder="0000 0000 0000 0000" /></label><label className="field"><span>Expiry</span><input placeholder="MM / YY" /></label></div> : <label className="field"><span>Select bank</span><select defaultValue=""><option value="" disabled>Choose a bank</option><option>Mock State Bank</option><option>Mock HDFC Bank</option><option>Mock ICICI Bank</option></select></label>}
  <div className="receipt"><span>Paying for</span><strong>Road-transport service</strong><span>Total</span><strong>{amount}</strong></div><button onClick={pay} disabled={processing}>{processing ? "Processing simulated payment…" : `Pay ${amount}`}</button><p className="machine-line">No card, UPI or bank information is stored or transmitted.</p></>;
}
