/**
 * Mplanit Design System — Footer
 * SVG(Footer.svg) 분석 기반 구현
 * 스타일: theme.css CSS 변수만 사용 (헥스 직접 금지)
 *
 * Props:
 *   client       — 'mp' | 'aia' | 'hg'   브랜드 컬러
 *   logo         — ReactNode              로고 이미지/컴포넌트
 *   logoText     — string                 로고 텍스트 fallback
 *   navLinks     — Array<{ label, href }> 상단 바 수평 링크
 *   ctaLabel     — string                 상단 우측 CTA 버튼 텍스트
 *   onCtaClick   — function
 *   columns      — Array<{ title, links: Array<{ label, href }> }> 중단 링크 컬럼
 *   socialLinks  — Array<{ type: 'instagram'|'facebook'|'youtube'|'blog'|'twitter', href }>
 *   legalLinks   — Array<{ label, href }> 하단 법적고지 링크
 *   copyright    — string                 저작권 텍스트
 */

/* ── 클라이언트별 브랜드 컬러 ── */
const CLIENT_TOKEN = {
  mp:  { brand: 'var(--color-mp-azure-01)', accent: 'var(--color-mp-azure-02)' },
  aia: { brand: 'var(--color-aia-red)',     accent: 'var(--color-aia-pink-01)' },
  hg:  { brand: 'var(--color-hg-magenta)',  accent: 'var(--color-hg-magenta-02)' },
};

/* ── SNS 아이콘 (인라인 SVG) ── */
const SOCIAL_ICONS = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="5" stroke="white" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="3.5" stroke="white" strokeWidth="1.5"/>
      <circle cx="14.5" cy="5.5" r="1" fill="white"/>
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17 10a7 7 0 1 0-8.094 6.915V12.25H7.063V10H8.906V8.413c0-1.819 1.083-2.825 2.743-2.825.795 0 1.626.142 1.626.142v1.787h-.916c-.902 0-1.184.56-1.184 1.134V10h2.016l-.322 2.25H11.175v4.665A7.003 7.003 0 0 0 17 10Z" fill="white"/>
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.5 6.5S17.3 5.2 16.7 4.6c-.7-.7-1.4-.7-1.8-.8C12.5 3.7 10 3.7 10 3.7s-2.5 0-4.9.1c-.4.1-1.1.1-1.8.8C2.7 5.2 2.5 6.5 2.5 6.5S2.3 8 2.3 9.5v1.4c0 1.5.2 3 .2 3S2.7 15.2 3.3 15.8c.7.7 1.6.7 2 .8 1.5.1 6.7.1 6.7.1s2.5 0 4.9-.2c.4-.1 1.1-.1 1.8-.8.6-.6.8-1.9.8-1.9s.2-1.5.2-3V9.5c0-1.5-.2-3-.2-3ZM8.3 12.5v-5l5 2.5-5 2.5Z" fill="white"/>
    </svg>
  ),
  blog: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="white" strokeWidth="1.5"/>
      <path d="M6 8h8M6 11h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.5 4.5c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-1.9-.7.4-1.4.7-2.2.9A3.4 3.4 0 0 0 10.5 3c-1.9 0-3.4 1.5-3.4 3.4 0 .3 0 .5.1.8C4.5 7 2.5 5.9 1.2 4.2c-.3.5-.5 1.1-.5 1.7 0 1.2.6 2.2 1.5 2.8-.6 0-1.1-.2-1.6-.4v.1c0 1.6 1.2 3 2.7 3.3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3 2.3-1.1.9-2.5 1.4-4 1.4H1c1.4.9 3 1.4 4.8 1.4 5.7 0 8.9-4.7 8.9-8.9v-.4c.6-.5 1.1-1 1.5-1.6l.3-.3z" fill="white"/>
    </svg>
  ),
};

/* ── 공통 스타일 ── */
const S = {
  /* 전체 래퍼 */
  footer: {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-family-base)',
  },

  /* ── 상단 바 ── */
  topBar: {
    width: '100%',
    backgroundColor: 'var(--color-mp-gray-02)',
    boxSizing: 'border-box',
  },
  topInner: {
    maxWidth: 'var(--device-width-desktop)',
    margin: '0 auto',
    padding: '0 var(--spacing-40)',
    height: 'var(--spacing-96)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-32)',
    boxSizing: 'border-box',
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-40)',
    flex: 1,
  },
  logoText: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-heading-sm)',
    fontWeight: 'var(--font-weight-heading)',
    color: 'white',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  topNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-32)',
  },
  topNavLink: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'var(--color-mp-gray-05)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    transition: 'color 0.15s ease',
  },
  topCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'var(--spacing-48)',
    padding: '0 var(--spacing-24)',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-strong)',
    color: 'white',
    backgroundColor: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.2)',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    lineHeight: 1,
    outline: 'none',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
  },

  /* ── 구분선 ── */
  dividerWhite: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: 'none',
    margin: 0,
  },
  dividerGray: {
    width: '100%',
    height: '1px',
    backgroundColor: 'var(--color-mp-gray-05)',
    border: 'none',
    margin: 0,
    opacity: 0.4,
  },

  /* ── 중단 섹션 ── */
  midSection: {
    width: '100%',
    backgroundColor: 'var(--color-mp-gray-04)',
    boxSizing: 'border-box',
  },
  midInner: {
    maxWidth: 'var(--device-width-desktop)',
    margin: '0 auto',
    padding: 'var(--spacing-48) var(--spacing-40)',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 'var(--spacing-40)',
    boxSizing: 'border-box',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-16)',
    flex: 1,
    minWidth: 0,
  },
  columnTitle: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-strong)',
    color: 'white',
    lineHeight: 1.2,
    marginBottom: 'var(--spacing-4)',
  },
  columnLink: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    lineHeight: 1.4,
    display: 'block',
    transition: 'color 0.15s ease',
  },

  /* SNS 아이콘 영역 */
  socialWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-16)',
    flexShrink: 0,
  },
  socialTitle: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-strong)',
    color: 'white',
    lineHeight: 1.2,
  },
  socialIcons: {
    display: 'flex',
    gap: 'var(--spacing-16)',
    alignItems: 'center',
  },
  socialIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--spacing-40)',
    height: 'var(--spacing-40)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    textDecoration: 'none',
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
  },

  /* ── 하단 바 ── */
  bottomBar: {
    width: '100%',
    backgroundColor: 'var(--color-mp-gray-04)',
    boxSizing: 'border-box',
  },
  bottomInner: {
    maxWidth: 'var(--device-width-desktop)',
    margin: '0 auto',
    padding: '0 var(--spacing-40)',
    height: 'var(--spacing-64)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-24)',
    boxSizing: 'border-box',
  },
  copyright: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1,
  },
  legalLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-24)',
  },
  legalLink: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    transition: 'color 0.15s ease',
  },
};

/* ── Footer 컴포넌트 ── */
function Footer({
  client = 'mp',
  logo,
  logoText = 'mplanit',
  navLinks = [],
  ctaLabel,
  onCtaClick,
  columns = [],
  socialLinks = [],
  legalLinks = [],
  copyright = `© ${new Date().getFullYear()} mplanit. All rights reserved.`,
}) {
  const token = CLIENT_TOKEN[client] ?? CLIENT_TOKEN.mp;

  return (
    <footer style={S.footer} aria-label="사이트 푸터">

      {/* ════ 상단 바 ════ */}
      <div style={S.topBar}>
        <div style={S.topInner}>

          {/* 로고 + 상단 nav 링크 */}
          <div style={S.topLeft}>
            <a href="https://www.mplanit.co.kr/" aria-label="홈으로 이동" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              {logo ? logo : (
                <img
                  src="../svg/mplanit_logo(196x48)_footer.svg"
                  alt="mplanit"
                  width={196}
                  height={48}
                  style={{ display: 'block' }}
                />
              )}
            </a>

            {navLinks.length > 0 && (
              <nav aria-label="푸터 상단 메뉴" style={S.topNav}>
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href ?? '#'}
                    style={S.topNavLink}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* CTA 버튼 */}
          {ctaLabel && (
            <button
              type="button"
              style={S.topCta}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </button>
          )}
        </div>

        {/* 구분선 (white 20%) */}
        <hr style={S.dividerWhite} />
      </div>

      {/* ════ 중단 링크 컬럼 ════ */}
      {(columns.length > 0 || socialLinks.length > 0) && (
        <div style={S.midSection}>
          <div style={S.midInner}>

            {/* 링크 컬럼들 */}
            {columns.map((col, colIdx) => (
              <div key={colIdx} style={S.column}>
                {col.title && (
                  <p style={S.columnTitle}>{col.title}</p>
                )}
                {(col.links ?? []).map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.href ?? '#'}
                    style={S.columnLink}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            {/* SNS 아이콘 */}
            {socialLinks.length > 0 && (
              <div style={S.socialWrap}>
                <p style={S.socialTitle}>소셜 미디어</p>
                <div style={S.socialIcons}>
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.type}
                      style={{
                        ...S.socialIcon,
                        backgroundColor: `rgba(255,255,255,0.1)`,
                      }}
                    >
                      {SOCIAL_ICONS[social.type] ?? null}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 구분선 (gray 40%) */}
          <hr style={S.dividerGray} />
        </div>
      )}

      {/* ════ 하단 바 — 저작권 + 법적고지 ════ */}
      <div style={S.bottomBar}>
        <div style={S.bottomInner}>
          <p style={S.copyright}>{copyright}</p>

          {legalLinks.length > 0 && (
            <nav aria-label="법적고지 링크" style={S.legalLinks}>
              {legalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href ?? '#'}
                  style={S.legalLink}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

    </footer>
  );
}

export default Footer;
