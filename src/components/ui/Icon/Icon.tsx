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
  '10': styles['icon--size-10'],
  '12': styles['icon--size-12'],
  '16': styles['icon--size-16'],
  '20': styles['icon--size-20'],
  '24': styles['icon--size-24'],
  '28': styles['icon--size-28'],
  '32': styles['icon--size-32'],
  '40': styles['icon--size-40'],
  '52': styles['icon--size-52'],
  '64': styles['icon--size-64'],
  '104': styles['icon--size-104'],
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
  const sizePx = Number(size)

  const glyphContent =
    glyph !== undefined && glyph !== null ? (
      glyph
    ) : (
      <EmoticonHappyOutlineIcon
        size={sizePx}
        className={styles['icon__glyph']}
        aria-hidden
      />
    )

  return (
    <div className={rootClass} role="img" aria-hidden>
      <div className={styles['icon__glyph-area']}>{glyphContent}</div>
    </div>
  )
}
