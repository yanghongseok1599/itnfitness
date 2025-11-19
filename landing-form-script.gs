// 랜딩페이지 상담신청 폼 전용 Google Apps Script
// 이 스크립트는 "랜딩페이지" 구글시트에 데이터를 저장합니다

function doPost(e) {
  try {
    // 스프레드시트 설정 - 여기에 "랜딩페이지" 구글시트 ID를 입력하세요
    const SPREADSHEET_ID = 'YOUR_LANDING_PAGE_SPREADSHEET_ID_HERE';
    const SHEET_NAME = '상담신청';

    // JSON 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트 열기
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // 헤더 추가
      sheet.appendRow(['타임스탬프', '이름', '연락처', '상담내용', '출처']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // 데이터 추가
    const timestamp = data.timestamp || new Date().toISOString();
    const name = data.name || '';
    const phone = data.phone || '';
    const message = data.message || '';
    const source = data.source || '랜딩페이지';

    sheet.appendRow([
      timestamp,
      name,
      phone,
      message,
      source
    ]);

    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '상담 신청이 완료되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: '오류가 발생했습니다: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 테스트용
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    message: '랜딩페이지 상담신청 스크립트가 정상 작동 중입니다.'
  })).setMimeType(ContentService.MimeType.JSON);
}
