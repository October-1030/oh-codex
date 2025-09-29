export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-orange-500">Orange Harmony 登录</p>
        <h1 className="text-3xl font-semibold text-slate-900">账号登录</h1>
        <p className="text-sm text-slate-600">正式版本将接入统一认证与角色识别，这里仅展示界面结构。</p>
      </div>
      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">邮箱 / 手机号</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">密码</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          登录（示意）
        </button>
      </form>
    </div>
  );
}
