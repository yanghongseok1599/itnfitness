# Google Sheets 연동 설정 가이드

이 가이드는 ITN 피트니스 랜딩 페이지를 Google Sheets와 연동하는 방법을 설명합니다.

## 📋 목차

1. [Google Sheets 설정](#1-google-sheets-설정)
2. [Apps Script 배포](#2-apps-script-배포)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [테스트](#4-테스트)

---

## 1. Google Sheets 설정

### 1-1. Google Sheets 열기

제공받은 Google Sheets ID를 사용하여 시트를 엽니다:

```
https://docs.google.com/spreadsheets/d/1esPg6oDofi0SU_mk3vs8IgVWeY3Q68AFNCg1MfX7MjU/edit
```

### 1-2. 시트 확인

시트가 비어있다면, Apps Script가 자동으로 다음과 같은 헤더를 생성합니다:
- 타임스탬프
- 이름
- 연락처
- 상담내용
- 유입경로
- 상태

---

## 2. Apps Script 배포

### 2-1. Apps Script 에디터 열기

1. Google Sheets에서 **확장 프로그램** 메뉴 클릭
2. **Apps Script** 선택

### 2-2. 코드 복사

1. 프로젝트 루트의 `google-apps-script.js` 파일 열기
2. 전체 코드 복사
3. Apps Script 에디터에 붙여넣기
4. 프로젝트 이름을 "ITN 피트니스 상담 폼"으로 변경 (선택사항)

### 2-3. 배포하기

1. 에디터 상단의 **배포** 버튼 클릭
2. **새 배포** 선택
3. 설정:
   - **유형 선택**: ⚙️ 아이콘 클릭 → **웹 앱** 선택
   - **설명**: "ITN 피트니스 랜딩페이지 폼 제출" (선택사항)
   - **실행할 사용자**: **나**
   - **액세스 권한**: **모든 사용자**
4. **배포** 버튼 클릭
5. **액세스 승인** 필요 시:
   - **액세스 승인** 클릭
   - Google 계정 선택
   - **고급** 클릭
   - **[프로젝트 이름](안전하지 않은 페이지)로 이동** 클릭
   - **허용** 클릭

### 2-4. 웹 앱 URL 복사

배포 완료 후 나타나는 **웹 앱 URL**을 복사합니다.

예시:
```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxx/exec
```

⚠️ **중요**: 이 URL은 나중에 환경 변수에 사용됩니다.

---

## 3. 환경 변수 설정

### 3-1. .env.local 파일 수정

프로젝트 루트의 `.env.local` 파일을 엽니다:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=여기에_복사한_웹앱_URL_붙여넣기
```

### 3-2. URL 입력

복사한 웹 앱 URL을 `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` 값으로 입력합니다.

예시:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxx/exec
```

### 3-3. 개발 서버 재시작

환경 변수를 적용하려면 개발 서버를 재시작해야 합니다:

```bash
# Ctrl+C로 서버 중지 후
npm run dev
```

---

## 4. 테스트

### 4-1. 로컬 테스트

1. 브라우저에서 http://localhost:3000 열기
2. 페이지 하단의 "상담 신청하기" 섹션으로 스크롤
3. 테스트 데이터 입력:
   - 이름: 테스트
   - 연락처: 010-0000-0000
   - 상담내용: 테스트 제출입니다
4. **상담 신청하기** 버튼 클릭

### 4-2. Google Sheets 확인

1. Google Sheets로 돌아가기
2. 새로운 행에 데이터가 추가되었는지 확인
3. 타임스탬프가 자동으로 기록되었는지 확인

### 4-3. Apps Script에서 직접 테스트 (선택사항)

Apps Script 에디터에서:

1. **testSubmission** 함수 선택
2. **실행** 버튼 클릭
3. Google Sheets에서 테스트 데이터 확인

---

## 🔧 문제 해결

### 환경 변수가 적용되지 않음

- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버를 재시작했는지 확인
- 변수 이름이 `NEXT_PUBLIC_`로 시작하는지 확인

### 제출 후 시트에 데이터가 없음

- 웹 앱 URL이 올바른지 확인
- Apps Script 배포 시 "액세스 권한"을 "모든 사용자"로 설정했는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### "Script function not found: doPost" 에러

- Apps Script 코드가 올바르게 붙여넣어졌는지 확인
- 코드 저장 후 다시 배포

---

## 📊 데이터 관리

### 시트 컬럼 설명

| 컬럼 | 설명 | 자동생성 |
|------|------|----------|
| 타임스탬프 | 제출 시간 | ✅ |
| 이름 | 신청자 이름 | ❌ |
| 연락처 | 전화번호 | ❌ |
| 상담내용 | 문의 내용 | ❌ |
| 유입경로 | 랜딩페이지/카카오톡 등 | ✅ |
| 상태 | 신규/연락중/완료 | ✅ (기본값: 신규) |

### 상태 관리

"상태" 컬럼을 수동으로 업데이트하여 상담 진행 상황을 관리할 수 있습니다:
- **신규**: 새로 접수된 상담
- **연락중**: 고객과 연락 진행 중
- **완료**: 상담 완료

---

## 🚀 배포 (Vercel)

Vercel에 배포할 때도 환경 변수를 설정해야 합니다:

1. Vercel 프로젝트 설정 페이지 이동
2. **Settings** → **Environment Variables** 클릭
3. 환경 변수 추가:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: 복사한 웹 앱 URL
   - **Environment**: Production, Preview, Development 모두 선택
4. **Save** 클릭
5. 프로젝트 재배포

---

## 📞 카카오톡 연동

카카오톡 채널 URL을 업데이트하려면:

1. `src/lib/googleSheets.ts` 파일 열기
2. `redirectToKakao` 함수에서 URL 변경:

```typescript
export function redirectToKakao() {
  const kakaoUrl = 'https://pf.kakao.com/_실제_채널_ID'; // 여기를 변경
  window.open(kakaoUrl, '_blank');
}
```

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Google Sheets 접근 가능
- [ ] Apps Script 코드 복사 및 저장
- [ ] Apps Script 배포 완료
- [ ] 웹 앱 URL 복사
- [ ] `.env.local` 파일에 URL 입력
- [ ] 개발 서버 재시작
- [ ] 테스트 제출 성공
- [ ] Google Sheets에 데이터 확인

---

## 📚 추가 자료

- [Google Apps Script 공식 문서](https://developers.google.com/apps-script)
- [Next.js 환경 변수 가이드](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Vercel 환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)
