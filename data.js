const GATE_LINK = "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf";

// ─── Gates (intercalated between phases in the lifecycle view) ────────────────
const gates = [
  { id: "gate1", afterPhase: "opportunity", title: "Go / No Go Gate",        symbol: "🚦",    badge: "Internal",    link: GATE_LINK },
  { id: "gate2", afterPhase: "offer",       title: "Permission to Submit",    symbol: "📋",    badge: "Internal",    link: GATE_LINK },
  { id: "gate3", afterPhase: "contracting", title: "Contract Review",         symbol: "🤝",    badge: "Internal",    link: GATE_LINK },
  { id: "gate4", afterPhase: "handover",    title: "Handover Meeting",        symbol: "ℹ️",     badge: "Internal",    link: GATE_LINK, stream: "transition" },
  { id: "gate5", afterPhase: "initialisation", title: "Kick Off Meetings",   symbol: "🚀", badge: "Internal",    link: GATE_LINK, stream: "real" },
  { id: "gate6", afterPhase: "initialisation", title: "Kick Off Meetings",   symbol: "🚀", badge: "With Client",    link: GATE_LINK, stream: "real", repeat: "1", border: "1" },
  { id: "gate7", afterPhase: "execution",   title: "Project Reviews",         symbol: "📊",   badge: "Internal", link: GATE_LINK, stream: "real" },
  { id: "gate8", afterPhase: "execution", title: "Project Reviews",   symbol: "📊", badge: "With Client",    link: GATE_LINK, stream: "real", repeat: "1"  },
  { id: "gate9", afterPhase: "execution", title: "Steering Comitees",   symbol: "🧭", badge: "With Client",    link: GATE_LINK, stream: "real", border: "1" },
  { id: "gate10", afterPhase: "closure",     title: "Closure Meetings",        symbol: "✅",   badge: "Internal", link: GATE_LINK, stream: "real" },
  { id: "gate11", afterPhase: "closure",     title: "Closure Meetings",        symbol: "✅",   badge: "With Client", link: GATE_LINK, stream: "real", repeat: "1", border: "1"  },
];



const meetings = [
  { label: "Internal Kick Off meeting", type: "internal", link: GATE_LINK },
  { label: "Client Kick Off meeting",   type: "client",   link: GATE_LINK },
  { label: "Internal Project Review",   type: "internal", link: GATE_LINK },
  { label: "Client Project Review",     type: "client",   link: GATE_LINK },
  { label: "Internal Closure Meeting",  type: "internal", link: GATE_LINK },
  { label: "Client Closure Meeting",    type: "client",   link: GATE_LINK },
];

const levels = ["L1", "L2", "L3"];

// ── Home Procedures ────────────────────────────────────────────────────────────
const Home_procedures = [
  { name: "Procedure Financial Mgt",           link: GATE_LINK },
  { name: "Procedure Scope Mgt",               link: GATE_LINK },
  { name: "Procedure Legal & Compliance Mgt",  link: GATE_LINK },
  { name: "Procedure Risks & Opportunities Mgt",         link: GATE_LINK },
  { name: "Procedure Quality & Continuous Improvement Mgt",             link: GATE_LINK, keyDoc: { label: "PMQP", link: GATE_LINK } },
  { name: "Procedure HSE Mgt",                 link: GATE_LINK, keyDoc: { label: "HSE Plan", link: GATE_LINK } },
  { name: "Procedure Nuclear Safety Mgt",      link: GATE_LINK, keyDoc: { label: "NS Plan", link: GATE_LINK } },
  { name: "Procedure Information Security Mgt",link: GATE_LINK, keyDoc: { label: "IS Plan", link: GATE_LINK } },
  { name: "Procedure Communication & Stakeholders Mgt",link: GATE_LINK },
  { name: "Procedure Schedule Mgt",link: GATE_LINK },
  { name: "Procedure Project Integration Mgt",link: GATE_LINK },
  { name: "Procedure Resources Mgt",link: GATE_LINK },
];

const Home_procedures2 = [
  { name: "Procedure Subcontractors Suppliers Mgt", link: GATE_LINK },
  { name: "Procedure Partners Mgt",            link: GATE_LINK },
  { name: "Procedure Worksharing Mgt",         link: GATE_LINK },
];

const SE_procedures = [
  { name: "Procedure Corporate Governance",        link: GATE_LINK, keyDoc: [{ label: "Business Review (.ppt)", link: GATE_LINK }, {label: "Delegation of Authority Matrix", link: GATE_LINK} ] },
  { name: "Procedure Group Risks Management",      link: GATE_LINK, keyDoc: [{ label: "Group Risks & Opportunities Register", link: GATE_LINK }] },
];

const SE_procedures2 = [
  { name: "Politics - Crisis Management", link: GATE_LINK },

];

const PS_procedures = [
  { name: "Procedure Human Resources Administration​", link: GATE_LINK },
  { name: "Procedure Learning & Developement Management​", link: GATE_LINK },
  { name: "Procedure Talent Management​​", link: GATE_LINK },
];

const BMO_procedures = [
  { name: "Procedure Operational Management​", link: GATE_LINK },
  { name: "Procedure Procurement to Pay Management​​", link: GATE_LINK },
  { name: "Procedure Excellence in Operations​", link: GATE_LINK },
];

// ─── Procedures ───────────────────────────────────────────────────────────────

const Procedure_link = [
{procedure: "Financial Perf.", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Scope", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Legal & Compliance", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Resources", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Risks & Opport.", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Quality", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Health & Safety", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Nuclear Safety", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Info Security", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Sub-contractors", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
{procedure: "Partners", link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" }
];

// ─── Categories ───────────────────────────────────────────────────────────────

const categories = [
  { id: "strategy",     code: "STR", icon: "Assets/strategy.jpg",            name: "Define positioning & winning strategy",           procedure: null,                     link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "profitability",code: "FIN", icon: "Assets/profitability.png",       name: "Optimise profitability",                          procedure: "Financial Perf.",        link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "scope",        code: "SCP", icon: "Assets/scope.png",               name: "Control project scope",                           procedure: "Scope",                  link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "contract",     code: "LEG", icon: "Assets/contract.jpg",            name: "Manage contractual & regulatory compliance",      procedure: "Legal & Compliance",     link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "integration",  code: "INT", icon: "Assets/integration.png",         name: "Align project delivery model",                    procedure: null,                     link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "resource",     code: "RES", icon: "Assets/resource.png",            name: "Manage resource",                                 procedure: "Resources" ,             link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "schedule",     code: "SCH", icon: "Assets/schedule.png",            name: "Control schedule",                                procedure: null,                     link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "stakeholders", code: "STK", icon: "Assets/stakeholders.jpg",        name: "Engage & manage stakeholders",                    procedure: null,                     link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "risks",        code: "RSK", icon: "Assets/risks.jpg",               name: "Prevent risks & seize opportunities",             procedure: "Risks & Opport." ,       link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "quality",      code: "QLT", icon: "Assets/quality.png",             name: "Ensure quality & continuous improvement",         procedure: "Quality",                link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "innovation",   code: "INV", icon: "Assets/innovation.png",          name: "Leverage innovation",                             procedure: null ,                    link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "safety",       code: "HSE", icon: "Assets/safety.png",              name: "Ensure health & safety",                          procedure: "Health & Safety",        link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "nuclear",      code: "NUC", icon: "Assets/nuclear.png",             name: "Ensure nuclear safety",                           procedure: "Nuclear Safety",         link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "security",     code: "SEC", icon: "Assets/security.png",            name: "Ensure information security / data protection",   procedure: "Info Security",          link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf" },
  { id: "suppliers",    code: "SUB", icon: "Assets/suppliers.png",           name: "Manage sub-contractors suppliers",                procedure: "Sub-contractors" ,       link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"},
  { id: "partners",     code: "PRT", icon: "Assets/partners.png",            name: "Manage partnerships",                             procedure: "Partners" ,              link : "Assets/Promo2029ConventionStage_MahéJEANNEAU (2).pdf"}
];

// ─── Phases ───────────────────────────────────────────────────────────────────

const phases = [
  {
    id: "opportunity",
    stream: "bid",
    title: "Opportunity",
    kicker: "Management",
    note: "Define positioning and maximize chances of winning",
    color: "bid",
    data: {
      strategy:      ["Identify client challenges", "Assess strategic value", "Evaluate win probability and differentiators", "Analyse competitors and positioning"],
      profitability:  ["Estimate contract value"],
      scope:         ["Identify main client needs", "Identify key project issue"],
      contract:      ["Identify main legal considerations"],
      integration:   [],
      resource:      ["Identify possible required skills", "Assess resource availability and gap"],
      schedule:      ["Estimate key milestones"],
      stakeholders:  ["Identify stakeholders and understand expectations", "Assess influence and priorities"],
      risks:         ["Identify major risks and opportunities"],
      quality:       ["Identify similar previous projects, main relevant lessons learned"],
      innovation:    ["Identify potential innovations"],
      safety:        ["Assess H&S Tag"],
      nuclear:       ["Assess nuclear safety Tag"],
      security:      ["Assess Information security tag", "Identify complex or costly requirements"],
      suppliers:     ["Think about make-or-buy strategy", "Identify potential subcontractors"],
      partners:      ["Think about partnering strategy", "Identify potential partners"]
    }
  },
  {
    id: "gate1",
    stream: "gate",
    gateOnly: true,
    title: "No Go / Go",
    kicker: "Gate",
    symbol: "GO",
    badge: "Internal",
    gateLink: GATE_LINK,
    data: {}
  },
  // gate2 inserted after offer phase in renderPhaseTracks
  // gate3 inserted after contracting phase in renderPhaseTracks
  // gate4 inserted after handover phase in renderPhaseTracks
  // gate5/6/7 inserted between real phases in renderPhaseTracks
  {
    id: "offer",
    stream: "bid",
    title: "Offer",
    kicker: "Design",
    note: "Build a compliant and profitable offer",
    color: "bid",
    data: {
      strategy:      ["Assess strengths and differentiation", "Identify weaknesses"],
      profitability:  ["Estimate detailed costs", "Define pricing and target margin", "Assess profitability"],
      scope:         ["Define scope and exclusions aligned with client requirements", "Structure into work packages"],
      contract:      ["Perform legal and compliance analysis", "Identify risks and constraints", "Define insurances and guarantees"],
      integration:   ["Define delivery model and responsibilities", "Define project organisation", "Identify key tools and systems", "Initiate project management plan"],
      resource:      ["Define required skills and resources", "Develop staffing plan", "Identify people for key roles"],
      schedule:      ["Define preliminary schedule and milestones", "Estimate workload"],
      stakeholders:  ["Analyse client decision-making process", "Refine stakeholder mapping", "Define influencing strategy"],
      risks:         ["Perform detailed risk assessment", "Define mitigation actions", "Assess impacts on cost and schedule"],
      quality:       ["Integrate lessons learned", "Clarify acceptance criteria", "Define quality and verification approach"],
      innovation:    ["Identify and integrate relevant innovations"],
      safety:        ["Confirm H&S classification (tag)", "Identify H&S risks and mitigation measures", "Assess regulatory context"],
      nuclear:       ["Confirm nuclear safety classification (tag)", "Define safety requirements and approach", "Identify ITNS activities"],
      security:      ["Confirm Information security classification (Tag)", "Define security requirements", "Identify required measures and related costs"],
      suppliers:     ["Define make-or-buy strategy", "Define subcontracting scope", "Select and assess subcontractors", "Secure quotations"],
      partners:      ["Define partnership strategy", "Select and assess partners", "Define roles and responsibilities", "Formalize partnership agreement"]
    }
  },
  {
    id: "contracting",
    stream: "bid",
    title: "Contracting",
    kicker: "",
    note: "Secure contractual, financial and operational commitments",
    color: "bid",
    data: {
      strategy:      [],
      profitability:  ["Negotiate financial terms and pricing"],
      scope:         ["Confirm scope baseline", "Validate deliverables and boundaries", "Identify open points and sensitivities"],
      contract:      ["Negotiate contractual terms and clauses", "Identify compliance risks and constraints"],
      integration:   [],
      resource:      [],
      schedule:      ["Validate milestones and delivery schedule", "Align deadlines with client expectations"],
      stakeholders:  ["Support negotiations with key stakeholders", "Align stakeholders on project objectives"],
      risks:         ["Update risk assessment if required"],
      quality:       ["Confirm quality requirements and acceptance criteria with client"],
      innovation:    ["Clarify innovation intellectual property ownership with client"],
      safety:        ["Confirm H&S requirements and responsibilities with client"],
      nuclear:       ["Confirm nuclear safety requirements with client"],
      security:      ["Confirm Information Security requirements with client", "Validate solutions with client"],
      suppliers:     ["Flow down contractual requirements to suppliers", "Validate subcontracting assumptions", "Confirm supplier engagement"],
      partners:      ["Confirm partner involvement and roles", "Align partners in negotiations"]
    }
  },
  {
    id: "handover",
    stream: "bid",
    title: "Handover",
    kicker: "Realisation",
    note: "Ensure a reliable and complete transfer to delivery",
    color: "bid",
    data: {
      strategy:      ["Transfer strategic intent", "Transfer Assystem and client key success factors"],
      profitability:  ["Transfer budget and financial assumptions"],
      scope:         ["Transfer scope baseline with assumptions"],
      contract:      ["Transfer offer and contract"],
      integration:   ["Transfer delivery model and organisation"],
      resource:      ["Assign Project Manager", "Sign project contract form", "Transfer staffing assumptions"],
      schedule:      ["Transfer project schedule"],
      stakeholders:  ["Transfer stakeholder mapping and key contacts"],
      risks:         ["Transfer risk & opportunity register"],
      quality:       ["Transfer quality requirements"],
      innovation:    ["Transfer innovation intents"],
      safety:        ["Transfer H&S requirements and risks"],
      nuclear:       ["Transfer nuclear safety requirements", "Transfer ITNS activities list"],
      security:      ["Transfer security requirements and negotiated solutions"],
      suppliers:     ["Transfer supplier information and quotations"],
      partners:      ["Transfer partner strategy and agreements"]
    }
  },
  {
    id: "initialisation",
    stream: "real",
    title: "Initialisation",
    kicker: "",
    note: "Set solid foundations for successful delivery",
    color: "real",
    data: {
      strategy:      ["Define project success criteria"],
      profitability:  ["Define project financial baseline"],
      scope:         ["Break down scope into work packages", "Define scope control approach"],
      contract:      ["Integrate legal and regulatory requirements", "Define compliance actions", "Ensure required insurances"],
      integration:   ["Define delivery model and interfaces, project organisation", "Set governance bodies", "Deploy tools and systems", "Draft project management plan"],
      resource:      ["Get required certifications", "Mobilize and onboard resources", "Assign roles and responsibilities"],
      schedule:      ["Develop detailed project schedule", "Define milestones and sequencing"],
      stakeholders:  ["Define communication plan", "Establish governance interfaces"],
      risks:         ["Update risk assessment and mitigation plan", "Define risk provisions"],
      quality:       ["Draft project quality plan", "Confirm acceptance criteria", "Set control processes", "Leverage lessons learned"],
      innovation:    ["Initiate innovation activities"],
      safety:        ["Confirm HSE risks", "Define HSE measures, draft mitigation plan", "Ensure personnel protection PPE"],
      nuclear:       ["Confirm ITNS activities, perform nuclear risk analysis", "Define nuclear safety plan and controls", "Ensure personnel qualification"],
      security:      ["Define information security plan", "Set data management rules and controls"],
      suppliers:     ["Confirm subcontracting scope", "Select and contract subcontractors", "Launch procurement and kick-off suppliers"],
      partners:      ["Formalise partnership agreements", "Launch partner coordination"]
    }
  },
  {
    id: "execution",
    stream: "real",
    title: "Execution",
    kicker: "",
    note: "Deliver project commitments and control performance",
    color: "real",
    data: {
      strategy:      ["Monitor project strategic alignment", "Develop new business opportunities"],
      profitability:  ["Monitor costs and financial performance", "Evaluate earned value and forecasts", "Manage invoicing and cash collection"],
      scope:         ["Implement control scope strategy", "Detect & Manage scope changes and impacts", "Update scope baseline when required"],
      contract:      ["Ensure regulatory compliance", "Manage claims and contractual changes"],
      integration:   ["Ensure technical coordination", "Adapt project organisation and governance to situations", "Conduct project reviews and meetings"],
      resource:      ["Manage resource and competencies", "Mobilize and demobilize resources", "Ensure training and certifications"],
      schedule:      ["Produce OTD KPIs", "Update planning and forecasts", "Manage delays and corrective actions", "Track milestone achievement"],
      stakeholders:  ["Manage stakeholders communication", "Maintain regular exchanges", "Handle escalations when needed"],
      risks:         ["Monitor risks and opportunities", "Update risk register", "Implement mitigation actions"],
      quality:       ["Produce OQD KPI", "Ensure deliverable compliance", "Manage non-conformities", "Implement corrective actions", "Drive continuous improvement"],
      innovation:    ["Implement and monitor innovation activities"],
      safety:        ["Implement and monitor HSE measures", "Manage incidents and near-misses", "Ensure personnel protection and compliance"],
      nuclear:       ["Ensure nuclear safety compliance", "Manage deviations and corrective actions", "Ensure traceability resources skills / activities"],
      security:      ["Implement security measures", "Monitor security risks", "Manage incidents"],
      suppliers:     ["Coordinate subcontractors and suppliers", "Monitor performance and deliveries", "Manage issues and acceptance"],
      partners:      ["Oversee execution of Partner's commitments"]
    }
  },
  {
    id: "closure",
    stream: "real",
    title: "Closure",
    kicker: "",
    note: "Formalize completion and confirm project outcomes",
    color: "real",
    data: {
      strategy:      ["Assess project outcomes and objectives regarding business"],
      profitability:  ["Finalize invoicing and cash collection", "Define post-delivery financial provisions"],
      scope:         ["Confirm scope completion", "Identify remaining open items", "Define post-delivery responsibilities"],
      contract:      ["Close guarantees and insurances", "Ensure Project closure in Assystem tools"],
      integration:   ["Archive project documentation", "Define after-sales organisation"],
      resource:      ["Manage resource demobilisation", "Identify and retain after-sales resource needs"],
      schedule:      ["Plan after-sales activities if required and relevant"],
      stakeholders:  ["Notify project closure", "Identify after-sales contacts", "Collect stakeholder informal feedback"],
      risks:         ["Update risk assessment for after-sales", "Adjust contingency reserves"],
      quality:       ["Assess last customer satisfaction", "Capture lessons learned"],
      innovation:    ["Assess innovation outcomes"],
      safety:        ["Assess HSE performance and analyse incidents"],
      nuclear:       ["Archive nuclear safety documentation", "Archive ITNS personnel traceability and qualifications"],
      security:      ["Secure and archive project data", "Remove access controls and decommission IS tools"],
      suppliers:     ["Evaluate suppliers performance", "Close procurement activities"],
      partners:      ["Evaluate partner performance"]
    }
  },
  {
    id: "after-sales",
    stream: "real",
    title: "After-Sales",
    kicker: "Warranty",
    note: "Deliver after-sales commitments and develop long-term client relationship",
    color: "after",
    data: {
      strategy:      [],
      profitability:  ["Organise financial Review when relevant", "Adjust contingency reserves"],
      scope:         ["Fulfil after-sales commitments", "Manage warranty obligations"],
      contract:      [],
      integration:   ["Maintain needed project tools and systems"],
      resource:      ["Mobilize resources for after-sales needs"],
      schedule:      [],
      stakeholders:  ["Maintain client relationships"],
      risks:         ["Monitor residual risks"],
      quality:       ["Manage post-delivery quality issues"],
      innovation:    [],
      safety:        ["Maintain necessary HSE arrangements"],
      nuclear:       ["Maintain necessary Nuclear safety arrangements"],
      security:      ["Maintain necessary Information Security arrangements"],
      suppliers:     ["Maintain suppliers contact if needed"],
      partners:      ["Maintain partner coordination if needed"]
    }
  }
];

// ─── Detail definitions per category ─────────────────────────────────────────

const detailByCategory = {
  strategy: {
    objective: "Aligner l'opportunite ou le projet avec les objectifs business et les facteurs de succes client.",
    evidence:  ["Positionnement valide", "Hypotheses strategiques", "Decision go / no go documentee"],
    questions: ["La valeur strategique est-elle explicite ?", "Les differentiants sont-ils verifiables ?", "Les facteurs de succes sont-ils partages ?"]
  },
  profitability: {
    objective: "Maitriser la valeur economique, les couts, les marges et les provisions sur toute la vie du projet.",
    evidence:  ["Baseline financiere", "Hypotheses de cout", "Suivi cash, facturation et provisions"],
    questions: ["Les hypotheses financieres sont-elles tracees ?", "Les impacts cout/delai sont-ils chiffres ?", "Les provisions restent-elles adaptees ?"]
  },
  scope: {
    objective: "Clarifier le perimetre, les exclusions, les livrables et les changements pour eviter les ecarts non maitrises.",
    evidence:  ["Scope baseline", "Work packages", "Registre des changements et points ouverts"],
    questions: ["Les exclusions sont-elles explicites ?", "Les livrables ont-ils des criteres d'acceptation ?", "Les changements sont-ils approuves ?"]
  },
  contract: {
    objective: "Securiser les engagements contractuels, les obligations reglementaires et les contraintes de conformite.",
    evidence:  ["Analyse contractuelle", "Exigences reglementaires", "Assurances, garanties et actions de conformite"],
    questions: ["Les risques contractuels sont-ils affectes a un owner ?", "Les clauses critiques sont-elles comprises ?", "Les obligations fournisseur sont-elles alignees ?"]
  },
  integration: {
    objective: "Installer le modele de delivery, l'organisation, les interfaces, les outils et la gouvernance projet.",
    evidence:  ["Project management plan", "Organisation et interfaces", "Rituels de gouvernance"],
    questions: ["Les responsabilites sont-elles claires ?", "Les outils sont-ils disponibles ?", "Les interfaces techniques et decisionnelles sont-elles stabilisees ?"]
  },
  resource: {
    objective: "Mettre en place les competences, roles, certifications et ressources necessaires au bon moment.",
    evidence:  ["Staffing plan", "Roles et responsabilites", "Certifications et habilitations"],
    questions: ["Les competences critiques sont-elles couvertes ?", "Les gaps sont-ils traites ?", "La demobilisation est-elle anticipee ?"]
  },
  schedule: {
    objective: "Construire, suivre et ajuster les jalons, la charge et les delais de livraison.",
    evidence:  ["Planning detaille", "Jalons valides", "OTD KPI et actions correctives"],
    questions: ["Les dependances sont-elles visibles ?", "Les jalons client sont-ils synchronises ?", "Les retards ont-ils un plan d'action ?"]
  },
  stakeholders: {
    objective: "Identifier, engager et coordonner les parties prenantes internes, client et partenaires.",
    evidence:  ["Stakeholder map", "Plan de communication", "Compte-rendus et escalades"],
    questions: ["Les attentes sont-elles connues ?", "Les interlocuteurs decisionnaires sont-ils identifies ?", "Les escalades sont-elles traitees rapidement ?"]
  },
  risks: {
    objective: "Identifier, evaluer, suivre et reduire les risques tout en capturant les opportunites.",
    evidence:  ["Risk & opportunity register", "Actions de mitigation", "Impacts cout, delai et qualite"],
    questions: ["Chaque risque majeur a-t-il un owner ?", "Les mitigations sont-elles financees ?", "Le registre est-il actualise ?"]
  },
  quality: {
    objective: "Garantir la conformite des livrables, l'acceptation client et l'amelioration continue.",
    evidence:  ["Quality plan", "Criteres d'acceptation", "OQD KPI, non-conformites et lecons apprises"],
    questions: ["Les criteres qualite sont-ils acceptes ?", "Les controles sont-ils planifies ?", "Les lecons apprises sont-elles reutilisees ?"]
  },
  innovation: {
    objective: "Identifier, cadrer et suivre les innovations pertinentes, y compris la propriete intellectuelle.",
    evidence:  ["Liste des innovations", "Hypotheses et benefices", "Accord IP si applicable"],
    questions: ["L'innovation cree-t-elle une valeur mesurable ?", "Les risques d'integration sont-ils connus ?", "La propriete intellectuelle est-elle clarifiee ?"]
  },
  safety: {
    objective: "Prevenir les risques HSE, confirmer les exigences et suivre les incidents ou presque accidents.",
    evidence:  ["HSE tag", "Plan de mitigation", "PPE, incidents et actions correctives"],
    questions: ["Les exigences HSE sont-elles confirmees ?", "Les protections sont-elles disponibles ?", "Les incidents sont-ils analyses ?"]
  },
  nuclear: {
    objective: "Maitriser les exigences de surete nucleaire, les activites ITNS et la tracabilite des qualifications.",
    evidence:  ["Classification surete", "Liste ITNS", "Tracabilite competences / activites"],
    questions: ["Les activites ITNS sont-elles identifiees ?", "Les qualifications sont-elles archivees ?", "Les deviations sont-elles corrigees ?"]
  },
  security: {
    objective: "Proteger les donnees et les systemes, definir les mesures de securite et gerer les acces.",
    evidence:  ["Classification information security", "Plan securite", "Regles data et decommissionnement des acces"],
    questions: ["Les exigences data sont-elles connues ?", "Les mesures sont-elles chiffrees si besoin ?", "Les acces sont-ils retires en cloture ?"]
  },
  suppliers: {
    objective: "Structurer le make-or-buy, selectionner, contractualiser et piloter les sous-traitants et fournisseurs.",
    evidence:  ["Strategie make-or-buy", "Contrats fournisseurs", "Suivi performance et acceptation"],
    questions: ["Le scope fournisseur est-il clair ?", "Les exigences contractuelles descendent-elles aux fournisseurs ?", "Les livraisons sont-elles acceptees ?"]
  },
  partners: {
    objective: "Definir, contractualiser et coordonner les partenariats utiles au succes de l'offre ou du projet.",
    evidence:  ["Strategie partenaire", "Roles et responsabilites", "Accords et evaluation de performance"],
    questions: ["Les roles partenaires sont-ils explicites ?", "Les engagements sont-ils suivis ?", "La coordination est-elle maintenue ?"]
  }
};
