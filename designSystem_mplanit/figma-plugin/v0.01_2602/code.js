// ============================================
// Landing Page Generator - Figma Plugin
// code.js (Figma sandbox 환경에서 실행)
// ============================================

const CLAUDE_API_KEY = 'YOUR_API_KEY_HERE'; // 실제 키로 교체

const designSystems = {
  "AIA": {
    name: "AIA생명",
    primary:   { r: 0.831, g: 0,     b: 0.247 },
    secondary: { r: 0.102, g: 0.102, b: 0.102 },
    bg:        { r: 1,     g: 1,     b: 1     },
    font: "Noto Sans KR",
    borderRadius: 4,
    ctaText: "지금 바로 가입하기"
  },
  "흥국": {
    name: "흥국화재",
    primary:   { r: 1,    g: 0.42,  b: 0     },
    secondary: { r: 0,    g: 0.188, b: 0.529 },
    bg:        { r: 0.98, g: 0.98,  b: 0.98  },
    font: "Pretendard",
    borderRadius: 8,
    ctaText: "무료 상담 신청"
  },
  "엠플": {
    name: "엠플랜잇",
    primary:   { r: 1,     g: 0.176, b: 0.471 },
    secondary: { r: 0.102, g: 0.102, b: 0.102 },
    bg:        { r: 1,     g: 1,     b: 1     },
    font: "Pretendard",
    borderRadius: 12,
    ctaText: "시작하기"
  }
};

const defaultSections = {
  landing: [
    { type: "hero",    headline: "당신의 미래를 설계하세요",    sub: "전문가와 함께하는 맞춤형 보험 솔루션", cta: true },
    { type: "benefit", items: ["빠른 심사", "간편한 가입", "24시간 고객지원", "합리적인 보험료"] },
    { type: "how",     steps: ["상담 신청", "맞춤 설계", "간편 가입", "보장 시작"] },
    { type: "cta",     headline: "지금 바로 시작하세요", sub: "무료 상담은 언제든지 가능합니다" }
  ],
  event: [
    { type: "hero",    headline: "특별한 혜택을 만나보세요",    sub: "이벤트 기간 동안만 제공되는 특별 혜택", cta: true },
    { type: "benefit", items: ["경품 증정", "할인 혜택", "추가 적립", "특별 서비스"] },
    { type: "cta",     headline: "이벤트 기간을 놓치지 마세요", sub: "선착순 마감" }
  ],
  product: [
    { type: "hero",    headline: "새로운 상품을 소개합니다",    sub: "고객 맞춤형 보험 상품", cta: true },
    { type: "benefit", items: ["넓은 보장 범위", "합리적 보험료", "간편 청구", "빠른 지급"] },
    { type: "how",     steps: ["상품 확인", "보장 분석", "가입 신청", "보장 개시"] },
    { type: "cta",     headline: "지금 가입하면 첫 달 무료", sub: "한정 혜택" }
  ]
};

// UI 실행
figma.showUI(__html__, { width: 296, height: 480 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;
  try {
    const ds = designSystems[msg.client] || designSystems["엠플"];
    const sections = defaultSections[msg.pageType] || defaultSections.landing;
    let parsedSections = sections;
    if (msg.hasFile && msg.fileData) {
      parsedSections = await analyzeWithClaude(msg.fileData, msg.client, msg.pageType) || sections;
    }
    await buildLandingPage(parsedSections, ds, msg.pageType);
    figma.ui.postMessage({ type: 'done' });
    figma.notify(`✅ ${ds.name} 랜딩페이지 생성 완료!`, { timeout: 3000 });
  } catch (err) {
    figma.ui.postMessage({ type: 'error', message: err.message });
    figma.notify('❌ 오류: ' + err.message, { error: true });
  }
};

async function analyzeWithClaude(fileBase64, client, pageType) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CLAUDE_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: fileBase64 } },
          { type: 'text', text: `클라이언트: ${client}, 타입: ${pageType}\nJSON만 반환:\n{"sections":[{"type":"hero","headline":"...","sub":"...","cta":true},{"type":"benefit","items":["...","...","...","..."]},{"type":"how","steps":["...","...","...","..."]},{"type":"cta","headline":"...","sub":"..."}]}` }
        ]}]
      })
    });
    const data = await res.json();
    const clean = data.content[0].text.trim().replace(/```json|```/g, '').trim();
    return JSON.parse(clean).sections;
  } catch (e) {
    console.error('Claude API 오류:', e);
    return null;
  }
}

async function buildLandingPage(sections, ds, pageType) {
  const W = 390;
  let y = 0;
  const page = figma.createFrame();
  page.name = `Landing_${ds.name}_${pageType}`;
  page.resize(W, 100);
  page.fills = [{ type: 'SOLID', color: ds.bg }];
  page.x = Math.round(figma.viewport.center.x - W / 2);
  page.y = Math.round(figma.viewport.center.y);

  for (const section of sections) {
    let f = null;
    if (section.type === 'hero')    f = await buildHero(section, ds, W);
    if (section.type === 'benefit') f = await buildBenefit(section, ds, W);
    if (section.type === 'how')     f = await buildHow(section, ds, W);
    if (section.type === 'cta')     f = await buildCTA(section, ds, W);
    if (f) { f.x = 0; f.y = y; page.appendChild(f); y += f.height; }
  }
  page.resize(W, y);
  figma.currentPage.selection = [page];
  figma.viewport.scrollAndZoomIntoView([page]);
}

// ── Hero ──────────────────────────────────
async function buildHero(data, ds, W) {
  await figma.loadFontAsync({ family: ds.font, style: "Bold" });
  await figma.loadFontAsync({ family: ds.font, style: "Regular" });

  const H = 480;
  const f = figma.createFrame();
  f.name = "Hero"; f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: ds.secondary }];
  f.clipsContent = true;

  const c1 = figma.createEllipse(); c1.resize(300,300); c1.x=W-100; c1.y=-80;
  c1.fills=[{type:'SOLID',color:ds.primary,opacity:0.15}]; f.appendChild(c1);

  const c2 = figma.createEllipse(); c2.resize(160,160); c2.x=-40; c2.y=H-80;
  c2.fills=[{type:'SOLID',color:ds.primary,opacity:0.1}]; f.appendChild(c2);

  const hl = figma.createText();
  hl.fontName={family:ds.font,style:"Bold"}; hl.fontSize=28;
  hl.characters=data.headline||"당신의 미래를 설계하세요";
  hl.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
  hl.x=24; hl.y=140; hl.resize(W-48, hl.height); f.appendChild(hl);

  const sb = figma.createText();
  sb.fontName={family:ds.font,style:"Regular"}; sb.fontSize=15;
  sb.characters=data.sub||"전문가와 함께하는 맞춤형 솔루션";
  sb.fills=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.7}];
  sb.x=24; sb.y=hl.y+hl.height+14; sb.resize(W-48,sb.height); f.appendChild(sb);

  if (data.cta) {
    const btn = figma.createFrame();
    btn.resize(160,48); btn.x=24; btn.y=sb.y+sb.height+32;
    btn.fills=[{type:'SOLID',color:ds.primary}]; btn.cornerRadius=ds.borderRadius;
    const bt = figma.createText();
    bt.fontName={family:ds.font,style:"Bold"}; bt.fontSize=14;
    bt.characters=ds.ctaText; bt.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
    bt.x=Math.round((160-bt.width)/2); bt.y=Math.round((48-bt.height)/2);
    btn.appendChild(bt); f.appendChild(btn);
  }
  return f;
}

// ── Benefit ───────────────────────────────
async function buildBenefit(data, ds, W) {
  await figma.loadFontAsync({ family: ds.font, style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  const items = data.items || [];
  const COLS=2, CW=Math.floor((W-48-12)/COLS), CH=90;
  const rows=Math.ceil(items.length/COLS);
  const H=80+rows*(CH+12)+40;
  const icons=["⚡","🎯","💬","🛡️","🎁","📱"];

  const f=figma.createFrame(); f.name="Benefit"; f.resize(W,H);
  f.fills=[{type:'SOLID',color:{r:0.97,g:0.97,b:0.97}}];

  const t=figma.createText();
  t.fontName={family:ds.font,style:"Bold"}; t.fontSize=18;
  t.characters="주요 혜택"; t.fills=[{type:'SOLID',color:ds.secondary}];
  t.x=24; t.y=32; f.appendChild(t);

  items.forEach((item,i)=>{
    const col=i%COLS, row=Math.floor(i/COLS);
    const card=figma.createFrame(); card.resize(CW,CH);
    card.x=24+col*(CW+12); card.y=70+row*(CH+12);
    card.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; card.cornerRadius=ds.borderRadius;

    const ic=figma.createText();
    ic.fontName={family:"Inter",style:"Regular"}; ic.fontSize=22;
    ic.characters=icons[i]||"✦"; ic.x=14; ic.y=12; card.appendChild(ic);

    const ct=figma.createText();
    ct.fontName={family:ds.font,style:"Bold"}; ct.fontSize=13;
    ct.characters=item; ct.fills=[{type:'SOLID',color:ds.secondary}];
    ct.x=14; ct.y=52; ct.resize(CW-28,ct.height); card.appendChild(ct);

    f.appendChild(card);
  });
  return f;
}

// ── How ───────────────────────────────────
async function buildHow(data, ds, W) {
  await figma.loadFontAsync({ family: ds.font, style: "Bold" });
  await figma.loadFontAsync({ family: ds.font, style: "Regular" });

  const steps=data.steps||[], H=220;
  const f=figma.createFrame(); f.name="How it works"; f.resize(W,H);
  f.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];

  const t=figma.createText();
  t.fontName={family:ds.font,style:"Bold"}; t.fontSize=18;
  t.characters="이용 방법"; t.fills=[{type:'SOLID',color:ds.secondary}];
  t.x=24; t.y=28; f.appendChild(t);

  const SW=steps.length>0?Math.floor((W-48)/steps.length):W-48;

  steps.forEach((step,i)=>{
    const x=24+i*SW;
    const ci=figma.createEllipse(); ci.resize(36,36);
    ci.x=x+Math.round((SW-36)/2); ci.y=78;
    ci.fills=[{type:'SOLID',color:i===0?ds.primary:{r:0.9,g:0.9,b:0.9}}];
    f.appendChild(ci);

    const n=figma.createText();
    n.fontName={family:ds.font,style:"Bold"}; n.fontSize=14;
    n.characters=String(i+1);
    n.fills=[{type:'SOLID',color:i===0?{r:1,g:1,b:1}:ds.secondary}];
    n.x=ci.x+Math.round((36-n.width)/2); n.y=ci.y+Math.round((36-n.height)/2);
    f.appendChild(n);

    if(i<steps.length-1){
      const ln=figma.createLine();
      ln.x=ci.x+36; ln.y=ci.y+18; ln.resize(SW-36,0);
      ln.strokes=[{type:'SOLID',color:{r:0.85,g:0.85,b:0.85}}]; ln.strokeWeight=1.5;
      f.appendChild(ln);
    }

    const st=figma.createText();
    st.fontName={family:ds.font,style:"Regular"}; st.fontSize=11;
    st.characters=step; st.fills=[{type:'SOLID',color:ds.secondary}];
    st.textAlignHorizontal="CENTER"; st.resize(SW-8,st.height);
    st.x=x+4; st.y=124; f.appendChild(st);
  });
  return f;
}

// ── CTA ───────────────────────────────────
async function buildCTA(data, ds, W) {
  await figma.loadFontAsync({ family: ds.font, style: "Bold" });
  await figma.loadFontAsync({ family: ds.font, style: "Regular" });

  const H=200;
  const f=figma.createFrame(); f.name="CTA"; f.resize(W,H);
  f.fills=[{type:'SOLID',color:ds.primary}]; f.clipsContent=true;

  const d=figma.createEllipse(); d.resize(200,200); d.x=W-60; d.y=-60;
  d.fills=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.08}]; f.appendChild(d);

  const hl=figma.createText();
  hl.fontName={family:ds.font,style:"Bold"}; hl.fontSize=22;
  hl.characters=data.headline||"지금 바로 시작하세요";
  hl.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
  hl.x=24; hl.y=44; hl.resize(W-48,hl.height); f.appendChild(hl);

  const sb=figma.createText();
  sb.fontName={family:ds.font,style:"Regular"}; sb.fontSize=13;
  sb.characters=data.sub||"무료 상담은 언제든지 가능합니다";
  sb.fills=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.8}];
  sb.x=24; sb.y=hl.y+hl.height+10; sb.resize(W-48,sb.height); f.appendChild(sb);

  const btn=figma.createFrame(); btn.resize(140,44);
  btn.x=24; btn.y=sb.y+sb.height+22;
  btn.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; btn.cornerRadius=ds.borderRadius;

  const bt=figma.createText();
  bt.fontName={family:ds.font,style:"Bold"}; bt.fontSize=13;
  bt.characters=ds.ctaText; bt.fills=[{type:'SOLID',color:ds.primary}];
  bt.x=Math.round((140-bt.width)/2); bt.y=Math.round((44-bt.height)/2);
  btn.appendChild(bt); f.appendChild(btn);

  return f;
}
