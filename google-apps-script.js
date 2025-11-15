// Google Apps Script 코드
// 이 코드를 구글 시트의 Apps Script 에디터에 복사하세요
// 1. 구글 시트 열기: https://docs.google.com/spreadsheets/d/1esPg6oDofi0SU_mk3vs8IgVWeY3Q68AFNCg1MfX7MjU/edit
// 2. 확장 프로그램 > Apps Script 클릭
// 3. 아래 코드를 복사하여 붙여넣기
// 4. 배포 > 새 배포 > 유형 선택: 웹 앱
// 5. 실행할 사용자: 나
// 6. 액세스 권한: 모든 사용자
// 7. 배포 후 웹 앱 URL을 복사하여 프론트엔드에서 사용

function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트 ID (현재 시트)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '타임스탬프',
        '이름',
        '연락처',
        '상담내용',
        '유입경로',
        '상태'
      ]);

      // 연락처 컬럼(C열) 전체를 텍스트 포맷으로 설정
      const phoneColumn = sheet.getRange('C:C');
      phoneColumn.setNumberFormat('@');
    }

    // 현재 시간
    const timestamp = new Date();

    // 새 행 추가
    const newRow = sheet.getLastRow() + 1;

    // 데이터 입력
    sheet.getRange(newRow, 1).setValue(timestamp); // 타임스탬프
    sheet.getRange(newRow, 2).setValue(data.name || ''); // 이름

    // 연락처를 텍스트로 저장 (0이 사라지지 않도록)
    const phoneCell = sheet.getRange(newRow, 3);
    phoneCell.setValue(data.phone || '');
    phoneCell.setNumberFormat('@'); // @ 는 텍스트 포맷

    sheet.getRange(newRow, 4).setValue(data.message || ''); // 상담내용
    sheet.getRange(newRow, 5).setValue(data.source || '랜딩페이지'); // 유입경로
    sheet.getRange(newRow, 6).setValue('신규'); // 상태

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '상담 신청이 완료되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: '오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Google Apps Script is working!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 수동 테스트 함수
function testSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: '홍길동',
        phone: '010-1234-5678',
        message: '허리 통증 상담 문의드립니다.',
        source: '테스트'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
