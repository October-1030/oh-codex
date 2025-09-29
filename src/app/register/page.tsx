export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="space-y-2 text-center">
        <p className="text-sm font-medium text-orange-500">Orange Harmony 注册</p>
        <h1 className="text-3xl font-semibold text-slate-900">创建平台账号</h1>
        <p className="text-sm text-slate-600">
          初诊时由医生或助理协助创建账号并录入训练背景，后续将开发实名认证与短信验证。
        </p>
      </header>
      <form className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">姓名</label>
          <input
            id="name"
            placeholder="如：Aaron Tang"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="role">角色</label>
          <select
            id="role"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          >
            <option>青少年运动员</option>
            <option>家长 / 监护人</option>
            <option>医生</option>
            <option>医生助理</option>
            <option>成人患者</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="project">运动项目 / 就诊需求</label>
          <textarea
            id="project"
            rows={3}
            placeholder="初诊时填写训练项目信息、常见劳损部位、目前主要诉求等"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="md:col-span-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          保存（示意）
        </button>
      </form>
    </div>
  );
}
