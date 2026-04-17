import styles from './ThreadListItem.module.scss';

export interface ThreadListItemProps {
  /** Whether this item is the active/selected thread. */
  active?: boolean;
  /** Badge type to show. Default: None. */
  badge?: 'None' | 'Unread';
  /** Author name. */
  authorName?: string;
  /** Channel/team label. */
  channelLabel?: string;
  /** Message preview text. */
  previewText?: string;
  /** Timestamp label. */
  timestamp?: string;
  /** Number of replies. */
  replyCount?: number;
  /** Optional thread title. */
  threadTitle?: string;
  /** Optional CSS class name. */
  className?: string;
  /** Click handler. */
  onClick?: () => void;
}

/**
 * Thread entry in the Threads view. Shows author, team badge, preview text,
 * timestamp, participant avatars, reply count. Badge variants: None, Unread.
 */
export default function ThreadListItem({
  active = false,
  badge = 'None',
  authorName = 'Martin Kraft',
  channelLabel = 'ENTERPRISE TEAM',
  previewText = 'Do we have a guideline for what minimum width we should support in the system console? I know that…',
  timestamp = '5 mins ago',
  replyCount = 3,
  threadTitle,
  className = '',
  onClick,
}: ThreadListItemProps) {
  const rootClass = [
    styles['thread-list-item'],
    active ? styles['thread-list-item--active'] : '',
    badge === 'Unread' ? styles['thread-list-item--unread'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} onClick={onClick}>
      <div className={styles['thread-list-item__thread']}>
        <div className={styles['thread-list-item__container']}>
          <div className={styles['thread-list-item__post-content']}>
            <div className={styles['thread-list-item__unread-dot']}>
              {badge === 'Unread' && (
                <span className={styles['thread-list-item__unread-badge']} aria-label="Unread" />
              )}
            </div>
            <div className={styles['thread-list-item__post-body']}>
              <div className={styles['thread-list-item__post-body-content']}>
                <div className={styles['thread-list-item__name-row']}>
                  <div className={styles['thread-list-item__name-group']}>
                    <span className={styles['thread-list-item__author']}>{authorName}</span>
                    <span className={styles['thread-list-item__channel-tag']}>
                      <span className={styles['thread-list-item__channel-label']}>{channelLabel}</span>
                    </span>
                  </div>
                  <span className={styles['thread-list-item__timestamp']}>{timestamp}</span>
                </div>
                {threadTitle != null && (
                  <div className={styles['thread-list-item__title-row']}>
                    <p className={styles['thread-list-item__title']}>{threadTitle}</p>
                  </div>
                )}
                <p className={styles['thread-list-item__preview']}>{previewText}</p>
              </div>
            </div>
          </div>
          <div className={styles['thread-list-item__replies']}>
            <div className={styles['thread-list-item__replies-inner']}>
              <span className={styles['thread-list-item__reply-count']}>{replyCount} replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
