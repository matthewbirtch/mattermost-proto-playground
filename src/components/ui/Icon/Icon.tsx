import type { ReactNode } from 'react'
import EmoticonHappyOutlineIcon from '@mattermost/compass-icons/components/emoticon-happy-outline'
import styles from './Icon.module.scss'

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
  /** Icon content from @mattermost/compass-icons (e.g. <GlobeIcon size={16} />). When omitted, shows emoticon-happy-outline. */
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

const SIZE_PX_MAP: Record<IconSize, number> = {
  '10': 10,
  '12': 12,
  '16': 16,
  '20': 20,
  '24': 24,
  '28': 28,
  '32': 32,
  '40': 40,
  '52': 52,
  '64': 64,
  '104': 104,
}

/**
 * Icon wrapper using @mattermost/compass-icons. Import the icon you need and pass as glyph.
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
  const sizePx = SIZE_PX_MAP[size]

  const glyphContent =
    glyph !== undefined && glyph !== null ? (
      glyph
    ) : (
      <EmoticonHappyOutlineIcon
        size={sizePx}
        className={styles.glyphSvg}
        aria-hidden
      />
    )

  return (
    <div className={rootClass} role="img" aria-hidden>
      <div className={styles.glyphArea}>{glyphContent}</div>
    </div>
  )
}
