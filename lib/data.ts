export const services = {
  plumbing: [
    {
      id: "plumbing-1",
      title: "Emergency Leaks",
      description: "Fast response to burst pipes and water leaks",
      priceFrom: 95,
    },
    {
      id: "plumbing-2",
      title: "Boiler Repairs",
      description: "Expert diagnosis and repair for all boiler types",
      priceFrom: 120,
    },
    {
      id: "plumbing-3",
      title: "Bathroom Installation",
      description: "Complete bathroom fitting and renovation",
      priceFrom: 2500,
    },
    {
      id: "plumbing-4",
      title: "Blocked Drains",
      description: "Professional drain unblocking and cleaning",
      priceFrom: 85,
    },
    {
      id: "plumbing-5",
      title: "Radiator Services",
      description: "Installation, repair, and bleeding of radiators",
      priceFrom: 75,
    },
    {
      id: "plumbing-6",
      title: "Tap & Fixture Installation",
      description: "New taps, showers, and plumbing fixtures",
      priceFrom: 90,
    },
  ],
  carpentry: [
    {
      id: "carpentry-1",
      title: "Door Installation",
      description: "Internal and external door fitting",
      priceFrom: 150,
    },
    {
      id: "carpentry-2",
      title: "Skirting & Architrave",
      description: "Precise fitting of skirting boards and architraves",
      priceFrom: 25,
    },
    {
      id: "carpentry-3",
      title: "Kitchen Cabinetry",
      description: "Custom kitchen cabinet installation and repair",
      priceFrom: 300,
    },
    {
      id: "carpentry-4",
      title: "Flooring Installation",
      description: "Laminate, hardwood, and engineered flooring",
      priceFrom: 35,
    },
    {
      id: "carpentry-5",
      title: "Shelving & Storage",
      description: "Built-in shelving and storage solutions",
      priceFrom: 120,
    },
    {
      id: "carpentry-6",
      title: "Repairs & Maintenance",
      description: "General carpentry repairs and fixes",
      priceFrom: 60,
    },
  ],
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Islington, London",
    rating: 5,
    text: "VORAC fixed our boiler on a Sunday evening. Professional, clean, and reasonably priced. Highly recommend.",
    service: "Boiler Repair",
  },
  {
    id: 2,
    name: "James Chen",
    location: "Camden, London",
    rating: 5,
    text: "Excellent carpentry work on our kitchen cabinets. The attention to detail was impressive, and they left everything spotless.",
    service: "Kitchen Cabinetry",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Hackney, London",
    rating: 5,
    text: "Quick response to a burst pipe emergency. The plumber arrived within an hour and sorted everything efficiently.",
    service: "Emergency Leak",
  },
  {
    id: 4,
    name: "Michael Brown",
    location: "Westminster, London",
    rating: 5,
    text: "Had our entire bathroom refitted. The team was respectful, tidy, and the workmanship is outstanding. Worth every penny.",
    service: "Bathroom Installation",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    location: "Tower Hamlets, London",
    rating: 5,
    text: "Blocked drain sorted quickly. Clear pricing upfront, no surprises. Will definitely use VORAC again.",
    service: "Blocked Drains",
  },
  {
    id: 6,
    name: "David Wilson",
    location: "Kensington, London",
    rating: 5,
    text: "Skirting boards fitted perfectly throughout the house. Clean work, fair price, and great communication.",
    service: "Skirting & Architrave",
  },
];

export const faqs = [
  {
    id: 1,
    question: "How quickly can you respond to emergencies?",
    answer:
      "We offer same-day emergency call-outs for urgent plumbing issues. Our team aims to arrive within 2 hours for emergencies in London. For non-urgent work, we typically schedule within 24-48 hours.",
  },
  {
    id: 2,
    question: "Do you provide fixed pricing?",
    answer:
      "Yes, we provide transparent, fixed-price quotes before starting any work. You'll know exactly what you're paying with no hidden fees. Quotes are valid for 30 days.",
  },
  {
    id: 3,
    question: "Are your tradespeople qualified and insured?",
    answer:
      "All VORAC tradespeople are fully qualified, DBS checked, and carry comprehensive public liability insurance. We only work with experienced professionals who meet our high standards.",
  },
  {
    id: 4,
    question: "Do you offer guarantees on your work?",
    answer:
      "Yes, all work comes with a 12-month guarantee on workmanship. We stand behind our work and will return to fix any issues at no extra cost during the guarantee period.",
  },
  {
    id: 5,
    question: "Can you work with landlords and letting agents?",
    answer:
      "Absolutely. We regularly work with landlords and letting agents, providing detailed invoices and ensuring properties are left in excellent condition. We can also provide emergency call-out services for rental properties.",
  },
  {
    id: 6,
    question: "What areas do you cover?",
    answer:
      "We primarily serve London and surrounding areas including Greater London, parts of Essex, Surrey, and Kent. Enter your postcode in our coverage checker to confirm if we cover your area.",
  },
  {
    id: 7,
    question: "Do you provide materials or should I supply them?",
    answer:
      "We can provide all necessary materials at trade prices, or you're welcome to supply your own. We'll discuss this when providing your quote. All materials we supply come with receipts.",
  },
  {
    id: 8,
    question: "How do I book a service?",
    answer:
      "You can book by calling us directly, or by filling out our online quote request form. We'll confirm your appointment and send a reminder before we arrive. Same-day slots are available for urgent work.",
  },
];

export const areas = [
  "Central London",
  "Westminster",
  "Camden",
  "Islington",
  "Hackney",
  "Tower Hamlets",
  "Southwark",
  "Lambeth",
  "Kensington & Chelsea",
  "Hammersmith & Fulham",
  "Wandsworth",
  "Greenwich",
  "Lewisham",
  "Bromley",
  "Croydon",
  "Richmond upon Thames",
  "Kingston upon Thames",
  "Merton",
  "Sutton",
  "Ealing",
  "Hounslow",
  "Hillingdon",
  "Harrow",
  "Brent",
  "Barnet",
  "Enfield",
  "Waltham Forest",
  "Redbridge",
  "Newham",
  "Barking & Dagenham",
  "Havering",
  "Bexley",
];

export const serviceOptions = [
  ...services.plumbing.map((s) => ({ value: s.id, label: s.title })),
  ...services.carpentry.map((s) => ({ value: s.id, label: s.title })),
];

export const urgencyOptions = [
  { value: "emergency", label: "Emergency (same day)" },
  { value: "urgent", label: "Urgent (within 24 hours)" },
  { value: "standard", label: "Standard (within a week)" },
  { value: "flexible", label: "Flexible (when convenient)" },
];

// Common London postcodes for coverage checker
export const coveredPostcodes = [
  "SW1", "SW2", "SW3", "SW4", "SW5", "SW6", "SW7", "SW8", "SW9", "SW10", "SW11", "SW12", "SW13", "SW14", "SW15", "SW16", "SW17", "SW18", "SW19", "SW20",
  "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14",
  "NW1", "NW2", "NW3", "NW4", "NW5", "NW6", "NW7", "NW8", "NW9", "NW10", "NW11",
  "N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10", "N11", "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22",
  "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E20",
  "SE1", "SE2", "SE3", "SE4", "SE5", "SE6", "SE7", "SE8", "SE9", "SE10", "SE11", "SE12", "SE13", "SE14", "SE15", "SE16", "SE17", "SE18", "SE19", "SE20", "SE21", "SE22", "SE23", "SE24", "SE25", "SE26", "SE27", "SE28",
  "EC1", "EC2", "EC3", "EC4",
  "WC1", "WC2",
];

