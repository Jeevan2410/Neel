// Site Configuration for NEEL ENTERPRISES
// Centralized configuration constants

export const siteConfig = {
  // Company Information
  company: {
    name: 'NEEL ENTERPRISES',
    tagline: 'Material Handling Engineering',
    experience: 18, // years
    email: 'neelenterprises.741@gmail.com',
    phone: '+91 81051 42089',
    whatsapp: '+91 81051 42089'
  },

  // Locations
  locations: {
    registered: {
      name: 'Registered Office',
      address: 'No.11-87/3 & 11-87/4, SDANANDA BUILDING, KINNIGOLI MAIN ROAD, OPPOSITE DURGAPRASAD RECIDENCY, MENNABETU, KINNIGOLI – 574150',
      city: 'Kinnigoli',
      state: 'Karnataka',
      pincode: '574150',
      googleMapsUrl: 'https://maps.google.com/?q=Kinnigoli+574150'
    },
    branch: {
      name: 'Branch Office',
      address: 'Sy No-14/5, Hanuman Layout, Hesaraghatta Main Road, Near Chikkabanavara Railway Station, Chikkabanavara, Bangalore – 560090',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560090',
      googleMapsUrl: 'https://maps.google.com/?q=Chikkabanavara+Railway+Station+Bangalore'
    }
  },

  // Supported Languages
  languages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ],
  defaultLanguage: 'en',

  // Service Categories (toggleable in admin)
  services: {
    repair: {
      enabled: true,
      items: [
        'electric-forklift-repair',
        'diesel-forklift-repair',
        'breakdown-repair',
        'electrical-repair',
        'mechanical-repair',
        'hydraulic-repair',
        'controller-repair',
        'engine-repair',
        'transmission-repair'
      ]
    },
    maintenance: {
      enabled: true,
      items: [
        'preventive-maintenance',
        'scheduled-inspections',
        'fleet-maintenance',
        'amc',
        'service-contracts'
      ]
    },
    powerSystems: {
      enabled: true,
      items: [
        'battery-sales',
        'battery-inspection',
        'battery-service',
        'battery-reconditioning',
        'charger-repair',
        'charger-service',
        'traction-controller-repair',
        'electrical-diagnostics'
      ]
    },
    parts: {
      enabled: true,
      items: [
        'spare-parts',
        'tyres-wheels',
        'hydraulic-components',
        'electrical-components'
      ]
    },
    rental: {
      enabled: true,
      items: [
        'forklift-rental',
        'used-forklift-sales',
        'forklift-refurbishment'
      ]
    },
    other: {
      enabled: true,
      items: [
        'on-site-service'
      ]
    }
  },

  // Brands with Technical Experience (NOT authorized partners unless confirmed)
  brands: [
    'Jungheinrich',
    'Toyota',
    'BT',
    'Jost',
    'Maini',
    'Macneill',
    'Baka',
    'Godrej',
    'Voltas'
  ],

  // Industries Served
  industries: [
    { slug: 'automotive', name: 'Automobile' },
    { slug: 'engineering', name: 'Engineering' },
    { slug: 'pharma', name: 'Pharmaceuticals' },
    { slug: 'warehousing', name: 'Warehousing & Logistics' }
  ],

  // Social Media (to be added later - configurable)
  social: {
    // facebook: '',
    // linkedin: '',
    // instagram: '',
    // youtube: ''
  },

  // SEO Defaults
  seo: {
    titleTemplate: '%s | NEEL ENTERPRISES',
    defaultTitle: 'NEEL ENTERPRISES - Material Handling Engineering',
    defaultDescription: 'Professional forklift repair, maintenance, spare parts, and rental services. 18+ years of experience in material handling equipment across India.',
    defaultKeywords: ['forklift repair', 'material handling', 'industrial equipment', 'forklift maintenance', 'battery service'],
    openGraphType: 'website',
    twitterHandle: '' // to be added
  },

  // Conversion CTAs
  ctas: {
    primary: 'Request Service',
    secondary: 'Explore Services',
    whatsapp: 'WhatsApp Us',
    email: 'Email Us'
  },

  // Enquiry Types
  enquiryTypes: [
    'general',
    'service',
    'breakdown',
    'maintenance',
    'amc',
    'rental',
    'spare_parts',
    'battery',
    'charger',
    'used_equipment',
    'other'
  ] as const,

  // Feature Flags
  features: {
    enable3D: true,
    enableAdmin: true,
    enableMultilingual: true,
    enableDarkMode: true,
    enableAnalytics: false, // enable when configured
    enableBlog: false // future feature
  }
} as const;

// WhatsApp message templates
export const whatsappMessages = {
  general: 'Hello NEEL ENTERPRISES, I would like to enquire about your forklift services.',
  breakdown: 'Hello NEEL ENTERPRISES, I need urgent help with a forklift breakdown.',
  service: 'Hello NEEL ENTERPRISES, I need help with forklift service.',
  rental: 'Hello NEEL ENTERPRISES, I am interested in forklift rental.',
  parts: 'Hello NEEL ENTERPRISES, I need to enquire about spare parts.'
} as const;

// Export types
export type EnquiryType = typeof siteConfig.enquiryTypes[number];
export type LanguageCode = 'en' | 'kn' | 'hi';
export type ServiceCategory = keyof typeof siteConfig.services;
