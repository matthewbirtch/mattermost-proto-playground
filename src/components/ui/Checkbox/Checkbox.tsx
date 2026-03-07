import type { InputHTMLAttributes } from 'react'
import { useRef, useEffect, useState } from 'react'
import styles from './Checkbox.module.scss'

export type CheckboxSize = 'Small' | 'Medium' | 'Large'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Optional CSS class name. */
  className?: string
  /** When true, shows indeterminate (minus) state. Syncs to native input.indeterminate. */
  indeterminate?: boolean
  /** Size variant. Figma: Small (12px), Medium (16px), Large (20px). Default: Medium. */
  size?: CheckboxSize
  /** When false, uses error/destructive styling (red fill when checked). Default: true. */
  valid?: boolean
  /** Label content. Rendered next to the checkbox. */
  children?: React.ReactNode
}

const toKebab = (s: string) => s.replace(/\s+/g, '-').toLowerCase()

/** Check mark icon for checked state. */
function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Minus icon for indeterminate state. */
function MinusIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 6h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ICON_SIZE: Record<CheckboxSize, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
}

/**
 * Checkbox component built on the native HTML checkbox.
 * Supports checked, unchecked, and indeterminate states; sizes and valid/invalid
 * styling match Figma Checkbox (Checkbox Selector) v2.0.2.
 *
 * Use with a label: pass children to render label text, or wrap in your own <label>.
 * Indeterminate must be set via the `indeterminate` prop (native attribute is not reflectable).
 *
 * @see https://compass.mattermost.com (Checkbox)
 */
export default function Checkbox({
  className = '',
  indeterminate = false,
  size = 'Medium',
  valid = true,
  children,
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  onChange,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = idProp ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked ?? false)
  const resolvedChecked = isControlled ? checked : uncontrolledChecked

  useEffect(() => {
    const input = inputRef.current
    if (input) input.indeterminate = indeterminate
  }, [indeterminate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked)
    onChange?.(e)
  }

  const sizeClass = styles[`checkbox--size-${toKebab(size)}`]
  const invalidClass = valid ? '' : styles['checkbox--invalid']
  const indeterminateClass = indeterminate ? styles['checkbox--indeterminate'] : ''

  const rootClass = [
    styles.checkbox,
    sizeClass,
    invalidClass,
    indeterminateClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const showCheck = !indeterminate && resolvedChecked
  const iconSize = ICON_SIZE[size]

  return (
    <label className={rootClass} htmlFor={id}>
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className={styles['checkbox__input']}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={valid ? undefined : true}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles['checkbox__box']}>
        {indeterminate && (
          <span className={styles['checkbox__icon']}>
            <MinusIcon size={iconSize} />
          </span>
        )}
        {showCheck && (
          <span className={styles['checkbox__icon']}>
            <CheckIcon size={iconSize} />
          </span>
        )}
      </span>
      {children != null && (
        <span className={styles['checkbox__label']}>{children}</span>
      )}
    </label>
  )
}
