import { getAthleteSnapshot, getDecayStatus, getRecentTreatmentRecords } from "@/lib/mock/selectors";
import { bodyFocusLabels } from "@/lib/mock/data";

const ATHLETE_ID = "u-athlete-1";

export default function AthleteDashboardPage() {
  const snapshot = getAthleteSnapshot(ATHLETE_ID);
  const decayStatus = getDecayStatus(ATHLETE_ID);
  const records = getRecentTreatmentRecords(ATHLETE_ID);

  if (!snapshot || !decayStatus) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">运动员中心</h1>
        <p className="text-sm text-slate-600">未找到运动员数据，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-orange-500">青少年运动员</p>
        <h1 className="text-3xl font-semibold text-slate-900">{snapshot.patient.name}</h1>
        <p className="text-sm text-slate-600">
          监测运动项目相关的重点部位，跟踪康复衰减和医生建议。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">当前衰减等级</h2>
          <p className="mt-2 text-3xl font-bold text-orange-500">{decayStatus.level}</p>
          <p className="mt-2 text-xs text-slate-500">等级越大表示越需要关注，10 级为紧急状态。</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">上次治疗</h2>
          <p className="mt-2 text-xl font-semibold text-slate-900">{decayStatus.lastTreatmentDate}</p>
          <p className="mt-2 text-xs text-slate-500">请遵循医生建议保持训练减量。</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">建议复诊日期</h2>
          <p className="mt-2 text-xl font-semibold text-emerald-600">{decayStatus.predictedNextVisit}</p>
          <p className="mt-2 text-xs text-slate-500">助理将于诊日前确认具体时间。</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">重点关注部位</h2>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
          {(snapshot.focusAreas ?? []).map((area) => (
            <li key={area} className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
              {bodyFocusLabels[area]}
            </li>
          ))}
        </ul>
        {decayStatus.notes && (
          <p className="mt-4 rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
            {decayStatus.notes}
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">最近治疗记录</h2>
        <div className="space-y-3">
          {records.map((record) => (
            <article key={record.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900">{record.visitDate}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {record.focusAreas.map((area) => bodyFocusLabels[area]).join('、')}
                </span>
              </header>
              <p className="mt-3 text-sm text-slate-600">{record.assessment}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">治疗方案：{record.treatmentPlan}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500">
                {record.recommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
          {records.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              暂无治疗记录。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
