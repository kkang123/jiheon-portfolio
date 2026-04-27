# 방문자 카운터 구현 플랜

## Context

포트폴리오에 Supabase 기반 방문자 카운터를 추가한다.  
오늘/전체 방문자 수와 최근 5일 바 차트를 Footer 내부에 표시하고,  
페이지 마운트 시 자동으로 카운트를 증가시킨다.

---

## 사전 작업 (Supabase 대시보드에서 직접 실행)

### 1. 테이블 생성

```sql
create table daily_views (
  id bigint generated always as identity primary key,
  date date unique not null,
  count int default 0
);
```

### 2. RPC 함수 생성 (원자적 upsert용)

```sql
create or replace function increment_daily_view(p_date date)
returns void
language plpgsql
security definer
as $$
begin
  insert into daily_views (date, count)
  values (p_date, 1)
  on conflict (date)
  do update set count = daily_views.count + 1;
end;
$$;
```

### 3. RLS 설정

```sql
-- RLS 활성화 (클라이언트 직접 접근 차단)
alter table daily_views enable row level security;

-- anon key로 SELECT만 허용 (Route Handler GET용)
create policy "anon can read"
on daily_views for select
to anon
using (true);

-- INSERT/UPDATE는 SECURITY DEFINER RPC를 통해서만 가능
-- (별도 직접 쓰기 정책 없음)
```

---

## 구현 파일

### 신규 생성

| 파일                            | 역할                                 |
| ------------------------------- | ------------------------------------ |
| `.env.local`                    | SUPABASE_URL, SUPABASE_ANON_KEY      |
| `lib/supabase.ts`               | 서버 전용 Supabase 클라이언트 싱글턴 |
| `app/api/views/route.ts`        | GET / POST Route Handler             |
| `components/ui/ViewCounter.tsx` | 카운터 + 바 차트 클라이언트 컴포넌트 |

### 수정

| 파일                           | 변경 내용                    |
| ------------------------------ | ---------------------------- |
| `components/layout/Footer.tsx` | ViewCounter 추가 (저작권 위) |

---

## 패키지 설치

```bash
npm install @supabase/supabase-js recharts
```

---

## 상세 구현

### `lib/supabase.ts`

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);
```

- `NEXT_PUBLIC_` 접두사 없이 사용 → 브라우저에 절대 노출되지 않음
- Route Handler에서만 import

---

### `app/api/views/route.ts`

**GET** — `Promise.all`로 병렬 조회

- `daily_views` 전체 SELECT → `sum(count)` 계산 (total)
- `date = today` 단건 조회 → today count (`.maybeSingle()`)
- 최근 5일 SELECT → ascending으로 reverse 후 반환

**POST** — `supabase.rpc('increment_daily_view', { p_date: today })`

- 원자적 upsert, race condition 없음
- 응답: `{ ok: true }`

반환 타입:

```ts
interface ViewsResponse {
  today: number;
  total: number;
  chart: { date: string; count: number }[];
}
```

---

### `components/ui/ViewCounter.tsx`

`'use client'`

**동작:**

1. `useEffect` 마운트 시 → `POST /api/views` → `GET /api/views` 순차 호출
2. 로딩 중: `···` 표시 (최소 UI)
3. 완료 후: 카운터 + 바 차트 렌더

**카운터 텍스트:**

```
오늘 12명 · 전체 1,024명   (toLocaleString 적용)
```

**BarChart (recharts):**

- `ResponsiveContainer` + `BarChart` + `Bar` + `XAxis` + `Tooltip`
- recharts는 CSS 변수를 직접 받지 못하므로 `useTheme`의 `resolvedTheme`으로 다크/라이트 판단 후 hex 값 주입
  - accent: light `#c17b2f` / dark `#e09a4a`
  - textSub: light `#78716c` / dark `#a8a29e`
- X축: `date` → `"MM/DD"` 포맷으로 슬라이싱
- Bar: `radius={[3, 3, 0, 0]}`, `fill={accent}`
- Tooltip: 커스텀 컴포넌트로 `var(--bg-sub)`, `var(--border)` 인라인 스타일 적용
- 차트 높이: `h-20` (80px), 너비: `max-w-xs` (320px) 센터 정렬

**폰트/스타일:** `font-body`, `text-(--text-sub)`, `text-(--accent)`

---

## 환경변수

### `.env.local` (로컬)

```
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
```

### Vercel

Vercel 대시보드 → Settings → Environment Variables에 동일하게 추가

---

## 보안 모델

```
브라우저 → POST /api/views → Route Handler → supabase.rpc() → DB (RLS 우회, SECURITY DEFINER)
브라우저 → GET  /api/views → Route Handler → supabase.select() → DB (anon SELECT 정책 적용)
브라우저 → Supabase 직접 호출 불가 (ANON_KEY 미노출)
```

---

## 검증 방법

1. `npm run dev` 실행 후 페이지 접속
2. Supabase 대시보드 Table Editor에서 `daily_views` 행이 생성/증가 확인
3. Footer에 오늘/전체 카운터와 바 차트 정상 렌더링 확인
4. 다크모드 전환 시 차트 색상 변경 확인
5. 새로고침마다 today count +1 확인

# supabase에서 DB를 확인했을 때 카운팅은 제대로 이루어지고 있는데 ui에는 적용이 안되고 있음

```md
현재 상황:

- Supabase daily_views 테이블에 데이터 정상 저장 확인 (2026-04-27, count: 1)
- UI에서는 오늘 0명 · 전체 0명으로 표시됨
- DB 연동은 되는데 GET 응답값이 0으로 오는 것으로 추정

app/api/views/route.ts의 GET 핸들러에서
today count와 total sum(count) 조회 로직을 확인하고 수정해줘.
```

### 답변 :

```md
1. 에러 무시 → 에러 로깅 추가  
   쿼리 실패 시 data는 null이 되고 결과가 0으로 조용히 반환되던 문제를 서버 콘솔에서 확인할 수
   있게 했습니다.

2. select("count") → select("id, count")  
   count는 SQL/PostgREST 예약어라 단독으로 select하면 컬럼이 아닌 집계 함수로 해석될 수  
   있습니다.

---

npm run dev 후 /api/views를 직접 호출하거나 페이지를 열어서, 터미널에 [views GET] 에러가
찍히는지 확인해주세요.

에러가 찍힌다면 RLS SELECT 정책이 아직 생성되지 않은 것이 원인입니다. Supabase SQL  
 Editor에서 아래를 실행해주세요.

create policy "anon can read"  
 on daily_views for select  
 to anon
using (true);
```

| RLS 정책이 아직 없기 때문에 Supabase SQL Editor에서 아래 쿼리 실행

```sql
create policy "anon can read"
on daily_views for select
to anon
using (true);
```

는 이미 db 생성하면서 RLS 설정할 때 이미 만들어진 상태

| permission denied for table daily_views

```sql
grant select on daily_views to anon;
```

테이블 접근 권한을 추가하여 해결

#### 상황

```md
anon can read 정책 (RLS) → ✅ 있었음
grant select to anon → ❌ 없었음 ← 여기서 막힘
```

### 카운팅 규칙 정하기

현재는 새로고침할 때마다 카운팅이 됨

내가 생각한 문제점 :

의도적으로 무한 새로고침을 실행하면 불필요한 카운팅이 발생할거

- 카운팅 방식 종류
  - 1. 매 요청마다 카운팅(새로고침 방식)
       장점 : 구현 단순
       단점 : 새고로침마다 + 1, 본인 접속도 카운팅

  - 2. localStorage 날짜기록
       장점 : 하루에 1회 제한
       단점 : 시크릿 모드, 다른 기기에서 또 카운팅, 브라우저 저장소 지우면 초기화

  - 3. IP 기반
       장점 : 기기/브라우저 상관없이 중복 방지
       단점 : vercel Route Handler에서 IP 추출 복잡, 같은 회사 네트워크면 동일 IP로 묶임, 구현 난이도 과함

  - 4. 세션 기반
       장점 : 탭 단위로 1회만 카운팅
       단점 : 브라우저 닫으면 초기화

내 자력으로 생각해낸 localstorage 사용
