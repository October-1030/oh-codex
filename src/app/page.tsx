import Link from "next/link";
import { patientSnapshots, roleLabels } from "@/lib/mock/data";
import { getUpcomingAppointments } from "@/lib/mock/selectors";

const roleRoutes = [
  { role: "ATHLETE", href: "/athlete", description: "查看衰减状态与康复计划" },
  { role: "GUARDIAN", href: "/guardian", description: "管理预约、关注重点部位" },
  { role: "DOCTOR", href: "/doctor", description: "掌握就诊队列与治疗记录" },
  { role: "ASSISTANT", href: "/assistant", description: "确认预约、安排回访" },
  { role: "ADULT_PATIENT", href: "/adult", description: "查看成人就诊记录与复诊建议" },
] as const;

export default function HomePage() {
  const pendingAppointments = getUpcomingAppointments(["PENDING_CONFIRMATION"]);
  const confirmedAppointments = getUpcomingAppointments(["CONFIRMED"]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
              Orange Harmony 2.0 · 中医运动康复平台
            </span>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              面向青少年运动员与家庭的康复与状态管理中心
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              统一管理青少年运动员的身体状态、康复衰减和就诊流程，并兼顾成年人骨科/推拿疗程。
              医生与助理通过后台掌握预约、治疗记录和重点关注部位，帮助运动员保持最佳状态。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/athlete"
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600"
              >
                进入运动员中心
              </Link>
              <Link
                href="/doctor"
                className="rounded-lg border border-orange-200 px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                医生后台预览
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-900">今日看板速览</h2>
            <dl className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt>待助理确认的预约</dt>
                <dd className="font-semibold text-orange-600">{pendingAppointments.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt>已确认即将就诊</dt>
                <dd className="font-semibold text-emerald-600">{confirmedAppointments.length}</dd>
              </div>
              <div className="space-y-2 pt-4">
                <dt className="text-slate-500">近期重点患者</dt>
                {patientSnapshots.slice(0, 2).map((snapshot) => (
                  <dd
                    key={snapshot.patient.id}
                    className="flex flex-col rounded-lg border border-slate-100 bg-white px-3 py-2 text-slate-700 shadow-sm"
                  >
                    <span className="font-medium text-slate-900">{snapshot.patient.name}</span>
                    <span className="text-xs text-slate-500">
                      {snapshot.decayLevel ? `当前衰减等级：${snapshot.decayLevel}` : '成人患者（跟踪就诊记录）'}
                    </span>
                    {snapshot.nextAction && (
                      <span className="text-xs text-orange-600">{snapshot.nextAction}</span>
                    )}
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">按角色快速进入</h2>
          <p className="text-sm text-slate-600">
            平台将不同角色的重点任务分别呈现：家长记录训练背景、助理确认预约、医生记录治疗方案、运动员跟踪衰减等级。
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roleRoutes.map(({ role, href, description }) => (
              <Link
                key={role}
                href={href}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-orange-600">{roleLabels[role]}</p>
                  <h3 className="text-lg font-medium text-slate-900">{description}</h3>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-orange-500">
                  查看详情
                  <span className="ml-1 transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">预约流程说明</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {["01", "02", "03"].map((step, index) => {
              const titles = [
                "患者/家长提交预约日期",
                "助理回访确认具体时段",
                "医生就诊并记录治疗计划",
              ];
              const descriptions = [
                "支持青少年与成人患者，填写运动项目、症状及期望日期，系统保存待处理。",
                "助理依据医生坐诊日（周三/周六）安排具体时间，避免时间段冲突。",
                "医生完成治疗后记录重点部位、康复建议，并更新衰减或回访提醒。",
              ];
              return (
                <div
                  key={step}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="text-sm font-medium text-orange-500">{step}</span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {titles[index]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {descriptions[index]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
