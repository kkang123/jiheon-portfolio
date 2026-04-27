"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ViewsData {
  today: number;
  total: number;
  chart: { date: string; count: number }[];
}

interface ChartEntry {
  label: string;
  count: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const COLORS = {
  light: { accent: "#c17b2f", textSub: "#78716c" },
  dark: { accent: "#e09a4a", textSub: "#a8a29e" },
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs font-body"
      style={{
        background: "var(--bg-sub)",
        border: "1px solid var(--border)",
        color: "var(--text-sub)",
      }}
    >
      <p>{label}</p>
      <p style={{ color: "var(--accent)" }}>{payload[0].value}명</p>
    </div>
  );
}

export default function ViewCounter() {
  const [data, setData] = useState<ViewsData | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    async function track() {
      const key = "last_visit_date";
      const today = new Date().toISOString().slice(0, 10);
      const last = localStorage.getItem(key);

      if (last !== today) {
        await fetch("/api/views", { method: "POST" });
        localStorage.setItem(key, today);
      }

      const res = await fetch("/api/views");
      const json: ViewsData = await res.json();
      setData(json);
    }
    track();
  }, []);

  const colors = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;

  const chartData: ChartEntry[] =
    data?.chart.map((d) => ({
      label: d.date.slice(5).replace("-", "/"),
      count: d.count,
    })) ?? [];

  if (!data) {
    return (
      <p className="text-xs font-body text-(--text-sub) opacity-40">···</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs">
      <p className="text-xs font-body text-(--text-sub)">
        오늘{" "}
        <span className="text-(--accent) font-semibold">
          {data.today.toLocaleString()}
        </span>
        명 · 전체{" "}
        <span className="text-(--accent) font-semibold">
          {data.total.toLocaleString()}
        </span>
        명
      </p>

      <div className="w-full h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              tick={{
                fontSize: 10,
                fill: colors.textSub,
                fontFamily: "inherit",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="count" fill={colors.accent} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
