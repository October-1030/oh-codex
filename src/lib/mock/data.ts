import {
  AdultPatientProfile,
  AppointmentRequest,
  AssistantProfile,
  AthleteProfile,
  BaseUser,
  BodyFocusArea,
  DecayStatus,
  DoctorProfile,
  GuardianProfile,
  NotificationMessage,
  PatientSnapshot,
  TreatmentRecord,
  UserRole,
} from '@/lib/domain/types';

const today = new Date();

const formatDate = (offsetDays: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

export const users: BaseUser[] = [
  { id: 'u-athlete-1', name: 'Aaron Tang', role: 'ATHLETE', email: 'aaron@example.com' },
  { id: 'u-guardian-1', name: 'Linda Tang', role: 'GUARDIAN', phone: '13500001111' },
  { id: 'u-doctor-1', name: 'Dr. Chen', role: 'DOCTOR', phone: '021-88886666' },
  { id: 'u-assistant-1', name: 'Amy (Assistant)', role: 'ASSISTANT', phone: '021-88886667' },
  { id: 'u-adult-1', name: 'Zhang Wei', role: 'ADULT_PATIENT', phone: '13900002222' },
];

export const athleteProfiles: AthleteProfile[] = [
  {
    userId: 'u-athlete-1',
    sport: 'TENNIS',
    trainingHoursPerWeek: 12,
    focusAreas: ['KNEE', 'ELBOW'],
    lastAssessmentDate: formatDate(-10),
    guardianId: 'u-guardian-1',
    decayStatusId: 'decay-athlete-1',
  },
];

export const guardianProfiles: GuardianProfile[] = [
  {
    userId: 'u-guardian-1',
    linkedAthletes: ['u-athlete-1'],
    preferredContactChannel: 'PHONE',
  },
];

export const doctorProfiles: DoctorProfile[] = [
  {
    userId: 'u-doctor-1',
    specialty: 'Sports Medicine (Traditional Chinese Medicine)',
    clinicDays: ['WEDNESDAY', 'SATURDAY'],
  },
];

export const assistantProfiles: AssistantProfile[] = [
  {
    userId: 'u-assistant-1',
    assignedDoctorIds: ['u-doctor-1'],
  },
];

export const adultProfiles: AdultPatientProfile[] = [
  {
    userId: 'u-adult-1',
    primaryConcern: 'Chronic lower back tightness',
    lastVisitDate: formatDate(-21),
  },
];

export const decayStatuses: DecayStatus[] = [
  {
    id: 'decay-athlete-1',
    athleteId: 'u-athlete-1',
    level: 5,
    lastTreatmentDate: formatDate(-7),
    predictedNextVisit: formatDate(6),
    notes: 'Maintain reduced training load through next week.',
  },
];

export const appointmentRequests: AppointmentRequest[] = [
  {
    id: 'appt-1',
    patientId: 'u-athlete-1',
    requestedBy: 'GUARDIAN',
    requestedDate: formatDate(4),
    preferredTimeNote: '???????????',
    serviceType: 'FOLLOW_UP',
    status: 'PENDING_CONFIRMATION',
    notes: '???????????',
  },
  {
    id: 'appt-2',
    patientId: 'u-adult-1',
    requestedBy: 'ADULT_PATIENT',
    requestedDate: formatDate(2),
    serviceType: 'ADULT_TREATMENT',
    status: 'CONFIRMED',
    confirmedDateTime: `${formatDate(2)}T09:30:00`,
    confirmedByAssistantId: 'u-assistant-1',
    notes: '?????????',
  },
];

export const treatmentRecords: TreatmentRecord[] = [
  {
    id: 'trt-1',
    patientId: 'u-athlete-1',
    doctorId: 'u-doctor-1',
    visitDate: formatDate(-14),
    focusAreas: ['KNEE', 'SHOULDER'],
    assessment: '??????,?????',
    treatmentPlan: '?? + ????? + ???? 25%?',
    recommendations: ['??????', '????????'],
    nextVisitSuggestion: formatDate(7),
    appliesToAthlete: true,
  },
  {
    id: 'trt-2',
    patientId: 'u-adult-1',
    doctorId: 'u-doctor-1',
    visitDate: formatDate(-21),
    focusAreas: ['SPINE'],
    assessment: '??????,????????',
    treatmentPlan: '?? + ?????',
    recommendations: ['????', '??????'],
    appliesToAthlete: false,
  },
];

export const notifications: NotificationMessage[] = [
  {
    id: 'notif-1',
    recipientId: 'u-guardian-1',
    category: 'DECAY_ALERT',
    title: '??????????',
    message: '??? Aaron ?????,????????',
    createdAt: `${formatDate(0)}T08:00:00`,
  },
  {
    id: 'notif-2',
    recipientId: 'u-doctor-1',
    category: 'APPOINTMENT',
    title: '?????????',
    message: 'Linda Tang ?????? Aaron ???',
    createdAt: `${formatDate(0)}T08:30:00`,
    relatedEntityId: 'appt-1',
  },
];

export const clinicDayReminders: Record<'WEDNESDAY' | 'SATURDAY', string> = {
  WEDNESDAY: '?????????,?????????????',
  SATURDAY: '???????,??????????',
};

export const bodyFocusLabels: Record<BodyFocusArea, string> = {
  SHOULDER: '??',
  ELBOW: '??',
  KNEE: '??',
  ANKLE: '??',
  SPINE: '??',
  HIP: '??',
  WRIST: '??',
  MUSCLE_GENERAL: '????',
};

export const roleLabels: Record<UserRole, string> = {
  ATHLETE: '??????',
  GUARDIAN: '??/???',
  DOCTOR: '????????',
  ASSISTANT: '????',
  ADULT_PATIENT: '????',
};

export const patientSnapshots: PatientSnapshot[] = [
  {
    patient: users[0],
    sport: athleteProfiles[0].sport,
    focusAreas: athleteProfiles[0].focusAreas,
    decayLevel: 5,
    lastVisitDate: formatDate(-14),
    nextAction: '???????????',
  },
  {
    patient: users[4],
    focusAreas: ['SPINE'],
    lastVisitDate: formatDate(-21),
    nextAction: '??????? 09:30 ???',
  },
];
