"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  AppointmentRequest,
  AppointmentStatus,
  UserRole,
} from "@/lib/domain/types";
import { appointmentRequests } from "@/lib/mock/data";

const MOCK_ASSISTANT_ID = "u-assistant-1";

export type SubmitGuardianRequestInput = {
  patientId: string;
  requestedDate: string;
  serviceType: AppointmentRequest["serviceType"];
  preferredTimeNote?: string;
  notes?: string;
  requestedBy?: UserRole;
};

export type ConfirmAppointmentInput = {
  appointmentId: string;
  confirmedDateTime: string;
  assistantId?: string;
};

type MockClinicContextValue = {
  appointments: AppointmentRequest[];
  submitGuardianRequest: (data: SubmitGuardianRequestInput) => void;
  updateAppointmentStatus: (input: ConfirmAppointmentInput) => void;
};

const MockClinicContext = createContext<MockClinicContextValue | null>(null);

export function MockClinicProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => appointmentRequests);

  const submitGuardianRequest = useCallback((data: SubmitGuardianRequestInput) => {
    const newAppointment: AppointmentRequest = {
      id: `appt-${Date.now()}`,
      patientId: data.patientId,
      requestedBy: data.requestedBy ?? "GUARDIAN",
      requestedDate: data.requestedDate,
      preferredTimeNote: data.preferredTimeNote,
      serviceType: data.serviceType,
      status: "PENDING_CONFIRMATION",
      notes: data.notes,
    };
    setAppointments((prev) => [...prev, newAppointment]);
  }, []);

  const updateAppointmentStatus = useCallback((input: ConfirmAppointmentInput) => {
    setAppointments((prev) =>
      prev.map((appointment) => {
        if (appointment.id !== input.appointmentId) return appointment;
        const confirmedDateTime = input.confirmedDateTime;
        const nextStatus: AppointmentStatus = confirmedDateTime ? "CONFIRMED" : appointment.status;
        return {
          ...appointment,
          status: nextStatus,
          confirmedDateTime,
          confirmedByAssistantId: input.assistantId ?? MOCK_ASSISTANT_ID,
        };
      }),
    );
  }, []);

  const value = useMemo(
    () => ({ appointments, submitGuardianRequest, updateAppointmentStatus }),
    [appointments, submitGuardianRequest, updateAppointmentStatus],
  );

  return <MockClinicContext.Provider value={value}>{children}</MockClinicContext.Provider>;
}

export function useMockClinicStore() {
  const context = useContext(MockClinicContext);
  if (!context) {
    throw new Error("useMockClinicStore must be used within a MockClinicProvider");
  }
  return context;
}
