import Icon from '@/components/ui/Icon/Icon'
import type { IconSize } from '@/components/ui/Icon/Icon'
import CheckCircleIcon from '@mattermost/compass-icons/components/check-circle'
import CircleOutlineIcon from '@mattermost/compass-icons/components/circle-outline'
import ClockIcon from '@mattermost/compass-icons/components/clock'
import MinusCircleIcon from '@mattermost/compass-icons/components/minus-circle'
import styles from './StatusBadge.module.scss'

/** Figma Status Badge size. */
export type StatusBadgeSize = 'XX-Small' | 'X-Small' | 'Small' | 'Medium' | 'Large'

/** Figma Status Badge status variant. */
export type StatusBadgeStatus = 'Online' | 'Away' | 'Do Not Disturb' | 'Offline'

export interface StatusBadgeProps {
  /** Optional CSS class name. */
  className?: string
  /** Size variant. Figma: Size. Default: X-Small. */
  size?: StatusBadgeSize
  /** Status variant. Figma: Status. Default: Online. */
  status?: StatusBadgeStatus
}

const toKebab = (s: string) => s.replace(/\s+/g, '-').toLowerCase()

/** Icon size (Icon component scale) per StatusBadge size — Figma. */
const BADGE_TO_ICON_SIZE: Record<StatusBadgeSize, IconSize> = {
  'XX-Small': '10',
  'X-Small': '12',
  'Small': '16',
  'Medium': '20',
  'Large': '32',
}

/**
 * Status badge (Online, Away, Do Not Disturb, Offline).
 * Matches Figma Status Badge v2.0.1. Uses Icon + @mattermost/compass-icons.
 *
 * @see Figma Status Badge (Node ID: 702:1875)
 */
export default function StatusBadge({
  className = '',
  size = 'X-Small',
  status = 'Online',
}: StatusBadgeProps) {
  const sizeClass = styles[`status-badge--size-${toKebab(size)}`]
  const statusClass = styles[`status-badge--status-${toKebab(status)}`]
  const rootClass = [styles['status-badge'], sizeClass, statusClass, className].filter(Boolean).join(' ')

  const iconSize = BADGE_TO_ICON_SIZE[size]
  const iconSizePx = Number(iconSize)

  const glyph =
    status === 'Online'
      ? <CheckCircleIcon size={iconSizePx} />
      : status === 'Away'
        ? <ClockIcon size={iconSizePx} />
        : status === 'Do Not Disturb'
          ? <MinusCircleIcon size={iconSizePx} />
          : <CircleOutlineIcon size={iconSizePx} />

  return (
    <span className={rootClass} role="img" aria-label={status}>
      <span className={styles['status-badge__glyph']}>
        <Icon glyph={glyph} size={iconSize} />
      </span>
    </span>
  )
}
