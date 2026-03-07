import styles from './Emoji.module.scss'

export type EmojiSize =
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

export interface EmojiProps {
  /** Optional CSS class name. */
  className?: string
  /** Emoji character(s) to display (e.g. "👍", "🎉"). */
  emoji: string
  /** Size from the Mattermost icon scale. Default 24. */
  size?: EmojiSize
}

const SIZE_CLASS_MAP: Record<EmojiSize, string> = {
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
 * Renders an emoji at a consistent size from the Mattermost icon scale.
 */
export default function Emoji({
  className = '',
  emoji,
  size = '24',
}: EmojiProps) {
  const sizeClass = SIZE_CLASS_MAP[size]
  const rootClass = [styles.emoji, sizeClass, className].filter(Boolean).join(' ')

  return (
    <span className={rootClass} role="img" aria-hidden>
      {emoji}
    </span>
  )
}
