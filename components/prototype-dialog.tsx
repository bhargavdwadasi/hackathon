"use client";

import { useEffect, useState } from "react";

export function PrototypeDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(sessionStorage.getItem("raah-disclosure") !== "seen"), []);
  if (!open) return null;
  return <div className="dialog-backdrop" role="presentation"><section className="prototype-dialog" role="dialog" aria-modal="true" aria-labelledby="prototype-title">
    <p className="eyebrow">Before you begin</p><h2 id="prototype-title">This is a concept prototype.</h2>
    <p>Raah is independent and not a government service. Records, notices, fees, payments and rules are synthetic. Nothing submitted here has legal effect.</p>
    <button onClick={() => { sessionStorage.setItem("raah-disclosure", "seen"); setOpen(false); }}>I understand</button>
  </section></div>;
}
