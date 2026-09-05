export type UserRole = 'patient' | 'doctor' | 'admin' | 'caregiver'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  title?: string
  message: string
  type: ToastType
  duration?: number
}

export type PatientJourneyStep =
  | 'identify'
  | 'consent'
  | 'language'
  | 'history'
  | 'ayush'
  | 'jihva'
  | 'nadi'
  | 'documents'
  | 'summary'
  | 'token'

export interface StepItem {
  id: PatientJourneyStep
  title: string
  subtitle: string
  path: string
  optional?: boolean
}

export interface PatientDemographics {
  abhaId?: string
  fullName: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  mobile: string
  district: string
  state: string
  languagePreference: string
  isReturning: boolean
}

export interface ClinicalHistoryDraft {
  chiefComplaints: string[]
  duration: string
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Acute'
  associatedSymptoms: string[]
  pastIllnesses: string[]
  medications: string[]
  allergies: string[]
  redFlagsDetected: boolean
  redFlagNotes?: string
}

export interface AyushAssessmentDraft {
  dominantDosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic'
  prakritiScores: {
    vata: number
    pitta: number
    kapha: number
  }
  agniStatus: 'Sama' | 'Vishama' | 'Tikshna' | 'Manda'
  kosthaStatus: 'Mrudu' | 'Madhyama' | 'Krura'
  sleepPattern: string
  appetite: string
}

export interface JihvaParikshaDraft {
  coatingColor: 'White' | 'Yellow' | 'Brown' | 'Normal Pink'
  coatingThickness: 'Thin' | 'Moderate' | 'Heavy' | 'None'
  moisture: 'Dry' | 'Normal' | 'Excessively Wet'
  cracks: boolean
  scallopedEdges: boolean
  amaIndication: 'None' | 'Mild' | 'Moderate' | 'Severe'
  sampleImagePath?: string
}

export interface NadiParikshaDraft {
  gati: 'Sarpa (Cobra/Vata)' | 'Manduka (Frog/Pitta)' | 'Hamsa (Swan/Kapha)' | 'Mixed'
  rateBpm: number
  rhythm: 'Regular' | 'Irregular'
  vegaVelocity: 'Tivra (High)' | 'Madhyama (Medium)' | 'Manda (Slow)'
  balaStrength: 'Uttama (Strong)' | 'Madhyama (Moderate)' | 'Alpa (Weak)'
}

export interface MedicalDocumentDraft {
  id: string
  name: string
  type: 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Other'
  date: string
  status: 'Parsed' | 'Processing' | 'Pending'
  extractedEntitiesCount: number
}

export interface PatientQueueItem {
  id: string
  tokenNumber: string
  patientName: string
  age: number
  gender: string
  chiefComplaint: string
  intakeTime: string
  priority: 'Routine' | 'Urgent' | 'Red-Flag'
  dominantDosha: string
  status: 'Waiting' | 'In Consultation' | 'Completed'
}
