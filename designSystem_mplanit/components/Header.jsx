/**
 * Mplanit Design System — Header
 * SVG 분석 기반 구현 | 스타일: theme.css CSS 변수만 사용 (헥스 직접 금지)
 *
 * Props:
 *   client       — 'mp' | 'aia' | 'hg'  클라이언트별 브랜드 컬러 적용
 *   logo         — ReactNode  로고 이미지/컴포넌트
 *   logoText     — string     로고 텍스트 fallback (logo 없을 때)
 *   navItems     — Array<{ label: string, href: string, active?: boolean }>
 *   ctaLabel     — string     CTA 버튼 텍스트
 *   onCtaClick   — function
 *   isMenuOpen   — boolean    모바일 햄버거 open 상태
 *   onMenuToggle — function   햄버거 버튼 클릭 핸들러
 */

/* ── 클라이언트별 브랜드 컬러 토큰 ── */
const CLIENT_TOKEN = {
  mp:  {
    brand:      'var(--color-mp-azure-01)',
    brandLight: 'var(--color-mp-azure-02)',
  },
  aia: {
    brand:      'var(--color-aia-red)',
    brandLight: 'var(--color-aia-red-50)',
  },
  hg:  {
    brand:      'var(--color-hg-magenta)',
    brandLight: 'var(--color-hg-magenta-02)',
  },
};

/* ── 공통 스타일 상수 ── */
const S = {
  /* 헤더 래퍼 */
  header: {
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid var(--color-mp-gray-07)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
  },
  /* 내부 컨테이너 */
  inner: {
    maxWidth: 'var(--device-width-desktop)',
    margin: '0 auto',
    padding: '0 var(--spacing-40)',
    height: '96px',          /* SVG 기준 106px → 가장 근접 토큰 96px */
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-24)',
    boxSizing: 'border-box',
  },
  /* 로고 영역 */
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-heading-sm)',
    fontWeight: 'var(--font-weight-heading)',
    lineHeight: 1,
  },
  /* 네비게이션 */
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-32)',
    flex: 1,
    justifyContent: 'center',
  },
  navItemBase: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'var(--color-font-tertiary)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '0',
    lineHeight: 1,
    transition: 'color 0.15s ease',
    whiteSpace: 'nowrap',
  },
  /* 우측 액션 영역 */
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-16)',
    flexShrink: 0,
  },
  /* CTA 버튼 */
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'var(--spacing-48)',
    padding: '0 var(--spacing-24)',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-strong)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    transition: 'opacity 0.15s ease',
    outline: 'none',
  },
  /* 햄버거 버튼 */
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    width: 'var(--spacing-32)',
    height: 'var(--spacing-32)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    flexShrink: 0,
  },
  hamburgerLine: {
    width: '22px',
    height: '2px',
    backgroundColor: 'var(--color-mp-gray-05)',
    borderRadius: 'var(--radius-2)',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    display: 'block',
  },
  /* 모바일 드롭다운 메뉴 */
  mobileMenu: {
    width: '100%',
    backgroundColor: 'white',
    borderTop: '1px solid var(--color-mp-gray-07)',
    padding: 'var(--spacing-20) var(--spacing-40)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
    boxSizing: 'border-box',
  },
  mobileNavItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'var(--color-font-tertiary)',
    background: 'none',
    border: 'none',
    padding: 'var(--spacing-12) 0',
    cursor: 'pointer',
    borderBottom: '1px solid var(--color-mp-gray-07)',
    textDecoration: 'none',
    lineHeight: 1.5,
  },
};

/* ── 햄버거 아이콘 ── */
function HamburgerIcon({ isOpen, color }) {
  return (
    <button
      type="button"
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      style={S.hamburger}
    >
      <span
        style={{
          ...S.hamburgerLine,
          backgroundColor: color || 'var(--color-mp-gray-05)',
          transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none',
        }}
      />
      <span
        style={{
          ...S.hamburgerLine,
          backgroundColor: color || 'var(--color-mp-gray-05)',
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        style={{
          ...S.hamburgerLine,
          backgroundColor: color || 'var(--color-mp-gray-05)',
          transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
        }}
      />
    </button>
  );
}

/* ── Header 컴포넌트 ── */
function Header({
  client = 'mp',
  logo,
  logoText = 'mplanit',
  navItems = [],
  ctaLabel,
  onCtaClick,
  isMenuOpen = false,
  onMenuToggle,
}) {
  const token = CLIENT_TOKEN[client] ?? CLIENT_TOKEN.mp;

  return (
    <header style={S.header}>
      {/* ── 메인 헤더 바 ── */}
      <div style={S.inner}>

        {/* 로고 */}
        <a href="https://www.mplanit.co.kr/" style={S.logoWrap} aria-label="홈으로 이동" target="_blank" rel="noopener noreferrer">
          {logo ? logo : (
            <img
              src="../svg/mplanit_logo(158x48)_header.svg"
              alt="mplanit"
              width={158}
              height={48}
              style={{ display: 'block' }}
            />
          )}
        </a>

        {/* 네비게이션 — 데스크탑 */}
        {navItems.length > 0 && (
          <nav aria-label="주요 메뉴" style={S.nav}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href ?? '#'}
                style={{
                  ...S.navItemBase,
                  color: item.active
                    ? token.brand
                    : 'var(--color-font-tertiary)',
                  fontWeight: item.active
                    ? 'var(--font-weight-body-strong)'
                    : 'var(--font-weight-body-regular)',
                }}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* 우측 액션 */}
        <div style={S.actions}>
          {/* CTA 버튼 */}
          {ctaLabel && (
            <button
              type="button"
              style={{ ...S.ctaBtn, backgroundColor: token.brand }}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </button>
          )}

          {/* 햄버거 — 모바일용 */}
          {onMenuToggle && (
            <div onClick={onMenuToggle}>
              <HamburgerIcon isOpen={isMenuOpen} />
            </div>
          )}
        </div>
      </div>

      {/* ── 모바일 드롭다운 메뉴 ── */}
      {isMenuOpen && navItems.length > 0 && (
        <div style={S.mobileMenu} role="menu">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href ?? '#'}
              role="menuitem"
              style={{
                ...S.mobileNavItem,
                color: item.active ? token.brand : 'var(--color-font-tertiary)',
                fontWeight: item.active
                  ? 'var(--font-weight-body-strong)'
                  : 'var(--font-weight-body-regular)',
                borderBottomColor: idx === navItems.length - 1
                  ? 'transparent'
                  : 'var(--color-mp-gray-07)',
              }}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}

          {/* 모바일 CTA */}
          {ctaLabel && (
            <button
              type="button"
              style={{
                ...S.ctaBtn,
                backgroundColor: token.brand,
                marginTop: 'var(--spacing-12)',
                width: '100%',
                borderRadius: 'var(--radius-16)',
              }}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
