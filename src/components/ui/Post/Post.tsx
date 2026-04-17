import React from 'react';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar';
import MessageHeader from '@/components/ui/MessageHeader/MessageHeader';
import styles from './Post.module.scss';

type PostProps = {
  avatarSrc: string;
  avatarAlt: string;
  username: string;
  timestamp: string;
  isBot?: boolean;
  botLabel?: string;
  children: React.ReactNode;
};

export default function Post({
  avatarSrc,
  avatarAlt,
  username,
  timestamp,
  isBot = false,
  botLabel,
  children,
}: PostProps) {
  return (
    <div className={styles.post}>
      <div className={styles['post__message']}>
        <div className={styles['post__avatar-col']}>
          <UserAvatar src={avatarSrc} alt={avatarAlt} size="32" />
        </div>
        <div className={styles['post__content']}>
          <MessageHeader
            username={username}
            timestamp={timestamp}
            isBot={isBot}
            botLabel={botLabel}
          />
          <div className={styles['post__body']}>{children}</div>
        </div>
      </div>
    </div>
  );
}
