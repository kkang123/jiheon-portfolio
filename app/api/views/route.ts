import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  const today = getToday();
  console.log("[views GET] today:", today);

  const [
    { data: allData, error: allError },
    { data: todayData, error: todayError },
    { data: chartData, error: chartError },
  ] = await Promise.all([
    supabase.from("daily_views").select("id, count"),
    supabase
      .from("daily_views")
      .select("id, count")
      .eq("date", today)
      .maybeSingle(),
    supabase
      .from("daily_views")
      .select("date, count")
      .order("date", { ascending: false })
      .limit(5),
  ]);

  console.log("[views GET] allData:", allData, allError?.message);
  console.log("[views GET] todayData:", todayData, todayError?.message);
  console.log("[views GET] chartData:", chartData, chartError?.message);

  if (allError) console.error("[views GET] allData:", allError.message);
  if (todayError) console.error("[views GET] todayData:", todayError.message);
  if (chartError) console.error("[views GET] chartData:", chartError.message);

  const total = allData?.reduce((sum, row) => sum + row.count, 0) ?? 0;
  const todayCount = todayData?.count ?? 0;

  console.log("[views GET] result → today:", todayCount, "total:", total);

  return NextResponse.json({
    today: todayCount,
    total,
    chart: (chartData ?? []).reverse(),
  });
}

export async function POST() {
  const today = getToday();

  await supabase.rpc("increment_daily_view", { p_date: today });

  return NextResponse.json({ ok: true });
}
