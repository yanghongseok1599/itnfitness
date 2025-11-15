# 전화번호 0 누락 문제 해결

## 문제 상황
Google Sheets에 전화번호가 저장될 때 앞자리 `0`이 사라지고 10자리만 표기되는 문제

예:
- 입력: `010-1234-5678`
- 저장: `101234568` (0이 사라짐)

## 원인
Google Sheets가 전화번호를 숫자로 인식하여 앞자리 0을 제거함

## 해결 방법

### 1. Google Apps Script 코드 업데이트

업데이트된 [google-apps-script.js](google-apps-script.js) 코드를 Google Apps Script 에디터에 다시 복사하세요.

**주요 변경사항:**
```javascript
// 연락처를 텍스트로 저장 (0이 사라지지 않도록)
const phoneCell = sheet.getRange(newRow, 3);
phoneCell.setValue(data.phone || '');
phoneCell.setNumberFormat('@'); // @ 는 텍스트 포맷

// 연락처 컬럼(C열) 전체를 텍스트 포맷으로 설정
const phoneColumn = sheet.getRange('C:C');
phoneColumn.setNumberFormat('@');
```

### 2. Apps Script 재배포

#### 2-1. Apps Script 에디터 열기
1. Google Sheets 열기: `https://docs.google.com/spreadsheets/d/1esPg6oDofi0SU_mk3vs8IgVWeY3Q68AFNCg1MfX7MjU/edit`
2. **확장 프로그램** → **Apps Script** 클릭

#### 2-2. 코드 교체
1. 기존 코드 전체 삭제
2. 업데이트된 [google-apps-script.js](google-apps-script.js) 코드 전체 복사하여 붙여넣기
3. **저장** (Ctrl+S 또는 💾 아이콘)

#### 2-3. 새로 배포
**방법 1: 기존 배포 업데이트 (권장)**
1. **배포** → **배포 관리** 클릭
2. 기존 배포 옆의 ✏️ (수정) 아이콘 클릭
3. **버전** → **새 버전** 선택
4. **배포** 클릭

**방법 2: 새 배포 생성**
1. **배포** → **새 배포** 클릭
2. 웹 앱 설정 동일하게 유지
3. 새 배포 URL이 생성되면 `.env.local` 파일 업데이트 필요

### 3. 기존 데이터 수정 (선택사항)

이미 저장된 데이터의 앞자리 0을 복구하려면:

#### 방법 1: Google Sheets에서 직접 수정
1. C열(연락처) 전체 선택
2. **서식** → **숫자** → **일반 텍스트** 선택
3. 각 셀에 `'010-1234-5678` 형식으로 수정 (앞에 작은따옴표 추가)

#### 방법 2: Apps Script로 일괄 수정
```javascript
function fixPhoneNumbers() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  // 연락처 컬럼(C열) 전체를 텍스트로 설정
  const phoneColumn = sheet.getRange('C:C');
  phoneColumn.setNumberFormat('@');

  // 2번째 행부터 마지막 행까지 (1번째는 헤더)
  for (let i = 2; i <= lastRow; i++) {
    const phoneCell = sheet.getRange(i, 3);
    let phone = phoneCell.getValue().toString();

    // 10자리 숫자면 앞에 0 추가
    if (phone.length === 10 && !phone.startsWith('0')) {
      phone = '0' + phone;
      phoneCell.setValue(phone);
    }
  }

  Logger.log('전화번호 수정 완료!');
}
```

1. Apps Script 에디터에 위 함수 추가
2. **실행** 버튼 클릭
3. 권한 승인 후 실행

### 4. 테스트

1. 랜딩 페이지에서 테스트 데이터 제출
   - 이름: 테스트
   - 연락처: **010-9999-8888**
   - 상담내용: 전화번호 테스트
2. Google Sheets 확인
3. 전화번호가 `010-9999-8888` 전체로 표시되는지 확인

## ✅ 확인 사항

- [ ] Apps Script 코드 업데이트 완료
- [ ] 배포 업데이트 완료
- [ ] 테스트 제출로 11자리 전화번호 확인
- [ ] 기존 데이터 수정 (필요 시)

## 📝 참고

- `setNumberFormat('@')`: Google Sheets에서 텍스트 포맷 지정
- 텍스트 포맷으로 저장하면 0으로 시작하는 숫자도 그대로 유지됨
- 향후 제출되는 모든 데이터는 자동으로 텍스트 포맷으로 저장됨
