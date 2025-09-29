import { getRecentTreatmentRecords } from "@/lib/mock/selectors";
import { users } from "@/lib/mock/data";

const ADULT_ID = "u-adult-1";

export default function AdultPatientPage() {
  const adult = users.find((user) => user.id === ADULT_ID);
  const records = getRecentTreatmentRecords(ADULT_ID);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-orange-500">成人患者</p>
        <h1 className="text-3xl font-semibold text-slate-900">{adult?.name ?? '成人患者'} 的就诊记录</h1>
        <p className="text-sm text-slate-600">成人患者保留推拿、针灸等治疗历史，方便医生与患者后续跟进。</p>
      </header>

      <section className="space-y-3">
        {records.map((record) => (
          <article key={record.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900">{record.visitDate}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">治疗记录</span>
            </header>
            <p className="mt-3 text-sm text-slate-600">{record.assessment}</p>
            <p className="mt-2 text-sm font-medium text-slate-800">治疗方案：{record.treatmentPlan}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500">
              {record.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {record.nextVisitSuggestion && (
              <p className="mt-3 text-xs text-orange-600">下次复诊建议：{record.nextVisitSuggestion}</p>
            )}
          </article>
        ))}
        {records.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            暂无就诊记录。
          </p>
        )}
      </section>
    </div>
  );
}
