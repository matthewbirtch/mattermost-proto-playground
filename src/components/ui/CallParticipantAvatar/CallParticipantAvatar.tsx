import type { ImgHTMLAttributes } from 'react';
import { toKebab } from '@/utils/string';
import Icon from '@/components/ui/Icon/Icon';
import MicrophoneOffIcon from '@mattermost/compass-icons/components/microphone-off';
import MicrophoneIcon from '@mattermost/compass-icons/components/microphone';
import HandRightIcon from '@mattermost/compass-icons/components/hand-right';
import styles from './CallParticipantAvatar.module.scss';

export type CallParticipantAvatarSize = 'Large' | 'Medium' | 'Small' | 'XS';

export type CallParticipantMuteState = 'muted' | 'unmuted';

export interface CallParticipantAvatarProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
> {
  /** Alt text for the participant avatar image. */
  alt: string;
  /** Optional CSS class name. */
  className?: string;
  /** Image URL for the participant. */
  src: string;
  /** Size variant. Default: Large. */
  size?: CallParticipantAvatarSize;
  /** Participant's display name shown below the avatar. */
  name?: string;
  /** Mute state: 'muted' | 'unmuted'. When undefined no badge is shown. */
  muteState?: CallParticipantMuteState;
  /** When true, shows the host label. */
  host?: boolean;
  /** When true, shows the talking indicator ring. */
  talking?: boolean;
  /** When true, shows the raised-hand overlay. */
  raisedHand?: boolean;
  /** Emoji reaction string (e.g. "🎉"). When provided, shows reaction overlay. */
  reaction?: string;
}

/** Image pixel sizes per Figma size variant. */
const SIZE_PX: Record<CallParticipantAvatarSize, number> = {
  Large: 120,
  Medium: 96,
  Small: 72,
  XS: 56,
};

/**
 * Call participant avatar with overlays for mute state, host label,
 * reactions, raised hand, and talking indicator.
 * Used in the Calls feature.
 *
 * @see Figma Call Participant Avatar (Source: mWX0LMlr92dl42MBvfhN7V)
 */
export default function CallParticipantAvatar({
  alt,
  className = '',
  host = false,
  muteState,
  name,
  raisedHand = false,
  reaction,
  size = 'Large',
  src,
  talking = false,
  ...imgProps
}: CallParticipantAvatarProps) {
  const sizeClass = styles[`call-participant-avatar--size-${toKebab(size)}`];
  const rootClass = [styles['call-participant-avatar'], sizeClass, className]
    .filter(Boolean)
    .join(' ');

  const px = SIZE_PX[size];

  return (
    <div className={rootClass}>
      <div className={styles['call-participant-avatar__container']}>
        {talking && (
          <span className={styles['call-participant-avatar__talking-ring']} aria-hidden />
        )}
        <img
          {...imgProps}
          alt={alt}
          className={styles['call-participant-avatar__image']}
          src={src}
          width={px}
          height={px}
        />
        {muteState === 'muted' && (
          <span
            className={[
              styles['call-participant-avatar__badge'],
              styles['call-participant-avatar__badge--muted'],
            ].join(' ')}
            aria-label="Muted"
          >
            <Icon size="16" glyph={<MicrophoneOffIcon />} />
          </span>
        )}
        {muteState === 'unmuted' && (
          <span
            className={[
              styles['call-participant-avatar__badge'],
              styles['call-participant-avatar__badge--unmuted'],
            ].join(' ')}
            aria-label="Unmuted"
          >
            <Icon size="16" glyph={<MicrophoneIcon />} />
          </span>
        )}
        {reaction != null && reaction !== '' && (
          <span
            className={[
              styles['call-participant-avatar__badge'],
              styles['call-participant-avatar__badge--reaction'],
            ].join(' ')}
            aria-label={`Reaction: ${reaction}`}
          >
            {reaction}
          </span>
        )}
        {raisedHand && (
          <span
            className={[
              styles['call-participant-avatar__badge'],
              styles['call-participant-avatar__badge--raised-hand'],
            ].join(' ')}
            aria-label="Raised hand"
          >
            <Icon size="16" glyph={<HandRightIcon />} />
          </span>
        )}
      </div>
      {name != null && name !== '' && (
        <span className={styles['call-participant-avatar__name']}>{name}</span>
      )}
      {host && (
        <span className={styles['call-participant-avatar__host-label']}>HOST</span>
      )}
    </div>
  );
}
