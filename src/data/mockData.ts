import type { PatientQueueItem } from '@/types'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', popular: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', popular: true },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', popular: true },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', popular: true },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', popular: false },
  { code: 'mr', name: 'Marathi', native: 'मराठी', popular: true },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', popular: true },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', popular: false },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', popular: false },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', popular: false },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', popular: false },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', popular: false },
]

export const MOCK_PATIENT_QUEUE: PatientQueueItem[] = [
  {
    id: 'pat-001',
    tokenNumber: 'A-102',
    patientName: 'Rameshwar Sharma',
    age: 54,
    gender: 'Male',
    chiefComplaint: 'Sandhivata (Joint stiffness & pain, knees) x 3 months',
    intakeTime: '10:14 AM',
    priority: 'Routine',
    dominantDosha: 'Vata-Kapha',
    status: 'Waiting',
  },
  {
    id: 'pat-002',
    tokenNumber: 'A-103',
    patientName: 'Ananya Deshmukh',
    age: 38,
    gender: 'Female',
    chiefComplaint: 'Amlapitta (Acid peptic disorder, burning chest)',
    intakeTime: '10:20 AM',
    priority: 'Routine',
    dominantDosha: 'Pitta',
    status: 'In Consultation',
  },
  {
    id: 'pat-003',
    tokenNumber: 'A-104',
    patientName: 'Gurpreet Singh',
    age: 62,
    gender: 'Male',
    chiefComplaint: 'Chest tightness, radiating pain to left arm',
    intakeTime: '10:28 AM',
    priority: 'Red-Flag',
    dominantDosha: 'Vata',
    status: 'Waiting',
  },
  {
    id: 'pat-004',
    tokenNumber: 'A-105',
    patientName: 'Meenakshi Sundaram',
    age: 46,
    gender: 'Female',
    chiefComplaint: 'Sthoulya (Metabolic imbalance) & Nidranasa (Insomnia)',
    intakeTime: '10:35 AM',
    priority: 'Routine',
    dominantDosha: 'Kapha-Vata',
    status: 'Waiting',
  },
  {
    id: 'pat-005',
    tokenNumber: 'A-106',
    patientName: 'Vikas Patel',
    age: 29,
    gender: 'Male',
    chiefComplaint: 'Tvak Vikara (Eczematous dry patches on skin)',
    intakeTime: '10:42 AM',
    priority: 'Routine',
    dominantDosha: 'Pitta-Vata',
    status: 'Waiting',
  },
]

export const MOCK_DETAILED_PATIENT = {
  id: 'pat-001',
  tokenNumber: 'A-102',
  abhaId: '91-4829-1029-4820',
  name: 'Rameshwar Sharma',
  age: 54,
  gender: 'Male',
  mobile: '+91 98765 43210',
  intakeTimestamp: '05 Sep 2026, 10:14 AM',
  kioskTerminal: 'AYUSH-KIOSK-04 (OPD Ground Floor)',
  languageUsed: 'Hindi / हिन्दी (Voice intake transcribed)',
  
  history: {
    chiefComplaint: 'Bilateral knee joint pain (Janu Sandhigata Vata), increased in morning and during cold weather',
    duration: '3 months, gradually worsening',
    associatedSymptoms: ['Crepitus on bending', 'Morning stiffness lasting 25 mins', 'Mild pedal heaviness'],
    aggravatingFactors: ['Cold climate', 'Prolonged standing', 'Late night sleep'],
    relievingFactors: ['Warm oil application (Til Taila)', 'Sunlight exposure', 'Rest'],
    allergies: ['No known drug allergies', 'Dust / allergic rhinitis in autumn'],
    currentMedications: ['Shallaki 500mg BD (self-started)', 'Tab Paracetamol SOS'],
    redFlagsIdentified: false,
    redFlagAudit: 'No signs of septic arthritis, fever, or neurovascular deficits.',
  },

  ayushAssessment: {
    prakriti: 'Vata-Kapha',
    scores: { vata: 58, pitta: 18, kapha: 24 },
    agni: 'Vishama Agni (Irregular digestive fire, prone to bloating)',
    kostha: 'Krura Kostha (Tendency towards dry hard stools)',
    bala: 'Madhyama (Medium vitality)',
    manasikaPrakriti: 'Rajasika-Tamasika',
  },

  jihvaPariksha: {
    coatingColor: 'White coating at posterior 1/3rd (indicates Sama Vata / colon Ama)',
    coatingThickness: 'Moderate',
    moisture: 'Dry surface with micro-fissures',
    edges: 'Mild indentations / teeth marks (indicates Agnimandya)',
    aiConfidence: '94.2% based on standardized Jihva image model',
  },

  nadiPariksha: {
    gati: 'Sarpa Gati (Snake-like / Vata predominant movement)',
    rateBpm: 74,
    rhythm: 'Regular',
    pulseQuality: 'Khara (Rough / Dry)',
    recordedVia: 'Supplementary Digital Pulse Sensor (Prototype)',
  },

  documents: [
    {
      id: 'doc-1',
      title: 'Bilateral Knee X-Ray Report',
      date: '14 Aug 2026',
      extractedFinding: 'Grade II Osteoarthritis changes, reduced medial joint space.',
    },
    {
      id: 'doc-2',
      title: 'Serum Uric Acid & ESR Report',
      date: '18 Aug 2026',
      extractedFinding: 'Uric Acid: 5.8 mg/dL (Normal). ESR: 28 mm/hr (Mildly elevated).',
    },
  ],

  aiSummary: {
    diagnosticImpression: 'Janu Sandhigata Vata with mild Ama lakshanas (ICD-11 AYUSH: SD-142)',
    treatmentRationale: 'Deepana-Pachana to clear Ama, followed by Snehana (Abhyanga with Mahanarayana Taila) and Vata-shamaka Rasayana.',
    confidenceScore: 0.96,
  },
}

export const MOCK_ADMIN_METRICS = {
  activeKiosks: 8,
  totalIntakesToday: 246,
  avgIntakeTimeMinutes: 4.2,
  redFlagsIntercepted: 7,
  topLanguages: [
    { language: 'Hindi', count: 118, pct: '48%' },
    { language: 'English', count: 54, pct: '22%' },
    { language: 'Tamil', count: 32, pct: '13%' },
    { language: 'Telugu', count: 24, pct: '10%' },
    { language: 'Marathi', count: 18, pct: '7%' },
  ],
  systemHealth: {
    abhaBridge: 'Operational (ABDM Sandbox connected)',
    voiceRecognition: '98.8% accuracy',
    ocrPipeline: 'Operational (Tesseract & Medical NER)',
    fhirExport: 'Compliant (v4.0.1)',
  },
}
