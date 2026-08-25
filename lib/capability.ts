export type StateCode =
  | "MH"
  | "DL"
  | "KA"
  | "TN"
  | "UP"
  | "GJ"
  | "WB"
  | "TS"
  | "KL"
  | "RJ"
  | "BR"
  | "AS";

export type Verdict = "fully_online" | "online_then_visit" | "must_visit" | "prototype_stub";

export type ServiceCategory = "Driving & licences" | "Your vehicle" | "Fines & compliance" | "Records & problems";

export type Service = {
  id: string;
  title: string;
  plainEntry: string;
  officialName: string;
  category: ServiceCategory;
  aliases: string[];
  built: boolean;
};

export type CapabilityRow = {
  serviceId: string;
  state: StateCode;
  verdict: Verdict;
  feePaise: number | null;
  duration: string;
  visitCount: number | null;
  documents: string[];
  statutoryBasis: string;
  notes: string;
};

export const states: Record<StateCode, string> = {
  MH: "Maharashtra",
  DL: "Delhi",
  KA: "Karnataka",
  TN: "Tamil Nadu",
  UP: "Uttar Pradesh",
  GJ: "Gujarat",
  WB: "West Bengal",
  TS: "Telangana",
  KL: "Kerala",
  RJ: "Rajasthan",
  BR: "Bihar",
  AS: "Assam"
};

export const services: Service[] = [
  {
    id: "challan",
    title: "Find, verify, pay or dispute a fine",
    plainEntry: "I got a fine",
    officialName: "Traffic challan",
    category: "Fines & compliance",
    aliases: ["fine", "challan", "chalan", "traffic ticket", "e-challan", "sms fine"],
    built: true
  },
  {
    id: "dl-renewal",
    title: "Renew a driving licence",
    plainEntry: "My licence is expiring",
    officialName: "Driving licence renewal",
    category: "Driving & licences",
    aliases: ["renew licence", "license renewal", "dl renewal", "licence expired", "form 1a"],
    built: true
  },
  {
    id: "learners-licence",
    title: "Apply for a learner's licence",
    plainEntry: "I want to start driving",
    officialName: "Learner's licence",
    category: "Driving & licences",
    aliases: ["learning licence", "ll", "learner license", "driving test"],
    built: true
  },
  {
    id: "dl-address",
    title: "Change address on a driving licence",
    plainEntry: "I've moved house",
    officialName: "Change of address in driving licence",
    category: "Driving & licences",
    aliases: ["address change", "moved house", "dl address", "new address"],
    built: true
  },
  {
    id: "rc-address",
    title: "Change address on a vehicle record",
    plainEntry: "I've moved house",
    officialName: "Change of address in certificate of registration",
    category: "Your vehicle",
    aliases: ["rc address", "registration address", "vehicle address", "moved vehicle"],
    built: true
  },
  {
    id: "hypothecation-removal",
    title: "Remove a loan from a vehicle record",
    plainEntry: "I've paid off my vehicle loan",
    officialName: "Termination of hypothecation",
    category: "Your vehicle",
    aliases: ["hypothecation", "loan removal", "bank name", "loan khatam", "form 35", "noc"],
    built: true
  },
  {
    id: "vehicle-transfer",
    title: "Transfer vehicle ownership",
    plainEntry: "I'm buying or selling a vehicle",
    officialName: "Transfer of ownership",
    category: "Your vehicle",
    aliases: ["sell vehicle", "buy vehicle", "form 29", "form 30", "ownership transfer"],
    built: true
  },
  {
    id: "record-correction",
    title: "Correct something on a record",
    plainEntry: "Something on my record is wrong",
    officialName: "Record correction",
    category: "Records & problems",
    aliases: ["wrong record", "name spelling", "date of birth wrong", "correction"],
    built: true
  },
  {
    id: "fitness",
    title: "Fitness certificate",
    plainEntry: "My vehicle needs a fitness certificate",
    officialName: "Certificate of fitness",
    category: "Your vehicle",
    aliases: ["fitness", "cf", "commercial vehicle fitness"],
    built: false
  },
  {
    id: "scrapping",
    title: "Scrap a vehicle",
    plainEntry: "I want to scrap my vehicle",
    officialName: "Vehicle scrapping",
    category: "Your vehicle",
    aliases: ["scrapping", "deregister vehicle", "scrap certificate"],
    built: false
  },
  {
    id: "pucc",
    title: "Pollution certificate",
    plainEntry: "I need a pollution certificate",
    officialName: "PUC certificate",
    category: "Fines & compliance",
    aliases: ["pucc", "puc", "pollution"],
    built: false
  },
  {
    id: "payment-problem",
    title: "Fix a payment that did not go through",
    plainEntry: "A payment did not go through",
    officialName: "Payment reconciliation",
    category: "Records & problems",
    aliases: ["payment pending", "money debited", "receipt missing", "refund"],
    built: true
  }
];

const stateProfiles: Record<StateCode, { visitBias: number; name: string }> = {
  MH: { visitBias: 1, name: "Maharashtra" },
  DL: { visitBias: 0, name: "Delhi" },
  KA: { visitBias: 0, name: "Karnataka" },
  TN: { visitBias: 0, name: "Tamil Nadu" },
  UP: { visitBias: 1, name: "Uttar Pradesh" },
  GJ: { visitBias: 0, name: "Gujarat" },
  WB: { visitBias: 1, name: "West Bengal" },
  TS: { visitBias: 0, name: "Telangana" },
  KL: { visitBias: 0, name: "Kerala" },
  RJ: { visitBias: 1, name: "Rajasthan" },
  BR: { visitBias: 2, name: "Bihar" },
  AS: { visitBias: 1, name: "Assam" }
};

const baseByService: Record<string, Omit<CapabilityRow, "state" | "statutoryBasis" | "notes">> = {
  challan: {
    serviceId: "challan",
    verdict: "fully_online",
    feePaise: null,
    duration: "Immediate",
    visitCount: 0,
    documents: ["Vehicle number or challan reference"]
  },
  "dl-renewal": {
    serviceId: "dl-renewal",
    verdict: "fully_online",
    feePaise: 41600,
    duration: "2-4 days",
    visitCount: 0,
    documents: ["Existing driving licence", "Address proof", "Form 1A if age is 40 or above"]
  },
  "learners-licence": {
    serviceId: "learners-licence",
    verdict: "online_then_visit",
    feePaise: 35000,
    duration: "7-12 days",
    visitCount: 1,
    documents: ["Age proof", "Address proof", "Photo", "Signature"]
  },
  "dl-address": {
    serviceId: "dl-address",
    verdict: "fully_online",
    feePaise: 23000,
    duration: "2-4 days",
    visitCount: 0,
    documents: ["Existing driving licence", "New address proof"]
  },
  "rc-address": {
    serviceId: "rc-address",
    verdict: "online_then_visit",
    feePaise: 32000,
    duration: "5-9 days",
    visitCount: 1,
    documents: ["Registration certificate", "New address proof", "Insurance"]
  },
  "hypothecation-removal": {
    serviceId: "hypothecation-removal",
    verdict: "fully_online",
    feePaise: 13500,
    duration: "3-7 days",
    visitCount: 0,
    documents: ["Form 35 signed and stamped", "Bank loan-closure letter", "Registration certificate"]
  },
  "vehicle-transfer": {
    serviceId: "vehicle-transfer",
    verdict: "online_then_visit",
    feePaise: 60000,
    duration: "10-15 days",
    visitCount: 1,
    documents: ["Forms 29 and 30", "Registration certificate", "Insurance", "Address proof of buyer"]
  },
  "record-correction": {
    serviceId: "record-correction",
    verdict: "fully_online",
    feePaise: 0,
    duration: "7-20 days",
    visitCount: 0,
    documents: ["Proof for the corrected field"]
  },
  fitness: {
    serviceId: "fitness",
    verdict: "prototype_stub",
    feePaise: null,
    duration: "Not built in this prototype",
    visitCount: null,
    documents: ["Vehicle inspection documents"]
  },
  scrapping: {
    serviceId: "scrapping",
    verdict: "prototype_stub",
    feePaise: null,
    duration: "Not built in this prototype",
    visitCount: null,
    documents: ["Owner identity proof", "Vehicle documents"]
  },
  pucc: {
    serviceId: "pucc",
    verdict: "prototype_stub",
    feePaise: null,
    duration: "Not built in this prototype",
    visitCount: null,
    documents: ["Vehicle number"]
  },
  "payment-problem": {
    serviceId: "payment-problem",
    verdict: "fully_online",
    feePaise: 0,
    duration: "About 30 seconds",
    visitCount: 0,
    documents: ["Payment reference or application ID"]
  }
};

export const capabilityRows: CapabilityRow[] = services.flatMap((service) =>
  (Object.keys(states) as StateCode[]).map((state) => {
    const base = baseByService[service.id];
    const bias = stateProfiles[state].visitBias;
    let verdict = base.verdict;
    let visitCount = base.visitCount;

    if (service.built && bias > 0 && base.verdict === "fully_online" && ["rc-address", "hypothecation-removal"].includes(service.id)) {
      verdict = "online_then_visit";
      visitCount = 1;
    }

    if (service.built && bias > 1 && ["learners-licence", "vehicle-transfer"].includes(service.id)) {
      verdict = "must_visit";
      visitCount = 1;
    }

    return {
      ...base,
      verdict,
      visitCount,
      state,
      statutoryBasis: `Synthetic ${stateProfiles[state].name} transport rule corpus, modelled on published guidance for ${service.officialName}.`,
      notes: "Synthetic data for prototype use only. This verdict has no legal effect."
    };
  })
);

export function getService(id: string) {
  return services.find((service) => service.id === id);
}

export function getCapability(serviceId: string, state: StateCode = "KA") {
  return capabilityRows.find((row) => row.serviceId === serviceId && row.state === state);
}

export function isStateCode(value: string | null | undefined): value is StateCode {
  return !!value && Object.prototype.hasOwnProperty.call(states, value);
}

export function money(paise: number | null) {
  if (paise === null) return "Depends on fine";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100);
}

export function verdictLabel(verdict: Verdict) {
  return {
    fully_online: "Fully online",
    online_then_visit: "Online, then one visit",
    must_visit: "You must visit",
    prototype_stub: "Not built in this prototype"
  }[verdict];
}

export function searchServices(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return services;

  return services.filter((service) => {
    const haystack = [service.title, service.plainEntry, service.officialName, ...service.aliases].join(" ").toLowerCase();
    return normalized.split(/\s+/).every((term) => haystack.includes(term));
  });
}
