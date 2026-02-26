export interface NavigationItem {
  label: string;
  href?: string;
  items?: NavigationItem[];
}

export const navigationMenu: NavigationItem[] = [
  {
    label: "Plumbing",
    items: [
      { label: "Emergency Plumber Service", href: "/services/plumbing/emergency-plumber" },
      { label: "Plumbing Installation", href: "/services/plumbing/installation" },
      { label: "Plumbing Repairs", href: "/services/plumbing/repairs" },
      { label: "Damp & Leak Detection", href: "/services/plumbing/leak-detection" },
      { label: "Drain Blockages", href: "/services/plumbing/drain-blockages" },
      { label: "Pre-Purchase Plumbing Survey", href: "/services/plumbing/plumbing-survey" },
    ],
  },
  {
    label: "Heating",
    items: [
      { label: "Emergency Heating Engineers", href: "/services/heating/emergency-heating" },
      { label: "Emergency Boiler Repairs", href: "/services/heating/emergency-boiler-repair" },
      { label: "Boiler Engineers & Services", href: "/services/heating/boiler-services" },
      { label: "Central Heating Installation", href: "/services/heating/heating-installation" },
      { label: "Central Heating Service", href: "/services/heating/heating-service" },
      { label: "Central Heating Repairs", href: "/services/heating/heating-repairs" },
      { label: "Central Heating Survey", href: "/services/heating/heating-survey" },
    ],
  },
  {
    label: "Electrics",
    items: [
      { label: "Emergency Electrical Services", href: "/services/electrics/emergency-electrical" },
      { label: "Electrical Installation Condition Reports", href: "/services/electrics/eicr" },
      { label: "Electrical Installations", href: "/services/electrics/installations" },
      { label: "Electrical Repairs", href: "/services/electrics/repairs" },
      { label: "NICEIC", href: "/services/electrics/niceic" },
      {
        label: "Appliances",
        items: [
          { label: "Appliance Installation", href: "/services/electrics/appliances/installation" },
          { label: "Appliance Repairs", href: "/services/electrics/appliances/repairs" },
          { label: "Appliance Collection & Disposal Service", href: "/services/electrics/appliances/disposal" },
        ],
      },
    ],
  },
  {
    label: "Drains",
    items: [
      { label: "Emergency Drain Services", href: "/services/drains/emergency-drains" },
      { label: "Blocked Drain Services", href: "/services/drains/blocked-drains" },
      { label: "CCTV Drainage Surveys", href: "/services/drains/cctv-surveys" },
      { label: "Drain Clearance", href: "/services/drains/drain-clearance" },
      { label: "Drain Repair Services", href: "/services/drains/drain-repairs" },
      { label: "Drain Cleaning", href: "/services/drains/drain-cleaning" },
    ],
  },
  {
    label: "Carpentry",
    items: [
      { label: "Doors", href: "/services/carpentry/doors" },
      { label: "Floor Carpenters", href: "/services/carpentry/floors" },
      { label: "Local Window Carpenter Services", href: "/services/carpentry/windows" },
      { label: "Staircase Carpenter", href: "/services/carpentry/staircases" },
    ],
  },
  {
    label: "Roofing",
    items: [
      { label: "Emergency Roofing Repairs", href: "/services/roofing/emergency-roofing" },
      { label: "Roof Repairs", href: "/services/roofing/roof-repairs" },
      { label: "Flat Roofs", href: "/services/roofing/flat-roofs" },
      { label: "New and Refurbished Roofing Services", href: "/services/roofing/new-roofing" },
      { label: "Roof Inspection Survey", href: "/services/roofing/roof-survey" },
      { label: "Asphalt Roofing", href: "/services/roofing/asphalt-roofing" },
      { label: "Guttering Repairs & Fascias", href: "/services/roofing/gutter-repairs" },
    ],
  },
  {
    label: "Air Con",
    items: [
      { label: "Air Conditioning Maintenance", href: "/services/air-con/maintenance" },
      { label: "Air Conditioning Installations", href: "/services/air-con/installations" },
      { label: "Air Conditioning Repair Services", href: "/services/air-con/repairs" },
    ],
  },
  {
    label: "Building",
    items: [
      { label: "Extractor Fan Installations", href: "/services/building/extractor-fans" },
      { label: "Building Maintenance Services", href: "/services/building/maintenance" },
      { label: "Painting and Decorating", href: "/services/building/painting-decorating" },
      { label: "Tiling", href: "/services/building/tiling" },
      { label: "Plastering Services", href: "/services/building/plastering" },
      { label: "Garden Specialists", href: "/services/building/gardens" },
      { label: "Small Works", href: "/services/building/small-works" },
    ],
  },
  {
    label: "Bathrooms",
    items: [
      { label: "Bathroom Fitting & Installation", href: "/services/bathrooms/installation" },
      { label: "Bathroom Repairs", href: "/services/bathrooms/repairs" },
    ],
  },
  {
    label: "Handyman",
    href: "/services/handyman",
  },
];

export const mobileOnlyLinks: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Kitchens", href: "#" },
  { label: "Pest Control", href: "#" },
];

