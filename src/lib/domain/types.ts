export type UserRole = 'ATHLETE' | 'GUARDIAN' | 'DOCTOR' | 'ASSISTANT' | 'ADULT_PATIENT';

export type SportDiscipline =
  | 'TENNIS'
  | 'SWIMMING'
  | 'SWIMMING_BREASTSTROKE'
  | 'BASKETBALL'
  | 'SOCCER'
  | 'TRACK_AND_FIELD'
  | 'OTHER';

export type BodyFocusArea =
  | 'SHOULDER'
  | 'ELBOW'
  | 'KNEE'
  | 'ANKLE'
  | 'SPINE'
  | 'HIP'
  | 'WRIST'
  | 'MUSCLE_GENERAL';

export interface BaseUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  phone?: string;
}

export interface AthleteProfile {
  userId: string;
  sport: SportDiscipline;
  trainingHoursPerWeek: number;
  focusAreas: BodyFocusArea[];
  lastAssessmentDate: string;
  guardianId: string;
  decayStatusId: string;
}

export interface GuardianProfile {
  userId: string;
  linkedAthletes: string[];
  preferredContactChannel: 'PHONE' | 'WECHAT' | 'EMAIL';
}

export interface DoctorProfile {
  userId: string;
  specialty: string;
  clinicDays: Array<'WEDNESDAY' | 'SATURDAY' | 'OTHER'>;
}

export interface AssistantProfile {
  userId: string;
  assignedDoctorIds: string[];
}

export interface AdultPatientProfile {
  userId: string;
  primaryConcern: string;
  lastVisitDate?: string;
}

export interface DecayStatus {
  id: string;
  athleteId: string;
  level: number; // 1 (best) - 10 (critical)
  lastTreatmentDate: string;
  predictedNextVisit: string;
  notes?: string;
}

export type AppointmentStatus =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface AppointmentRequest {
  id: string;
  patientId: string;
  requestedBy: UserRole;
  requestedDate: string;
  preferredTimeNote?: string;
  serviceType: 'INITIAL' | 'FOLLOW_UP' | 'RECOVERY' | 'ADULT_TREATMENT';
  status: AppointmentStatus;
  confirmedDateTime?: string;
  confirmedByAssistantId?: string;
  notes?: string;
}

export interface TreatmentRecord {
  id: string;
  patientId: string;
  doctorId: string;
  visitDate: string;
  focusAreas: BodyFocusArea[];
  assessment: string;
  treatmentPlan: string;
  recommendations: string[];
  nextVisitSuggestion?: string;
  appliesToAthlete: boolean;
}

export interface NotificationMessage {
  id: string;
  recipientId: string;
  category: 'DECAY_ALERT' | 'APPOINTMENT' | 'FOLLOW_UP';
  title: string;
  message: string;
  createdAt: string;
  readAt?: string;
  relatedEntityId?: string;
}

export interface PatientSnapshot {
  patient: BaseUser;
  sport?: SportDiscipline;
  focusAreas?: BodyFocusArea[];
  decayLevel?: number;
  lastVisitDate?: string;
  nextAction?: string;
}

export interface ClinicDayReminder {
  weekday: 'WEDNESDAY' | 'SATURDAY' | 'OTHER';
  note: string;
}
