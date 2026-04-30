# Project Detail 코드 리뷰

## 리뷰 기준

- 컴포넌트 역할 분리 (카드 UI / 모달 / 데이터)
- 불필요한 props drilling
- 재사용성

---

## 잘 된 부분

- `projects.ts` (카드 데이터) / `projectDetails.ts` (모달 데이터) 분리 — 명확하고 좋음
- `ProjectModal`이 내부에서 `PROJECT_DETAILS.find()`로 조회 — 외부에서 detail을 주입받지 않아도 돼서 props가 깔끔함
- `stopPropagation` 처리가 카드/서브 프로젝트 양쪽에 모두 있음

---

## 지적 사항

### 1. `Projects.tsx` — 서브 프로젝트 JSX가 인라인으로 박혀 있음 (역할 분리 위반)

(해결)

메인 프로젝트는 `<ProjectCard>`로 분리됐는데, 사이드 프로젝트는 `Projects.tsx` 안에 직접 JSX를 작성하고 있음.
스타일 변경이나 재사용이 필요할 때 `Projects.tsx`를 뒤져야 하는 구조.

→ `SubProjectRow.tsx`로 분리 권장.

---

### 2. `ProjectCard.tsx` — `onClick` 없어도 `cursor-pointer` 고정

(해결)

```tsx
// onClick이 undefined여도 포인터 커서가 표시됨
className = "... cursor-pointer hover:-translate-y-1 ...";
```

현재는 모든 카드에 `onClick`이 연결돼 있어서 문제없지만, 나중에 `onClick` 없이 카드만 단독으로 쓸 경우 UX 혼란이 생길 수 있음.

해결 코드

```ts
className={`... ${onClick ? "cursor-pointer hover:-translate-y-1" : "cursor-default"}`}
```

---

### 3. 기술 스택 뱃지 JSX 3중 중복

(완료)

`ProjectCard.tsx`, `Projects.tsx`(서브 프로젝트 인라인), `ProjectModal.tsx`에 동일한 패턴이 반복됨.
스타일이 미묘하게 다르긴 하지만 로직은 같음. 규모가 커지면 컴포넌트 분리 고려.

---

### 4. `projectDetails.ts` — 플레이스홀더 데이터가 실제로 렌더됨

```ts
{
  slug: "jiheon-portfolio",
  background: "...",
  goals: ["..."],
}
```

`"..."`, `["..."]`은 현재 모달에서 그대로 출력됨. 빈 배열이나 필드 자체를 생략해야 함.

---

### 5. `projectDetails.ts` — `contribution` 필드가 모달에서 미사용

(완료)

인터페이스에 `contribution?: string`이 정의돼 있지만 `ProjectModal.tsx`에서 렌더하는 부분이 없음.
쓸 계획이면 모달에 추가하고, 없으면 인터페이스에서 제거.

---

### 6. `projects.ts` — `deployUrl` 오타 + `type` 필드 미사용

(완료)

- `deployUrl` → `deployUrl` 오타. 인터페이스도 동일하게 오타로 정의돼 있어 TypeScript가 잡지 못하는 상태.
- `type: ProjectType`(`"main" | "sub"`)은 인터페이스에 있지만 UI 어디에서도 사용되지 않음.
  `PROJECTS` / `SUB_PROJECTS`로 이미 분리돼 있어 필드가 중복.

---

## 요약

| 항목                         | 심각도 | 내용                                 |
| ---------------------------- | ------ | ------------------------------------ |
| 서브 프로젝트 인라인 JSX     | 중     | `SubProjectRow` 컴포넌트로 분리 권장 |
| 플레이스홀더 데이터 렌더됨   | 중     | `"..."` 항목 제거 필요               |
| `deployUrl` 오타             | 중     | `deployUrl`로 수정                   |
| `cursor-pointer` 조건부 처리 | 낮음   | `onClick && "cursor-pointer"`        |
| 기술 스택 뱃지 중복          | 낮음   | 규모가 커지면 컴포넌트 분리 고려     |
| `contribution` 미사용        | 낮음   | 삭제 또는 모달에 추가                |
| `type` 필드 미사용           | 낮음   | 삭제 고려                            |

---

## 수정 우선순위

1. `deployUrl` 오타 수정
2. 플레이스홀더 데이터 제거
3. `SubProjectRow` 컴포넌트 분리
