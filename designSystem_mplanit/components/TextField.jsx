/**
 * Mplanit Design System — TextField
 * SVG(textField.svg) 분석 기반 구현
 * 스타일: theme.css CSS 변수만 사용 (헥스 직접 금지)
 *
 * Props:
 *   label        — string      Floating label 텍스트
 *   placeholder  — string      placeholder 텍스트
 *   value        — string      controlled input value
 *   onChange     — function    (e) => void
 *   status       — 'default' | 'error' | 'success' | 'disabled' | 'readonly'
 *   helperText   — string      하단 안내 텍스트 (default 상태)
 *   errorText    — string      하단 오류 메시지 (status='error' 일 때 표시)
 *   leftIcon     — ReactNode   좌측 아이콘
 *   rightIcon    — ReactNode   우측 아이콘 (status 아이콘보다 우선순위 낮음)
 *   client       — 'mp' | 'aia' | 'hg'   focus 컬러 클라이언트
 *   size         — 'sm' | 'md' | 'lg'
 *   type         — string      input type (기본 'text')
 *   id           — string
 *   name         — string
 *   required     — boolean
 */

import { useState, useId } from 'react';

/* ── 클라이언트별 포커스 컬러 ── */
const CLIENT_FOCUS = {
  mp:  'var(--color-mp-azure-01)',
  aia: 'var(--color-aia-red)',
  hg:  'var(--color-hg-blue)',
};

/* ── 상태별 하단 border 컬러 ── */
const STATUS_BORDER = {
  default:  'var(--color-mp-gray-07)',
  error:    'var(--color-aia-red)',
  success:  'var(--color-hg-green-01)',
  disabled: 'var(--color-mp-gray-07)',
  readonly: 'var(--color-mp-gray-07)',
};

/* ── 상태별 helper/error 텍스트 컬러 ── */
const STATUS_TEXT_COLOR = {
  default:  'var(--color-font-tertiary)',
  error:    'var(--color-aia-red)',
  success:  'var(--color-hg-green-01)',
  disabled: 'var(--color-font-tertiary)',
  readonly: 'var(--color-font-tertiary)',
};

/* ── 사이즈 토큰 ── */
const SIZE_TOKEN = {
  sm: {
    inputHeight:   'var(--spacing-48)',
    fontSize:      'var(--font-size-body-sm)',
    labelFontSize: '11px',
    paddingX:      'var(--spacing-12)',
    iconSize:      'var(--icon-small)',
    helperFont:    'var(--font-size-body-sm)',
  },
  md: {
    inputHeight:   'var(--spacing-64)',
    fontSize:      'var(--font-size-body-md)',
    labelFontSize: '12px',
    paddingX:      'var(--spacing-16)',
    iconSize:      'var(--icon-small)',
    helperFont:    'var(--font-size-body-sm)',
  },
  lg: {
    inputHeight:   'var(--spacing-96)',
    fontSize:      'var(--font-size-body-lg)',
    labelFontSize: '13px',
    paddingX:      'var(--spacing-20)',
    iconSize:      'var(--icon-medium)',
    helperFont:    'var(--font-size-body-md)',
  },
};

/* ── 상태별 내장 아이콘 ── */
function StatusIcon({ status }) {
  if (status === 'error') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="var(--color-aia-red)" strokeWidth="2" />
        <path d="M7 7l6 6M13 7l-6 6" stroke="var(--color-aia-red)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (status === 'success') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="var(--color-hg-green-01)" strokeWidth="2" />
        <path d="M6 10l3 3 5-5" stroke="var(--color-hg-green-01)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

/* ── TextField 컴포넌트 ── */
function TextField({
  label,
  placeholder = '',
  value = '',
  onChange,
  status = 'default',
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  client = 'mp',
  size = 'md',
  type = 'text',
  id,
  name,
  required = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  const isDisabled = status === 'disabled';
  const isReadonly = status === 'readonly';
  const sz = SIZE_TOKEN[size] ?? SIZE_TOKEN.md;

  /* 라벨이 위로 float되는 조건 */
  const isFloating = isFocused || value?.length > 0;

  /* 하단 border 컬러 결정: focus 중이면 클라이언트 컬러, 아니면 상태 컬러 */
  const borderColor = isFocused && status === 'default'
    ? CLIENT_FOCUS[client] ?? CLIENT_FOCUS.mp
    : STATUS_BORDER[status] ?? STATUS_BORDER.default;

  /* 하단 helper/error 메시지 */
  const bottomText = status === 'error' ? errorText : helperText;
  const bottomColor = STATUS_TEXT_COLOR[status] ?? STATUS_TEXT_COLOR.default;

  /* 우측 아이콘: status 아이콘 우선, 없으면 prop */
  const hasStatusIcon = status === 'error' || status === 'success';
  const rightSlot = hasStatusIcon ? <StatusIcon status={status} /> : rightIcon;

  /* ── 스타일 ── */
  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
    width: '100%',
    opacity: isDisabled ? 0.4 : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
    boxSizing: 'border-box',
  };

  const fieldStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: sz.inputHeight,
    backgroundColor: isReadonly
      ? 'var(--color-mp-gray-08)'
      : 'var(--color-mp-gray-06)',
    borderRadius: 'var(--radius-8) var(--radius-8) 0 0',
    borderBottom: `2px solid ${borderColor}`,
    padding: `0 ${sz.paddingX}`,
    gap: 'var(--spacing-8)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    cursor: isReadonly ? 'default' : 'text',
  };

  const labelStyle = {
    position: 'absolute',
    left: sz.paddingX,
    top: isFloating ? 'var(--spacing-6)' : '50%',
    transform: isFloating ? 'none' : 'translateY(-50%)',
    fontSize: isFloating ? sz.labelFontSize : sz.fontSize,
    fontFamily: 'var(--font-family-base)',
    fontWeight: isFloating
      ? 'var(--font-weight-body-regular)'
      : 'var(--font-weight-body-regular)',
    color: isFocused
      ? (CLIENT_FOCUS[client] ?? CLIENT_FOCUS.mp)
      : 'var(--color-font-tertiary)',
    transition: 'top 0.15s ease, font-size 0.15s ease, color 0.15s ease',
    pointerEvents: 'none',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  };

  const inputStyle = {
    flex: 1,
    height: '100%',
    paddingTop: label ? 'var(--spacing-20)' : '0',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'var(--font-family-base)',
    fontSize: sz.fontSize,
    fontWeight: 'var(--font-weight-body-regular)',
    color: 'var(--color-font-secondary)',
    caretColor: CLIENT_FOCUS[client] ?? CLIENT_FOCUS.mp,
    width: '100%',
    boxSizing: 'border-box',
    cursor: isReadonly ? 'default' : 'text',
  };

  const iconStyle = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-mp-gray-05)',
    width: sz.iconSize,
    height: sz.iconSize,
  };

  const helperStyle = {
    fontFamily: 'var(--font-family-base)',
    fontSize: sz.helperFont,
    fontWeight: 'var(--font-weight-body-regular)',
    color: bottomColor,
    paddingLeft: sz.paddingX,
    lineHeight: 1.4,
    transition: 'color 0.15s ease',
  };

  return (
    <div style={wrapStyle}>

      {/* ── 입력 필드 영역 ── */}
      <div style={fieldStyle}>

        {/* Floating Label */}
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
            {required && (
              <span
                style={{
                  color: CLIENT_FOCUS[client] ?? CLIENT_FOCUS.mp,
                  marginLeft: 'var(--spacing-2)',
                }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        {/* 좌측 아이콘 */}
        {leftIcon && (
          <span style={iconStyle} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={isFocused || !label ? placeholder : ''}
          disabled={isDisabled}
          readOnly={isReadonly}
          required={required}
          aria-invalid={status === 'error'}
          aria-describedby={bottomText ? `${inputId}-helper` : undefined}
          style={inputStyle}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* 우측 아이콘 (status 아이콘 or prop) */}
        {rightSlot && (
          <span
            style={iconStyle}
            aria-hidden={hasStatusIcon}
          >
            {rightSlot}
          </span>
        )}
      </div>

      {/* ── Helper / Error 텍스트 ── */}
      {bottomText && (
        <span id={`${inputId}-helper`} style={helperStyle} role={status === 'error' ? 'alert' : undefined}>
          {bottomText}
        </span>
      )}
    </div>
  );
}

export default TextField;
