# Mplanit Design System — AI Context Document

> 이 문서는 AI(Claude)가 엠플랜잇 프로젝트 작업 시 반드시 따라야 하는 규칙과 컨텍스트입니다.
> **Figma Variable JSON 기반으로 자동 추출된 실제 토큰값입니다.**

---

## 🎨 디자인 시스템 규칙 (최우선!)

> ⚠️ **모든 UI 작업은 아래 디자인 시스템을 기반으로 합니다. 예외 없음.**

### 토큰 파일 구조 (3파일 동기화 필수)

| 파일 | 역할 | 수정 기준 |
|------|------|-----------|
| `theme.css` | CSS 변수 정의 (원본 헥스값은 **여기에만** 존재) | Figma 변수 변경 시에만 |
| `theme.js` | JS에서 토큰 참조용 (CSS 변수로 연결) | theme.css와 동기화 |
| `tailwind.config.js` | Tailwind 유틸리티 ↔ CSS 변수 매핑 | 토큰 추가/삭제 시에만 |

**코드 예시 — 올바른 사용 vs 금지:**
```jsx
// ❌ 금지: 헥스 코드 직접 사용
<div style={{ color: '#19448C' }}>

// ❌ 금지: Tailwind 기본 색상
<div className="text-blue-700">

// ✅ 올바른: CSS 변수 사용
<div style={{ color: 'var(--color-mp-azure-01)' }}>

// ✅ 올바른: Tailwind 커스텀 토큰
<div className="text-mp-azure-01">
```

---

## 🏢 클라이언트별 디자인 시스템

---

### 1. 엠플랜잇 (Mplanit) 자사

> 폰트: **Pretendard** (한국어), **Montserrat** (영문)

#### Brand Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-mp-azure-01` | `bg-mp-azure-01` | `#19448C` | 메인 브랜드 컬러 (Primary) |
| `--color-mp-azure-02` | `bg-mp-azure-02` | `#379BC1` | 보조 브랜드 컬러 |
| `--color-mp-blue-01` | `bg-mp-blue-01` | `#143162` | 딥 블루 |
| `--color-mp-blue-02` | `bg-mp-blue-02` | `#064EC8` | 블루 강조 |
| `--color-mp-blue-03` | `bg-mp-blue-03` | `#19448C` | Azure 동일값 |
| `--color-mp-blue-04` | `bg-mp-blue-04` | `#379BC1` | 미디엄 블루 |
| `--color-mp-blue-05` | `bg-mp-blue-05` | `#2576C1` | 블루 변형 |
| `--color-mp-blue-06` | `bg-mp-blue-06` | `#4797D6` | 라이트 블루 |
| `--color-mp-blue-07` | `bg-mp-blue-07` | `#45BBE9` | 스카이 블루 |
| `--color-mp-blue-08` | `bg-mp-blue-08` | `#19448CB2` | 블루 70% opacity |
| `--color-mp-blue-09` | `bg-mp-blue-09` | `#8AA4CA` | 페일 블루 |
| `--color-mp-blue-10` | `bg-mp-blue-10` | `#ABD1FE` | 라이트 페일 블루 |
| `--color-mp-blue-11` | `bg-mp-blue-11` | `#D0E1F0` | 아주 연한 블루 |

#### Font Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-font-primary` | `text-font-primary` | `#111111` | 메인 텍스트 |
| `--color-font-secondary` | `text-font-secondary` | `#2A2A2A` | 보조 텍스트 |
| `--color-font-tertiary` | `text-font-tertiary` | `#5A5A5A` | 3차 텍스트 |

#### Gray Scale

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-mp-gray-01` | `bg-mp-gray-01` | `#111111` | 가장 어두운 그레이 |
| `--color-mp-gray-02` | `bg-mp-gray-02` | `#2A2A2A` | 다크 그레이 |
| `--color-mp-gray-03` | `bg-mp-gray-03` | `#171717CC` | 다크 그레이 80% |
| `--color-mp-gray-04` | `bg-mp-gray-04` | `#5A5A5A` | 미디엄 그레이 |
| `--color-mp-gray-05` | `bg-mp-gray-05` | `#7C7C7C` | 그레이 |
| `--color-mp-gray-06` | `bg-mp-gray-06` | `#E9F0F2` | 라이트 블루 그레이 |
| `--color-mp-gray-07` | `bg-mp-gray-07` | `#DFDFDF` | 라이트 그레이 |
| `--color-mp-gray-08` | `bg-mp-gray-08` | `#F8F9FA` | 아주 연한 그레이 |
| `--color-mp-gray-09` | `bg-mp-gray-09` | `#CCCCCC` | 연한 그레이 |
| `--color-mp-gray-10` | `bg-mp-gray-10` | `#F1F0EF` | 웜 라이트 그레이 |

#### Black / White Alpha

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-black-100` | `bg-black-100` | `#000000` | 순수 블랙 |
| `--color-black-90` | `bg-black-90` | `#000000E5` | 블랙 90% |
| `--color-black-15` | `bg-black-15` | `#00000026` | 블랙 15% (오버레이) |
| `--color-black-01` | `bg-black-01` | `#00000003` | 블랙 1% |

---

### 2. AIA생명

> 폰트: **Paperlogy**

#### Brand Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-aia-red` | `bg-aia-red` | `#D31145` | AIA 메인 레드 (Primary) |
| `--color-aia-red-50` | `bg-aia-red-50` | `#D3114580` | AIA 레드 50% |
| `--color-aia-brown` | `bg-aia-brown` | `#5E1D1D` | AIA 브라운 (Primary) |
| `--color-aia-gray` | `bg-aia-gray` | `#545454` | AIA 그레이 (Primary) |

#### Secondary Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-aia-purple-01` | `bg-aia-purple-01` | `#9D1A5A` | 퍼플 |
| `--color-aia-pink-01` | `bg-aia-pink-01` | `#F67F87` | 핑크 01 |
| `--color-aia-pink-02` | `bg-aia-pink-02` | `#EF8AA9` | 핑크 02 |
| `--color-aia-pink-03` | `bg-aia-pink-03` | `#FFBFD1` | 핑크 03 |
| `--color-aia-pink-04` | `bg-aia-pink-04` | `#FDEAEA` | 핑크 04 (배경) |
| `--color-aia-brown-01` | `bg-aia-brown-01` | `#541828` | 딥 브라운 |
| `--color-aia-brown-02` | `bg-aia-brown-02` | `#E8D2C1` | 라이트 브라운 |
| `--color-aia-brown-03` | `bg-aia-brown-03` | `#F4E3D6` | 페일 브라운 |
| `--color-aia-brown-04` | `bg-aia-brown-04` | `#FFF7E0` | 크림 (배경) |
| `--color-aia-blue-01` | `bg-aia-blue-01` | `#DCD9E8` | 블루 (배경) |

---

### 3. 흥국화재

> 폰트: **Gmarket Sans**

#### Brand Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-hg-magenta` | `bg-hg-magenta` | `#EC008C` | 흥국 메인 마젠타 (Primary) |
| `--color-hg-purple` | `bg-hg-purple` | `#351B6F` | 흥국 퍼플 (Primary) |
| `--color-hg-blue` | `bg-hg-blue` | `#0074E7` | 흥국 블루 (Primary) |
| `--color-hg-gray` | `bg-hg-gray` | `#B3BBC0` | 흥국 그레이 (Primary) |

#### Secondary Colors

| CSS 변수 | Tailwind | 헥스값 | 용도 |
|----------|----------|--------|------|
| `--color-hg-magenta-01` | `bg-hg-magenta-01` | `#BD0070` | 마젠타 다크 |
| `--color-hg-magenta-02` | `bg-hg-magenta-02` | `#E4499F` | 마젠타 미드 |
| `--color-hg-magenta-03` | `bg-hg-magenta-03` | `#FFEAF6` | 마젠타 라이트 |
| `--color-hg-magenta-04` | `bg-hg-magenta-04` | `#FEF2F9` | 마젠타 페일 |
| `--color-hg-purple-01` | `bg-hg-purple-01` | `#5A3AAE` | 퍼플 01 |
| `--color-hg-purple-02` | `bg-hg-purple-02` | `#6948C1` | 퍼플 02 |
| `--color-hg-purple-03` | `bg-hg-purple-03` | `#8560B6` | 퍼플 03 |
| `--color-hg-purple-04` | `bg-hg-purple-04` | `#F5F1FD` | 퍼플 페일 |
| `--color-hg-blue-01` | `bg-hg-blue-01` | `#0096EB` | 블루 01 |
| `--color-hg-blue-02` | `bg-hg-blue-02` | `#3BB6D8` | 블루 02 |
| `--color-hg-blue-03` | `bg-hg-blue-03` | `#C3DBFD` | 블루 03 |
| `--color-hg-blue-04` | `bg-hg-blue-04` | `#DAF5FF` | 블루 04 |
| `--color-hg-blue-05` | `bg-hg-blue-05` | `#EEF4FE` | 블루 05 |
| `--color-hg-blue-06` | `bg-hg-blue-06` | `#EDF9FF` | 블루 페일 |
| `--color-hg-yellow-01` | `bg-hg-yellow-01` | `#FFC600` | 옐로우 |
| `--color-hg-yellow-02` | `bg-hg-yellow-02` | `#FFF7E0` | 옐로우 페일 |
| `--color-hg-green-01` | `bg-hg-green-01` | `#58C9C3` | 그린 |
| `--color-hg-green-02` | `bg-hg-green-02` | `#E5FFFE` | 그린 페일 |
| `--color-hg-green-03` | `bg-hg-green-03` | `#EAFCFF` | 그린 아주 연함 |

---

## 📐 공통 사이즈 토큰 (Size.json)

### 스페이싱 (Space Tokens)

> 아래 값 외 사용 금지

| CSS 변수 | 값 | Tailwind | Figma 토큰명 |
|----------|-----|----------|-------------|
| `--spacing-0` | 0px | `p-0` | Space/0 |
| `--spacing-2` | 2px | `p-2px` | Space/50 |
| `--spacing-4` | 4px | `p-4px` | Space/100 |
| `--spacing-6` | 6px | `p-6px` | Space/150 |
| `--spacing-8` | 8px | `p-8px` | Space/200 |
| `--spacing-12` | 12px | `p-12px` | Space/250 |
| `--spacing-16` | 16px | `p-16px` | Space/300 |
| `--spacing-18` | 18px | `p-18px` | Space/350 |
| `--spacing-20` | 20px | `p-20px` | Space/400 |
| `--spacing-24` | 24px | `p-24px` | Space/500 |
| `--spacing-28` | 28px | `p-28px` | Space/600 |
| `--spacing-30` | 30px | `p-30px` | Space/650 |
| `--spacing-32` | 32px | `p-32px` | Space/700 |
| `--spacing-34` | 34px | `p-34px` | Space/750 |
| `--spacing-36` | 36px | `p-36px` | Space/800 |
| `--spacing-40` | 40px | `p-40px` | Space/900 |
| `--spacing-42` | 42px | `p-42px` | Space/950 |
| `--spacing-48` | 48px | `p-48px` | Space/1050 |
| `--spacing-50` | 50px | `p-50px` | Space/1100 |
| `--spacing-64` | 64px | `p-64px` | Space/1600 |
| `--spacing-96` | 96px | `p-96px` | Space/2400 |
| `--spacing-160` | 160px | `p-160px` | Space/4000 |
| `--spacing-360` | 360px | `p-360px` | Space/9000 (Desktop Margin) |

### Border Radius

| CSS 변수 | 값 | Tailwind | Figma 토큰명 |
|----------|-----|----------|-------------|
| `--radius-2` | 2px | `rounded-2` | Radius/50 |
| `--radius-4` | 4px | `rounded-4` | Radius/100 |
| `--radius-8` | 8px | `rounded-8` | Radius/200 |
| `--radius-16` | 16px | `rounded-16` | Radius/400 |
| `--radius-20` | 20px | `rounded-20` | Radius/500 |
| `--radius-30` | 30px | `rounded-30` | Radius/600 |
| `--radius-full` | 9999px | `rounded-full` | Radius/Full |

### Icon Sizes

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--icon-small` | 24px | 소형 아이콘 |
| `--icon-medium` | 32px | 중형 아이콘 |
| `--icon-large` | 40px | 대형 아이콘 |

---

## 📝 타이포그래피 토큰 (Typography.json)

> 폰트: **Pretendard** (공통), **Montserrat** (영문)
> Figma Weight 매핑: Thin=200, ExtraLight=300, Light=400, Regular=500, Medium=600, Semibold=700, Bold=800, Black=900

### Title Hero
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size | 72px | `--font-size-title-hero` |
| font-weight | 700 | `--font-weight-title-hero` |
| font-family | Pretendard | `--font-family-base` |

### Title Page
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size-sm | 40px | `--font-size-title-page-sm` |
| font-size-md | 48px | `--font-size-title-page-md` |
| font-size-lg | 64px | `--font-size-title-page-lg` |
| font-weight | 700 | `--font-weight-title-page` |

### Subtitle
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size-sm | 24px | `--font-size-subtitle-sm` |
| font-size-md | 32px | `--font-size-subtitle-md` |
| font-size-lg | 40px | `--font-size-subtitle-lg` |
| font-weight | 500 | `--font-weight-subtitle` |

### Heading
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size-sm | 20px | `--font-size-heading-sm` |
| font-size-md | 24px | `--font-size-heading-md` |
| font-size-lg | 32px | `--font-size-heading-lg` |
| font-weight | 600 | `--font-weight-heading` |

### Subheading
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size-sm | 16px | `--font-size-subheading-sm` |
| font-size-md | 20px | `--font-size-subheading-md` |
| font-size-lg | 24px | `--font-size-subheading-lg` |
| font-weight | 500 | `--font-weight-subheading` |

### Body
| 속성 | 값 | CSS 변수 |
|------|-----|----------|
| font-size-sm | 14px | `--font-size-body-sm` |
| font-size-md | 16px | `--font-size-body-md` |
| font-size-lg | 20px | `--font-size-body-lg` |
| font-weight-rg | 500 | `--font-weight-body-regular` |
| font-weight-sb | 700 | `--font-weight-body-strong` |

---

## 📱 반응형 토큰 (Responsive.json)

| 토큰 | Desktop | Mobile |
|------|---------|--------|
| Device Width | 1920px | 375px |
| Tab Font Size | 18px | 16px |
| Margin | 360px | 20px |

### 배너 사이즈 (AIA)
| 토큰 | Desktop | Mobile |
|------|---------|--------|
| 너비 | 720px | 335px |
| 높이 | 420px | 400px |

### 배너 사이즈 (흥국화재)
| 토큰 | Desktop | Mobile |
|------|---------|--------|
| 너비 | 345px | 325px |
| 높이 | 480px | 460px |

---

## ⛔ 디자인 시스템 금지사항

| # | 금지 | 올바른 방법 | 예시 |
|---|------|-------------|------|
| 1 | 헥스 코드 직접 사용 | CSS 변수 사용 | `#19448C` → `var(--color-mp-azure-01)` |
| 2 | Tailwind 기본 색상 | 커스텀 토큰 사용 | `bg-blue-700` → `bg-mp-azure-01` |
| 3 | 토큰에 없는 spacing | 토큰 값만 사용 | `p-3`(12px 아님) → `p-12px` |
| 4 | 토큰에 없는 font-size | 토큰 값만 사용 | `15px` → `16px` 또는 `14px` |
| 5 | 기존 컴포넌트 중복 생성 | components/ 재사용 | 새 Button 만들기 → 기존 Button variant 활용 |
| 6 | 토큰 1파일만 수정 | 3파일 동시 수정 필수 | theme.css만 → theme.css + theme.js + tailwind.config.js |
| 7 | 클라이언트 컬러 혼용 | 해당 클라이언트 토큰만 사용 | AIA 작업에 HG 컬러 사용 금지 |

---

## 📁 프로젝트 구조

```
designSystem_mplanit/
├── design-guide.md             ← 이 파일 (AI 작업 규칙)
├── theme.css                   ← CSS 변수 정의 (원본 헥스값, @import 폰트)
├── theme.js                    ← JS 토큰 참조 (CSS 변수 연결)
├── tailwind.config.js          ← Tailwind ↔ CSS 변수 매핑
└── components/
    ├── index.js                ← barrel export
    ├── Button.jsx
    ├── Tag.jsx
    ├── Card.jsx
    ├── Input.jsx
    └── Badge.jsx
```

---

## 🛠️ 기술 스택

- **언어**: JavaScript (JSX)
- **스타일링**: CSS Variables (`theme.css`) + Tailwind CSS
- **폰트**: Pretendard / Montserrat (엠플랜잇), Paperlogy (AIA), Gmarket Sans (흥국화재)
- **디자인 소스**: Figma Variable JSON (직접 추출)

---

## 작업 원칙

- **작업 전 반드시 📋 작업 계획 보고 형식으로 먼저 보고**
- 승인 후 작업 진행
- 토큰 3파일 항상 동시 업데이트
- 기존 컴포넌트 재사용 우선
- 클라이언트별 토큰 혼용 금지

**Last Updated**: 2026-03-22 (Figma Variable JSON 기반 자동 추출)
