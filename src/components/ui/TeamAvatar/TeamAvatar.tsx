import type { CSSProperties } from 'react';
import MentionBadge from '../MentionBadge/MentionBadge';
import styles from './TeamAvatar.module.scss';

export type TeamAvatarSize = '24' | '28' | '32' | '40' | '48' | '56' | '64' | '72' | '96' | '120';
export type TeamAvatarState = 'Default' | 'Active';

interface SizeConfig {
  defaultRadius: number;
  innerRadius: number;
  outerRadius: number;
  inset: number;
  borderWidth: number;
  fontSize: number;
}

const SIZE_CONFIG: Record<TeamAvatarSize, SizeConfig> = {
  '24':  { defaultRadius: 4,  innerRadius: 3,  outerRadius: 4,  inset: 2, borderWidth: 2, fontSize: 11.2  },
  '28':  { defaultRadius: 4,  innerRadius: 3,  outerRadius: 4,  inset: 2, borderWidth: 2, fontSize: 13.07 },
  '32':  { defaultRadius: 6,  innerRadius: 4,  outerRadius: 6,  inset: 3, borderWidth: 3, fontSize: 14.93 },
  '40':  { defaultRadius: 8,  innerRadius: 5,  outerRadius: 8,  inset: 3, borderWidth: 3, fontSize: 18.67 },
  '48':  { defaultRadius: 10, innerRadius: 6,  outerRadius: 9,  inset: 3, borderWidth: 3, fontSize: 22.4  },
  '56':  { defaultRadius: 12, innerRadius: 7,  outerRadius: 10, inset: 3, borderWidth: 3, fontSize: 26.13 },
  '64':  { defaultRadius: 14, innerRadius: 8,  outerRadius: 11, inset: 3, borderWidth: 3, fontSize: 29.87 },
  '72':  { defaultRadius: 16, innerRadius: 9,  outerRadius: 12, inset: 3, borderWidth: 3, fontSize: 33.6  },
  '96':  { defaultRadius: 20, innerRadius: 16, outerRadius: 18, inset: 3, borderWidth: 3, fontSize: 44.8  },
  '120': { defaultRadius: 24, innerRadius: 20, outerRadius: 24, inset: 4, borderWidth: 3, fontSize: 56    },
};

export interface TeamAvatarProps {
  alt?: string;
  badge?: number;
  className?: string;
  initials?: string;
  size?: TeamAvatarSize;
  src?: string;
  state?: TeamAvatarState;
}

export default function TeamAvatar({
  alt = '',
  badge,
  className = '',
  initials = 'Ac',
  size = '40',
  src,
  state = 'Default',
}: TeamAvatarProps) {
  const cfg = SIZE_CONFIG[size];
  const numSize = parseInt(size, 10);
  const isActive = state === 'Active';
  const showBadge = badge != null && badge > 0 && numSize <= 64 && !isActive;

  const rootClasses = [
    styles['team-avatar'],
    isActive && styles['team-avatar--active'],
    className,
  ].filter(Boolean).join(' ');

  const cssVars = {
    '--_ta-size': `${numSize}px`,
    '--_ta-default-r': `${cfg.defaultRadius}px`,
    '--_ta-inner-r': `${cfg.innerRadius}px`,
    '--_ta-outer-r': `${cfg.outerRadius}px`,
    '--_ta-inset': `${cfg.inset}px`,
    '--_ta-border-w': `${cfg.borderWidth}px`,
    '--_ta-font-size': `${cfg.fontSize}px`,
  } as CSSProperties;

  return (
    <div className={rootClasses} style={cssVars}>
      <div className={styles['team-avatar__inner']}>
        {src ? (
          <img src={src} alt={alt} className={styles['team-avatar__image']} />
        ) : (
          <div className={styles['team-avatar__fallback']} aria-label={alt || initials}>
            {initials}
          </div>
        )}
      </div>
      <span className={styles['team-avatar__ring']} aria-hidden='true' />
      {showBadge && (
        <MentionBadge count={badge!} size='Medium' className={styles['team-avatar__badge']} />
      )}
    </div>
  );
}
