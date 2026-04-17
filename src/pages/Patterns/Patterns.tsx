import React from 'react';
import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/TextInput/TextInput';
import { Modal } from '@/components/ui/Modal';
import Post from '@/components/ui/Post/Post';
import Divider from '@/components/ui/Divider/Divider';
import avatarLeonard from '@/assets/avatars/Leonard Riley.png';
import avatarDanielle from '@/assets/avatars/Danielle Okoro.png';
import styles from './Patterns.module.scss';

const REMAINING_PATTERNS = ['Channel Header', 'Channel Sidebar', 'Profile Popover'];

// ── Modal demo ────────────────────────────────────────────────────────────────

const modalFooter = (
  <>
    <Button emphasis="Tertiary">Cancel</Button>
    <Button destructive>Delete Channel</Button>
  </>
);

const modalBody = (
  <div className={styles['patterns__modal-body-content']}>
    <p className={styles['patterns__body-text']}>
      This will permanently delete <strong>#design</strong> and all its
      messages. Members will lose access immediately. This action cannot
      be undone.
    </p>
    <TextInput label='Type "design" to confirm' placeholder="design" />
  </div>
);

function ModalCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['patterns__modal-canvas']}>
      <div className={styles['patterns__modal-overlay']}>{children}</div>
    </div>
  );
}

function ModalDemo() {
  return (
    <div className={styles['patterns__modal-variants']}>
      <div>
        <p className={styles['patterns__variant-label']}>With dividers</p>
        <ModalCanvas>
          <Modal title="Delete Channel" size="Small" footer={modalFooter}>
            {modalBody}
          </Modal>
        </ModalCanvas>
      </div>
      <div>
        <p className={styles['patterns__variant-label']}>Without dividers</p>
        <ModalCanvas>
          <Modal title="Delete Channel" size="Small" headerDivider={false} footerDivider={false} footer={modalFooter}>
            {modalBody}
          </Modal>
        </ModalCanvas>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Patterns() {
  return (
    <div className={styles.patterns}>
      <header className={styles['patterns__header']}>
        <h1 className={styles['patterns__heading']}>Patterns</h1>
        <p className={styles['patterns__subheading']}>
          Larger UI compositions assembled from base components.
        </p>
      </header>

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Modal</h2>
        <ModalDemo />
      </section>

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Post</h2>
        <div className={styles['patterns__post-demo']}>
          <Post
            avatarSrc={avatarLeonard}
            avatarAlt="Leonard Riley"
            username="Leonard Riley"
            timestamp="Today at 9:41 AM"
          >
            <p className={styles['patterns__body-text']}>
              Hey team, the new components are looking great!
            </p>
          </Post>
          <Divider />
          <Post
            avatarSrc={avatarDanielle}
            avatarAlt="Danielle Okoro"
            username="Mattermost"
            timestamp="Today at 9:45 AM"
            isBot
          >
            <p className={styles['patterns__body-text']}>
              You have 3 unread messages in #general.
            </p>
          </Post>
        </div>
      </section>

      {REMAINING_PATTERNS.map((name) => (
        <section key={name} className={styles['patterns__section']}>
          <h2 className={styles['patterns__section-title']}>{name}</h2>
          <div className={styles['patterns__placeholder']}>
            <span className={styles['patterns__placeholder-label']}>{name}</span>
          </div>
        </section>
      ))}
    </div>
  );
}
