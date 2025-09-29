import type { Metadata } from "next";
import Link from "next/link";
import { MockClinicProvider } from "@/components/providers/MockClinicProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navItems = [
  { href: "/", label: "概览" },
  { href: "/athlete", label: "运动员" },
  { href: "/guardian", label: "家长" },
  { href: "/doctor", label: "医生" },
  { href: "/assistant", label: "助理" },
  { href: "/adult", label: "成人患者" },
  { href: "/login", label: "登录" },
];

export const metadata: Metadata = {
  title: "Orange Harmony 康复平台",
  description: "面向青少年运动员及家庭的中医康复与衰减管理平台原型。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}>
        <MockClinicProvider>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-semibold text-orange-600">
                  Orange Harmony
                </Link>
                <nav className="flex flex-wrap gap-3 text-sm text-slate-600">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-1.5 transition hover:bg-orange-100 hover:text-orange-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-white/70">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Orange Harmony Rehab Lab</p>
                <p>原型版本 · 数据为示例，仅供产品规划参考</p>
              </div>
            </footer>
          </div>
        </MockClinicProvider>
      </body>
    </html>
  );
}
