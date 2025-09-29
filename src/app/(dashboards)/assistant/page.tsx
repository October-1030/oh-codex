import { AssistantDashboardClient } from "@/components/assistant/AssistantDashboardClient";
import { users } from "@/lib/mock/data";

const ASSISTANT_ID = "u-assistant-1";

export default function AssistantWorkspacePage() {
  const patientNameMap = Object.fromEntries(users.map((user) => [user.id, user.name ?? user.id]));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-orange-500">医生助理</p>
        <h1 className="text-3xl font-semibold text-slate-900">预约与回访工作台</h1>
        <p className="text-sm text-slate-600">根据患者期望日期安排具体时间，确保医生坐诊日（周三 / 周六）排班合理。</p>
      </header>

      <AssistantDashboardClient assistantId={ASSISTANT_ID} patientNameMap={patientNameMap} />
    </div>
  );
}
