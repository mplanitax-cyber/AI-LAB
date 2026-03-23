/**
 * Mplanit Design System — Button
 * 스타일: theme.css CSS 변수만 사용 (헥스 직접 금지)
 *
 * Props:
 *   variant      — 'btn_primary' | 'btn_secondary' | 'btn_neutral' | 'btn_txt' | 'btn_arrow' | 'cta-btn-fixed'
 *   size         — 'sm' | 'md' | 'lg'  (btn_txt / btn_arrow / cta-btn-fixed 는 size 무시)
 *   label        — string
 *   icon         — ReactNode
 *   iconPosition — 'left' | 'right'  (기본 'left')
 *   disabled     — boolean
 *   onClick      — function
 */

const BASE_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-8)',
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-body-strong)',
  border: 'none',
  borderRadius: 'var(--radius-full)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  outline: 'none',
  lineHeight: 1,
  transition: 'opacity 0.15s ease, background-color 0.15s ease',
  textDecoration: 'none',
  boxSizing: 'border-box',
};

/* ── 사이즈 토큰 ── */
const SIZE_STYLE = {
  sm: {
    height: 'var(--spacing-36)',
    padding: '0 var(--spacing-16)',
    fontSize: 'var(--font-size-body-sm)',
  },
  md: {
    height: 'var(--spacing-48)',
    padding: '0 var(--spacing-24)',
    fontSize: 'var(--font-size-body-md)',
  },
  lg: {
    height: 'var(--spacing-64)',
    padding: '0 var(--spacing-32)',
    fontSize: 'var(--font-size-body-md)',
  },
};

/* ── variant 토큰 ── */
const VARIANT_STYLE = {
  btn_primary: {
    backgroundColor: 'var(--color-mp-azure-01)',
    color: 'white',
    border: 'none',
  },
  btn_secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-mp-azure-01)',
    border: '1.5px solid var(--color-mp-azure-01)',
  },
  btn_neutral: {
    backgroundColor: 'var(--color-mp-gray-01)',
    color: 'white',
    border: 'none',
  },
  btn_txt: {
    backgroundColor: 'transparent',
    color: 'var(--color-mp-azure-01)',
    border: 'none',
    padding: '0',
    height: 'auto',
    borderRadius: '0',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-regular)',
  },
  btn_arrow: {
    backgroundColor: 'transparent',
    color: 'var(--color-mp-azure-01)',
    border: 'none',
    padding: '0',
    height: 'auto',
    borderRadius: '0',
    fontSize: 'var(--font-size-body-md)',
    fontWeight: 'var(--font-weight-body-strong)',
  },
  'cta-btn-fixed': {
    backgroundColor: 'var(--color-mp-azure-01)',
    color: 'white',
    border: 'none',
    width: '100%',
    height: 'var(--spacing-64)',
    padding: '0 var(--spacing-24)',
    fontSize: 'var(--font-size-body-md)',
    borderRadius: 'var(--radius-16)',
  },
};

const DISABLED_STYLE = {
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

/* ── 화살표 아이콘 (btn_arrow 전용) ── */
const ArrowIcon = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '1em',
      lineHeight: 1,
    }}
    aria-hidden="true"
  >
    →
  </span>
);

/* ── 컴포넌트 ── */
function Button({
  variant = 'btn_primary',
  size = 'md',
  label,
  icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
}) {
  const isTxtVariant = variant === 'btn_txt' || variant === 'btn_arrow';
  const isCTA = variant === 'cta-btn-fixed';

  const sizeStyle = (isTxtVariant || isCTA) ? {} : (SIZE_STYLE[size] ?? SIZE_STYLE.md);
  const variantStyle = VARIANT_STYLE[variant] ?? VARIANT_STYLE.btn_primary;

  const style = {
    ...BASE_STYLE,
    ...sizeStyle,
    ...variantStyle,
    ...(disabled ? DISABLED_STYLE : {}),
  };

  const renderIcon = icon ?? null;
  const renderArrow = variant === 'btn_arrow' ? <ArrowIcon /> : null;

  return (
    <button
      type="button"
      style={style}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      {/* 아이콘 — 왼쪽 */}
      {renderIcon && iconPosition === 'left' && renderIcon}

      {/* 레이블 */}
      {label && <span>{label}</span>}

      {/* 아이콘 — 오른쪽 */}
      {renderIcon && iconPosition === 'right' && renderIcon}

      {/* btn_arrow: 화살표는 항상 오른쪽 */}
      {renderArrow}
    </button>
  );
}

export default Button;
