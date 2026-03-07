import type { ReactNode } from 'react'
import styles from './Icon.module.scss'

/**
 * Default glyph: emoticon-happy-outline (F01F5).
 * SVG assets are served by Figma MCP when available (localhost:3845).
 */
const DEFAULT_GLYPH_SRC =
  'http://localhost:3845/assets/29a232f40ef63c78d28f5bb1c66826b8b8fb3df6.svg'

export type IconSize =
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '40'
  | '52'
  | '64'
  | '104'

export interface IconProps {
  /** Optional CSS class name. */
  className?: string
  /** Custom glyph (e.g. SVG or React node). When null/undefined, uses default emoticon-happy-outline. */
  glyph?: ReactNode | null
  /** Size from the Mattermost icon scale. Default 24. */
  size?: IconSize
}

const SIZE_CLASS_MAP: Record<IconSize, string> = {
  '10': styles.size10,
  '12': styles.size12,
  '16': styles.size16,
  '20': styles.size20,
  '24': styles.size24,
  '28': styles.size28,
  '32': styles.size32,
  '40': styles.size40,
  '52': styles.size52,
  '64': styles.size64,
  '104': styles.size104,
}

/**
 * Icon component — refactored v2.0 style with SVG glyphs and size scale.
 * To find the glyph name in dev mode, use the Glyph property in Figma.
 *
 * @see https://compass.mattermost.com/29be2c109/p/19c648-iconography
 */
export default function Icon({
  className = '',
  glyph = null,
  size = '24',
}: IconProps) {
  const sizeClass = SIZE_CLASS_MAP[size]
  const rootClass = [styles.icon, sizeClass, className].filter(Boolean).join(' ')

  const glyphContent =
    glyph !== undefined && glyph !== null ? (
      glyph
    ) : (
      <img src={DEFAULT_GLYPH_SRC} alt="" aria-hidden />
    )

  return (
    <div className={rootClass} role="img" aria-hidden>
      <div className={styles.glyphArea}>{glyphContent}</div>
    </div>
  )
}
