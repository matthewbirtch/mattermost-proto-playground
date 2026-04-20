import React from 'react';
import Button from '@/components/ui/Button/Button';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import MessageInput from '@/components/ui/MessageInput';
import TextInput from '@/components/ui/TextInput/TextInput';
import { Modal } from '@/components/ui/Modal';
import Post from '@/components/ui/Post/Post';
import Divider from '@/components/ui/Divider/Divider';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import TeamSidebar from '@/components/ui/TeamSidebar/TeamSidebar';
import avatarStaffTeam from '@/assets/avatars/Staff Team.png';
import avatarAikoTan from '@/assets/avatars/Aiko Tan.png';
import avatarLeonard from '@/assets/avatars/Leonard Riley.png';
import avatarDanielle from '@/assets/avatars/Danielle Okoro.png';
import avatarArjunPatel from '@/assets/avatars/Arjun Patel.png';
import avatarDariusCole from '@/assets/avatars/Darius Cole.png';
import avatarDavidLiang from '@/assets/avatars/David Liang.png';
import avatarEmmaNovak from '@/assets/avatars/Emma Novak.png';
import avatarEthanBrooks from '@/assets/avatars/Ethan Brooks.png';
import styles from './Patterns.module.scss';

const REMAINING_PATTERNS = ['Profile Popover'];

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
        <h2 className={styles['patterns__section-title']}>Global Header</h2>
        <div className={styles['patterns__global-header-demo']}>
          <p className={styles['patterns__variant-label']}>Channels</p>
          <GlobalHeader
            product="Channels"
            userAvatarSrc={avatarLeonard}
            userAvatarAlt="Leonard Riley"
          />
          <p className={styles['patterns__variant-label']}>Channels — with Upgrade</p>
          <GlobalHeader
            product="Channels"
            showUpgradeButton
            userAvatarSrc={avatarLeonard}
            userAvatarAlt="Leonard Riley"
          />
          <p className={styles['patterns__variant-label']}>Playbooks</p>
          <GlobalHeader
            product="Playbooks"
            userAvatarSrc={avatarLeonard}
            userAvatarAlt="Leonard Riley"
          />
          <p className={styles['patterns__variant-label']}>Boards</p>
          <GlobalHeader
            product="Boards"
            userAvatarSrc={avatarLeonard}
            userAvatarAlt="Leonard Riley"
          />
        </div>
      </section>

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Channel Header</h2>
        <div className={styles['patterns__channel-header-demo']}>
          <p className={styles['patterns__variant-label']}>Channel</p>
          <ChannelHeader type="Channel" name="UX Design" memberCount={48} pinnedCount={1} />
          <p className={styles['patterns__variant-label']}>Channel — favorited, muted</p>
          <ChannelHeader type="Channel" name="UX Design" memberCount={48} pinnedCount={1} favorited muted />
          <p className={styles['patterns__variant-label']}>Bot</p>
          <ChannelHeader
            type="Bot"
            name="Todo"
            avatarSrc={avatarLeonard}
            description="Created by the Todo Plugin"
            pinnedCount={1}
          />
          <p className={styles['patterns__variant-label']}>DM</p>
          <ChannelHeader
            type="DM"
            name="Aiko Tan"
            avatarSrc={avatarAikoTan}
            avatarStatus
            pinnedCount={1}
          />
          <p className={styles['patterns__variant-label']}>GM</p>
          <ChannelHeader
            type="GM"
            name="Aiko Tan, Arjun Patel, Daniel Okoro"
            memberCount={4}
            pinnedCount={1}
          />
          <p className={styles['patterns__variant-label']}>Threads</p>
          <ChannelHeader
            type="Threads"
            name="Followed Threads"
            description="Threads you're participating in will automatically show here"
          />
          <p className={styles['patterns__variant-label']}>Drafts</p>
          <ChannelHeader
            type="Drafts"
            name="Drafts"
            description="Any messages you've started will show here"
          />
        </div>
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

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Team Sidebar</h2>
        <div className={styles['patterns__team-sidebar-demo']}>
          <TeamSidebar
            activeTeamId="contributors"
            teams={[
              { id: 'contributors', name: 'Contributors', src: avatarStaffTeam },
              { id: 'design', name: 'Design', initials: 'De', unread: true },
              { id: 'acme', name: 'Acme', initials: 'Ac', mentions: 3 },
            ]}
          />
        </div>
      </section>

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Channel Sidebar</h2>
        <div className={styles['patterns__sidebar-demo']}>
          <div>
            <p className={styles['patterns__variant-label']}>Unreads category Off</p>
            <ChannelsSidebar
              showFilter
              avatarAikoTan={avatarAikoTan}
              avatarArjunPatel={avatarArjunPatel}
              avatarDanielOkoro={avatarDanielle}
              avatarDariusCole={avatarDariusCole}
              avatarDavidLiang={avatarDavidLiang}
              avatarEmmaNovak={avatarEmmaNovak}
              avatarEthanBrooks={avatarEthanBrooks}
            />
          </div>
          <div>
            <p className={styles['patterns__variant-label']}>Unreads category On</p>
            <ChannelsSidebar
              showUnreadsCategory
              avatarAikoTan={avatarAikoTan}
              avatarArjunPatel={avatarArjunPatel}
              avatarDanielOkoro={avatarDanielle}
              avatarDariusCole={avatarDariusCole}
              avatarDavidLiang={avatarDavidLiang}
              avatarEmmaNovak={avatarEmmaNovak}
              avatarEthanBrooks={avatarEthanBrooks}
            />
          </div>
        </div>
      </section>

      <section className={styles['patterns__section']}>
        <h2 className={styles['patterns__section-title']}>Message Input</h2>
        <div className={styles['patterns__message-input-demo']}>
          <p className={styles['patterns__variant-label']}>Default</p>
          <MessageInput placeholder="Message #ux-design…" />
          <p className={styles['patterns__variant-label']}>With priority indicator</p>
          <MessageInput placeholder="Message #ux-design…" showPriorityIndicator />
          <p className={styles['patterns__variant-label']}>With attachments</p>
          <MessageInput placeholder="Message #ux-design…" showAttachments />
          <p className={styles['patterns__variant-label']}>With priority + attachments</p>
          <MessageInput placeholder="Message #ux-design…" showPriorityIndicator showAttachments />
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
