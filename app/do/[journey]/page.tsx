import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Breadcrumbs } from "@/components/ui";
import { JourneyFlow } from "@/components/journey-flow";
import { getService, isStateCode, type StateCode } from "@/lib/capability";

export default async function JourneyPage({ params, searchParams }: { params: Promise<{ journey: string }>; searchParams: Promise<{ state?: string }> }) {
  const { journey } = await params;
  const query = await searchParams;
  const cookiesStore = await cookies();
  const cookieState = cookiesStore.get("raah_state")?.value;
  const state: StateCode = isStateCode(query.state) ? query.state : isStateCode(cookieState) ? cookieState : "KA";
  const service = getService(journey);
  if (!service || !service.built) notFound();
  return <><Breadcrumbs items={[{ href: "/", label: "Home" }, { href: `/check/${journey}/${state}`, label: service.title }, { label: "Apply" }]} />
    <p className="eyebrow">Pre-flight · Fee last</p><h1>{service.plainEntry}</h1><p className="lead">We check what you need before you can reach the payment simulator.</p>
    <JourneyFlow serviceId={journey} state={state} /></>;
}
