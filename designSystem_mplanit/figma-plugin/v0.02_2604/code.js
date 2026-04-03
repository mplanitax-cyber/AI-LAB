// ============================================
// Landing Page Generator - Figma Plugin
// code.js v2.0 (수정본)
// ============================================

const CLAUDE_API_KEY = 'YOUR_API_KEY_HERE'; // 실제 키로 교체

// ── 디자인 시스템 정의 ──────────────────────
const designSystems = {
  "AIA": {
    name: "AIA생명",
    primary:      { r: 0.831, g: 0,     b: 0.247 },
    secondary:    { r: 0.102, g: 0.102, b: 0.102 },
    bg:           { r: 1,     g: 1,     b: 1     },
    cardBg:       { r: 0.97,  g: 0.97,  b: 0.97  },
    white:        { r: 1,     g: 1,     b: 1     },
    fonts: ["Noto Sans KR", "Apple SD Gothic Neo", "sans-serif"],
    borderRadius: 4,
    ctaText: "지금 바로 가입하기"
  },
  "흥국": {
    name: "흥국화재",
    primary:      { r: 1,    g: 0.42,  b: 0     },
    secondary:    { r: 0,    g: 0.188, b: 0.529 },
    bg:           { r: 0.98, g: 0.98,  b: 0.98  },
    cardBg:       { r: 1,    g: 1,     b: 1     },
    white:        { r: 1,    g: 1,     b: 1     },
    fonts: ["Pretendard", "Apple SD Gothic Neo", "sans-serif"],
    borderRadius: 8,
    ctaText: "무료 상담 신청"
  },
  "엠플": {
    name: "엠플랜잇",
    primary:      { r: 1,     g: 0.176, b: 0.471 },
    secondary:    { r: 0.102, g: 0.102, b: 0.102 },
    bg:           { r: 1,     g: 1,     b: 1     },
    cardBg:       { r: 0.97,  g: 0.97,  b: 0.97  },
    white:        { r: 1,     g: 1,     b: 1     },
    fonts: ["Pretendard", "Apple SD Gothic Neo", "sans-serif"],
    borderRadius: 12,
    ctaText: "시작하기"
  }
};

// ── 기본 섹션 데이터 ─────────────────────────
const defaultSections = {
  landing: [
    { type: "hero",    headline: "당신의 미래를 설계하세요",         sub: "전문가와 함께하는 맞춤형 보험 솔루션", cta: true },
    { type: "benefit", items: ["빠른 심사", "간편한 가입", "24시간 고객지원", "합리적인 보험료"] },
    { type: "how",     steps: ["상담 신청", "맞춤 설계", "간편 가입", "보장 시작"] },
    { type: "cta",     headline: "지금 바로 시작하세요",             sub: "무료 상담은 언제든지 가능합니다" }
  ],
  event: [
    { type: "hero",    headline: "특별한 혜택을 만나보세요",         sub: "이벤트 기간 동안만 제공되는 특별 혜택", cta: true },
    { type: "benefit", items: ["경품 증정", "할인 혜택", "추가 적립", "특별 서비스"] },
    { type: "cta",     headline: "이벤트 기간을 놓치지 마세요",      sub: "선착순 마감" }
  ],
  product: [
    { type: "hero",    headline: "새로운 상품을 소개합니다",         sub: "고객 맞춤형 보험 상품", cta: true },
    { type: "benefit", items: ["넓은 보장 범위", "합리적 보험료", "간편 청구", "빠른 지급"] },
    { type: "how",     steps: ["상품 확인", "보장 분석", "가입 신청", "보장 개시"] },
    { type: "cta",     headline: "지금 가입하면 첫 달 무료",         sub: "한정 혜택" }
  ]
};

// ── 폰트 로드 헬퍼 (fallback 포함) ──────────
async function loadFont(ds, style = "Regular") {
  for (const family of ds.fonts) {
    try {
      await figma.loadFontAsync({ family, style });
      return family; // 성공한 폰트 반환
    } catch (e) {
      // 다음 폰트로 시도
    }
  }
  // 최종 fallback
  await figma.loadFontAsync({ family: "Inter", style });
  return "Inter";
}

// ── UI 실행 ──────────────────────────────────
figma.showUI(__html__, { width: 300, height: 500 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;

  try {
    const ds = designSystems[msg.client] || designSystems["엠플"];
    const sections = defaultSections[msg.pageType] || defaultSections.landing;
    let parsedSections = sections;

    // 기획서가 있으면 Claude API로 분석
    if (msg.hasFile && msg.fileData) {
      figma.ui.postMessage({ type: 'status', step: 1 });
      const aiSections = await analyzeWithClaude(msg.fileData, msg.client, msg.pageType);
      if (aiSections) parsedSections = aiSections;
    }

    figma.ui.postMessage({ type: 'status', step: 2 });
    await buildLandingPage(parsedSections, ds, msg.pageType);

    figma.ui.postMessage({ type: 'done' });
    figma.notify(`✅ ${ds.name} 랜딩페이지 생성 완료!`, { timeout: 3000 });

  } catch (err) {
    figma.ui.postMessage({ type: 'error', message: err.message });
    figma.notify('❌ 오류: ' + err.message, { error: true });
  }
};

// ── Claude API 분석 ──────────────────────────
async function analyzeWithClaude(fileBase64, client, pageType) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: { type: 'base64', media_type: 'application/pdf', data: fileBase64 }
            },
            {
              type: 'text',
              text: `클라이언트: ${client}, 페이지 타입: ${pageType}
이 기획서를 분석해서 랜딩페이지 섹션 구조를 JSON으로만 반환하세요. 다른 텍스트 없이 JSON만:
{"sections":[
  {"type":"hero","headline":"...","sub":"...","cta":true},
  {"type":"benefit","items":["...","...","...","..."]},
  {"type":"how","steps":["...","...","...","..."]},
  {"type":"cta","headline":"...","sub":"..."}
]}`
            }
          ]
        }]
      })
    });

    const data = await res.json();
    if (!data.content || !data.content[0]) return null;
    const clean = data.content[0].text.trim().replace(/```json|```/g, '').trim();
    return JSON.parse(clean).sections;
  } catch (e) {
    console.error('Claude API 오류:', e);
    return null;
  }
}

// ── 랜딩페이지 빌드 ──────────────────────────
async function buildLandingPage(sections, ds, pageType) {
  const W = 390;

  // 최상위 페이지 프레임 (Auto Layout - 세로 스택)
  const page = figma.createFrame();
  page.name = `Landing_${ds.name}_${pageType}`;
  page.layoutMode = "VERTICAL";
  page.primaryAxisSizingMode = "AUTO";   // 높이 자동
  page.counterAxisSizingMode = "FIXED";  // 너비 고정
  page.resize(W, 100); // 초기값, AUTO로 늘어남
  page.fills = [{ type: 'SOLID', color: ds.bg }];
  page.x = Math.round(figma.viewport.center.x - W / 2);
  page.y = Math.round(figma.viewport.center.y);
  page.itemSpacing = 0;
  page.paddingTop = 0;
  page.paddingBottom = 0;
  page.paddingLeft = 0;
  page.paddingRight = 0;

  for (const section of sections) {
    let f = null;
    if (section.type === 'hero')    f = await buildHero(section, ds, W);
    if (section.type === 'benefit') f = await buildBenefit(section, ds, W);
    if (section.type === 'how')     f = await buildHow(section, ds, W);
    if (section.type === 'cta')     f = await buildCTA(section, ds, W);
    if (f) {
      f.layoutAlign = "STRETCH";
      page.appendChild(f);
    }
  }

  figma.currentPage.selection = [page];
  figma.viewport.scrollAndZoomIntoView([page]);
}

// ── Hero 섹션 ─────────────────────────────────
async function buildHero(data, ds, W) {
  const fontFamily = await loadFont(ds, "Bold");
  await loadFont(ds, "Regular");

  const H = 480;
  const f = figma.createFrame();
  f.name = "Section / Hero";
  f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: ds.secondary }];
  f.clipsContent = true;
  f.layoutMode = "NONE"; // Hero는 자유배치

  // 배경 장식 원
  const c1 = figma.createEllipse();
  c1.resize(300, 300); c1.x = W - 100; c1.y = -80;
  c1.fills = [{ type: 'SOLID', color: ds.primary, opacity: 0.15 }];
  f.appendChild(c1);

  const c2 = figma.createEllipse();
  c2.resize(160, 160); c2.x = -40; c2.y = H - 80;
  c2.fills = [{ type: 'SOLID', color: ds.primary, opacity: 0.1 }];
  f.appendChild(c2);

  // 헤드라인
  const hl = figma.createText();
  hl.fontName = { family: fontFamily, style: "Bold" };
  hl.fontSize = 28;
  hl.characters = data.headline || "당신의 미래를 설계하세요";
  hl.fills = [{ type: 'SOLID', color: ds.white }];
  hl.textAutoResize = "HEIGHT";
  hl.resize(W - 48, 10);
  hl.x = 24; hl.y = 140;
  f.appendChild(hl);

  // 서브텍스트
  const sb = figma.createText();
  sb.fontName = { family: fontFamily, style: "Regular" };
  sb.fontSize = 15;
  sb.characters = data.sub || "전문가와 함께하는 맞춤형 솔루션";
  sb.fills = [{ type: 'SOLID', color: ds.white, opacity: 0.75 }];
  sb.textAutoResize = "HEIGHT";
  sb.resize(W - 48, 10);
  sb.x = 24; sb.y = hl.y + hl.height + 14;
  f.appendChild(sb);

  // CTA 버튼 (Auto Layout 활용)
  if (data.cta) {
    const btn = figma.createFrame();
    btn.name = "Button / Primary";
    btn.layoutMode = "HORIZONTAL";
    btn.primaryAxisSizingMode = "AUTO";
    btn.counterAxisSizingMode = "AUTO";
    btn.paddingTop = 14; btn.paddingBottom = 14;
    btn.paddingLeft = 24; btn.paddingRight = 24;
    btn.fills = [{ type: 'SOLID', color: ds.primary }];
    btn.cornerRadius = ds.borderRadius;

    const bt = figma.createText();
    bt.fontName = { family: fontFamily, style: "Bold" };
    bt.fontSize = 14;
    bt.characters = ds.ctaText;
    bt.fills = [{ type: 'SOLID', color: ds.white }];
    btn.appendChild(bt);

    btn.x = 24; btn.y = sb.y + sb.height + 32;
    f.appendChild(btn);
  }

  return f;
}

// ── Benefit 섹션 ──────────────────────────────
async function buildBenefit(data, ds, W) {
  const fontFamily = await loadFont(ds, "Bold");
  await loadFont(ds, "Regular");

  const items = data.items || [];
  const icons = ["⚡", "🎯", "💬", "🛡️", "🎁", "📱"];
  const COLS = 2;
  const PAD = 24;
  const GAP = 12;
  const CW = Math.floor((W - PAD * 2 - GAP) / COLS);
  const CH = 90;
  const rows = Math.ceil(items.length / COLS);
  const H = 80 + rows * (CH + GAP) + 32;

  const f = figma.createFrame();
  f.name = "Section / Benefit";
  f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: ds.cardBg }];
  f.layoutMode = "NONE";

  // 섹션 타이틀
  const t = figma.createText();
  t.fontName = { family: fontFamily, style: "Bold" };
  t.fontSize = 18;
  t.characters = "주요 혜택";
  t.fills = [{ type: 'SOLID', color: ds.secondary }];
  t.x = PAD; t.y = 32;
  f.appendChild(t);

  items.forEach((item, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);

    // 카드 프레임 (Auto Layout)
    const card = figma.createFrame();
    card.name = `Benefit_Card_${i + 1}`;
    card.layoutMode = "VERTICAL";
    card.primaryAxisSizingMode = "FIXED";
    card.counterAxisSizingMode = "FIXED";
    card.resize(CW, CH);
    card.x = PAD + col * (CW + GAP);
    card.y = 70 + row * (CH + GAP);
    card.fills = [{ type: 'SOLID', color: ds.white }];
    card.cornerRadius = ds.borderRadius;
    card.paddingTop = 14; card.paddingBottom = 14;
    card.paddingLeft = 14; card.paddingRight = 14;
    card.itemSpacing = 8;

    // 아이콘 텍스트
    const ic = figma.createText();
    try {
      ic.fontName = { family: "Inter", style: "Regular" };
    } catch {
      ic.fontName = { family: fontFamily, style: "Regular" };
    }
    ic.fontSize = 20;
    ic.characters = icons[i] || "✦";
    card.appendChild(ic);

    // 카드 텍스트
    const ct = figma.createText();
    ct.fontName = { family: fontFamily, style: "Bold" };
    ct.fontSize = 13;
    ct.characters = item;
    ct.fills = [{ type: 'SOLID', color: ds.secondary }];
    ct.textAutoResize = "HEIGHT";
    ct.resize(CW - 28, 10);
    card.appendChild(ct);

    f.appendChild(card);
  });

  return f;
}

// ── How it Works 섹션 ─────────────────────────
async function buildHow(data, ds, W) {
  const fontFamily = await loadFont(ds, "Bold");
  await loadFont(ds, "Regular");

  const steps = data.steps || [];
  const H = 230;
  const PAD = 24;

  const f = figma.createFrame();
  f.name = "Section / How it Works";
  f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: ds.white }];
  f.layoutMode = "NONE";

  // 섹션 타이틀
  const t = figma.createText();
  t.fontName = { family: fontFamily, style: "Bold" };
  t.fontSize = 18;
  t.characters = "이용 방법";
  t.fills = [{ type: 'SOLID', color: ds.secondary }];
  t.x = PAD; t.y = 28;
  f.appendChild(t);

  const usableW = W - PAD * 2;
  const SW = steps.length > 0 ? Math.floor(usableW / steps.length) : usableW;
  const CIRCLE_SIZE = 36;
  const CIRCLE_Y = 88;
  const LABEL_Y = 138;

  steps.forEach((step, i) => {
    const cx = PAD + i * SW + Math.floor(SW / 2);

    // 연결선 (먼저 그려야 원 뒤에 깔림)
    if (i < steps.length - 1) {
      const lineStart = cx + Math.floor(CIRCLE_SIZE / 2);
      const lineEnd = PAD + (i + 1) * SW + Math.floor(SW / 2) - Math.floor(CIRCLE_SIZE / 2);
      const ln = figma.createLine();
      ln.x = lineStart; ln.y = CIRCLE_Y + Math.floor(CIRCLE_SIZE / 2);
      ln.resize(Math.max(lineEnd - lineStart, 1), 0);
      ln.strokes = [{ type: 'SOLID', color: { r: 0.85, g: 0.85, b: 0.85 } }];
      ln.strokeWeight = 1.5;
      f.appendChild(ln);
    }

    // 스텝 원
    const ci = figma.createEllipse();
    ci.resize(CIRCLE_SIZE, CIRCLE_SIZE);
    ci.x = cx - Math.floor(CIRCLE_SIZE / 2);
    ci.y = CIRCLE_Y;
    ci.fills = [{ type: 'SOLID', color: i === 0 ? ds.primary : { r: 0.92, g: 0.92, b: 0.92 } }];
    f.appendChild(ci);

    // 스텝 번호
    const n = figma.createText();
    n.fontName = { family: fontFamily, style: "Bold" };
    n.fontSize = 14;
    n.characters = String(i + 1);
    n.fills = [{ type: 'SOLID', color: i === 0 ? ds.white : ds.secondary }];
    // 텍스트 크기를 먼저 설정 후 위치 계산
    n.textAutoResize = "WIDTH_AND_HEIGHT";
    n.x = cx - Math.floor(n.width / 2);
    n.y = CIRCLE_Y + Math.floor((CIRCLE_SIZE - n.height) / 2);
    f.appendChild(n);

    // 스텝 라벨
    const sl = figma.createText();
    sl.fontName = { family: fontFamily, style: "Regular" };
    sl.fontSize = 11;
    sl.characters = step;
    sl.fills = [{ type: 'SOLID', color: ds.secondary }];
    sl.textAlignHorizontal = "CENTER";
    sl.textAutoResize = "HEIGHT";
    sl.resize(SW - 8, 10);
    sl.x = PAD + i * SW + 4;
    sl.y = LABEL_Y;
    f.appendChild(sl);
  });

  return f;
}

// ── CTA 섹션 ──────────────────────────────────
async function buildCTA(data, ds, W) {
  const fontFamily = await loadFont(ds, "Bold");
  await loadFont(ds, "Regular");

  const H = 210;
  const PAD = 24;

  const f = figma.createFrame();
  f.name = "Section / CTA";
  f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: ds.primary }];
  f.clipsContent = true;
  f.layoutMode = "NONE";

  // 배경 장식
  const d = figma.createEllipse();
  d.resize(220, 220); d.x = W - 70; d.y = -70;
  d.fills = [{ type: 'SOLID', color: ds.white, opacity: 0.08 }];
  f.appendChild(d);

  // 헤드라인
  const hl = figma.createText();
  hl.fontName = { family: fontFamily, style: "Bold" };
  hl.fontSize = 22;
  hl.characters = data.headline || "지금 바로 시작하세요";
  hl.fills = [{ type: 'SOLID', color: ds.white }];
  hl.textAutoResize = "HEIGHT";
  hl.resize(W - PAD * 2, 10);
  hl.x = PAD; hl.y = 44;
  f.appendChild(hl);

  // 서브텍스트
  const sb = figma.createText();
  sb.fontName = { family: fontFamily, style: "Regular" };
  sb.fontSize = 13;
  sb.characters = data.sub || "무료 상담은 언제든지 가능합니다";
  sb.fills = [{ type: 'SOLID', color: ds.white, opacity: 0.8 }];
  sb.textAutoResize = "HEIGHT";
  sb.resize(W - PAD * 2, 10);
  sb.x = PAD; sb.y = hl.y + hl.height + 10;
  f.appendChild(sb);

  // CTA 버튼 (Auto Layout)
  const btn = figma.createFrame();
  btn.name = "Button / White";
  btn.layoutMode = "HORIZONTAL";
  btn.primaryAxisSizingMode = "AUTO";
  btn.counterAxisSizingMode = "AUTO";
  btn.paddingTop = 13; btn.paddingBottom = 13;
  btn.paddingLeft = 22; btn.paddingRight = 22;
  btn.fills = [{ type: 'SOLID', color: ds.white }];
  btn.cornerRadius = ds.borderRadius;

  const bt = figma.createText();
  bt.fontName = { family: fontFamily, style: "Bold" };
  bt.fontSize = 13;
  bt.characters = ds.ctaText;
  bt.fills = [{ type: 'SOLID', color: ds.primary }];
  btn.appendChild(bt);

  btn.x = PAD; btn.y = sb.y + sb.height + 24;
  f.appendChild(btn);

  return f;
}
