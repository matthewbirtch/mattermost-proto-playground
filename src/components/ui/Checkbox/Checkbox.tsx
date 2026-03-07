import type { InputHTMLAttributes } from 'react'
import { useRef, useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon/Icon'
import type { IconSize } from '@/components/ui/Icon/Icon'
import CheckIcon from '@mattermost/compass-icons/components/check'
import MinusIcon from '@mattermost/compass-icons/components/minus'
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

/** Icon size from design system scale for each checkbox size (fits inside box). */
const CHECKBOX_ICON_SIZE: Record<CheckboxSize, IconSize> = {
  Small: '10',
  Medium: '12',
  Large: '16',
}

const ICON_ANIMATION_DURATION_MS = 150

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

  const [leavingIcon, setLeavingIcon] = useState<'check' | 'minus' | null>(null)
  const [enterAnimationActive, setEnterAnimationActive] = useState(false)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterRaf2Ref = useRef<number | null>(null)
  const prevShowingRef = useRef<'check' | 'minus' | null>(null)

  const showingIcon = indeterminate ? 'minus' : resolvedChecked ? 'check' : null

  useEffect(() => {
    const input = inputRef.current
    if (input) input.indeterminate = indeterminate
  }, [indeterminate])

  // When transitioning from checked/indeterminate to unchecked, run leave animation then clear icon
  useEffect(() => {
    const prev = prevShowingRef.current
    prevShowingRef.current = showingIcon

    if (showingIcon !== null) {
      setLeavingIcon(null)
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
        leaveTimeoutRef.current = null
      }
      return
    }
    if (prev === null) return
    // Just transitioned to unchecked: animate out the icon we had
    setLeavingIcon(prev)
    leaveTimeoutRef.current = setTimeout(() => {
      setLeavingIcon(null)
      leaveTimeoutRef.current = null
    }, ICON_ANIMATION_DURATION_MS)
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    }
  }, [showingIcon])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked)
    onChange?.(e)
  }

  const sizeClass = styles[`checkbox--size-${toKebab(size)}`]
  const invalidClass = valid ? '' : styles['checkbox--invalid']
  const indeterminateClass = indeterminate ? styles['checkbox--indeterminate'] : ''
  const iconLeavingClass = leavingIcon ? styles['checkbox--icon-leaving'] : ''

  const rootClass = [
    styles.checkbox,
    sizeClass,
    invalidClass,
    indeterminateClass,
    iconLeavingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconSize = CHECKBOX_ICON_SIZE[size]
  const iconSizePx = Number(iconSize)
  const iconToShow = leavingIcon ?? showingIcon
  const isLeaving = leavingIcon !== null

  // Delay enter animation by 2 frames so the browser paints scale(0.5) first (otherwise the
  // scale-up is often not visible when the element and animation are added together)
  useEffect(() => {
    if (!iconToShow || isLeaving) {
      setEnterAnimationActive(false)
      if (enterRaf2Ref.current != null) {
        cancelAnimationFrame(enterRaf2Ref.current)
        enterRaf2Ref.current = null
      }
      return
    }
    setEnterAnimationActive(false)
    requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setEnterAnimationActive(true)
        enterRaf2Ref.current = null
      })
      enterRaf2Ref.current = raf2
    })
    return () => {
      if (enterRaf2Ref.current != null) {
        cancelAnimationFrame(enterRaf2Ref.current)
        enterRaf2Ref.current = null
      }
    }
  }, [iconToShow, isLeaving])

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
        {iconToShow === 'minus' && (
          <span
            className={[
              styles['checkbox__icon'],
              isLeaving
                ? styles['checkbox__icon--leave']
                : enterAnimationActive
                  ? styles['checkbox__icon--enter']
                  : styles['checkbox__icon--enter-pending'],
            ].join(' ')}
          >
            <Icon
              glyph={<MinusIcon size={iconSizePx} />}
              size={iconSize}
            />
          </span>
        )}
        {iconToShow === 'check' && (
          <span
            className={[
              styles['checkbox__icon'],
              isLeaving
                ? styles['checkbox__icon--leave']
                : enterAnimationActive
                  ? styles['checkbox__icon--enter']
                  : styles['checkbox__icon--enter-pending'],
            ].join(' ')}
          >
            <Icon
              glyph={<CheckIcon size={iconSizePx} />}
              size={iconSize}
            />
          </span>
        )}
      </span>
      {children != null && (
        <span className={styles['checkbox__label']}>{children}</span>
      )}
    </label>
  )
}
