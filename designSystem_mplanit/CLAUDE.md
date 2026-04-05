# CLAUDE.md — Mplanit Design System 작업 규칙

## 프로젝트 경로
```
D:\jungmin\광고주\ㅇ~\엠플랜잇\designSystem_mplanit\
```
메인 파일: `design-system.html`

---

## 이식성 조건 (항상 적용, 예외 없음)
- 외부 CDN, 외부 URL 절대 금지
- `<link>` 외부 CSS 금지 → 모든 CSS는 `<style>` 태그 인라인
- `<script src>` 외부 JS 금지 → 모든 JS는 `<script>` 태그 인라인
- `<img src="./...">` 외부 이미지 금지 → SVG 인라인 또는 base64 data URI
- Google Fonts, 외부 폰트 로드 금지 → 시스템 폰트(sans-serif) 또는 폴더 내 폰트만
- **단일 HTML 파일로 다른 PC에서 완전히 동작해야 함**

---

## 컬러 필터 구조
design-system.html의 컬러 섹션은 4가지 카테고리로 분류:

| data-category 값 | 의미 |
|---|---|
| `all` | 전체 (기본 표시) |
| `client` | 클라이언트 컬러 (HG 흥국화재, AIA) |
| `primitive` | 기본컬러 ([Common] Color Primitives) |
| `own` | 자사사이트 (엠플랜잇, AI-LAB) |

각 컬러 카드에 반드시 `data-category` 속성 태깅할 것.

---

## Figma 정보
- 공통 디자인시스템 파일키: `C9t2KBN6y0nVGmLu4BeqBu`
- 타이포그래피 파일키: `NCNozqt0Ro27DPk3PdvfbZ`
- Color Primitives 노드: `236-9569`
- 컬러 가이드 노드: `178-13681`
- 타이포그래피 노드: `182-11271`

Figma API 호출 시:
```bash
curl "https://api.figma.com/v1/files/{fileKey}/nodes?ids={nodeId}" \
  -H "X-Figma-Token: {FIGMA_TOKEN}"
```

---

## 작업 방식
1. 작업 전 항상 `design-system.html` 현재 상태 확인
2. 수정 후 이식성 조건 자동 점검 (외부 URL 스캔)
3. 완료 후 파일 크기 및 단독 동작 가능 여부 출력

---

## 타이포그래피 섹션 규칙
- 타입 스케일 테이블: 용도 / 크기 / 굵기 / 행간 / 자간
- 각 항목 미리보기 텍스트: `"가나다라 AaBbCc 123"`
- 폰트: Pretendard (폴더 내 파일) 또는 sans-serif 폴백

---

## 금지 사항
- `prettier`, `eslint` 등 포맷터 자동 실행 금지
- 파일 분리 금지 (CSS/JS 별도 파일 생성 금지)
- 작업 완료 전 중간 저장 금지
