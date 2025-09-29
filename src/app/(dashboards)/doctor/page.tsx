import { getDoctorDashboardData } from "@/lib/mock/selectors";
import { bodyFocusLabels } from "@/lib/mock/data";

export default function DoctorDashboardPage() {
  const data = getDoctorDashboardData();
  const { doctor, pendingAppointments, confirmedAppointments, patients, clinicNotes } = data;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-orange-500">医生后台</p>
        <h1 className="text-3xl font-semibold text-slate-900">{doctor?.name ?? '医生'} 的工作台</h1>
        <p className="text-sm text-slate-600">
          了解今日预约、重点患者及运动项目相关的关注部位，结合助理反馈确认排班。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">待确认预约</h2>
          <p className="mt-2 text-3xl font-bold text-orange-500">{pendingAppointments.length}</p>
          <p className="mt-2 text-xs text-slate-500">助理确认后会出现在今日排班列表中。</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">已确认就诊</h2>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{confirmedAppointments.length}</p>
          <p className="mt-2 text-xs text-slate-500">包含青少年和成人患者。</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">关注患者</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">{patients.length}</p>
          <p className="mt-2 text-xs text-slate-500">保持追踪康复过程。</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">今日预约总览</h2>
        <div className="mt-4 space-y-4">
          {[...pendingAppointments, ...confirmedAppointments].map((appointment) => (
            <article key={appointment.id} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">预约日期：{appointment.requestedDate}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    appointment.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {appointment.status === 'CONFIRMED' ? '已确认' : '待助理确认'}
                </span>
              </header>
              <p className="mt-2 text-xs text-slate-500">服务类型：{appointment.serviceType}</p>
              {appointment.preferredTimeNote && (
                <p className="mt-2 text-xs text-slate-500">患者备注：{appointment.preferredTimeNote}</p>
              )}
              {appointment.confirmedDateTime && (
                <p className="mt-2 text-xs text-emerald-600">已排期：{appointment.confirmedDateTime.replace('T', ' ')}</p>
              )}
            </article>
          ))}
          {pendingAppointments.length + confirmedAppointments.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              暂无预约。
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">患者摘要</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {patients.map((patient) => (
            <article key={patient.patient.id} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
              <header className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{patient.patient.name}</p>
                {patient.decayLevel && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    衰减等级 {patient.decayLevel}
                  </span>
                )}
              </header>
              <p className="mt-2 text-xs text-slate-500">
                {patient.focusAreas?.map((area) => bodyFocusLabels[area]).join('、') ?? '成人患者'}
              </p>
              {patient.nextAction && (
                <p className="mt-2 text-xs text-orange-600">{patient.nextAction}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-orange-800">坐诊日提示</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Object.entries(clinicNotes).map(([weekday, note]) => (
            <div key={weekday} className="rounded-lg bg-white/70 p-4 text-sm text-orange-700 shadow-sm">
              <p className="text-xs font-semibold text-orange-500">{weekday === 'WEDNESDAY' ? '周三' : '周六'}</p>
              <p className="mt-2 text-sm">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
