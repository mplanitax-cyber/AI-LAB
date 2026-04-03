/**
 * Mplanit Design System — Header
 * Figma node 988:14261 기반 | CSS 변수만 사용 (헥스 직접 금지)
 *
 * Props:
 *   client       — 'mp' | 'hg' | 'aia'                     브랜드 선택
 *   variant      — 'default' | 'scrolled'                   mp 전용: default=투명, scrolled=흰배경+border
 *   label        — string                                    HG: 전화번호 / 기타: CTA 텍스트
 *   icon         — ReactNode                                 CTA 버튼 아이콘
 *   disabled     — boolean                                   비활성화
 *   logo         — ReactNode                                 커스텀 로고 (없으면 mplanit 기본 로고)
 *   navItems     — Array<{ label: string, href: string, active?: boolean }>  AIA 우측 네비
 *   onMenuToggle — function                                  햄버거 토글 핸들러
 *   isMenuOpen   — boolean                                   모바일 메뉴 open 상태
 */

/* ── 브랜드별 토큰 ── */
const CLIENT_TOKEN = {
  mp:  {
    brand:      'var(--color-mp-azure-01)',
    brandLight: 'var(--color-mp-azure-02)',
    bg:         'transparent',
    height:     'var(--header-height-mp)',
  },
  hg:  {
    brand:      'var(--color-hg-magenta)',
    brandLight: 'var(--color-hg-magenta-02)',
    bg:         'var(--color-white-100)',
    height:     'var(--header-height-hg)',
  },
  aia: {
    brand:      'var(--color-aia-red)',
    brandLight: 'var(--color-aia-pink-01)',
    bg:         'var(--color-aia-red)',
    height:     'var(--header-height-aia)',
  },
};

/* ── 공통 스타일 ── */
const S = {
  header: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
  },
  inner: {
    maxWidth: 'var(--device-width-desktop)',
    margin: '0 auto',
    padding: '0 var(--spacing-360)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    boxSizing: 'border-box',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    textDecoration: 'none',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-16)',
    flexShrink: 0,
  },
  /* HG 전화 pill 버튼 */
  phonePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-8)',
    padding: 'var(--spacing-8) var(--spacing-16)',
    background: 'var(--color-hg-magenta)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-heading-md)',
    fontWeight: 'var(--font-weight-heading)',
    color: 'var(--color-white-100)',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.15s',
  },
  /* 햄버거 버튼 */
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    width: 'var(--spacing-48)',
    height: 'var(--spacing-48)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    flexShrink: 0,
  },
  hamburgerLine: {
    width: '24px',
    height: '2px',
    borderRadius: 'var(--radius-2)',
    display: 'block',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },
  /* AIA 네비 */
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-12)',
  },
  navItem: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'var(--color-white-100)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  navBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--spacing-4) var(--spacing-12)',
    background: 'var(--color-white-100)',
    borderRadius: 'var(--radius-20)',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-body-strong)',
    color: 'var(--color-aia-red)',
    whiteSpace: 'nowrap',
  },
  /* 모바일 드롭다운 */
  mobileMenu: {
    width: '100%',
    backgroundColor: 'var(--color-white-100)',
    borderTop: '1px solid var(--color-border-subtle)',
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
    borderBottom: '1px solid var(--color-border-subtle)',
    textDecoration: 'none',
    lineHeight: 1.5,
  },
};

/* ── 햄버거 아이콘 ── */
function HamburgerIcon({ isOpen, lineColor }) {
  const color = lineColor || 'var(--color-font-primary)';
  return (
    <button
      type="button"
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      style={S.hamburger}
    >
      <span style={{
        ...S.hamburgerLine, backgroundColor: color,
        transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none',
      }} />
      <span style={{
        ...S.hamburgerLine, backgroundColor: color,
        opacity: isOpen ? 0 : 1,
      }} />
      <span style={{
        ...S.hamburgerLine, backgroundColor: color,
        transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
      }} />
    </button>
  );
}

/* ── 전화 아이콘 SVG ── */
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.01 2.5c.29 0 .57.11.78.32l2.5 2.5c.43.43.43 1.13 0 1.56L5.8 8.37a10.4 10.4 0 004.83 4.83l1.49-1.49c.43-.43 1.13-.43 1.56 0l2.5 2.5c.43.43.43 1.13 0 1.56l-1.5 1.5c-.42.42-.98.65-1.57.64C6.53 17.74 2.26 13.47 2 7.4c-.01-.59.22-1.15.64-1.57l1.5-1.5c.21-.21.49-.32.78-.32h.09z" fill="currentColor"/>
    </svg>
  );
}

/* ── Header 컴포넌트 ── */
function Header({
  client   = 'mp',
  variant  = 'default',
  label,
  icon,
  disabled = false,
  logo,
  navItems = [],
  onMenuToggle,
  isMenuOpen = false,
}) {
  const t = CLIENT_TOKEN[client] ?? CLIENT_TOKEN.mp;

  /* ── variant별 헤더 배경/테두리 ── */
  const headerBg = (() => {
    if (client === 'mp') {
      return variant === 'scrolled' ? 'var(--color-white-100)' : 'transparent';
    }
    return t.bg;
  })();

  const headerBorder = (() => {
    if (client === 'mp' && variant === 'scrolled') {
      return '1px solid var(--color-border-subtle)';
    }
    return 'none';
  })();

  /* ── 로고 렌더링 ── */
  const defaultLogo = (
    <img
      src="../svg/mplanit_logo(158x48)_header.svg"
      alt="mplanit"
      width={158}
      height={48}
      style={{ display: 'block' }}
    />
  );

  return (
    <header
      style={{
        ...S.header,
        height: t.height,
        backgroundColor: headerBg,
        borderBottom: headerBorder,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <div style={S.inner}>

        {/* ── 로고 ── */}
        <a href="/" style={S.logoWrap} aria-label="홈으로 이동">
          {logo ?? defaultLogo}
        </a>

        {/* ── 우측 액션 영역 ── */}
        <div style={S.actions}>

          {/* HG: 전화 pill 버튼 */}
          {client === 'hg' && (
            <button
              type="button"
              style={{
                ...S.phonePill,
                opacity: disabled ? 0.4 : 1,
              }}
            >
              {icon ?? <PhoneIcon />}
              <span>{label ?? '080-874-0000'}</span>
            </button>
          )}

          {/* AIA: 네비 링크 */}
          {client === 'aia' && navItems.length > 0 && (
            <nav style={S.nav} aria-label="AIA 메뉴">
              {navItems.map((item, idx) =>
                item.badge ? (
                  <span key={idx} style={S.navBadge}>{item.label}</span>
                ) : (
                  <a key={idx} href={item.href ?? '#'} style={S.navItem}>
                    {item.label}
                  </a>
                )
              )}
              {icon && <span style={{ color: 'var(--color-white-100)' }}>{icon}</span>}
            </nav>
          )}

          {/* mp: 햄버거 메뉴 */}
          {client === 'mp' && onMenuToggle && (
            <div onClick={disabled ? undefined : onMenuToggle}>
              <HamburgerIcon isOpen={isMenuOpen} lineColor="var(--color-font-primary)" />
            </div>
          )}

          {/* mp scrolled에서 label이 있으면 CTA 버튼 */}
          {client === 'mp' && label && (
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-8)',
                height: 'var(--spacing-48)',
                padding: '0 var(--spacing-24)',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body-md)',
                fontWeight: 'var(--font-weight-body-strong)',
                color: 'var(--color-white-100)',
                background: t.brand,
                border: 'none',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {icon && <span>{icon}</span>}
              {label}
            </button>
          )}

        </div>
      </div>

      {/* ── 모바일 드롭다운 (mp only) ── */}
      {client === 'mp' && isMenuOpen && navItems.length > 0 && (
        <div style={S.mobileMenu} role="menu">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href ?? '#'}
              role="menuitem"
              style={{
                ...S.mobileNavItem,
                color: item.active ? t.brand : 'var(--color-font-tertiary)',
                fontWeight: item.active
                  ? 'var(--font-weight-body-strong)'
                  : 'var(--font-weight-body-regular)',
                borderBottomColor: idx === navItems.length - 1
                  ? 'transparent'
                  : 'var(--color-border-subtle)',
              }}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
