import type { ImgHTMLAttributes } from 'react';
import styles from './TeamAvatar.module.scss';

export type TeamAvatarSize = '40';

export type TeamAvatarState = 'Default' | 'Active';

export interface TeamAvatarProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
> {
  /** Alt text for the team avatar image. */
  alt: string;
  /** Optional CSS class name. */
  className?: string;
  /** Image URL for the team logo. */
  src: string;
  /** Size variant. Default: 40. */
  size?: TeamAvatarSize;
  /** Active state shows an outer stroke ring. Default: Default. */
  state?: TeamAvatarState;
  /** When true, shows an unread/mention badge. */
  badge?: number;
}

/**
 * Team avatar — rounded-square avatar for teams/workspaces.
 * Used in the team/workspace switcher sidebar.
 * Optional numeric badge for mention counts.
 *
 * @see Figma Team Avatar (v3.0.0)
 */
export default function TeamAvatar({
  alt,
  badge,
  className = '',
  size = '40',
  src,
  state = 'Default',
  ...imgProps
}: TeamAvatarProps) {
  const activeClass = state === 'Active' ? styles['team-avatar--active'] : '';
  const rootClass = [styles['team-avatar'], activeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} data-size={size}>
      <img
        {...imgProps}
        alt={alt}
        className={styles['team-avatar__image']}
        src={src}
        width={Number(size)}
        height={Number(size)}
      />
      {state === 'Active' && (
        <span className={styles['team-avatar__ring']} aria-hidden />
      )}
      {badge != null && badge > 0 && (
        <span className={styles['team-avatar__badge']} aria-label={`${badge} unread mentions`}>
          {badge}
        </span>
      )}
    </div>
  );
}
