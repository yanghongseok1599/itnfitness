import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ITN 피트니스 관련 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 ITN 피트니스의 친절한 AI 상담원입니다.

**ITN 피트니스 정보:**
- 위치: 강원도 동해시 효자남길 33-34 이아빌딩 2층
- 전문 분야: 재활 전문 피트니스
- 주요 서비스: 허리·목·어깨·무릎 통증 개선, 맞춤형 교정운동, 재활 트레이닝
- 전문가: 의학 석사 보유 전문가
- 실적: 52개 국공기관 교육 실적, 10년+ 경력
- 특징: 정확한 평가와 맞춤형 교정운동으로 통증을 근본적으로 개선

**답변 가이드:**
1. 항상 친절하고 공감하는 톤으로 답변하세요
2. 통증 관련 질문에는 전문적이면서도 이해하기 쉽게 설명하세요
3. 상담 신청을 원하면 연락처를 남기도록 안내하세요
4. 운동 방법 질문에는 안전한 방법을 우선 안내하세요
5. 답변은 2-3문장으로 간결하게 해주세요
6. 확실하지 않은 의료 정보는 제공하지 말고, 전문가 상담을 권유하세요

**자주 묻는 질문:**
- 영업 시간: 평일 06:00-01:00 (익일), 토·공휴일 09:00-19:00, 일요일 휴관
- 위치: 강원도 동해시 효자남길 33-34 이아빌딩 2층
- 전화: 010-9745-2246
- PT 가격: 상담을 통해 맞춤 견적 제공
- 무료 체험: 첫 방문 무료 체성분 검사 및 체형 평가
- 주차: 60대 이상 가능 (무료)`;

// Google Sheets에 대화 저장하는 함수 (ITN landing chatbot 시트 전용)
async function saveChatToGoogleSheets(userMessage: string, aiResponse: string) {
  try {
    const scriptUrl = process.env.NEXT_PUBLIC_CHATBOT_SCRIPT_URL;
    if (!scriptUrl) return;

    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "AI 챗봇 대화",
        phone: "-",
        message: `[사용자] ${userMessage}\n\n[AI 답변] ${aiResponse}`,
        source: "AI 챗봇",
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to save chat to Google Sheets:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "API 키가 설정되지 않았습니다.",
        },
        { status: 500 }
      );
    }

    // 대화 히스토리 구성
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "네, ITN 피트니스의 AI 상담원으로 고객님들께 친절하고 전문적인 상담을 제공하겠습니다.",
          },
        ],
      },
    ];

    // 이전 대화 히스토리 추가
    if (history && history.length > 1) {
      history.slice(1).forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      });
    }

    // 현재 메시지 추가
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Gemini API 호출
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json(
        {
          success: false,
          error: "AI 응답을 생성하는데 실패했습니다.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "죄송합니다. 응답을 생성할 수 없습니다.";

    // Google Sheets에 대화 저장 (비동기, 응답 속도에 영향 없음)
    saveChatToGoogleSheets(message, aiResponse);

    return NextResponse.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
