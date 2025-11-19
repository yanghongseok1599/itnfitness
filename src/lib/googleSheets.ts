// Google Sheets API 유틸리티

export interface FormData {
  name: string;
  phone: string;
  message: string;
  source?: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
}

/**
 * 구글 시트에 폼 데이터를 제출합니다 (랜딩페이지 상담신청 전용)
 * @param formData 제출할 폼 데이터
 * @returns 제출 결과
 */
export async function submitToGoogleSheets(
  formData: FormData
): Promise<SubmitResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_LANDING_FORM_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === 'YOUR_LANDING_FORM_SCRIPT_URL_HERE') {
    console.error('랜딩페이지 Google Apps Script URL이 설정되지 않았습니다.');
    // 개발 환경에서는 콘솔에만 출력
    console.log('제출된 데이터:', formData);
    return {
      success: true,
      message: '개발 모드: 데이터가 콘솔에 출력되었습니다.',
    };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script는 CORS를 지원하지 않으므로 no-cors 모드 사용
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    });

    // no-cors 모드에서는 응답을 읽을 수 없으므로, 요청이 성공했다고 가정
    return {
      success: true,
      message: '상담 신청이 완료되었습니다.',
    };
  } catch (error) {
    console.error('Google Sheets 제출 오류:', error);
    return {
      success: false,
      message: '제출 중 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
}

/**
 * 카카오톡 상담으로 리다이렉트
 */
export function redirectToKakao() {
  // 실제 카카오톡 채널 URL로 변경하세요
  const kakaoUrl = 'https://pf.kakao.com/_your_channel_id';
  window.open(kakaoUrl, '_blank');
}

/**
 * 전화 걸기
 */
export function makePhoneCall(phoneNumber: string) {
  window.location.href = `tel:${phoneNumber}`;
}
