import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { AppShell, PrototypeStrip } from "@/components/ui";
import { PrototypeDialog } from "@/components/prototype-dialog";
import { isStateCode, type StateCode } from "@/lib/capability";

export const metadata: Metadata = {
  title: "Raah",
  description: "Independent prototype for road-transport citizen services."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("raah_state")?.value;
  const selectedState: StateCode = isStateCode(stateCookie) ? stateCookie : "KA";
  const language = cookieStore.get("raah_language")?.value === "hi" ? "hi" : "en";

  return (
    <html lang="en">
      <body>
        <PrototypeDialog />
        <PrototypeStrip />
        <AppShell selectedState={selectedState} language={language}>{children}</AppShell>
      </body>
    </html>
  );
}
