import { getGuardianOverview } from "@/lib/mock/selectors";
import { bodyFocusLabels } from "@/lib/mock/data";
import { AppointmentRequestForm } from "@/components/forms/AppointmentRequestForm";

const GUARDIAN_ID = "u-guardian-1";

export default function GuardianDashboardPage() {
  const overview = getGuardianOverview(GUARDIAN_ID);

  if (!overview) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">家长中心</h1>
        <p className="text-sm text-slate-600">未找到关联的孩子档案，请联系助理。</p>
      </div>
    );
  }

  const { guardian, linkedAthletes, notifications } = overview;
  const athleteOptions = linkedAthletes.map(({ athlete }) => ({
    id: athlete!.id,
    name: athlete!.name,
  }));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-orange-500">家长 / 监护人</p>
        <h1 className="text-3xl font-semibold text-slate-900">{guardian?.name} 的家庭总览</h1>
        <p className="text-sm text-slate-600">关注训练项目带来的重点部位，配合医生安排康复周期。</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">关联运动员</h2>
        <div className="space-y-3">
          {linkedAthletes.map(({ athlete, profile, decay }) => (
            <article key={athlete!.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{athlete!.name}</h3>
                  <p className="text-xs text-slate-500">
                    运动项目：{profile!.sport === "TENNIS" ? "网球" : "其他"}，每周训练 {profile!.trainingHoursPerWeek} 小时
                  </p>
                </div>
                {decay && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    当前衰减等级 {decay.level}
                  </span>
                )}
              </header>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="text-xs font-semibold text-slate-500">关注部位</p>
                  <p>{profile!.focusAreas.map((area) => bodyFocusLabels[area]).join("、")}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="text-xs font-semibold text-slate-500">下一步提醒</p>
                  <p>{decay?.predictedNextVisit ? `建议复诊日期：${decay.predictedNextVisit}` : "等待医生进一步安排"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AppointmentRequestForm
        guardianName={guardian?.name ?? "家长"}
        athleteOptions={athleteOptions}

      />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">系统提醒</h2>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm text-orange-700">
              <p className="font-semibold">{notification.title}</p>
              <p className="mt-1 text-xs text-orange-600">{notification.message}</p>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              暂无提醒。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
