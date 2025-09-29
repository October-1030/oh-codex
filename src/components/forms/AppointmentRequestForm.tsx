"use client";

import { useMemo, useState } from "react";
import { useMockClinicStore } from "@/components/providers/MockClinicProvider";
import type { AppointmentRequest } from "@/lib/domain/types";

type ServiceType = AppointmentRequest["serviceType"];

type AthleteOption = {
  id: string;
  name: string;
};

type FormState = {
  athleteId: string;
  requestedDate: string;
  serviceType: ServiceType;
  preferredTimeNote: string;
  notes: string;
};

type AppointmentRequestFormProps = {
  guardianName: string;
  athleteOptions: AthleteOption[];
};

const serviceTypeLabels: Record<ServiceType, string> = {
  INITIAL: "初诊",
  FOLLOW_UP: "复诊",
  RECOVERY: "康复指导",
  ADULT_TREATMENT: "成人治疗",
};

const defaultFormState = (athleteOptions: AthleteOption[]): FormState => ({
  athleteId: athleteOptions[0]?.id ?? "",
  requestedDate: "",
  serviceType: athleteOptions.length > 0 ? "FOLLOW_UP" : "ADULT_TREATMENT",
  preferredTimeNote: "",
  notes: "",
});

export function AppointmentRequestForm({ guardianName, athleteOptions }: AppointmentRequestFormProps) {
  const { appointments, submitGuardianRequest } = useMockClinicStore();
  const [form, setForm] = useState<FormState>(() => defaultFormState(athleteOptions));
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const linkedAthleteIds = useMemo(() => new Set(athleteOptions.map((option) => option.id)), [athleteOptions]);

  const guardianRequests = useMemo(
    () =>
      appointments
        .filter((appointment) => linkedAthleteIds.has(appointment.patientId))
        .sort((a, b) => a.requestedDate.localeCompare(b.requestedDate)),
    [appointments, linkedAthleteIds],
  );

  const availableServiceTypes = useMemo(() => {
    return athleteOptions.length > 0
      ? (["FOLLOW_UP", "RECOVERY"] as ServiceType[])
      : (["ADULT_TREATMENT"] as ServiceType[]);
  }, [athleteOptions.length]);

  const handleChange = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const resetForm = () => {
    setForm(defaultFormState(athleteOptions));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.requestedDate || !form.athleteId) {
      setConfirmation("请填写预约日期并选择运动员");
      return;
    }

    submitGuardianRequest({
      patientId: form.athleteId,
      requestedDate: form.requestedDate,
      serviceType: form.serviceType,
      preferredTimeNote: form.preferredTimeNote || undefined,
      notes: form.notes || undefined,
      requestedBy: "GUARDIAN",
    });

    setConfirmation(`${guardianName}，已记录 ${form.requestedDate} 的预约请求，助理会回访确认具体时间。`);
    resetForm();
  };

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-4 space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">提交新的预约请求</h2>
          <p className="text-xs text-slate-500">
            家长只需提供期望日期与简单说明，医生助理将依据坐诊日安排具体时段。
          </p>
        </header>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="athlete">
              选择运动员
            </label>
            <select
              id="athlete"
              value={form.athleteId}
              onChange={handleChange("athleteId")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            >
              <option value="" disabled>
                {athleteOptions.length === 0 ? "暂无关联运动员" : "请选择"}
              </option>
              {athleteOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="requestedDate">
              期望日期
            </label>
            <input
              id="requestedDate"
              type="date"
              value={form.requestedDate}
              onChange={handleChange("requestedDate")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="serviceType">
              服务类型
            </label>
            <select
              id="serviceType"
              value={form.serviceType}
              onChange={handleChange("serviceType")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            >
              {availableServiceTypes.map((type) => (
                <option key={type} value={type}>
                  {serviceTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="preferredTimeNote">
              期望时间段（可选）
            </label>
            <input
              id="preferredTimeNote"
              value={form.preferredTimeNote}
              onChange={handleChange("preferredTimeNote")}
              placeholder="例如：下午训练后"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="notes">
              补充说明
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange("notes")}
              placeholder="写下最近的训练量、症状或医生需要注意的情况"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            提交预约请求（示意）
          </button>
        </form>
        {confirmation && (
          <p className="mt-4 rounded-lg bg-orange-50 p-3 text-xs text-orange-700">
            {confirmation}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">已提交的预约</h3>
        <p className="mt-1 text-xs text-slate-500">
          数据保存在前端，刷新页面后将回到示例数据。
        </p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {guardianRequests.map((request) => (
            <li key={request.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{request.requestedDate}</p>
              <p className="text-xs text-slate-500">
                服务类型：{serviceTypeLabels[request.serviceType]}
              </p>
              {request.preferredTimeNote && (
                <p className="text-xs text-slate-500">期望时间：{request.preferredTimeNote}</p>
              )}
              {request.notes && <p className="text-xs text-slate-500">备注：{request.notes}</p>}
              <span className="mt-1 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                {request.status === "PENDING_CONFIRMATION" ? "待助理确认" : "已确认"}
              </span>
            </li>
          ))}
          {guardianRequests.length === 0 && (
            <li className="rounded-lg border border-dashed border-slate-200 p-6 text-xs text-slate-500">
              暂无预约，欢迎随时填写。
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
