# KASG AML LMS — 한국자금세탁방지연구회 교육 시스템

Korea Anti-money Laundering Study Group · Learning Management System

## 📁 프로젝트 구조

```
kasg-lms/
├── index.html          # 수강생 로그인
├── dashboard.html      # 수강 대시보드
├── player.html         # 동영상 강의 플레이어
├── exam.html           # 최종 이해도 평가
├── result.html         # 평가 결과
├── certificate.html    # 수료증 발급
├── admin-login.html    # 관리자 로그인
├── admin.html          # 관리자 대시보드
├── css/
│   └── main.css        # 메인 스타일시트
├── js/
│   ├── firebase-config.js  # Firebase 설정
│   ├── quiz-data.js        # 문제 은행 (A셋/B셋 각 20문제)
│   └── utils.js            # 공통 유틸리티
└── assets/
    ├── logo-circle.png     # KASG 원형 로고
    └── logo-wide.png       # KASG 가로 로고
```

## 🔥 Firebase 설정 방법

### 1. Firebase Console 접속
https://console.firebase.google.com/project/aml-2-5e6d5

### 2. `js/firebase-config.js` 수정
```js
const firebaseConfig = {
  apiKey: "실제_API_KEY_입력",          // ← 여기 수정
  authDomain: "aml-2-5e6d5.firebaseapp.com",
  databaseURL: "https://aml-2-5e6d5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aml-2-5e6d5",
  storageBucket: "aml-2-5e6d5.appspot.com",
  messagingSenderId: "실제_MESSAGING_SENDER_ID",  // ← 여기 수정
  appId: "실제_APP_ID"                            // ← 여기 수정
};
```

### 3. Firebase Realtime Database 규칙 설정
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
> ⚠️ 프로덕션에서는 더 엄격한 규칙을 적용하세요.

### 4. Firebase Storage 규칙 설정
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 🚀 GitHub Pages 배포 방법

1. GitHub 저장소 생성 (예: `kasg-lms`)
2. 이 폴더의 모든 파일을 업로드
3. Settings → Pages → Source: **main branch / root** 선택
4. `https://[username].github.io/kasg-lms/` 접속

## 👨‍💼 관리자 기능

- **기본 비밀번호**: `kasg2025admin`
- 관리자 페이지: `admin-login.html`
- 강의 업로드 (Firebase Storage 연동)
- 수강생 현황 실시간 모니터링
- 수료 현황 및 수료증 발급 내역 조회
- CSV 내보내기

## 🎓 교육 시스템 흐름

1. 로그인 → 대시보드
2. 강의 선택 → 동영상 시청 (앞으로 넘기기 불가)
3. 영상 25%/50%/75% 지점에서 이해도 퀴즈 3문제 (통과해야 계속 시청)
4. 영상 완료 후 최종 평가 응시 가능
5. 최종 평가: 20문제, 40분, 70점 이상 수료
6. 미수료시 재수강 후 다른 문제셋으로 재응시 (최대 2회)
7. 수료시 수료증 발급 (인쇄/PDF 저장)

## 📜 수료증 정보

- 교육장소: 사이버온라인교육
- 교육형태: 온라인 교육
- 발급기관: 한국자금세탁방지연구회
- 수여자: 회장 정태호
- 교육과정명/교육목적: 강의 업로드 시 설정한 값 자동 반영
