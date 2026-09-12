export interface ServicePage {
  slug: string;
  title: string;
  description: string;
  category: string;
  powerType?: 'electric' | 'diesel' | 'both';
  whatCovers: string[];
  commonSigns: string[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  process?: Array<{
    title: string;
    description: string;
  }>;
  relatedServices: Array<{
    name: string;
    slug: string;
    description: string;
  }>;
}

export const servicePages: ServicePage[] = [
  {
    slug: 'electric-forklift-repair',
    title: 'Electric Forklift Repair',
    description: 'Professional repair services for electric forklifts including battery, motor, controller, and electrical system diagnostics and repair.',
    category: 'Repair Services',
    powerType: 'electric',
    whatCovers: [
      'Battery inspection, testing, and replacement',
      'Electric motor repair and rewinding',
      'Traction controller diagnosis and repair',
      'Electrical wiring and connection repairs',
      'Charger system troubleshooting',
      'Display and control panel repairs',
      'Safety system checks and calibration'
    ],
    commonSigns: [
      'Forklift fails to start or power on',
      'Reduced lifting speed or power',
      'Battery draining faster than normal',
      'Erratic movement or control response',
      'Warning lights or error codes on display',
      'Unusual noises from motor or hydraulics',
      'Intermittent power loss during operation'
    ],
    capabilities: [
      {
        title: 'Expert Diagnostics',
        description: 'Advanced electrical diagnostics to identify faults in battery, motor, controller, and wiring systems.'
      },
      {
        title: 'Component Repair',
        description: 'Repair and reconditioning of motors, controllers, and electrical components rather than costly replacements.'
      },
      {
        title: 'Battery Service',
        description: 'Complete battery inspection, water top-up guidance, terminal cleaning, and replacement when necessary.'
      }
    ],
    process: [
      {
        title: 'Inspection',
        description: 'Comprehensive electrical and mechanical inspection'
      },
      {
        title: 'Diagnosis',
        description: 'Identify root cause using diagnostic tools'
      },
      {
        title: 'Repair',
        description: 'Execute precise repairs with quality parts'
      },
      {
        title: 'Testing',
        description: 'Full operational testing before delivery'
      }
    ],
    relatedServices: [
      {
        name: 'Battery Service',
        slug: 'battery-service',
        description: 'Battery inspection, maintenance, and replacement'
      },
      {
        name: 'Traction Controller Repair',
        slug: 'traction-controller-repair',
        description: 'Controller diagnosis and repair services'
      },
      {
        name: 'Preventive Maintenance',
        slug: 'preventive-maintenance',
        description: 'Scheduled maintenance to prevent breakdowns'
      }
    ]
  },
  {
    slug: 'diesel-forklift-repair',
    title: 'Diesel Forklift Repair',
    description: 'Complete diesel forklift repair services including engine overhaul, transmission repair, hydraulic system maintenance, and fuel system diagnostics.',
    category: 'Repair Services',
    powerType: 'diesel',
    whatCovers: [
      'Engine diagnostics and overhaul',
      'Transmission repair and rebuilding',
      'Hydraulic pump and cylinder repairs',
      'Fuel system cleaning and injection repair',
      'Cooling system maintenance',
      'Exhaust and emission system checks',
      'Brake and steering system repairs'
    ],
    commonSigns: [
      'Engine difficult to start or won\'t start',
      'Black, blue, or white exhaust smoke',
      'Loss of engine power or rough running',
      'Transmission slipping or harsh shifting',
      'Hydraulic system slow or weak',
      'Excessive fuel consumption',
      'Overheating during operation',
      'Unusual engine or transmission noises'
    ],
    capabilities: [
      {
        title: 'Engine Overhauling',
        description: 'Complete engine rebuild with precision machining and quality replacement parts.'
      },
      {
        title: 'Transmission Expertise',
        description: 'Transmission diagnosis, repair, and rebuilding for smooth power delivery.'
      },
      {
        title: 'Hydraulic Systems',
        description: 'Hydraulic pump, valve, and cylinder repair for reliable lifting performance.'
      }
    ],
    process: [
      {
        title: 'Assessment',
        description: 'Thorough inspection of engine, transmission, and hydraulics'
      },
      {
        title: 'Diagnosis',
        description: 'Identify mechanical and hydraulic issues'
      },
      {
        title: 'Overhaul/Repair',
        description: 'Execute engine or transmission overhaul'
      },
      {
        title: 'Quality Test',
        description: 'Load testing and operational verification'
      }
    ],
    relatedServices: [
      {
        name: 'Engine Overhauling',
        slug: 'engine-overhauling',
        description: 'Complete engine rebuild and restoration'
      },
      {
        name: 'Transmission Overhauling',
        slug: 'transmission-overhauling',
        description: 'Transmission repair and rebuilding'
      },
      {
        name: 'Hydraulic Repair',
        slug: 'hydraulic-repair',
        description: 'Hydraulic system maintenance and repair'
      }
    ]
  },
  {
    slug: 'preventive-maintenance',
    title: 'Preventive Maintenance',
    description: 'Scheduled preventive maintenance programs to minimize downtime, extend equipment life, and maintain optimal forklift performance.',
    category: 'Maintenance Services',
    powerType: 'both',
    whatCovers: [
      'Regular inspection schedules (monthly/quarterly)',
      'Lubrication of all moving parts',
      'Battery water level checks (electric)',
      'Hydraulic fluid level and condition checks',
      'Brake system inspection and adjustment',
      'Steering system checks',
      'Tyre condition and pressure assessment',
      'Safety device testing (horn, lights, alarms)',
      'Mast and chain inspection',
      'Filter replacements (air, oil, fuel)'
    ],
    commonSigns: [
      'No scheduled maintenance program in place',
      'Equipment older than 6 months without service',
      'Increasing minor breakdowns',
      'Gradual performance decline',
      'Approaching warranty expiration',
      'High-utilization fleet requiring reliability'
    ],
    capabilities: [
      {
        title: 'Scheduled Inspections',
        description: 'Customized maintenance schedules based on usage intensity and operating conditions.'
      },
      {
        title: 'Wear Prevention',
        description: 'Early identification of wear patterns before they cause breakdowns or safety issues.'
      },
      {
        title: 'Documentation',
        description: 'Detailed service records for each maintenance visit for compliance and resale value.'
      }
    ],
    process: [
      {
        title: 'Schedule',
        description: 'Set up regular maintenance intervals'
      },
      {
        title: 'Inspect',
        description: 'Comprehensive multi-point inspection'
      },
      {
        title: 'Service',
        description: 'Lubrication, adjustments, and minor repairs'
      },
      {
        title: 'Report',
        description: 'Detailed service report with recommendations'
      }
    ],
    relatedServices: [
      {
        name: 'AMC',
        slug: 'amc',
        description: 'Annual maintenance contracts for comprehensive coverage'
      },
      {
        name: 'Breakdown Repair',
        slug: 'breakdown-repair',
        description: 'Emergency repair services when needed'
      },
      {
        name: 'Fleet Maintenance',
        slug: 'fleet-maintenance',
        description: 'Multi-forklift maintenance programs'
      }
    ]
  },
  {
    slug: 'breakdown-repair',
    title: 'Breakdown Repair',
    description: 'Emergency breakdown repair services to get your forklift back in operation quickly with minimal disruption to your operations.',
    category: 'Repair Services',
    powerType: 'both',
    whatCovers: [
      'Emergency on-site diagnostics',
      'Critical component repair or replacement',
      'Electrical fault troubleshooting',
      'Hydraulic failure repairs',
      'Engine emergency repairs',
      'Temporary fixes to enable safe movement',
      'Parts sourcing and expedited delivery'
    ],
    commonSigns: [
      'Forklift suddenly stops working',
      'Complete loss of power or function',
      'Major hydraulic leak',
      'Engine won\'t start or stalls',
      'Safety-critical failure (brakes, steering)',
      'Forklift immobilized in critical area'
    ],
    capabilities: [
      {
        title: 'Rapid Response',
        description: 'Quick dispatch of trained technicians to diagnose and address critical failures.'
      },
      {
        title: 'On-Site Service',
        description: 'Where possible, repairs conducted at your location to minimize downtime.'
      },
      {
        title: 'Parts Network',
        description: 'Established supplier network for fast parts procurement across India.'
      }
    ],
    relatedServices: [
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Specialized electric forklift repair services'
      },
      {
        name: 'Diesel Forklift Repair',
        slug: 'diesel-forklift-repair',
        description: 'Specialized diesel forklift repair services'
      },
      {
        name: 'Spare Parts',
        slug: 'spare-parts',
        description: 'Genuine and compatible spare parts supply'
      }
    ]
  },
  {
    slug: 'amc',
    title: 'Annual Maintenance Contract (AMC)',
    description: 'Comprehensive annual maintenance contracts providing scheduled servicing, priority support, and cost-effective forklift care throughout the year.',
    category: 'Maintenance Services',
    powerType: 'both',
    whatCovers: [
      'Scheduled preventive maintenance visits',
      'Comprehensive inspections and reporting',
      'Priority service support',
      'Discounted spare parts pricing',
      'Labour charges as per contract terms',
      'Technical consultation and advice',
      'Service history documentation'
    ],
    commonSigns: [
      'Multiple forklifts requiring regular maintenance',
      'Need for predictable maintenance budgeting',
      'Desire for priority service support',
      'Requirement for documented service history',
      'Long-term equipment reliability goals'
    ],
    capabilities: [
      {
        title: 'Customized Plans',
        description: 'AMC plans tailored to your fleet size, usage patterns, and operational requirements.'
      },
      {
        title: 'Cost Predictability',
        description: 'Fixed annual costs for planned maintenance, avoiding unexpected repair bills.'
      },
      {
        title: 'Priority Support',
        description: 'AMC customers receive priority scheduling for both routine and emergency services.'
      }
    ],
    process: [
      {
        title: 'Assessment',
        description: 'Evaluate your fleet and operational needs'
      },
      {
        title: 'Proposal',
        description: 'Customized AMC plan with scope and pricing'
      },
      {
        title: 'Agreement',
        description: 'Contract finalization and scheduling'
      },
      {
        title: 'Execution',
        description: 'Regular maintenance as per agreed schedule'
      }
    ],
    relatedServices: [
      {
        name: 'Preventive Maintenance',
        slug: 'preventive-maintenance',
        description: 'Individual preventive maintenance services'
      },
      {
        name: 'Fleet Maintenance',
        slug: 'fleet-maintenance',
        description: 'Multi-forklift maintenance programs'
      },
      {
        name: 'Breakdown Repair',
        slug: 'breakdown-repair',
        description: 'Emergency repair services'
      }
    ]
  },
  {
    slug: 'battery-service',
    title: 'Battery Service',
    description: 'Complete forklift battery services including inspection, maintenance, reconditioning, water top-up guidance, and replacement with quality batteries.',
    category: 'Power Systems',
    powerType: 'electric',
    whatCovers: [
      'Battery health inspection and testing',
      'Water level checks and top-up guidance',
      'Terminal cleaning and corrosion prevention',
      'Battery reconditioning services',
      'Charging system evaluation',
      'Battery replacement with quality units',
      'Used battery buyback/exchange'
    ],
    commonSigns: [
      'Reduced runtime between charges',
      'Battery not holding full charge',
      'Visible corrosion on terminals',
      'Low water levels frequently',
      'Battery age over 3-4 years',
      'Swollen or damaged battery case',
      'Inconsistent power delivery'
    ],
    capabilities: [
      {
        title: 'Battery Testing',
        description: 'Professional load testing and capacity assessment to determine battery health.'
      },
      {
        title: 'Reconditioning',
        description: 'Restoration services to extend battery life when economically viable.'
      },
      {
        title: 'Quality Replacement',
        description: 'Supply of new batteries from trusted manufacturers with warranty support.'
      }
    ],
    relatedServices: [
      {
        name: 'Charger Service',
        slug: 'charger-service',
        description: 'Battery charger repair and maintenance'
      },
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Complete electric forklift repair'
      },
      {
        name: 'Traction Controller Repair',
        slug: 'traction-controller-repair',
        description: 'Controller diagnosis and repair'
      }
    ]
  },
  {
    slug: 'charger-service',
    title: 'Charger Service',
    description: 'Forklift battery charger repair, maintenance, and diagnostics to ensure proper charging and maximize battery life.',
    category: 'Power Systems',
    powerType: 'electric',
    whatCovers: [
      'Charger diagnostics and troubleshooting',
      'Circuit board repair and replacement',
      'Voltage and current calibration',
      'Connector and cable repairs',
      'Cooling fan and ventilation checks',
      'Safety feature testing',
      'Charging cycle optimization'
    ],
    commonSigns: [
      'Charger not powering on',
      'Incomplete charging cycles',
      'Overcharging or undercharging',
      'Charger overheating',
      'Error codes or warning lights',
      'Unusual noises from charger',
      'Intermittent charging'
    ],
    capabilities: [
      {
        title: 'Electronic Repair',
        description: 'PCB-level diagnostics and component replacement for various charger brands.'
      },
      {
        title: 'Calibration',
        description: 'Precise voltage and current calibration for optimal battery charging.'
      },
      {
        title: 'Safety Checks',
        description: 'Verification of all safety features including thermal protection and auto-shutoff.'
      }
    ],
    relatedServices: [
      {
        name: 'Battery Service',
        slug: 'battery-service',
        description: 'Battery inspection and maintenance'
      },
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Electric forklift electrical system repair'
      }
    ]
  },
  {
    slug: 'traction-controller-repair',
    title: 'Traction Controller Repair',
    description: 'Specialized repair services for forklift traction controllers including diagnostics, component-level repair, and replacement.',
    category: 'Power Systems',
    powerType: 'electric',
    whatCovers: [
      'Controller diagnostics and fault code reading',
      'PCB inspection and component testing',
      'MOSFET/IGBT replacement',
      'Potentiometer and throttle input repair',
      'Software parameter checking',
      'Connector and wiring repairs',
      'Controller programming and configuration'
    ],
    commonSigns: [
      'Forklift moves erratically or jerky',
      'No response to accelerator input',
      'Limited speed or power',
      'Controller error codes displayed',
      'Intermittent operation',
      'Forklift goes into limp mode',
      'Burning smell from controller area'
    ],
    capabilities: [
      {
        title: 'Component-Level Repair',
        description: 'Repair of individual components on controller boards rather than expensive full replacements.'
      },
      {
        title: 'Multi-Brand Experience',
        description: 'Experience with controllers from Curtis, Zapi, Sevcon, and other major manufacturers.'
      },
      {
        title: 'Testing Facilities',
        description: 'Proper test setups to verify controller function before return to service.'
      }
    ],
    relatedServices: [
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Complete electric forklift repair services'
      },
      {
        name: 'Battery Service',
        slug: 'battery-service',
        description: 'Battery and charging system service'
      }
    ]
  },
  {
    slug: 'engine-overhauling',
    title: 'Engine Overhauling',
    description: 'Complete diesel forklift engine overhauling including block inspection, component replacement, machining, and precision reassembly.',
    category: 'Repair Services',
    powerType: 'diesel',
    whatCovers: [
      'Complete engine disassembly',
      'Block and head inspection',
      'Cylinder measurement and honing',
      'Piston and ring replacement',
      'Crankshaft inspection and grinding',
      'Bearings and seals replacement',
      'Fuel injection pump overhaul',
      'Valve grinding and seat cutting',
      'Oil pump and water pump service',
      'Timing gear and chain replacement'
    ],
    commonSigns: [
      'Excessive oil consumption',
      'Loss of compression and power',
      'Heavy exhaust smoke (blue/black)',
      'Knocking or rattling engine noises',
      'High mileage without previous overhaul',
      'Failed compression test',
      'Metal particles in oil'
    ],
    capabilities: [
      {
        title: 'Precision Machining',
        description: 'Cylinder boring, honing, crankshaft grinding through trusted machine shop partners.'
      },
      {
        title: 'Quality Parts',
        description: 'Use of genuine or high-quality compatible parts for longevity.'
      },
      {
        title: 'Expert Reassembly',
        description: 'Technicians with extensive experience in diesel engine assembly and timing.'
      }
    ],
    process: [
      {
        title: 'Teardown',
        description: 'Complete engine disassembly and cleaning'
      },
      {
        title: 'Inspection',
        description: 'Detailed measurement and wear assessment'
      },
      {
        title: 'Machining',
        description: 'Precision machining of block, head, crankshaft'
      },
      {
        title: 'Rebuild',
        description: 'Careful reassembly with new components'
      },
      {
        title: 'Testing',
        description: 'Dyno or load testing before installation'
      }
    ],
    relatedServices: [
      {
        name: 'Diesel Forklift Repair',
        slug: 'diesel-forklift-repair',
        description: 'Complete diesel forklift repair'
      },
      {
        name: 'Transmission Overhauling',
        slug: 'transmission-overhauling',
        description: 'Transmission repair and rebuilding'
      },
      {
        name: 'Fuel System Repair',
        slug: 'fuel-system-repair',
        description: 'Fuel injection and pump service'
      }
    ]
  },
  {
    slug: 'transmission-overhauling',
    title: 'Transmission Overhauling',
    description: 'Complete forklift transmission overhaul services including clutch packs, bands, gears, and hydraulic circuit repair.',
    category: 'Repair Services',
    powerType: 'diesel',
    whatCovers: [
      'Transmission removal and disassembly',
      'Clutch pack and band inspection',
      'Gear and bearing replacement',
      'Torque converter evaluation',
      'Valve body cleaning and repair',
      'Seal and gasket replacement',
      'Hydraulic pressure testing',
      'Shift linkage adjustment'
    ],
    commonSigns: [
      'Slipping between gears',
      'Harsh or delayed shifts',
      'Transmission fluid leaks',
      'Whining or grinding noises',
      'Failure to engage forward/reverse',
      'Burnt smelling transmission fluid',
      'Metal particles in fluid'
    ],
    capabilities: [
      {
        title: 'Complete Rebuild',
        description: 'Full transmission teardown and rebuild with all wear components replaced.'
      },
      {
        title: 'Hydraulic Expertise',
        description: 'Understanding of transmission hydraulic circuits for proper shift quality.'
      },
      {
        title: 'Testing',
        description: 'Pressure testing and operational verification before return to service.'
      }
    ],
    relatedServices: [
      {
        name: 'Diesel Forklift Repair',
        slug: 'diesel-forklift-repair',
        description: 'Complete diesel forklift repair'
      },
      {
        name: 'Engine Overhauling',
        slug: 'engine-overhauling',
        description: 'Engine rebuild services'
      },
      {
        name: 'Hydraulic Repair',
        slug: 'hydraulic-repair',
        description: 'Hydraulic system service'
      }
    ]
  },
  {
    slug: 'hydraulic-repair',
    title: 'Hydraulic Repair',
    description: 'Forklift hydraulic system repair including pumps, cylinders, valves, hoses, and complete system diagnostics.',
    category: 'Repair Services',
    powerType: 'both',
    whatCovers: [
      'Hydraulic pump repair or replacement',
      'Lift and tilt cylinder seal replacement',
      'Control valve inspection and repair',
      'Hydraulic hose replacement',
      'System pressure testing',
      'Hydraulic fluid and filter change',
      'Leak diagnosis and repair',
      'Mast chain inspection and replacement'
    ],
    commonSigns: [
      'Slow lifting or lowering speed',
      'Weak lifting capacity',
      'Hydraulic fluid leaks visible',
      'Jerky or uneven mast movement',
      'Drifting when controls neutral',
      'Unusual pump noise',
      'Overheating hydraulic system'
    ],
    capabilities: [
      {
        title: 'System Diagnostics',
        description: 'Pressure testing and flow analysis to pinpoint hydraulic issues.'
      },
      {
        title: 'Cylinder Service',
        description: 'Seal replacement and cylinder reconditioning for lift and tilt functions.'
      },
      {
        title: 'Component Supply',
        description: 'Access to hydraulic pumps, valves, cylinders, and hoses from quality suppliers.'
      }
    ],
    relatedServices: [
      {
        name: 'Diesel Forklift Repair',
        slug: 'diesel-forklift-repair',
        description: 'Diesel forklift complete repair'
      },
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Electric forklift complete repair'
      },
      {
        name: 'Spare Parts',
        slug: 'spare-parts',
        description: 'Hydraulic components and seals'
      }
    ]
  },
  {
    slug: 'tyre-service',
    title: 'Tyre Service',
    description: 'Forklift tyre inspection, replacement, and fitting services for solid, pneumatic, and polyurethane tyres.',
    category: 'Parts & Tyres',
    powerType: 'both',
    whatCovers: [
      'Tyre condition inspection',
      'Solid tyre replacement',
      'Pneumatic tyre replacement',
      'Polyurethane tyre fitting',
      'Wheel rim inspection',
      'Tyre pressure checks (pneumatic)',
      'Balancing where applicable'
    ],
    commonSigns: [
      'Visible tyre wear or damage',
      'Chunks missing from solid tyres',
      'Flat or leaking pneumatic tyres',
      'Uneven wear patterns',
      'Tyres worn to wear bars',
      'Cracks or dry rot',
      'Vibration during operation'
    ],
    capabilities: [
      {
        title: 'Tyre Types',
        description: 'Supply and fitting of solid, pneumatic, and polyurethane tyres in various sizes.'
      },
      {
        title: 'Press Fit Service',
        description: 'Proper equipment for solid tyre pressing onto rims.'
      },
      {
        title: 'Wear Assessment',
        description: 'Professional evaluation of tyre condition and remaining life.'
      }
    ],
    relatedServices: [
      {
        name: 'Spare Parts',
        slug: 'spare-parts',
        description: 'Forklift spare parts supply'
      },
      {
        name: 'Preventive Maintenance',
        slug: 'preventive-maintenance',
        description: 'Regular inspection including tyres'
      }
    ]
  },
  {
    slug: 'spare-parts',
    title: 'Spare Parts',
    description: 'Supply of genuine and compatible forklift spare parts including electrical, hydraulic, engine, and structural components.',
    category: 'Parts & Tyres',
    powerType: 'both',
    whatCovers: [
      'Electrical components (switches, sensors, contactors)',
      'Hydraulic components (seals, hoses, fittings)',
      'Engine parts (filters, belts, gaskets)',
      'Transmission components',
      'Brake system parts',
      'Steering components',
      'Mast and carriage parts',
      'Tyres and wheels'
    ],
    commonSigns: [
      'Need for replacement part due to wear',
      'Part failure requiring immediate replacement',
      'Preventive maintenance parts requirement',
      'Refurbishment project needs',
      'Emergency breakdown part need'
    ],
    capabilities: [
      {
        title: 'Multi-Brand Parts',
        description: 'Parts available for Jungheinrich, Toyota, BT, Jost, Maini, Godrej, Voltas, and other brands.'
      },
      {
        title: 'Sourcing Network',
        description: 'Established supplier relationships for fast parts procurement across India.'
      },
      {
        title: 'Technical Guidance',
        description: 'Help identifying correct part numbers and compatible alternatives.'
      }
    ],
    relatedServices: [
      {
        name: 'Electric Forklift Repair',
        slug: 'electric-forklift-repair',
        description: 'Repair services with parts replacement'
      },
      {
        name: 'Diesel Forklift Repair',
        slug: 'diesel-forklift-repair',
        description: 'Repair services with parts replacement'
      },
      {
        name: 'Tyre Service',
        slug: 'tyre-service',
        description: 'Tyre supply and fitting'
      }
    ]
  },
  {
    slug: 'forklift-rental',
    title: 'Forklift Rental',
    description: 'Short-term and long-term forklift rental services with well-maintained electric and diesel forklifts in various capacities.',
    category: 'Rental Services',
    powerType: 'both',
    whatCovers: [
      'Short-term rental (days/weeks)',
      'Long-term rental (months/years)',
      'Electric forklift rental options',
      'Diesel forklift rental options',
      'Various capacity options',
      'Delivery and pickup arrangements',
      'Operator training (on request)',
      'Maintenance included in rental'
    ],
    commonSigns: [
      'Temporary capacity increase needed',
      'Equipment under maintenance',
      'Seasonal demand fluctuations',
      'Project-based material handling need',
      'Evaluating before purchase decision',
      'Budget constraints for capital expenditure'
    ],
    capabilities: [
      {
        title: 'Flexible Terms',
        description: 'Rental periods from days to years based on customer requirements.'
      },
      {
        title: 'Well-Maintained Fleet',
        description: 'All rental equipment is regularly serviced and in good working condition.'
      },
      {
        title: 'Support Included',
        description: 'Maintenance support during rental period for uninterrupted operation.'
      }
    ],
    relatedServices: [
      {
        name: 'Refurbishment',
        slug: 'refurbishment',
        description: 'Used forklift refurbishment and sales'
      },
      {
        name: 'Preventive Maintenance',
        slug: 'preventive-maintenance',
        description: 'Maintenance for owned equipment'
      }
    ]
  },
  {
    slug: 'refurbishment',
    title: 'Refurbishment',
    description: 'Complete forklift refurbishment services to restore used forklifts to reliable working condition at a fraction of new equipment cost.',
    category: 'Rental Services',
    powerType: 'both',
    whatCovers: [
      'Complete mechanical overhaul',
      'Engine/transmission rebuild (diesel)',
      'Battery and motor service (electric)',
      'Hydraulic system restoration',
      'Paint and cosmetic restoration',
      'Safety system updates',
      'Final testing and quality check'
    ],
    commonSigns: [
      'Aging forklift with declining performance',
      'High repair frequency on old equipment',
      'Need for reliable equipment on budget',
      'Forklift acquired through business transfer',
      'Desire to extend equipment life'
    ],
    capabilities: [
      {
        title: 'Complete Restoration',
        description: 'End-to-end refurbishment covering mechanical, hydraulic, electrical, and cosmetic aspects.'
      },
      {
        title: 'Cost-Effective',
        description: 'Refurbishment typically 40-60% lower cost than new equipment purchase.'
      },
      {
        title: 'Quality Assurance',
        description: 'Tested and verified before delivery with warranty on refurbished components.'
      }
    ],
    process: [
      {
        title: 'Evaluation',
        description: 'Assess current condition and feasibility'
      },
      {
        title: 'Scope',
        description: 'Define refurbishment scope and quotation'
      },
      {
        title: 'Execution',
        description: 'Complete teardown and restoration'
      },
      {
        title: 'Testing',
        description: 'Comprehensive operational testing'
      },
      {
        title: 'Delivery',
        description: 'Ready-to-work refurbished forklift'
      }
    ],
    relatedServices: [
      {
        name: 'Forklift Rental',
        slug: 'forklift-rental',
        description: 'Rental options including refurbished units'
      },
      {
        name: 'Engine Overhauling',
        slug: 'engine-overhauling',
        description: 'Engine rebuild component of refurbishment'
      },
      {
        name: 'Hydraulic Repair',
        slug: 'hydraulic-repair',
        description: 'Hydraulic restoration work'
      }
    ]
  }
];
