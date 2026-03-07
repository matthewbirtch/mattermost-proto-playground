import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import styles from './Radio.module.scss'

export type RadioSize = 'Small' | 'Medium' | 'Large'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Optional CSS class name. */
  className?: string
  /** Size variant. Figma: Small (12px), Medium (16px), Large (20px). Default: Medium. */
  size?: RadioSize
  /** When false, uses error/destructive styling (red when checked). Default: true. */
  valid?: boolean
  /** Label content. Rendered next to the radio. */
  children?: React.ReactNode
}

const toKebab = (s: string) => s.replace(/\s+/g, '-').toLowerCase()

/**
 * Radio component built on the native HTML radio input.
 * Supports checked/unchecked; sizes and valid/invalid styling match Figma Radio v2.0.0.
 *
 * Use with a shared `name` when grouping options so only one is selected.
 * Use with a label: pass children to render label text, or wrap in your own <label>.
 *
 * @see https://compass.mattermost.com (Radio)
 */
export default function Radio({
  className = '',
  size = 'Medium',
  valid = true,
  children,
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  onChange,
  name,
  value,
  ...rest
}: RadioProps) {
  const id = idProp ?? `radio-${Math.random().toString(36).slice(2, 9)}`
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = useState(
    defaultChecked ?? false
  )
  const resolvedChecked = isControlled ? checked : uncontrolledChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked)
    onChange?.(e)
  }

  const sizeClass = styles[`radio--size-${toKebab(size)}`]
  const invalidClass = valid ? '' : styles['radio--invalid']

  const rootClass = [styles.radio, sizeClass, invalidClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={rootClass} htmlFor={id}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className={styles['radio__input']}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={valid ? undefined : true}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles['radio__circle']}>
        {resolvedChecked && <span className={styles['radio__dot']} />}
      </span>
      {children != null && (
        <span className={styles['radio__label']}>{children}</span>
      )}
    </label>
  )
}
