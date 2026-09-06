import React, { createContext, useContext, useState } from 'react'

export interface PreviousHistory {
  lastVisit: string
  previousConcern: string
  previousMedication: string
  deltaStatus?: 'unchanged' | 'changed'
}

export interface AccessibilitySettings {
  audioPrompts: boolean
  pictorialMode: boolean
  visualSignPrompts: boolean
  largeText: boolean
}

export interface PatientSessionState {
  patientType: 'abha' | 'new' | 'caregiver'
  patientName: string
  age: string
  gender: string
  abhaDemoId: string
  isReturningPatient: boolean
  previousHistory: PreviousHistory
  selectedLanguage: string
  inputMode: 'speak' | 'type' | 'tap'
  consentGiven: boolean
  caregiverMode: boolean
  caregiverRelationship: string
  priorityStatus: 'Routine' | 'Red-Flag' | 'Priority'
  accessibility: AccessibilitySettings
}

export interface PatientContextType {
  state: PatientSessionState
  setPatientType: (type: 'abha' | 'new' | 'caregiver') => void
  setPatientBasicInfo: (name: string, age: string, gender: string) => void
  setAbhaId: (id: string) => void
  verifyMockAbha: (id?: string) => void
  setReturningDeltaChoice: (choice: 'unchanged' | 'changed') => void
  setCaregiverRelationship: (relationship: string) => void
  setConsent: (given: boolean) => void
  setSelectedLanguage: (lang: string) => void
  setInputMode: (mode: 'speak' | 'type' | 'tap') => void
  toggleAccessibility: (key: keyof AccessibilitySettings) => void
  setCaregiverMode: (active: boolean) => void
  resetSession: () => void
}

const DEFAULT_PREVIOUS_HISTORY: PreviousHistory = {
  lastVisit: '12 August 2026',
  previousConcern: 'Digestive discomfort',
  previousMedication: 'Demo Medicine',
  deltaStatus: undefined,
}

const DEFAULT_STATE: PatientSessionState = {
  patientType: 'abha',
  patientName: 'Lakshmi Devi',
  age: '52',
  gender: 'Female',
  abhaDemoId: '91-4829-1029-4820',
  isReturningPatient: false,
  previousHistory: DEFAULT_PREVIOUS_HISTORY,
  selectedLanguage: 'English',
  inputMode: 'speak',
  consentGiven: false,
  caregiverMode: false,
  caregiverRelationship: '',
  priorityStatus: 'Routine',
  accessibility: {
    audioPrompts: false,
    pictorialMode: false,
    visualSignPrompts: false,
    largeText: false,
  },
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PatientSessionState>(() => {
    // Try restoring from sessionStorage if available
    try {
      const saved = sessionStorage.getItem('medikiosk_patient_session')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATE
  })

  // Helper to persist in sessionStorage
  const updateState = (updater: (prev: PatientSessionState) => PatientSessionState) => {
    setState((prev) => {
      const next = updater(prev)
      try {
        sessionStorage.setItem('medikiosk_patient_session', JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const setPatientType = (type: 'abha' | 'new' | 'caregiver') => {
    updateState((prev) => ({
      ...prev,
      patientType: type,
      caregiverMode: type === 'caregiver' ? true : prev.caregiverMode,
    }))
  }

  const setPatientBasicInfo = (name: string, age: string, gender: string) => {
    updateState((prev) => ({
      ...prev,
      patientName: name,
      age,
      gender,
    }))
  }

  const setAbhaId = (id: string) => {
    updateState((prev) => ({
      ...prev,
      abhaDemoId: id,
    }))
  }

  const verifyMockAbha = (id?: string) => {
    updateState((prev) => ({
      ...prev,
      abhaDemoId: id || prev.abhaDemoId,
      patientType: 'abha',
      isReturningPatient: true,
      patientName: 'Lakshmi Devi',
      age: '52',
      gender: 'Female',
      previousHistory: {
        lastVisit: '12 August 2026',
        previousConcern: 'Digestive discomfort',
        previousMedication: 'Demo Medicine',
        deltaStatus: undefined,
      },
    }))
  }

  const setReturningDeltaChoice = (choice: 'unchanged' | 'changed') => {
    updateState((prev) => ({
      ...prev,
      previousHistory: {
        ...prev.previousHistory,
        deltaStatus: choice,
      },
    }))
  }

  const setCaregiverRelationship = (relationship: string) => {
    updateState((prev) => ({
      ...prev,
      caregiverMode: true,
      caregiverRelationship: relationship,
    }))
  }

  const setConsent = (given: boolean) => {
    updateState((prev) => ({
      ...prev,
      consentGiven: given,
    }))
  }

  const setSelectedLanguage = (lang: string) => {
    updateState((prev) => ({
      ...prev,
      selectedLanguage: lang,
    }))
  }

  const setInputMode = (mode: 'speak' | 'type' | 'tap') => {
    updateState((prev) => ({
      ...prev,
      inputMode: mode,
    }))
  }

  const toggleAccessibility = (key: keyof AccessibilitySettings) => {
    updateState((prev) => {
      const nextVal = !prev.accessibility[key]
      // If largeText toggled, apply to document root
      if (key === 'largeText') {
        const root = document.documentElement
        root.style.setProperty('--app-font-scale', nextVal ? '1.2' : '1')
      }
      return {
        ...prev,
        accessibility: {
          ...prev.accessibility,
          [key]: nextVal,
        },
      }
    })
  }

  const setCaregiverMode = (active: boolean) => {
    updateState((prev) => ({
      ...prev,
      caregiverMode: active,
      patientType: active ? 'caregiver' : prev.patientType,
    }))
  }

  const resetSession = () => {
    try {
      sessionStorage.removeItem('medikiosk_patient_session')
    } catch {
      // ignore
    }
    setState(DEFAULT_STATE)
  }

  return (
    <PatientContext.Provider
      value={{
        state,
        setPatientType,
        setPatientBasicInfo,
        setAbhaId,
        verifyMockAbha,
        setReturningDeltaChoice,
        setCaregiverRelationship,
        setConsent,
        setSelectedLanguage,
        setInputMode,
        toggleAccessibility,
        setCaregiverMode,
        resetSession,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

export function usePatient() {
  const context = useContext(PatientContext)
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider')
  }
  return context
}
