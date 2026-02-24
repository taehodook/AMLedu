# KASG LMS — 한국자금세탁방지연구회 AML 교육 시스템

## 📁 파일 구조
```
kasg-lms/
├── index.html          ← 로그인 + 회원가입
├── dashboard.html      ← 수강 대시보드
├── player.html         ← YouTube 강의 플레이어
├── exam.html           ← 최종 평가 (20문항, 40분)
├── result.html         ← 평가 결과
├── certificate.html    ← 수료증 발급
├── admin-login.html    ← 관리자 로그인
├── admin.html          ← 관리자 대시보드
├── css/main.css
├── js/
│   ├── firebase-config.js  ← ⚠️ API키 교체 필수
│   ├── quiz-data.js
│   └── utils.js
└── assets/
    ├── logo-circle.png
    └── logo-wide.png
```

## 🔥 Firebase 설정 (필수)

### 1. `js/firebase-config.js` 수정
Firebase Console (console.firebase.google.com) → 프로젝트 aml-2-5e6d5 → 프로젝트 설정 → 웹 앱에서 아래 값을 복사:
```js
apiKey:            "실제_API_KEY",
messagingSenderId: "실제_SENDER_ID",
appId:             "실제_APP_ID"
```

### 2. Realtime Database 규칙
Firebase Console → Realtime Database → 규칙 탭:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## 🚀 GitHub Pages 배포

1. GitHub 저장소 생성
2. 이 폴더 전체 업로드 (또는 git push)
3. Settings → Pages → Source: main branch / root
4. `https://[username].github.io/[repo-name]/` 접속

## 👨‍💼 관리자

- 관리자 페이지: `admin-login.html`
- 기본 비밀번호: `kasg2025admin`
- 관리 기능:
  - 수강생 가입 승인 / 거절
  - 비밀번호 초기화
  - 수강 진도 초기화
  - 수강생 삭제
  - YouTube URL로 강의 등록
  - 강의 수정 / 삭제 / 공개·잠금
  - 수료 현황 CSV 내보내기

## 🎓 수강생 흐름

1. 회원가입 → 관리자 승인 대기
2. 승인 후 로그인 → 대시보드
3. 강의 선택 → YouTube 영상 시청 (앞으로 넘기기 불가)
4. 25% / 50% / 75% 지점에서 이해도 퀴즈 (통과해야 계속 시청)
5. 영상 완료 → 최종 평가 (20문항, 40분)
6. 70점 이상 → 수료증 발급 (인쇄 / PDF 저장)
7. 미수료 → 재수강 후 다른 문제셋으로 재응시 (최대 2회)

## 📜 수료증 자동 반영 항목

강의 등록 시 입력한 **강의명**, **교육목적**이 수료증에 자동 반영됩니다.
- 교육장소: 사이버온라인교육 (고정)
- 교육형태: 온라인 교육 (고정)
- 발급기관: 한국자금세탁방지연구회 회장 정태호 (고정)
