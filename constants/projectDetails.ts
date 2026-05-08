export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface ProjectDetail {
  slug: string; // constants/projects.ts의 slug와 연결
  images?: string[];
  background?: string;
  goals?: string[];
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  learnings?: string;
}

// main
export const PROJECT_DETAILS: ProjectDetail[] = [
  // slug를 key로 projects.ts의 프로젝트와 연결
  {
    slug: "jubging",
    images: [
      "https://github.com/user-attachments/assets/1c3f9926-de05-4cb2-8ba2-744450ba912d",
      "https://user-images.githubusercontent.com/85664676/281222077-77a905ed-c7cf-455a-bdc9-41f9648b0644.gif",
      "https://user-images.githubusercontent.com/85664676/281056219-c36c7819-fc5b-4f71-8138-95f10ccee288.gif",
    ],
    background:
      "프론트엔드 스쿨 팀 프로젝트로 진행한 첫 번째 협업 프로젝트입니다. 플로깅(쓰레기를 주우며 조깅하는 활동)을 주제로, 경험을 공유하고 추천 코스를 나눌 수 있는 SNS 플랫폼을 만들었습니다. 제공된 백엔드 API를 기반으로 프론트엔드 4인이 역할을 나눠 개발했으며, 카카오맵 API를 활용한 경로 드로잉 기능을 직접 설계하고 구현했습니다.",
    goals: [
      "팀장으로서 Git 브랜치 전략·커밋 컨벤션·PR 템플릿 등 협업 환경 구축",
      "카카오맵 API로 클릭 기반 플로깅 경로 드로잉 및 총 거리 계산 기능 구현",
      "Geolocation API로 현재 위치 기반 지도 초기화 구현",
      "회원가입·로그인·프로필 설정·게시글 등록 페이지 UI/UX 담당",
    ],
    features: [
      {
        title: "카카오맵 경로 드로잉",
        description:
          "좌클릭으로 경로 점을 찍어 Polyline을 그리고, 마우스 이동 시 반투명 선으로 다음 경로를 미리 보여준다. 우클릭으로 경로를 완성하면 총 거리를 계산해 CustomOverlay로 지도 위에 표시한다. 경로가 완성되기 전까지 '경로 등록' 버튼을 비활성화해 잘못된 등록을 방지했다.",
      },
      {
        title: "현재 위치 기반 지도 초기화",
        description:
          "Geolocation API로 사용자의 현재 위치를 가져와 지도 초기 중심점으로 설정했다. 위치 정보를 받아오는 동안 로딩 컴포넌트를 표시하고, 위치 확인 완료 후 지도를 렌더링하는 순서를 제어했다.",
      },
      {
        title: "경로 데이터 직렬화 및 복원",
        description:
          "백엔드 API가 지도·경로 데이터를 별도 필드로 지원하지 않아, 지도 상태(중심 좌표·줌 레벨)와 Polyline 좌표 배열을 JSON.stringify로 문자열화해 단일 필드에 저장했다. 상세 페이지에서 JSON.parse로 복원한 뒤 react-kakao-maps-sdk로 지도와 경로를 다시 렌더링했다.",
      },
      {
        title: "회원가입 · 로그인 · 프로필 설정",
        description:
          "회원가입, 로그인, 프로필 설정·수정 페이지의 UI 마크업 및 스타일링을 담당했다.",
      },
      {
        title: "사용자 검색",
        description:
          "계정명 기반 사용자 검색 기능을 구현했다. useDebounce 커스텀 훅으로 입력이 멈춘 후에만 API를 호출해 불필요한 요청을 줄였다.",
      },
    ],
    challenges: [
      {
        problem:
          "백엔드 API가 지도 및 경로 데이터를 별도 필드로 저장하는 구조를 지원하지 않아, Polyline 좌표 배열과 지도 상태(중심 좌표, 줌 레벨)를 그대로 전송할 수 없었다.",
        solution:
          "지도 상태와 경로 좌표를 각각 JSON.stringify로 문자열화해 단일 필드에 저장했다. 상세 페이지 진입 시 JSON.parse로 객체를 복원한 뒤 카카오맵 API로 지도와 Polyline을 다시 그려 데이터 손실 없이 경로를 표시했다.",
      },
      {
        problem:
          "경로 드로잉 중 우클릭으로 완성하기 전에 '경로 등록' 버튼을 누르면 빈 경로가 등록되는 문제가 있었다. 또한 우클릭 후 경로를 다시 수정하려고 좌클릭하면 버튼이 다시 활성화된 채로 유지되는 문제도 있었다.",
        solution:
          "isButtonClicked 상태로 버튼 활성화 여부를 제어했다. 우클릭 시에만 true로 전환해 버튼을 활성화하고, 경로를 다시 그리기 위해 좌클릭하면 즉시 false로 되돌려 버튼을 비활성화했다.",
      },
      {
        problem:
          "첫 React 팀 프로젝트라 팀원마다 코드 스타일이 달라 머지 충돌이 자주 발생했고, 브랜치 관리가 되지 않아 작업이 뒤섞이는 문제가 생겼다.",
        solution:
          "팀장으로서 feature 브랜치 전략, 이모지 기반 커밋 컨벤션, Issue·PR 템플릿을 초반에 직접 셋팅했다. GitHub Projects 칸반보드로 진행 상황을 공유해 충돌과 중복 작업을 최소화했다.",
      },
    ],
    learnings:
      "첫 React 팀 프로젝트이자 팀장 역할을 동시에 맡으면서, 코드 작성 못지않게 협업 환경 설계가 프로젝트 품질에 얼마나 큰 영향을 미치는지 깨달았고, 피그마로 와이어프레임부터 목업, 인터랙티브 프로토타입까지 직접 제작하면서, 개발 전 화면 구조 설계부터 디자인, 화면 흐름 연결까지 전 과정을 처음으로 경험했다.\n\n카카오맵 API 이벤트 시스템(click, mousemove, rightclick)을 직접 다루면서 외부 라이브러리 문서를 읽고 적용하는 경험을 처음으로 제대로 해봤다. drawingFlag 변수로 드로잉 상태를 관리하고 isButtonClicked로 버튼 활성화를 제어하는 등, 단순히 동작하는 코드를 넘어 상태 흐름을 설계하는 감각을 이 프로젝트에서 처음 익혔다.\n\n백엔드 API 제약을 JSON 직렬화로 우회하면서, 프론트엔드가 데이터 구조 설계에도 능동적으로 개입해야 한다는 것을 배웠다. AI 도움을 받아 완성했지만 코드를 직접 분석하고 동작 원리를 이해하는 과정에서 실력이 쌓였다는 것을 나중에야 깨달았다.",
  },
  {
    slug: "",
    images: [],
    background: "",
    goals: [],
    features: [
      {
        title: "",
        description: "",
      },
    ],
    challenges: [
      {
        problem: "",
        solution: "",
      },
    ],
    learnings: "",
  },
  {
    slug: "for-dogs-refactor",
    images: [
      "https://github.com/user-attachments/assets/51cbe298-b812-4e83-bb5b-db9208c689f3", // 대표
      "https://github.com/user-attachments/assets/bc8c5313-1bd3-450b-a395-58828413d7a0", // 로그인
      "https://github.com/user-attachments/assets/b051a3e9-4b88-4d23-bd65-9d1373aa7eb1", // 회원가입
      "https://github.com/user-attachments/assets/ed1416ff-a58c-4ff7-a265-94fb9d709c7d", // 아이디/비번 찾기
      "https://github.com/user-attachments/assets/88d30ec9-4590-42c8-941c-d70852f983f5", // 홈/상세
      "https://github.com/user-attachments/assets/57b4f972-ab2e-4222-b9f9-f6beb3f29bcf", // 카테고리
      "https://github.com/user-attachments/assets/f3f646a6-8988-4cf6-8357-36edec0d270b", // 장바구니
      "https://github.com/user-attachments/assets/87fd9994-0441-42ef-b60e-96440b7ca6fe", // 결제
      "https://github.com/user-attachments/assets/3b34be7a-e37d-4f79-8e13-ef49b3dab42f", // 상품 등록
      "https://github.com/user-attachments/assets/3cc2e340-c37c-4676-a079-bd22905b94df", // 상품 수정/삭제
      "https://github.com/user-attachments/assets/c4705737-2ef0-4d3d-8ddb-4085971f470f", // 구매자 프로필
      "https://github.com/user-attachments/assets/974b7753-6ece-4666-b9f4-762f0a67ead8", // 판매자 프로필
    ],
    background:
      "개인 프로젝트로 시작한 이커머스 사이트를 백엔드 개발자와 협업하여 Firebase를 걷어내고 자체 REST API 서버로 전환하는 리팩토링을 진행했다. 프론트엔드 단독 개발을 맡아 인증 체계 재설계, 상태 관리 구조 정립, 이미지 스토리지 연동까지 전 영역을 처음부터 다시 설계했다.",

    goals: [
      "Firebase Auth를 걷어내고 JWT Access/Refresh Token 클라이언트 인증 구현 및 OAuth2 소셜 로그인(Google·카카오) 연동",
      "React Query와 Recoil을 병행 사용해 서버 상태와 클라이언트 상태를 명확히 분리하는 아키텍처를 구축",
      "구매자(BUYER)와 판매자(SELLER) 역할을 구분한 접근 제어 시스템을 구현",
      "AWS S3와 Iamport 결제 API를 연동해 상품 등록부터 결제까지의 완전한 이커머스 플로우를 완성",
    ],

    features: [
      {
        title: "JWT 토큰 자동 갱신 인증",
        description:
          "Axios 인터셉터를 두 단계로 구성했다. Request 인터셉터에서는 localStorage의 AccessToken을 Authorization 헤더에 주입하고, Response 인터셉터에서는 401 응답 시 POST /users/refresh로 AccessToken을 재발급받아 실패한 요청을 재시도했다. Refresh Token은 httpOnly 쿠키에 저장해 JS 접근을 차단했다. useAuth 훅에서는 AccessTokenExpiration을 읽어 만료 전에 선제적으로 갱신하며, debounce를 적용해 연속 호출로 인한 중복 재발급을 방지했다. 재발급 실패 시에는 localStorage와 Recoil 상태를 초기화하고 /login?sessionExpired=true로 리다이렉트해 세션을 종료했다.",
      },
      {
        title: "역할 기반 라우팅 접근 제어",
        description:
          "ProtectRoute HOC를 만들어 isPrivate, isProtected, isPublic 세 가지 플래그를 조합해 접근을 제어했다. isPrivate는 비로그인 사용자를 /login으로 리다이렉트하고, isProtected는 SELLER만 접근 가능한 라우트를 걸렀으며, isPublic은 이미 로그인된 사용자가 /login에 다시 들어오지 못하도록 막았다. Recoil의 userState에서 userRole을 읽어 판단하고 useEffect 안에서 navigate를 호출하는 방식으로 구현했다.",
      },
      {
        title: "AWS S3 이미지 업로드",
        description:
          "Firebase Storage 무료 플랜 한도 초과로 이미지가 전부 차단되는 문제를 직접 겪으면서 AWS S3로 전환했다.\n\n상품 이미지 업로드 시 FormData에 파일을 담아 multipart/form-data로 POST /products/images에 전송하면 서버가 S3에 저장한 뒤 imageFileUrl을 반환하는 구조를 사용했다. 여러 파일을 동시에 올릴 때는 Promise.all로 병렬 처리해 업로드 시간을 줄였고, 최대 3개, .jpg/.jpeg/.png/.webp 형식으로 제한했다. 홈 화면의 배너 이미지는 @aws-sdk/client-s3의 S3Client와 GetObjectCommand를 클라이언트에서 직접 사용해 fe-fordogs-image-bucket 버킷에서 조회했다.",
      },
      {
        title: "Iamport 연동 결제 시스템",
        description:
          "결제 플로우는 세 단계로 구성했다. 먼저 POST /orders로 주문을 생성해 orderId를 받고, 이를 merchant_uid로 삼아 Iamport SDK의 IMP.request_pay에 NicePay 카드 결제를 요청했다. 결제 성공 후 imp_uid와 merchant_uid를 POST /payments로 서버에 전달해 검증 및 등록을 완료했다. 결제 완료 후에는 Recoil의 cartState를 초기화하고 메인으로 이동하도록 처리했다.",
      },
      {
        title: "Recoil + localStorage 장바구니 동기화",
        description:
          "장바구니 상태를 Recoil의 cartState atom으로 관리하고, effects_UNSTABLE의 onSet 콜백으로 상태가 바뀔 때마다 localStorage에 자동으로 저장했다. atom의 default 값은 loadCartFromLocalStorage 함수로 초기 진입 시 localStorage에서 복원했다. 이로써 페이지를 새로고침해도 장바구니가 유지되도록 했다.",
      },

      {
        title: "OAuth2 소셜 로그인 (Google · 카카오)",
        description:
          "OAuth2 인증 후 쿼리 파라미터로 전달되는 authCode를 처리했다. 백엔드에서 인코딩 없이 전달된 authCode의 + 기호가 공백으로 변환되는 문제를 프론트에서 직접 감지하고 해결 방법을 백엔드에 공유해 함께 수정했다.",
      },
      {
        title: "장바구니 · 결제 · 주문 관리 (구매자)",
        description:
          "장바구니 추가·수정·삭제와 상품 결제, 주문 내역 조회 및 취소 기능을 구현했다. 주문 취소 시 SweetAlert select로 5가지 취소 사유 중 선택하도록 했고, 구매자 프로필에서 paymentId 클릭 시 결제 상세 정보를 팝업으로 확인할 수 있다.",
      },
      {
        title: "상품 등록 · 수정 · 삭제 및 판매 관리 (판매자)",
        description:
          "판매자 계정으로 상품 등록·수정·삭제와 판매 내역 조회, 주문 상태 변경 기능을 구현했다. 상품 이미지는 FormData로 POST /products/images에 전송하면 서버가 S3에 업로드한 뒤 URL을 반환하는 구조로 처리했다. 주문 상태는 CONFIRMED·AWAITING_SHIPMENT·SHIPPED·DELIVERED 4가지로 변경할 수 있다.",
      },
    ],

    challenges: [
      {
        problem:
          "Firebase에서 REST API로 전환하면서 인증 체계 전체를 새로 설계해야 했다. Firebase Auth가 담당하던 토큰 발급, 갱신, 전역 상태 동기화를 모두 직접 구현해야 했고, 기존 컴포넌트가 Firebase 메서드에 직접 의존하고 있어서 교체 범위가 컸다.",
        solution:
          "Axios 인터셉터에서 토큰 주입과 갱신을 일괄 처리하도록 중앙화하고, Recoil의 userState와 isLoggedInState를 localStorage 기반으로 초기화해 새로고침 후에도 인증 상태가 유지되도록 설계했다. 로그아웃 시에는 /users/logout API 호출 후 localStorage와 Recoil 상태를 모두 초기화해 양쪽이 항상 일치하게 했다.",
      },
      {
        problem:
          "JWT 구현 초기에 Refresh Token 만료 여부를 기준으로 로그인 상태를 관리하려 했다. httpOnly 쿠키에 저장된 Refresh Token은 JS로 접근이 불가능한데, 로컬 환경에서 SameSite=None, Secure=false 설정으로 인해 쿠키 자체가 차단되어 사라지는 현상을 'httpOnly라서 JS 접근이 안 되는 것'으로 잘못 이해했다.",
        solution:
          "Access Token 만료 시간을 localStorage에 저장하고, API 호출 시마다 현재 시간과 비교해 만료됐으면 재발급 API를 호출하는 방식으로 전환했다. 로그인 상태는 Refresh Token이 아닌 Access Token 기준으로 관리하고, Refresh Token 만료로 재발급 실패 시 로그아웃 처리하는 흐름으로 정리했다.",
      },
      {
        problem:
          "Refresh Token을 httpOnly 쿠키로 전달받는 구조에서 로컬 개발 환경(HTTP)과 서버(HTTPS) 간 도메인이 달라 쿠키가 전송되지 않았다. SameSite=None으로 변경하면 Secure=true가 필수라 HTTPS가 없으면 쿠키가 차단됐고, 도메인 구매 후 HTTPS를 적용해도 브라우저가 서브도메인 간 쿠키를 외부 쿠키로 분류해 차단하는 문제가 이어졌다.",
        solution:
          "가비아에서 도메인을 구매하고 SSL 인증서를 발급받아 HTTPS를 적용했다. 이후 쿠키의 domain 속성에 루트 도메인(fordogs.store)을 명시해 서브도메인 간 쿠키 공유를 허용하고, 같은 도메인을 쓰게 되어 SameSite=None 대신 SameSite=Strict로 변경해 최종 해결하였고 로컬 환경에서 개발을 위해 임시로 SameSite=None으로 변경하여 사용하였다.",
      },
      {
        problem:
          "401 응답 시 토큰을 갱신하는 Response 인터셉터에서, 갱신 요청 자체도 401을 받을 경우 인터셉터가 재귀적으로 갱신을 반복하는 무한 루프가 발생할 수 있었다.",
        solution:
          "originalRequest 객체에 _retry 플래그를 추가해 이미 한 번 재시도한 요청은 다시 갱신을 시도하지 않도록 막았다. 추가로 모듈 스코프에 retryCount와 MAX_RETRIES(1) 변수를 두어 갱신 시도 횟수를 제한했고, 갱신 실패 시에는 logout 함수를 호출해 스토리지와 상태를 모두 초기화한 뒤 /login?sessionExpired=true로 리다이렉트했다.",
      },
      {
        problem:
          "비밀번호 정책에서 연속된 문자(abc, 123 등)나 키보드 배열 순서 문자를 포함하면 안 된다는 조건을 서버 API 없이 클라이언트에서만 검증해야 했다. 단순 정규식으로는 처리하기 어려운 복잡한 로직이었다.",
        solution:
          "validateNoConsecutiveChars 함수를 별도로 작성해 문자열을 순회하며 현재·다음·그다음 문자의 charCode를 비교했다. 세 문자가 연속 증가(+1+1)하거나 연속 감소(-1-1)하는 패턴을 감지해 false를 반환하도록 구현했다. 여기에 대문자·소문자·숫자·특수문자 중 3종류 이상 포함 여부, 10~16자 길이 제한, 아이디/이메일 포함 금지, 공백 금지 조건을 각각 분리된 검증 단계로 순차적으로 처리했다.",
      },
      {
        problem:
          "OAuth2 인증 후 백엔드에서 authCode를 URL 인코딩 없이 전달해, 쿼리 파라미터를 파싱하는 과정에서 + 기호가 공백으로 변환되는 문제가 발생했다.",
        solution:
          "프론트에서 쿼리 문자열을 가져온 뒤 공백을 다시 +로 치환해 임시 처리했다. 이후 해결 방법을 백엔드에 공유해 서버에서 authCode를 인코딩해서 전달하도록 수정했다.",
      },
      {
        problem:
          "사용자 프로필 정보를 여러 컴포넌트에서 각각 API로 요청하다 보니 동일한 데이터를 중복으로 fetch하는 불필요한 API 호출이 발생했다.",
        solution:
          "useRef로 이미 데이터를 가져온 경우 API 요청을 건너뛰는 플래그를 구현했다. 페이지 새로고침이나 다른 작업 수행 시에도 동일한 프로필 정보를 중복 요청하지 않아 성능과 API 부하를 개선했다.",
      },
    ],

    learnings:
      "JWT를 처음 구현하면서 Access Token과 Refresh Token의 역할 분리, httpOnly 쿠키의 보안 의미, SameSite 정책까지 이론으로만 알던 내용을 직접 오류를 겪으며 체득했다. 특히 로컬 환경에서 쿠키가 사라지는 현상을 httpOnly 때문으로 잘못 이해했다가 SameSite·Secure 설정 문제임을 뒤늦게 파악한 경험이 인상 깊었다. 오류 메시지를 표면적으로 읽지 않고 브라우저 보안 정책의 동작 원리부터 파악해야 한다는 것을 배웠다.\n\nAxios 인터셉터로 인증 흐름을 중앙화하면서 만료 전 선제 갱신·401 재시도·무한 루프 방지·갱신 실패 시 세션 종료까지 모든 경우의 수를 고려하는 설계 감각을 익혔다.\n\nReact Query를 처음 도입하면서 서버 상태와 클라이언트 상태를 분리해서 관리하는 방식을 익혔다. useEffect + useState로 처리하던 API 호출을 React Query로 교체하면서 캐싱, 중복 요청 방지가 얼마나 간결하게 해결되는지 체감했다.\n\n백엔드 개발자와 처음으로 협업하면서 API 계약(엔드포인트 설계, 요청/응답 타입)을 먼저 정의하고 작업하는 것이 얼마나 중요한지 배웠다. TypeScript 인터페이스를 interface 디렉토리에 별도로 관리해 양측이 동일한 타입을 기준으로 작업할 수 있었고, 런타임 에러보다 컴파일 타임에 불일치를 잡을 수 있었다. OAuth2 authCode 인코딩 문제처럼 어느 쪽 책임인지 불분명한 이슈를 함께 파악하고 해결하는 과정에서 협업 능력이 성장했다.",
  },

  {
    slug: "banbok",
    images: [
      "https://github.com/user-attachments/assets/a2102c33-2fa3-4aa9-98a7-73a21905f6d9",
      "https://github.com/user-attachments/assets/74f887d2-ace3-445f-8baf-c47f044f8ee0",
      "https://github.com/user-attachments/assets/4b236f62-ce6c-44e8-b20f-da88c5fdbd1b",
      "https://github.com/user-attachments/assets/38aa188e-5163-4ff8-903d-ce4c5d24c058",
      "https://github.com/user-attachments/assets/70cf5ca0-204e-4d40-a232-e0c3571e00c9",
      "https://github.com/user-attachments/assets/8a8316f2-2770-45f7-ac00-7ce6f083f11a",
      "https://github.com/user-attachments/assets/aae83e9c-5033-446d-b3fc-80b4ea1b7b5b",
    ],
    background:
      "코딩 테스트를 한 번 풀고 나면 잊어버리기 쉬운데, 반복 학습 없이는 실력이 늘기 어렵다는 것을 느꼈다. 해결한 문제 링크를 등록하면 일정 주기로 메일을 보내 다시 풀어볼 수 있도록 유도하는 서비스를 만들고 싶었다. Next.js API Route와 Cheerio를 조합해 서버 사이드에서 문제 정보를 크롤링하고, Naver OAuth로 간편 로그인을 지원하는 풀스택 구조로 설계했다.",
    goals: [
      "풀었던 코딩 테스트 문제를 주기적으로 메일로 받아 반복 학습하는 사이클 구현",
      "Next.js API Route + Cheerio 기반 서버 사이드 크롤링으로 문제 정보 자동 추출",
      "Naver OAuth2 로그인 및 Zustand 기반 전역 인증 상태 관리 구현",
      "뽀모도로 타이머, 히트맵, 음성 제어 등 학습 보조 기능 제공",
    ],
    features: [
      {
        title: "문제 등록 (Cheerio 크롤링)",
        description:
          "문제 링크를 입력하면 Next.js API Route에서 Cheerio로 페이지를 크롤링해 제목과 사이트 정보를 자동 추출한다. 서버 사이드에서 처리해 CORS 문제를 우회하고 클라이언트 번들에 크롤러 코드가 포함되지 않는다.",
      },
      {
        title: "Naver OAuth2 로그인",
        description:
          "쿼리 파라미터로 전달된 accessToken을 로컬 스토리지에 저장하고 URL에서 즉시 제거해 토큰 노출을 최소화했다. Zustand로 로그인/로그아웃 상태를 전역 관리하며, 새로고침 후에도 세션이 유지된다.",
      },
      {
        title: "학습 히트맵",
        description:
          "문제 풀이 기록을 잔디 스타일 히트맵으로 시각화해 날짜별 학습 패턴을 한눈에 확인할 수 있다. 연도별 전환 버튼으로 장기간 데이터 탐색도 지원한다.",
      },
      {
        title: "Web Speech API 음성 제어",
        description:
          "Web Speech API를 활용해 음성 명령으로 로그인, 홈 이동, 로그아웃 기능을 제어할 수 있다. 키보드 없이도 핵심 네비게이션을 수행할 수 있는 접근성 기능이다.",
      },
      {
        title: "뽀모도로 타이머",
        description:
          "집중과 휴식 사이클을 관리하는 뽀모도로 타이머를 내장했다. 모바일 가로모드 대응 시 width 조건 대신 height 조건을 적용해 반응형 레이아웃 오작동을 해결했다.",
      },
    ],
    challenges: [
      {
        problem:
          "isLoading의 초기값이 false여서 useEffect의 fetchUser()가 실행되기 전에 미로그인 상태로 잘못 판단해, 로그인한 유저가 프로필 페이지 진입 시 /login으로 리다이렉션되는 문제가 발생했다.",
        solution:
          "hasHydrated 플래그를 추가해 클라이언트 Zustand 상태가 완전히 초기화되기 전에는 렌더링과 리다이렉션 판단을 보류했다. fetchUser() 완료 이후에만 로그인 여부를 평가하도록 제어해 잘못된 리다이렉션과 초기 렌더링 플래시를 함께 방지했다.",
      },
      {
        problem:
          "뽀모도로 타이머에 모바일 가로모드 스타일을 추가하는 과정에서 width 기준 미디어 쿼리를 사용했더니, 데스크탑에서 화면을 최소→최대로 늘릴 때 모바일→데스크탑→모바일 순으로 스타일이 전환되는 오작동이 발생했다.",
        solution:
          "width 조건 대신 height 조건을 가로모드 미디어 쿼리와 조합해 적용했다. 화면 너비가 아닌 높이로 가로모드를 감지하도록 변경해 데스크탑 환경에서 모바일 스타일이 의도치 않게 적용되는 문제를 해결했다.",
      },
    ],
    learnings:
      "Next.js API Route와 Cheerio를 조합해 서버 사이드 크롤링을 구현하면서, 클라이언트에서 직접 외부 페이지를 요청할 때 발생하는 CORS 문제를 서버 레이어로 우회하는 구조를 직접 설계해봤다.\n\nhasHydrated 플래그 패턴을 통해 클라이언트 상태 초기화 타이밍 문제를 해결하면서, SSR 환경에서 전역 상태가 hydrate되기 전의 공백 구간을 명시적으로 처리하는 것이 얼마나 중요한지 체감했다.\n\n반응형 구현에서 width가 아닌 height 조건으로 가로모드를 감지하는 방식을 직접 도출하면서, 미디어 쿼리 조건을 단순히 관용적으로 쓰는 것을 넘어 실제 디바이스 환경에서 어떤 값이 변하는지 원리부터 생각하는 습관을 갖게 됐다.",
  },

  // sub
  {
    slug: "jiheon-portfolio",
    images: [
      "/assets/projects/jihean-portfolio.png",
      "/assets/portfolios/home.png",
      "/assets/portfolios/skill.png",
      "/assets/portfolios/project.png",
      "/assets/portfolios/contact.png",
      "/assets/portfolios/detail.png",
    ],
    background:
      "프론트엔드 개발자로서 내 이름을 검색했을 때 나오는 포트폴리오 사이트가 남들처럼 있으면 좋겠다고 생각했다. 이유는 취업 시 제출할 용도와 프로젝트를 진행함에 따라서 지속적으로 추가할 수 있다는 장점이 있기 때문이다. React SPA는 CSR 방식이라 검색엔진에 잘 노출되지 않는 문제가 있어, Next.js SSG로 빌드 시점에 완성된 HTML을 생성하는 방식을 선택했다. 포트폴리오 사이트 자체가 Next.js, TypeScript를 실제로 사용한 프로젝트 증명이 되도록 기술 스택을 설계했다.",
    goals: [
      "Google 검색에서 내 이름으로 노출되는 SEO 최적화 포트폴리오 구현",
      "Next.js · TypeScript · Tailwind CSS 등 기술 스택을 포트폴리오 자체로 증명",
      "다크/라이트 모드 지원 및 Supabase 기반 방문자 카운팅 기능 구현",
      "프로젝트 카드 클릭 시 상세 모달로 포트폴리오 내용을 효과적으로 전달",
    ],
    features: [
      {
        title: "다크모드 (next-themes)",
        description:
          "OS 시스템 설정을 기본값으로 감지하며, resolvedTheme 기반 토글로 첫 클릭부터 정확하게 전환된다. ThemeProvider의 enableSystem과 useTheme()의 theme/resolvedTheme 차이를 이해하고 적용했다.",
      },
      {
        title: "방문자 카운터 (Supabase)",
        description:
          "Supabase PostgreSQL daily_views 테이블에 날짜별 방문 수를 저장한다. localStorage로 하루 1회 중복 방지, total은 sum(count) 집계 쿼리로 계산해 동기화 문제를 방지했다. Next.js Route Handler를 통해서만 DB에 접근하고 RLS를 적용해 클라이언트 직접 접근을 차단했다.",
      },
      {
        title: "프로젝트 상세 모달",
        description:
          "카드 클릭 시 Framer Motion 기반 모달이 열린다. ReactDOM.createPortal로 document.body에 렌더링하고, ESC 키·backdrop 클릭으로 닫힌다. 데이터는 projects.ts(카드)와 projectDetails.ts(상세)로 분리해 관리한다.",
      },
      {
        title: "스크롤 애니메이션 (Framer Motion)",
        description:
          "whileInView + staggerChildren으로 섹션 진입 시 요소들이 순차 등장한다. AnimatePresence로 모바일 메뉴 진입/퇴장 애니메이션을 처리했다. viewport={{ once: true }}로 재진입 시 재실행을 방지했다.",
      },
    ],
    challenges: [
      {
        problem:
          "next-themes에서 enableSystem 사용 시 useTheme()의 theme 값이 'system'으로 반환돼 첫 번째 토글 클릭이 system → dark/light 전환으로 소비됐다. 결과적으로 실제 테마 전환이 한 박자씩 밀리는 현상이 발생했다.",
        solution:
          "theme 대신 resolvedTheme을 사용. resolvedTheme은 next-themes가 내부적으로 OS의 prefers-color-scheme을 읽어 계산한 값으로, enableSystem 활성화 시 'system' 상태에서도 항상 'dark' | 'light' 중 하나를 반환해 첫 클릭부터 정상 동작한다.",
      },
      {
        problem:
          "서버는 사용자의 theme 값을 알 수 없어 기본값(라이트 모드 아이콘)으로 HTML을 렌더링하고, 브라우저에서 JS 실행 후 실제 테마로 교체되는 찰나에 아이콘이 깜빡이는 FOUC(Flash of Unstyled Content) 현상이 발생했다.",
        solution:
          "mounted 상태 체크를 추가해 테마가 확정되기 전까지 렌더링을 생략했다. 동일 크기의 빈 div로 자리를 유지해 레이아웃 흔들림(CLS)도 함께 방지했다. layout.tsx의 html 태그에 suppressHydrationWarning을 추가해 next-themes가 클라이언트에서 class를 뒤늦게 주입할 때 발생하는 hydration 경고도 억제했다.",
      },
      {
        problem:
          "모바일 메뉴가 닫힐 때 조건부 렌더링(&&)으로 처리하면 menuOpen = false 순간 React가 DOM을 즉시 제거해 닫히는 애니메이션 없이 뚝 사라지는 끊김이 발생했다.",
        solution:
          "AnimatePresence + motion.div로 교체. AnimatePresence가 언마운트 타이밍을 가로채 exit 애니메이션(height: auto → 0, opacity: 1 → 0)이 끝날 때까지 DOM을 유지한다. motion.div에 overflow-hidden을 추가해 height 애니메이션 중 내용이 삐져나오는 것을 방지했다.",
      },
      {
        problem:
          "모달이 열리는 시점에 처음으로 이미지를 fetch하는 구조라, 첫 로드 시 최대 583ms이상의 지연들이 발생하는 경우가 있었다.  ",
        solution:
          "그래서 모달이 열리기 전에 카드에 마우스 hover 시 해당 프로젝트 이미지를 미리 preload하도록 구현했다. ProjectCard와 SubProjectCard 각각의 onMouseEnter 이벤트에서 new window.Image()로 이미지를 fetch해 브라우저 캐시에 저장해두고, 모달이 열릴 때는 캐시에서 즉시 표시되도록 했고 Network 탭 기준 개선 전 최대 583ms → 개선 후 6~11ms(캐시 히트)로 단축됐다. 페이지 초기 로드에는 영향 없이 hover 타이밍을 활용한 lazy preload 방식이다.",
      },
    ],
    learnings:
      "포트폴리오 사이트 자체가 기술 스택의 증명이 된다는 것을 체감했다.\n\nSSR 환경에서 클라이언트 전용 상태(theme, localStorage)를 다룰 때 hydration 문제를 반드시 고려해야 한다. useTheme()의 theme과 resolvedTheme 차이처럼 라이브러리 내부 동작을 이해하고 써야 예측 가능한 코드가 나온다는 것도 배웠다.\n\n조건부 렌더링(&&)과 AnimatePresence의 차이를 통해 'CSS transition은 DOM이 존재해야 동작한다'는 근본 원리를 이해했다. 단순히 애니메이션 라이브러리를 쓰는 것을 넘어 왜 AnimatePresence가 필요한지 설명할 수 있게 됐다.\n\n배포 환경에서 모달창을 열었을 때 이미지 로딩이 로컬보다 느리다는 것을 직접 체감한 뒤, 브라우저 캐시 동작 방식을 학습하고 preload 개념을 처음 적용해봤다. hover 같은 사용자 인터랙션 타이밍을 활용해 미리 리소스를 fetch 해두는 패턴이 UX개선에 효과적이라는 것을 체감했다.\n\n또한 이번 기회에 Supabase를 통해 DB를 활용하여 구현할 수 있었다. 단순한 카운팅 기능이지만 Vercel 서버리스 환경에서 메모리가 휘발되는 문제를 인지하고 DB 영속성 저장소를 선택하는 과정, 배열/큐 방식 대신 날짜를 기본키로 분리하는 관계형 DB 설계, total을 별도 컬럼 대신 sum(count) 집계 쿼리로 계산해 동기화 문제를 방지하는 방식까지 하나의 기능을 설계하면서 여러 기술적 판단을 직접 내려봤다. Next.js Route Handler와 RLS를 조합해 클라이언트 직접 접근을 차단하는 보안 설계도 함께 경험했다.",
  },
  {
    slug: "loaking",
    background: "...",
    // ...
  },
];
