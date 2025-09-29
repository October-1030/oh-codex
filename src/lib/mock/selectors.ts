import {
  appointmentRequests,
  athleteProfiles,
  clinicDayReminders,
  decayStatuses,
  doctorProfiles,
  guardianProfiles,
  notifications,
  patientSnapshots,
  treatmentRecords,
  users,
} from '@/lib/mock/data';
import {
  AppointmentRequest,
  AppointmentStatus,
  BaseUser,
  DecayStatus,
  PatientSnapshot,
  TreatmentRecord,
  UserRole,
} from '@/lib/domain/types';

export const getUsersByRole = (role: UserRole): BaseUser[] =>
  users.filter((user) => user.role === role);

export const getAthleteSnapshot = (athleteId: string): PatientSnapshot | undefined =>
  patientSnapshots.find((snapshot) => snapshot.patient.id === athleteId);

export const getDecayStatus = (athleteId: string): DecayStatus | undefined =>
  decayStatuses.find((status) => status.athleteId === athleteId);

export const getUpcomingAppointments = (
  status: AppointmentStatus[] = ['PENDING_CONFIRMATION', 'CONFIRMED'],
): AppointmentRequest[] =>
  appointmentRequests.filter((appointment) => status.includes(appointment.status));

export const getPendingAppointmentsForAssistant = (): AppointmentRequest[] =>
  appointmentRequests.filter((appointment) => appointment.status === 'PENDING_CONFIRMATION');

export const getGuardianNotifications = (guardianId: string) =>
  notifications.filter((notification) => notification.recipientId === guardianId);

export const getRecentTreatmentRecords = (patientId: string): TreatmentRecord[] =>
  treatmentRecords.filter((record) => record.patientId === patientId).slice(0, 3);

export const getGuardianOverview = (guardianId: string) => {
  const guardianProfile = guardianProfiles.find((profile) => profile.userId === guardianId);
  if (!guardianProfile) return null;

  const linkedAthletes = guardianProfile.linkedAthletes
    .map((athleteId) => ({
      athlete: users.find((user) => user.id === athleteId),
      profile: athleteProfiles.find((profile) => profile.userId === athleteId),
      decay: getDecayStatus(athleteId),
    }))
    .filter((item) => item.athlete && item.profile);

  return {
    guardian: users.find((user) => user.id === guardianId),
    linkedAthletes,
    notifications: getGuardianNotifications(guardianId),
  };
};

export const getDoctorDashboardData = () => ({
  doctor: users.find((user) => user.role === 'DOCTOR'),
  profile: doctorProfiles[0],
  pendingAppointments: getUpcomingAppointments(['PENDING_CONFIRMATION']),
  confirmedAppointments: getUpcomingAppointments(['CONFIRMED']),
  patients: patientSnapshots,
  clinicNotes: clinicDayReminders,
});
