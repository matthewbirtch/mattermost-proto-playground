import type { ImgHTMLAttributes } from 'react'
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge'
import type { StatusBadgeSize } from '@/components/ui/StatusBadge/StatusBadge'
import styles from './Avatar.module.scss'

/** Figma User Avatar sizes (Image type only). */
export type AvatarSize =
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '40'
  | '48'
  | '56'
  | '64'
  | '72'
  | '80'
  | '96'
  | '120'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  /** Alt text for the avatar image. */
  alt: string
  /** Optional CSS class name. */
  className?: string
  /** Image URL for the avatar. */
  src: string
  /** Size variant. Figma: Size. Default: 48. */
  size?: AvatarSize
  /** When true, shows online status badge (green dot with check). Figma: Status = On. */
  status?: boolean
}

const toKebab = (s: string) => s.replace(/\s+/g, '-').toLowerCase()

/** Map Avatar size to StatusBadge size (Figma scale). */
const AVATAR_TO_BADGE_SIZE: Record<AvatarSize, StatusBadgeSize> = {
  '12': 'XX-Small',
  '16': 'XX-Small',
  '20': 'X-Small',
  '24': 'X-Small',
  '28': 'X-Small',
  '32': 'Small',
  '40': 'Small',
  '48': 'Small',
  '56': 'Medium',
  '64': 'Medium',
  '72': 'Medium',
  '80': 'Medium',
  '96': 'Large',
  '120': 'Large',
}

/**
 * User avatar (image only). Matches Figma User Avatar — Image type.
 * Fallback and System variants are not implemented.
 * Uses StatusBadge for online indicator when status=true.
 *
 * @see Figma User Avatar (Type=Image)
 */
export default function Avatar({
  alt,
  className = '',
  src,
  size = '48',
  status = false,
  ...imgProps
}: AvatarProps) {
  const sizeClass = styles[`avatar--size-${toKebab(size)}`]
  const rootClass = [styles.avatar, sizeClass, className].filter(Boolean).join(' ')

  return (
    <div className={rootClass} data-size={size}>
      <img
        {...imgProps}
        alt={alt}
        className={styles.avatar__image}
        src={src}
        width={Number(size)}
        height={Number(size)}
      />
      {status && (
        <span className={styles.avatar__status}>
          <StatusBadge status="Online" size={AVATAR_TO_BADGE_SIZE[size]} />
        </span>
      )}
    </div>
  )
}
