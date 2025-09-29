"use client";

import { useMemo, useState } from "react";
import { useMockClinicStore } from "@/components/providers/MockClinicProvider";
import type { AppointmentRequest, UserRole } from "@/lib/domain/types";

type AssistantDashboardClientProps = {
  assistantId: string;
  patientNameMap: Record<string, string>;
};

const serviceTypeLabels: Record<AppointmentRequest["serviceType"], string> = {
  INITIAL: "初诊",
  FOLLOW_UP: "复诊",
  RECOVERY: "康复指导",
  ADULT_TREATMENT: "成人治疗",
};

const roleLabels: Record<UserRole, string> = {
  ATHLETE: "青少年运动员",
  GUARDIAN: "家长/监护人",
  DOCTOR: "医生",
  ASSISTANT: "助理",
  ADULT_PATIENT: "成人患者",
};

export function AssistantDashboardClient({ assistantId, patientNameMap }: AssistantDashboardClientProps) {
  const { appointments, updateAppointmentStatus } = useMockClinicStore();
  const [timeSelections, setTimeSelections] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const pendingAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status === "PENDING_CONFIRMATION"),
    [appointments],
  );

  const confirmedAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status === "CONFIRMED"),
    [appointments],
  );

  const handleTimeChange = (appointmentId: string, value: string) => {
    setTimeSelections((prev) => ({ ...prev, [appointmentId]: value }));
  };

  const handleConfirm = (appointment: AppointmentRequest) => {
    const timeValue = timeSelections[appointment.id] || "09:30";
    const confirmedDateTime = `${appointment.requestedDate}T${timeValue}:00`;

    updateAppointmentStatus({
      appointmentId: appointment.id,
      confirmedDateTime,
      assistantId,
    });

    setFeedback(`已为 ${patientNameMap[appointment.patientId] ?? "患者"} 安排 ${confirmedDateTime.replace("T", " ")} 的复诊。`);
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{feedback}</p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">待确认预约</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {pendingAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-lg border border-slate-200 p-4">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-900">
                  {patientNameMap[appointment.patientId] ?? appointment.patientId}
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  待确认
                </span>
              </header>
              <p className="mt-2 text-xs text-slate-500">期望日期：{appointment.requestedDate}</p>
              <p className="mt-1 text-xs text-slate-500">
                服务类型：{serviceTypeLabels[appointment.serviceType]}（由 {roleLabels[appointment.requestedBy]} 提交）
              </p>
              {appointment.preferredTimeNote && (
                <p className="mt-1 text-xs text-slate-500">患者备注：{appointment.preferredTimeNote}</p>
              )}
              {appointment.notes && (
                <p className="mt-1 text-xs text-slate-500">补充说明：{appointment.notes}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="text-xs font-medium text-slate-600" htmlFor={`time-${appointment.id}`}>
                  安排时间
                </label>
                <input
                  id={`time-${appointment.id}`}
                  type="time"
                  value={timeSelections[appointment.id] ?? "09:30"}
                  onChange={(event) => handleTimeChange(appointment.id, event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs focus:border-orange-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleConfirm(appointment)}
                  className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-600"
                >
                  标记为已确认
                </button>
              </div>
            </div>
          ))}
          {pendingAppointments.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 p-6 text-xs text-slate-500">
              当前没有待确认的预约。
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">已完成排班</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {confirmedAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-lg border border-slate-200 p-4">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-900">
                  {patientNameMap[appointment.patientId] ?? appointment.patientId}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  已确认
                </span>
              </header>
              <p className="mt-2 text-xs text-slate-500">预约日期：{appointment.requestedDate}</p>
              <p className="mt-1 text-xs text-slate-500">
                确认时间：{appointment.confirmedDateTime?.replace("T", " ") ?? "待定"}
              </p>
              <p className="mt-1 text-xs text-slate-500">服务类型：{serviceTypeLabels[appointment.serviceType]}</p>
            </div>
          ))}
          {confirmedAppointments.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 p-6 text-xs text-slate-500">
              暂无已确认的预约。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
