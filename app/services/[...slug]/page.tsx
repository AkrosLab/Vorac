import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { QuoteModalOnly } from "@/components/landing/quote-modal-only";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navigationMenu } from "@/lib/navigation-data";
import { ServiceCTAs } from "@/components/landing/service-ctas";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Helper to find service label from slugs
function findServiceBySlugs(slugs: string[]) {
  let currentItems = navigationMenu;
  let label = "";
  
  for (const slug of slugs) {
    const found = currentItems.find(item => {
      if (item.href) {
        const parts = item.href.split("/").filter(Boolean);
        return parts[parts.length - 1] === slug;
      }
      return item.label.toLowerCase().replace(/\s+/g, "-") === slug;
    });
    
    if (found) {
      label = found.label;
      if (found.items) {
        currentItems = found.items;
      }
    }
  }
  
  return label || slugs[slugs.length - 1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

type ServiceContent = {
  summary: string;
  highlights: string[];
  deliverables: string[];
};

function serviceContentFor(slugs: string[]): ServiceContent {
  const key = slugs.join("/");
  const base: ServiceContent = {
    summary: "Specialist London trades delivering precise workmanship, clear communication, and tidy finishes with every visit.",
    highlights: [
      "Rapid response for time-sensitive issues across London",
      "Qualified, insured engineers with photo ID on arrival",
      "Respectful entry, floor protection, and careful clean-down",
    ],
    deliverables: [
      "Site assessment, safety checks, and issue trace",
      "Clear plan of works with parts and access requirements",
      "Completion test, neat finish, and tidy handover",
    ],
  };

  const map: Record<string, ServiceContent> = {
    "services/plumbing/emergency-plumber": {
      summary: "On-call plumbers to stem leaks, isolate supplies, and stabilise your system before permanent repairs.",
      highlights: [
        "Arrival with isolation valves, sealants, and emergency fittings",
        "Tracing leaks with moisture meters and thermal imaging",
        "Protecting finishes to limit secondary water damage",
      ],
      deliverables: [
        "Stop-gap fixes to pipes, traps, cylinders, and feeds",
        "System check for pressure loss or hidden weeps",
        "Written notes on next steps and parts needed",
      ],
    },
    "services/plumbing/installation": {
      summary: "Considered plumbing installations with discreet routing, secure fixing, and pressure-balanced performance.",
      highlights: [
        "Pipe runs planned to minimise visible boxing",
        "WRAS-compliant fittings and pressure-balanced set-up",
        "Isolation points positioned for future maintenance",
      ],
      deliverables: [
        "Install of sanitaryware, traps, and waste assemblies",
        "Pressure and flow testing on completion",
        "Silicone and sealing with clean bead lines",
      ],
    },
    "services/plumbing/repairs": {
      summary: "Targeted repairs to stop drips, restore flow, and leave pipework secure and tidy.",
      highlights: [
        "Compression, soldered, or press-fit joints to suit the run",
        "Trap, waste, and seal replacements to cure smells or leaks",
        "Valve swaps for seized or weeping shut-offs",
      ],
      deliverables: [
        "Component replacement with like-for-like or better",
        "Operational check of adjacent fixtures",
        "Area wiped down and left ready for use",
      ],
    },
    "services/plumbing/leak-detection": {
      summary: "Non-invasive leak detection using acoustic, tracer, and thermal methods to pinpoint hidden escapes.",
      highlights: [
        "Thermal imaging for underfloor and concealed runs",
        "Tracer gas or dye for intermittent or fine leaks",
        "Moisture mapping to define affected zones",
      ],
      deliverables: [
        "Leak source identified with a clear location note",
        "Photographic evidence for insurers if required",
        "Make-safe advice and remediation plan",
      ],
    },
    "services/plumbing/drain-blockages": {
      summary: "Clearing blockages swiftly with jetting, rodding, and mechanical heads to restore free-flowing drains.",
      highlights: [
        "Mechanical rodding for local obstructions",
        "High-pressure jetting for stubborn fat or scale",
        "Odour control and traps re-primed after works",
      ],
      deliverables: [
        "Flow test and visual check at key gullies",
        "Advice on preventing repeat build-up",
        "Area rinsed and left clean after clearance",
      ],
    },
    "services/plumbing/plumbing-survey": {
      summary: "Pre-purchase plumbing surveys to flag risk points before you commit.",
      highlights: [
        "Visual inspection of pipework, cylinders, and sanitaryware",
        "Check of stopcocks, service valves, and accessible wastes",
        "Pressure and flow readings at representative outlets",
      ],
      deliverables: [
        "Concise findings with priority recommendations",
        "Photos of notable defects or ageing components",
        "Next-step actions for remedials or upgrades",
      ],
    },
    "services/heating/emergency-heating": {
      summary: "Emergency heating support to stabilise boilers, restore heat, and keep systems safe.",
      highlights: [
        "System check for pressure, airlocks, and pump operation",
        "Electrical and control sanity checks before resets",
        "Temporary measures to protect occupants and fabric",
      ],
      deliverables: [
        "Stabilisation, bleeding, and top-up where safe",
        "Fault notes and parts list for permanent repair",
        "Ventilation and flue checks on completion",
      ],
    },
    "services/heating/emergency-boiler-repair": {
      summary: "Rapid-response boiler diagnostics to restore safe operation without unnecessary parts swaps.",
      highlights: [
        "Combustion checks and lockout code tracing",
        "Component testing before replacement",
        "Gas-tightness and ventilation verification",
      ],
      deliverables: [
        "Safe reset or component repair where viable",
        "Clear record of advisories and future risks",
        "System re-pressurised and bled after works",
      ],
    },
    "services/heating/boiler-services": {
      summary: "Comprehensive boiler servicing to maintain efficiency, safety, and warranty conditions.",
      highlights: [
        "Flue integrity check and combustion analysis",
        "Cleaning of burners, condensate traps, and sensors",
        "System pressure and inhibitor level review",
      ],
      deliverables: [
        "Service log with readings and advisories",
        "Recommendations on filters, controls, and flushing",
        "Area left tidy with protective covers removed",
      ],
    },
    "services/heating/heating-installation": {
      summary: "Thoughtful heating installations with balanced distribution and smart, low-profile controls.",
      highlights: [
        "Heat loss considered for radiator sizing and placement",
        "Pipework planned for minimal surface disruption",
        "Smart controls set up with zoning where suitable",
      ],
      deliverables: [
        "Commissioned system with balanced radiators",
        "Control handover and user guidance",
        "Water quality checked and dosed appropriately",
      ],
    },
    "services/heating/heating-service": {
      summary: "Routine heating servicing to keep pumps, valves, and controls operating quietly and reliably.",
      highlights: [
        "Pump and valve function tests with lubrication where applicable",
        "Programmer, thermostat, and TRV checks",
        "System pressure checks and bleed as needed",
      ],
      deliverables: [
        "Service notes with minor adjustments logged",
        "Advice on efficiency improvements",
        "Housekeeping and tidy finish",
      ],
    },
    "services/heating/heating-repairs": {
      summary: "Targeted repairs to valves, pumps, controls, and emitters to restore even, dependable heat.",
      highlights: [
        "Fault tracing on controls and wiring centres",
        "Pump, valve, and actuator replacements where required",
        "Bleeding and balancing after component swaps",
      ],
      deliverables: [
        "Verified heat to all zones after repair",
        "Clear notes on any future risk points",
        "Work area wiped down and left tidy",
      ],
    },
    "services/heating/heating-survey": {
      summary: "Surveys to assess system health, capacity, and upgrade options before investment.",
      highlights: [
        "Radiator condition, sizing, and balance review",
        "Control strategy and zoning assessment",
        "Water quality and inhibitor check",
      ],
      deliverables: [
        "Survey summary with upgrade priorities",
        "Photographs of key plant and controls",
        "Suggested sequencing for works",
      ],
    },
    "services/electrics/emergency-electrical": {
      summary: "Emergency electrical attendance to make safe, isolate faults, and reinstate power where possible.",
      highlights: [
        "Safe isolation and fault-finding on affected circuits",
        "RCD and MCB trip diagnostics with remedial advice",
        "Temporary restores where safe to do so",
      ],
      deliverables: [
        "Make-safe or restore supply to unaffected areas",
        "Report on likely cause and remedial steps",
        "Neat reinstatement of boards and plates",
      ],
    },
    "services/electrics/eicr": {
      summary: "Electrical Installation Condition Reports for landlords and homeowners across London.",
      highlights: [
        "Inspection and testing to current BS 7671 standards",
        "Clear coding of observations without ambiguity",
        "Practical recommendations, not boilerplate",
      ],
      deliverables: [
        "EICR report with measured readings",
        "Prioritised remedial plan where needed",
        "Board labelling tidy and up to date",
      ],
    },
    "services/electrics/installations": {
      summary: "Discreet electrical installations with careful routing, tidy containment, and clean terminations.",
      highlights: [
        "Cable routes planned to minimise visual impact",
        "High-quality accessories with even fixing and level lines",
        "Testing and certification on completion",
      ],
      deliverables: [
        "Installation signed off with test results",
        "User guidance for controls or lighting scenes",
        "Area left clean with debris removed",
      ],
    },
    "services/electrics/repairs": {
      summary: "Reliable electrical repairs to cure nuisance tripping, failed points, and ageing accessories.",
      highlights: [
        "Fault-finding on lighting, sockets, and spurs",
        "Replacement of worn accessories with secure terminations",
        "RCD, RCBO, and MCB checks where relevant",
      ],
      deliverables: [
        "Safe operation verified after repair",
        "Clear note of any advisories found",
        "Work area cleaned and reinstated",
      ],
    },
    "services/electrics/niceic": {
      summary: "NICEIC-certified electrical works with compliant documentation for peace of mind.",
      highlights: [
        "NICEIC-approved procedures for install and test",
        "Appropriate certification issued on completion",
        "Attention to tidy containment and finishes",
      ],
      deliverables: [
        "Certificates supplied digitally",
        "Labelling and schedules updated",
        "Guidance on maintenance intervals",
      ],
    },
    "services/electrics/appliances/installation": {
      summary: "Appliance installations with correct isolation, ventilation, and neat integration.",
      highlights: [
        "Secure, level fitting with proper clearances",
        "Waste and supply connections tested for leaks",
        "Old packaging and debris removed",
      ],
      deliverables: [
        "Appliance test run and user brief",
        "Isolation points labelled where needed",
        "Area cleaned and ready for use",
      ],
    },
    "services/electrics/appliances/repairs": {
      summary: "Appliance diagnostics and repairs to extend life and restore safe operation.",
      highlights: [
        "Electrical and mechanical checks before parts swaps",
        "Seal, hose, and pump checks on wet appliances",
        "Safety interlocks confirmed after repair",
      ],
      deliverables: [
        "Functional test with load or cycle",
        "Advice on remaining lifespan and care",
        "Workspace cleared and wiped down",
      ],
    },
    "services/electrics/appliances/disposal": {
      summary: "Responsible collection and disposal of appliances with careful removal from your property.",
      highlights: [
        "Disconnection performed safely with caps or blanks",
        "Protective coverings to avoid scuffs in transit",
        "WEEE-compliant disposal routing",
      ],
      deliverables: [
        "Removal of old unit from site",
        "Connections left safe and capped",
        "Disposal note on request",
      ],
    },
    "services/drains/emergency-drains": {
      summary: "Emergency drain response to contain overflows, remove blockages, and protect finishes.",
      highlights: [
        "Immediate make-safe and isolation where needed",
        "Jetting or mechanical clearance to restore flow",
        "Odour control and hygiene-focused clean-down",
      ],
      deliverables: [
        "Flow verified and gullies checked",
        "Advice on root causes and prevention",
        "Area sanitised after works",
      ],
    },
    "services/drains/blocked-drains": {
      summary: "Clearing blocked drains with the right heads, jetting, and diagnostic checks.",
      highlights: [
        "Rodding and jetting tailored to the blockage",
        "Trap resets to prevent odour return",
        "Inspection for repeat-risk points",
      ],
      deliverables: [
        "Restored flow confirmed",
        "Maintenance tips to avoid build-up",
        "Work area rinsed and left clean",
      ],
    },
    "services/drains/cctv-surveys": {
      summary: "CCTV drain surveys to pinpoint defects before they escalate.",
      highlights: [
        "Camera survey with live visuals and notes",
        "Identification of cracks, roots, or scale",
        "Recommendations prioritised by risk",
      ],
      deliverables: [
        "Survey findings with stills if required",
        "Clear remediation plan and access notes",
        "Post-survey briefing in plain English",
      ],
    },
    "services/drains/drain-clearance": {
      summary: "Routine drain clearance to keep your system free-flowing and odour-free.",
      highlights: [
        "Jetting and descaling suited to the pipework",
        "Trap checks and resealing",
        "Gully and channel debris removal",
      ],
      deliverables: [
        "Confirmed flow and visual check",
        "Maintenance guidance for occupants",
        "Area tidied and sanitised",
      ],
    },
    "services/drains/drain-repairs": {
      summary: "Drain repairs and lining to restore integrity without disruptive excavation where possible.",
      highlights: [
        "Patch lining or sectional repair where suitable",
        "Excavation only when necessary with neat reinstatement",
        "Root ingress prevention measures",
      ],
      deliverables: [
        "Structural repair or lining completed",
        "Flow and integrity checked post-repair",
        "Site reinstated cleanly",
      ],
    },
    "services/drains/drain-cleaning": {
      summary: "Preventative drain cleaning to reduce odours and blockages in busy properties.",
      highlights: [
        "Scheduled jetting and descaling",
        "Trap and stack checks for buildup",
        "Advice on dosing and housekeeping",
      ],
      deliverables: [
        "Documented clean-down of key runs",
        "Flow check and odour check on completion",
        "Recommendations for intervals",
      ],
    },
    "services/carpentry/doors": {
      summary: "Door installation with crisp margins, smooth swing, and secure ironmongery.",
      highlights: [
        "Planing and easing for perfect reveals",
        "Hinges and latches aligned with clean sightlines",
        "Seals and closers fitted where specified",
      ],
      deliverables: [
        "Doors hung, aligned, and ironmongery fitted",
        "Stops and seals adjusted for a neat close",
        "Surfaces wiped down and waste removed",
      ],
    },
    "services/carpentry/floors": {
      summary: "Precision flooring installation for engineered, laminate, or timber finishes.",
      highlights: [
        "Subfloor prep and moisture checks before laying",
        "Expansion gaps planned and trims aligned",
        "Clean cuts with consistent grain direction",
      ],
      deliverables: [
        "Boards laid, transitions fitted, and edges finished",
        "Site swept and vacuumed after works",
        "Care guidance for the first 48 hours",
      ],
    },
    "services/carpentry/windows": {
      summary: "Window carpentry to restore smooth operation and tight weathering.",
      highlights: [
        "Sash easing, cord replacement, and draught proofing",
        "Frame repairs with careful profiling",
        "Secure ironmongery and clean sightlines",
      ],
      deliverables: [
        "Windows operating smoothly with balanced sashes",
        "Seals and catches checked",
        "Frames cleaned and debris cleared",
      ],
    },
    "services/carpentry/staircases": {
      summary: "Staircase carpentry that prioritises rigidity, safe treads, and refined detailing.",
      highlights: [
        "Tread and riser fixes for squeaks and movement",
        "Handrail and balustrade alignment",
        "Finishing touches to nosings and strings",
      ],
      deliverables: [
        "Secure, aligned staircase components",
        "Surfaces cleaned and dust controlled",
        "Advice on finishes and care",
      ],
    },
    "services/roofing/emergency-roofing": {
      summary: "Emergency roofing call-outs to make safe, weather tight, and prevent ingress.",
      highlights: [
        "Temporary covers, flashings, or patch repairs",
        "Debris removal to reduce further risk",
        "Safety-first access with clear perimeter",
      ],
      deliverables: [
        "Immediate weathering applied",
        "Condition note with photos where possible",
        "Next-step recommendation for permanent works",
      ],
    },
    "services/roofing/roof-repairs": {
      summary: "Roof repairs to restore weather integrity with neat detailing.",
      highlights: [
        "Tile, slate, or shingle replacements matched closely",
        "Leadwork checks and minor re-dress where needed",
        "Flashings and abutments inspected",
      ],
      deliverables: [
        "Secure repair with aligned courses",
        "Gutters cleared locally if required",
        "Site left tidy with waste removed",
      ],
    },
    "services/roofing/flat-roofs": {
      summary: "Flat roof works focused on clean falls, sound edging, and reliable waterproofing.",
      highlights: [
        "Assessment of deck condition and falls",
        "Detailing at outlets, trims, and upstands",
        "Material choice to suit use and access",
      ],
      deliverables: [
        "Flat roof section installed or repaired",
        "Seams and edges inspected for continuity",
        "Debris cleared and area left clean",
      ],
    },
    "services/roofing/new-roofing": {
      summary: "New and refurbished roofing with balanced ventilation and tidy courses.",
      highlights: [
        "Specification matched to property style",
        "Ventilation and insulation considered together",
        "Lead and flashing details formed neatly",
      ],
      deliverables: [
        "New covering installed with clean lines",
        "Flashings and gutters checked for flow",
        "Waste removed and site left orderly",
      ],
    },
    "services/roofing/roof-survey": {
      summary: "Roof inspection surveys to flag defects before they escalate.",
      highlights: [
        "Visual survey of coverings, flashings, and gutters",
        "Moisture ingress checks in vulnerable areas",
        "Practical recommendations prioritised by risk",
      ],
      deliverables: [
        "Concise report with photos where safe to capture",
        "Recommended remedial actions and sequencing",
        "Briefing in plain English on next steps",
      ],
    },
    "services/roofing/asphalt-roofing": {
      summary: "Asphalt roofing repairs and sections laid with careful jointing and falls.",
      highlights: [
        "Substrate prep and priming for adhesion",
        "Upstand and detail work with smooth finishes",
        "Falls checked to avoid ponding",
      ],
      deliverables: [
        "Asphalt section laid or repaired neatly",
        "Seams inspected for uniformity",
        "Area cleaned and safe after works",
      ],
    },
    "services/roofing/gutter-repairs": {
      summary: "Gutter and fascia repairs to restore free flow and crisp edges.",
      highlights: [
        "Clearance of debris and check of outlets",
        "Seal renewals at joints and corners",
        "Bracket and fall adjustments for proper run-off",
      ],
      deliverables: [
        "Free-flowing gutters tested with water",
        "Fascias and soffits checked and cleaned locally",
        "Recommendations for periodic maintenance",
      ],
    },
    "services/air-con/maintenance": {
      summary: "Air conditioning maintenance to keep systems efficient, quiet, and hygienic.",
      highlights: [
        "Filter cleaning or replacement",
        "Drain pan and condensate line checks",
        "Refrigerant pressures and controls reviewed",
      ],
      deliverables: [
        "Performance check with temperature readings",
        "Hygiene clean of accessible components",
        "Service record with advisories",
      ],
    },
    "services/air-con/installations": {
      summary: "Air conditioning installations with discreet routing and balanced airflow.",
      highlights: [
        "Positioning for quiet operation and even coverage",
        "Condensate routing planned to avoid staining",
        "Commissioning to manufacturer standards",
      ],
      deliverables: [
        "Installed indoor and outdoor units",
        "Controls set and user guidance provided",
        "Site cleared and cleaned after works",
      ],
    },
    "services/air-con/repairs": {
      summary: "Air conditioning repairs to restore cooling, reduce noise, and prevent leaks.",
      highlights: [
        "Leak checks on refrigerant circuit and joints",
        "Fan, drain, and control diagnostics",
        "Noise and vibration checks after repair",
      ],
      deliverables: [
        "System tested through a full cycle",
        "Notes on any follow-up required",
        "Area left tidy with panels refitted",
      ],
    },
    "services/building/extractor-fans": {
      summary: "Extractor fan installations to improve ventilation without visual clutter.",
      highlights: [
        "Sizing and siting to suit room volume",
        "Ducting routes planned for low noise and backdraught control",
        "Discreet finishing plates and neat sealing",
      ],
      deliverables: [
        "Fan installed, wired, and tested",
        "Backdraught shutters checked",
        "Edges sealed cleanly, area tidied",
      ],
    },
    "services/building/maintenance": {
      summary: "Planned and reactive building maintenance to keep properties tidy and compliant.",
      highlights: [
        "Joinery, fixtures, and fabric repairs handled neatly",
        "Coordination to minimise disruption to occupants",
        "Snag capture and clear reporting",
      ],
      deliverables: [
        "Tasks completed with photographic evidence on request",
        "Minor making good where needed",
        "Areas left clean after attendance",
      ],
    },
    "services/building/painting-decorating": {
      summary: "Painting and decorating with careful prep, crisp lines, and low-odour products.",
      highlights: [
        "Surface prep including filling and sanding",
        "Taped lines for sharp edges and trims",
        "Low-VOC paints selected where suitable",
      ],
      deliverables: [
        "Even coats with consistent sheen",
        "Fixtures and floors protected throughout",
        "Spaces aired and left clean",
      ],
    },
    "services/building/tiling": {
      summary: "Tiling with precise set-out, level planes, and clean grout lines.",
      highlights: [
        "Set-out planned to centre features and avoid slivers",
        "Level substrates and consistent adhesive beds",
        "Clean grout lines and well-sealed edges",
      ],
      deliverables: [
        "Tiles laid, grouted, and sealed where required",
        "Surfaces cleaned ready for use",
        "Care guidance for early days after install",
      ],
    },
    "services/building/plastering": {
      summary: "Plastering with smooth, ready-to-paint finishes and tidy edges.",
      highlights: [
        "Proper key and PVA where required",
        "Even coats for flat, true walls and ceilings",
        "Sharp corners and neat terminations",
      ],
      deliverables: [
        "Surfaces finished smooth and ready for decoration",
        "Waste managed and area cleaned",
        "Drying and painting guidance provided",
      ],
    },
    "services/building/gardens": {
      summary: "Garden works focusing on tidy cuts, safe access, and discreet waste handling.",
      highlights: [
        "Pruning and shaping with clean cuts",
        "Path and access kept safe during works",
        "Waste removal or tidy stacking as agreed",
      ],
      deliverables: [
        "Beds and lawns left neat",
        "Hard standings swept on completion",
        "Advice on ongoing care",
      ],
    },
    "services/building/small-works": {
      summary: "Small works delivered with the same care as major projects, suited to quick turnarounds.",
      highlights: [
        "Joinery, fixing, and light making-good tasks",
        "Flexible scheduling for minimal disruption",
        "Clear communication and tidy finishes",
      ],
      deliverables: [
        "Tasks completed to brief with photos if needed",
        "Waste removed or stacked neatly",
        "Areas reinstated and cleaned",
      ],
    },
    "services/bathrooms/installation": {
      summary: "Bathroom installations with coordinated trades, aligned tiling, and watertight finishes.",
      highlights: [
        "First- and second-fix sequenced for clean timelines",
        "Tiling set-out to suit feature walls and niches",
        "Silicone and sealing with tidy bead lines",
      ],
      deliverables: [
        "Suite installed, tested, and sealed",
        "Ventilation and flow checks completed",
        "Space cleaned and ready to dress",
      ],
    },
    "services/bathrooms/repairs": {
      summary: "Bathroom repairs to stop leaks, refresh seals, and restore reliable use.",
      highlights: [
        "Leak tracing at traps, wastes, and seals",
        "Re-sealing and re-bedding as needed",
        "Fixture adjustments for smooth operation",
      ],
      deliverables: [
        "Repairs completed with watertight tests",
        "Edges and beads renewed neatly",
        "Area dried, cleaned, and ready for use",
      ],
    },
    "services/handyman": {
      summary: "Handyman services for quick fixes and tidy upgrades around the property.",
      highlights: [
        "Fixings, fittings, and minor adjustments handled swiftly",
        "Careful drilling and fixing to suit substrates",
        "Polite, tidy attendance with minimal disruption",
      ],
      deliverables: [
        "Tasks completed with neat finishes",
        "Waste and packaging removed",
        "Brief handover of what was done",
      ],
    },
  };

  return map[key] ?? base;
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const serviceName = findServiceBySlugs(slug);
  const category = slug[0].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const lastSlug = slug[slug.length - 1];
  const content = serviceContentFor(slug);

  return (
    <>
      <QuoteModalOnly />
      <LandingHeader />
      <main className="bg-[#f8f8f8] min-h-screen text-black">
        <div className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-zinc-600">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="hover:text-black transition-colors capitalize">{category}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-black font-medium">{serviceName}</span>
            </nav>
          </div>
        </div>

        <section className="relative overflow-hidden py-24 sm:py-32 bg-[#f8f8f8]">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/images/individual-page-hero%20.png"
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#f8f8f8] to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#f8f8f8] to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-b from-[#f8f8f8] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-[#f8f8f8] to-transparent" />
            </div>
          </div>
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-3xl">
                <h1 className="text-5xl sm:text-7xl font-semibold tracking-[0.18em] text-black mb-8 uppercase">
                  {serviceName}
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-700 leading-relaxed mb-12">
                  {content.summary}
                </p>
                <ServiceCTAs slug={lastSlug} serviceName={serviceName} />
              </div>
              <div className="flex flex-col items-center justify-center shrink-0 lg:self-center">
                <Link href="/" className="flex flex-col items-center justify-center gap-4 text-black hover:opacity-80 transition-opacity" aria-label="VORAC Home">
                  <div className="flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] aspect-square">
                    <Image
                      src="/images/logo.png"
                      alt="Vorac logo"
                      width={400}
                      height={400}
                      className="object-contain max-w-full max-h-full"
                      sizes="(min-width: 640px) 320px, 280px"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <span className="text-[2.025rem] sm:text-[2.7rem] font-light tracking-[0.24em] uppercase text-center">vorac</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-zinc-200">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-semibold tracking-[0.16em] text-black mb-8 uppercase">What to Expect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[0.08em] uppercase text-black mb-3">Key Points</h3>
                    <ul className="space-y-3">
                      {content.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-black font-medium">
                          <div className="h-1.5 w-1.5 rounded-none bg-black mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[0.08em] uppercase text-black mb-3">Delivered on the Day</h3>
                    <ul className="space-y-3">
                      {content.deliverables.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-black font-medium">
                          <div className="h-1.5 w-1.5 rounded-none bg-black mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-12 flex flex-col justify-center shadow-sm">
                <h3 className="text-2xl font-semibold tracking-[0.14em] text-black mb-4 uppercase">Need help right now?</h3>
                <p className="text-zinc-700 mb-8">
                  Our emergency team is on standby 24/7 for urgent {serviceName.toLowerCase()} issues.
                </p>
                <ServiceCTAs slug={lastSlug} serviceName={serviceName} variant="card" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
