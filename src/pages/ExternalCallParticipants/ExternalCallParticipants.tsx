import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import InformationOutlineIcon from '@mattermost/compass-icons/components/information-outline';
import ArrowCollapseIcon from '@mattermost/compass-icons/components/arrow-collapse';
import ArrowRightIcon from '@mattermost/compass-icons/components/arrow-right';
import PhoneInTalkIcon from '@mattermost/compass-icons/components/phone-in-talk';
import MicrophoneOffIcon from '@mattermost/compass-icons/components/microphone-off';
import MicrophoneIcon from '@mattermost/compass-icons/components/microphone';
import MonitorOffIcon from '@mattermost/compass-icons/components/monitor-off';
import MonitorIcon from '@mattermost/compass-icons/components/monitor';
import RecordCircleOutlineIcon from '@mattermost/compass-icons/components/record-circle-outline';
import EmoticonHappyOutlineIcon from '@mattermost/compass-icons/components/emoticon-happy-outline';
import MessageTextOutlineIcon from '@mattermost/compass-icons/components/message-text-outline';
import DotsHorizontalIcon from '@mattermost/compass-icons/components/dots-horizontal';
import PhoneHangupIcon from '@mattermost/compass-icons/components/phone-hangup';
import AccountMultipleOutlineIcon from '@mattermost/compass-icons/components/account-multiple-outline';
import ArrowExpandIcon from '@mattermost/compass-icons/components/arrow-expand';
import HandRightOutlineIcon from '@mattermost/compass-icons/components/hand-right-outline';
import HandRightIcon from '@mattermost/compass-icons/components/hand-right';
import GlobeIcon from '@mattermost/compass-icons/components/globe';
import VolumeHighIcon from '@mattermost/compass-icons/components/volume-high';
import VideoOutlineIcon from '@mattermost/compass-icons/components/video-outline';
import ChevronRightIcon from '@mattermost/compass-icons/components/chevron-right';
import CogOutlineIcon from '@mattermost/compass-icons/components/cog-outline';
import CloseIcon from '@mattermost/compass-icons/components/close';
import PhoneIcon from '@mattermost/compass-icons/components/phone';
import AccountOutlineIcon from '@mattermost/compass-icons/components/account-outline';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar';
import CallParticipantAvatar from '@/components/ui/CallParticipantAvatar/CallParticipantAvatar';
import LabelTag from '@/components/ui/LabelTag/LabelTag';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import Icon from '@/components/ui/Icon/Icon';
import IconButton from '@/components/ui/IconButton/IconButton';
import MessageInput from '@/components/ui/MessageInput';
import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/TextInput/TextInput';
import MenuItem from '@/components/ui/MenuItem/MenuItem';
import MessageSeparator from '@/components/ui/MessageSeparator/MessageSeparator';
import Post from '@/components/ui/Post/Post';
import RecordingPill from '@/components/ui/RecordingPill/RecordingPill';
import TeamSidebar from '@/components/ui/TeamSidebar/TeamSidebar';
import avatarAikoTan from '@/assets/avatars/Aiko Tan.png';
import avatarArjunPatel from '@/assets/avatars/Arjun Patel.png';
import avatarDanielle from '@/assets/avatars/Danielle Okoro.png';
import avatarDariusCole from '@/assets/avatars/Darius Cole.png';
import avatarDavidLiang from '@/assets/avatars/David Liang.png';
import avatarEmmaNovak from '@/assets/avatars/Emma Novak.png';
import avatarEthanBrooks from '@/assets/avatars/Ethan Brooks.png';
import avatarIsabellaCruz from '@/assets/avatars/Isabella Cruz.png';
import avatarLeilaHaddad from '@/assets/avatars/Leila Haddad.png';
import avatarLeonard from '@/assets/avatars/Leonard Riley.png';
import avatarLukasMeyer from '@/assets/avatars/Lukas Meyer.png';
import avatarMarco from '@/assets/avatars/Marco Rinaldi.png';
import avatarSofia from '@/assets/avatars/Sofia Bauer.png';
import avatarStaffTeam from '@/assets/avatars/Staff Team.png';
import welcomeBg from '@/assets/illustrations/call-welcome-bg.svg';
import CallInfoPanel from './CallInfoPanel';
import styles from './ExternalCallParticipants.module.scss';

const INTERNAL_LINK =
  'https://community.mattermost.com/team/channels/asdfasf?join=true';
const EXTERNAL_LINK =
  'https://community.mattermost.com/plugins/com.mattermost.calls/guest?token={secret}';
const DIAL_IN_NUMBER = '+1 669 444 9171 (US)';
const DIAL_IN_PIN = '938 394 234';

type ParticipantKind = 'user' | 'external-link' | 'dial-in';

type Participant = {
  id: string;
  name: string;
  avatarSrc?: string;
  host?: boolean;
  talking?: boolean;
  muted?: boolean;
  kind?: ParticipantKind;
  external?: boolean;
};

const PARTICIPANTS: Participant[] = [
  { id: 'leonard', name: 'Leonard Riley', avatarSrc: avatarLeonard, host: true, talking: true, muted: false },
  { id: 'aiko', name: 'Aiko Tan', avatarSrc: avatarAikoTan, muted: true },
  { id: 'arjun', name: 'Arjun Patel', avatarSrc: avatarArjunPatel, muted: true },
  { id: 'danielle', name: 'Danielle Okoro', avatarSrc: avatarDanielle, muted: true },
  { id: 'darius', name: 'Darius Cole', avatarSrc: avatarDariusCole, muted: true },
  { id: 'david', name: 'David Liang', avatarSrc: avatarDavidLiang, muted: true },
  { id: 'emma', name: 'Emma Novak', avatarSrc: avatarEmmaNovak, muted: true },
  { id: 'ethan', name: 'Ethan Brooks', avatarSrc: avatarEthanBrooks, muted: true },
  { id: 'isabella', name: 'Isabella Cruz', avatarSrc: avatarIsabellaCruz, muted: true },
  { id: 'leila', name: 'Leila Haddad', avatarSrc: avatarLeilaHaddad, muted: true },
  { id: 'lucas', name: 'Lucas Meyer', avatarSrc: avatarLukasMeyer, muted: true },
];

// Full call roster shown to the host (widget + popout) and, with the same
// externals, to the guest view. Drops the last two internal participants and
// adds an external-link guest + a dial-in caller, matching the Figma.
const CALL_PARTICIPANTS: Participant[] = [
  ...PARTICIPANTS.slice(0, -2),
  {
    id: 'external-james',
    name: 'James Smith',
    kind: 'external-link',
    external: true,
    muted: true,
  },
  {
    id: 'dialin-5555',
    name: '+1-555-555-5555',
    kind: 'dial-in',
    external: true,
    muted: true,
  },
];

type SceneId = 'welcome' | 'widget' | 'popout' | 'guest';

const SCENES: { id: SceneId; label: string }[] = [
  { id: 'widget', label: 'Widget' },
  { id: 'popout', label: 'Popout' },
  { id: 'welcome', label: 'Welcome' },
  { id: 'guest', label: 'Guest' },
];

function SceneSwitcher({
  active,
  onChange,
}: {
  active: SceneId;
  onChange: (id: SceneId) => void;
}) {
  return (
    <div
      className={styles['scene-switcher']}
      role="tablist"
      aria-label="Prototype entry points"
    >
      <span className={styles['scene-switcher__label']}>Entry point</span>
      <div className={styles['scene-switcher__segmented']}>
        {SCENES.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles['scene-switcher__tab']} ${
                isActive ? styles['scene-switcher__tab--active'] : ''
              }`}
              onClick={() => onChange(s.id)}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --duration-quick is 150ms; keep in sync if that token changes.
const POPOVER_TRANSITION_MS = 150;

// Keeps a popover mounted for the duration of its exit animation so the close
// transition can play before React unmounts the node. See CLAUDE.md:
// "Animation: popover panel open/close".
function usePopoverTransition(open: boolean) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Two rAFs: first yields so React commits the mounted-but-hidden state,
      // second yields so the browser paints it — then we flip `visible` and the
      // CSS transition has a "before" value to animate from.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), POPOVER_TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  return { mounted, visible };
}

export default function ExternalCallParticipants() {
  const [externalEnabled, setExternalEnabled] = useState(false);
  const [scene, setScene] = useState<SceneId>('widget');
  const [callInfoOpen, setCallInfoOpen] = useState(false);
  const [widgetOverlay, setWidgetOverlay] = useState<
    'menu' | 'info' | 'participants' | null
  >(null);
  const [muted, setMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [guestName, setGuestName] = useState('');

  const popoutOpen = scene === 'popout';

  const guestParticipants: Participant[] = CALL_PARTICIPANTS.map((p) =>
    p.id === 'external-james' && guestName.trim()
      ? { ...p, name: guestName.trim() }
      : p,
  );

  if (scene === 'welcome') {
    return (
      <>
        <SceneSwitcher active={scene} onChange={setScene} />
        <WelcomeScene
          channelName="UX Design"
          onJoin={(name) => {
            setGuestName(name);
            setScene('guest');
          }}
        />
      </>
    );
  }

  if (scene === 'guest') {
    return (
      <>
        <SceneSwitcher active={scene} onChange={setScene} />
        <CallPopout
          variant="fullscreen"
          guestView
          participants={guestParticipants}
          currentUserId="external-james"
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onLeave={() => setScene('welcome')}
          infoOpen={callInfoOpen}
          onInfoToggle={() => setCallInfoOpen((v) => !v)}
          externalEnabled={externalEnabled}
          onExternalEnabledChange={setExternalEnabled}
        />
      </>
    );
  }

  return (
    <>
      <SceneSwitcher active={scene} onChange={setScene} />
      <div className={styles.page}>
      <div className={styles['page__global-header']}>
        <GlobalHeader
          product="Channels"
          userAvatarSrc={avatarLeonard}
          userAvatarAlt="Leonard Riley"
        />
      </div>

      <div className={styles['page__body']}>
        <div className={styles['page__team-sidebar']}>
          <TeamSidebar
            activeTeamId="contributors"
            teams={[
              { id: 'contributors', name: 'Contributors', src: avatarStaffTeam },
              { id: 'design', name: 'Design', initials: 'De', unread: true },
              { id: 'acme', name: 'Acme', initials: 'Ac', mentions: 3 },
            ]}
          />
        </div>

        <div className={styles['page__outer-panel']}>
          <div className={styles['page__channels-sidebar']}>
            <ChannelsSidebar
              teamName="Contributors"
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

          <div className={styles['page__inner-panel']}>
            <div className={styles['page__center']}>
              <ChannelHeader
                type="Channel"
                name="UX Design"
                description="Design reviews and ongoing work."
                memberCount={24}
                pinnedCount={2}
              />

              <div className={styles['page__messages']}>
                <MessageSeparator type="Date" label="Today" />

                <Post
                  avatarSrc={avatarSofia}
                  avatarAlt="Sofia Bauer"
                  username="Sofia Bauer"
                  timestamp="9:02 AM"
                >
                  <p className={styles['page__post-text']}>
                    We&rsquo;re jumping on the call with the partner team in a
                    few minutes — sharing the external link so Priya can join
                    without a Mattermost account.
                  </p>
                </Post>

                <Post
                  avatarSrc={avatarMarco}
                  avatarAlt="Marco Rinaldi"
                  username="Marco Rinaldi"
                  timestamp="9:14 AM"
                >
                  <p className={styles['page__post-text']}>
                    I&rsquo;ll dial in from the shop floor — no browser there.
                    Drop the SIP number and PIN in the thread please.
                  </p>
                </Post>
              </div>

              <div className={styles['page__message-input']}>
                <MessageInput placeholder="Write to UX Design" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!popoutOpen && (
        <div className={styles['page__widget-wrap']}>
          <CallWidget
            participants={CALL_PARTICIPANTS}
            currentUserId="leonard"
            talkerName="Leonard R."
            talkerAvatarSrc={avatarLeonard}
            channelName="UX Design"
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            handRaised={handRaised}
            onToggleHand={() => setHandRaised((h) => !h)}
            sharing={sharing}
            onToggleShare={() => setSharing((s) => !s)}
            onExpand={() => setScene('popout')}
            onLeave={() => setScene('widget')}
            overlay={widgetOverlay}
            onToggleMenu={() =>
              setWidgetOverlay((v) => (v === 'menu' ? null : 'menu'))
            }
            onToggleParticipants={() =>
              setWidgetOverlay((v) => (v === 'participants' ? null : 'participants'))
            }
            onOpenCallInfo={() => setWidgetOverlay('info')}
            onCloseCallInfo={() => setWidgetOverlay(null)}
            externalEnabled={externalEnabled}
            onExternalEnabledChange={setExternalEnabled}
          />
        </div>
      )}

      {popoutOpen && (
        <CallPopout
          participants={CALL_PARTICIPANTS}
          currentUserId="leonard"
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onCollapse={() => {
            setScene('widget');
            setCallInfoOpen(false);
          }}
          onLeave={() => setScene('widget')}
          infoOpen={callInfoOpen}
          onInfoToggle={() => setCallInfoOpen((v) => !v)}
          externalEnabled={externalEnabled}
          onExternalEnabledChange={setExternalEnabled}
        />
      )}
      </div>
    </>
  );
}

// ─── Welcome Scene (guest join screen) ──────────────────────────────────────

interface WelcomeSceneProps {
  channelName: string;
  onJoin: (name: string) => void;
}

function WelcomeScene({ onJoin }: WelcomeSceneProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onJoin(name.trim());
  };

  return (
    <div className={styles.welcome}>
      <div
        className={styles['welcome__texture']}
        style={{ backgroundImage: `url(${welcomeBg})` }}
        aria-hidden
      />
      <div className={styles['welcome__glow']} aria-hidden />
      <form className={styles['welcome__card']} onSubmit={handleSubmit}>
        <div className={styles['welcome__icon']}>
          <Icon size="32" glyph={<PhoneInTalkIcon />} />
        </div>

        <div className={styles['welcome__heading']}>
          <h1 className={styles['welcome__title']}>Welcome to the call</h1>
          <p className={styles['welcome__subtitle']}>
            Please enter your name to join the call
          </p>
        </div>

        <div className={styles['welcome__form']}>
          <TextInput
            className={styles['welcome__input']}
            placeholder="Your name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            emphasis="Primary"
            size="Medium"
            trailingIcon={<Icon size="16" glyph={<ArrowRightIcon />} />}
          >
            Join
          </Button>
        </div>

        <p className={styles['welcome__footer']}>
          You&rsquo;ll join as a guest
        </p>
      </form>
    </div>
  );
}

// ─── Call Popout Window ─────────────────────────────────────────────────────

interface CallPopoutProps {
  participants: Participant[];
  /** ID of the signed-in participant (used for the "(you)" label in the participants panel). */
  currentUserId?: string;
  muted: boolean;
  onToggleMute: () => void;
  onCollapse?: () => void;
  onLeave: () => void;
  infoOpen: boolean;
  onInfoToggle: () => void;
  externalEnabled: boolean;
  onExternalEnabledChange: (v: boolean) => void;
  /** 'windowed' renders inside a fake browser chrome. 'fullscreen' fills the frame. */
  variant?: 'windowed' | 'fullscreen';
  /** When true, the Call Info panel renders in 'guest' mode (no internal link, no toggle, only external details). */
  guestView?: boolean;
}

function CallPopout({
  participants,
  currentUserId,
  muted,
  onToggleMute,
  onCollapse,
  onLeave,
  infoOpen,
  onInfoToggle,
  externalEnabled,
  onExternalEnabledChange,
  variant = 'windowed',
  guestView = false,
}: CallPopoutProps) {
  const fullscreen = variant === 'fullscreen';
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const infoTransition = usePopoverTransition(infoOpen);
  const rootClass = `${styles.popout} ${
    fullscreen ? styles['popout--fullscreen'] : ''
  }`;

  return (
    <div
      className={rootClass}
      role="dialog"
      aria-modal="false"
      aria-label="Call - UX Design"
    >
      {!fullscreen && (
        <div className={styles['popout__app-header']}>
          <span className={styles['popout__window-controls']}>
            <button
              type="button"
              aria-label="Close call window"
              className={`${styles['popout__window-dot']} ${styles['popout__window-dot--close']}`}
              onClick={onCollapse}
            />
            <span
              aria-hidden
              className={`${styles['popout__window-dot']} ${styles['popout__window-dot--min']}`}
            />
            <span
              aria-hidden
              className={`${styles['popout__window-dot']} ${styles['popout__window-dot--max']}`}
            />
          </span>
          <span className={styles['popout__app-title']}>Call - UX Design</span>
        </div>
      )}

      <div className={styles['popout__container']}>
        <div className={styles['popout__header']}>
          <div className={styles['popout__header-left']}>
            <RecordingPill state="Recording" />
            <span className={styles['popout__elapsed']}>
              3:39 &middot; {participants.length} participants
            </span>
          </div>
          <div className={styles['popout__header-right']}>
            <IconButton
              size="Small"
              style="Inverted"
              active={infoOpen}
              aria-label={infoOpen ? 'Close call info' : 'Open call info'}
              icon={<Icon size="16" glyph={<InformationOutlineIcon />} />}
              onClick={onInfoToggle}
            />
            {!fullscreen && (
              <IconButton
                size="Small"
                style="Inverted"
                aria-label="Collapse call"
                icon={<Icon size="16" glyph={<ArrowCollapseIcon />} />}
                onClick={onCollapse}
              />
            )}
          </div>

          {infoTransition.mounted && (
            <div
              className={`${styles['popout__info-popover']} ${
                infoTransition.visible
                  ? styles['popout__info-popover--visible']
                  : ''
              }`}
            >
              <CallInfoPanel
                variant={guestView ? 'guest' : 'host'}
                internalLink={INTERNAL_LINK}
                externalLink={EXTERNAL_LINK}
                dialInNumber={DIAL_IN_NUMBER}
                dialInPin={DIAL_IN_PIN}
                externalEnabled={externalEnabled}
                onExternalEnabledChange={onExternalEnabledChange}
              />
            </div>
          )}
        </div>

        <div className={styles['popout__stage']}>
          <div className={styles['popout__room']}>
            <div className={styles['popout__grid']}>
              {participants.map((p) => (
                <CallParticipantAvatar
                  key={p.id}
                  src={p.avatarSrc}
                  alt={p.name}
                  name={p.name}
                  size="Medium"
                  kind={p.kind}
                  host={p.host}
                  external={p.external}
                  talking={p.talking}
                />
              ))}
            </div>
          </div>
          {participantsOpen && (
            <ParticipantsPanel
              participants={participants}
              currentUserId={currentUserId}
              onClose={() => setParticipantsOpen(false)}
            />
          )}
        </div>

        <div className={styles['popout__controls']}>
          <div className={styles['popout__controls-left']}>
            <IconButton
              size="Medium"
              style="Inverted"
              active={participantsOpen}
              count={participants.length}
              aria-label={`Participants (${participants.length})`}
              icon={<Icon size="20" glyph={<AccountMultipleOutlineIcon />} />}
              onClick={() => setParticipantsOpen((v) => !v)}
            />
          </div>

          <div className={styles['popout__controls-middle']}>
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label={muted ? 'Unmute' : 'Mute'}
              icon={
                <Icon
                  size="20"
                  glyph={muted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
                />
              }
              onClick={onToggleMute}
            />
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="Share screen"
              icon={<Icon size="20" glyph={<MonitorOffIcon />} />}
            />
            {!fullscreen && (
              <IconButton
                size="Medium"
                style="Inverted"
                aria-label="Record"
                icon={<Icon size="20" glyph={<RecordCircleOutlineIcon />} />}
              />
            )}
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="Reactions"
              icon={<Icon size="20" glyph={<EmoticonHappyOutlineIcon />} />}
            />
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="Chat"
              icon={<Icon size="20" glyph={<MessageTextOutlineIcon />} />}
            />
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="More"
              icon={<Icon size="20" glyph={<DotsHorizontalIcon />} />}
            />
          </div>

          <div className={styles['popout__controls-right']}>
            <IconButton
              size="Medium"
              destructive
              aria-label="Leave call"
              icon={<Icon size="20" glyph={<PhoneHangupIcon />} />}
              onClick={onLeave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Participants Panel (right sidebar) ─────────────────────────────────────

interface ParticipantsPanelProps {
  participants: Participant[];
  currentUserId?: string;
  onClose?: () => void;
  /** 'widget' renders a compact variant for the docked call widget popover. */
  variant?: 'default' | 'widget';
}

function ParticipantsPanel({
  participants,
  currentUserId,
  onClose,
  variant = 'default',
}: ParticipantsPanelProps) {
  const internal = participants.filter((p) => !p.external);
  const external = participants.filter((p) => p.external);
  const isWidget = variant === 'widget';

  const rootClass = [
    styles['participants-panel'],
    isWidget ? styles['participants-panel--widget'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={rootClass} aria-label="Participants">
      <div className={styles['participants-panel__header']}>
        <h2 className={styles['participants-panel__title']}>Participants</h2>
        <div className={styles['participants-panel__header-actions']}>
          <Button
            emphasis="Link"
            size="X-Small"
            leadingIcon={<Icon size="12" glyph={<MicrophoneOffIcon />} />}
          >
            Mute all
          </Button>
          {!isWidget && onClose && (
            <IconButton
              size="Small"
              aria-label="Close participants"
              icon={<Icon size="16" glyph={<CloseIcon />} />}
              onClick={onClose}
            />
          )}
        </div>
      </div>

      <div className={styles['participants-panel__scroll']}>
        <ul className={styles['participants-panel__list']}>
          {internal.map((p) => (
            <ParticipantListItem
              key={p.id}
              participant={p}
              isYou={p.id === currentUserId}
            />
          ))}
        </ul>

        {external.length > 0 && (
          <>
            <div
              className={styles['participants-panel__divider']}
              role="separator"
            />
            <div className={styles['participants-panel__group-title']}>
              External Participants
            </div>
            <ul className={styles['participants-panel__list']}>
              {external.map((p) => (
                <ParticipantListItem
                  key={p.id}
                  participant={p}
                  isYou={p.id === currentUserId}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}

interface ParticipantListItemProps {
  participant: Participant;
  isYou?: boolean;
}

function ParticipantListItem({
  participant,
  isYou = false,
}: ParticipantListItemProps) {
  const {
    name,
    avatarSrc,
    host = false,
    external = false,
    muted = false,
    kind = 'user',
  } = participant;

  const isUserKind = kind === 'user';

  const fallbackClass = [
    styles['participants-panel__avatar-fallback'],
    kind === 'dial-in'
      ? styles['participants-panel__avatar-fallback--dial-in']
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  const micClass = [
    styles['participants-panel__mic'],
    muted
      ? styles['participants-panel__mic--off']
      : styles['participants-panel__mic--on'],
  ].join(' ');

  return (
    <li className={styles['participants-panel__item']}>
      <div className={styles['participants-panel__item-avatar']}>
        {isUserKind && avatarSrc ? (
          <UserAvatar size="24" src={avatarSrc} alt={name} />
        ) : (
          <span className={fallbackClass} role="img" aria-label={name}>
            <Icon
              size="16"
              glyph={kind === 'dial-in' ? <PhoneIcon /> : <AccountOutlineIcon />}
            />
          </span>
        )}
      </div>

      <div className={styles['participants-panel__item-identity']}>
        <span className={styles['participants-panel__name']}>{name}</span>
        {isYou && (
          <span className={styles['participants-panel__you']}>(you)</span>
        )}
        {host && <LabelTag label="HOST" size="X-Small" casing="All Caps" />}
        {external && (
          <LabelTag label="EXTERNAL" size="X-Small" casing="All Caps" />
        )}
      </div>

      <div className={styles['participants-panel__item-actions']}>
        <span className={styles['participants-panel__more']}>
          <IconButton
            size="Small"
            padding="Compact"
            aria-label={`More actions for ${name}`}
            icon={<Icon size="16" glyph={<DotsHorizontalIcon />} />}
          />
        </span>
        <span
          className={micClass}
          role="img"
          aria-label={muted ? 'Muted' : 'Unmuted'}
        >
          <Icon
            size="16"
            glyph={muted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
          />
        </span>
      </div>
    </li>
  );
}

// ─── Docked Call Widget (widget version of Call Info) ───────────────────────

interface CallWidgetProps {
  participants: Participant[];
  currentUserId?: string;
  talkerName: string;
  talkerAvatarSrc: string;
  channelName: string;
  muted: boolean;
  onToggleMute: () => void;
  handRaised: boolean;
  onToggleHand: () => void;
  sharing: boolean;
  onToggleShare: () => void;
  onExpand: () => void;
  onLeave: () => void;
  overlay: 'menu' | 'info' | 'participants' | null;
  onToggleMenu: () => void;
  onToggleParticipants: () => void;
  onOpenCallInfo: () => void;
  onCloseCallInfo: () => void;
  externalEnabled: boolean;
  onExternalEnabledChange: (v: boolean) => void;
}

function CallWidget({
  participants,
  currentUserId,
  talkerName,
  talkerAvatarSrc,
  channelName,
  muted,
  onToggleMute,
  handRaised,
  onToggleHand,
  sharing,
  onToggleShare,
  onExpand,
  onLeave,
  overlay,
  onToggleMenu,
  onToggleParticipants,
  onOpenCallInfo,
  onCloseCallInfo,
  externalEnabled,
  onExternalEnabledChange,
}: CallWidgetProps) {
  const participantCount = participants.length;
  const participantsActive = overlay === 'participants';
  const participantsButtonClass = [
    styles['widget__participants'],
    participantsActive ? styles['widget__participants--active'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const menuTransition = usePopoverTransition(overlay === 'menu');
  const infoTransition = usePopoverTransition(overlay === 'info');
  const participantsTransition = usePopoverTransition(overlay === 'participants');
  return (
    <div className={styles.widget} role="region" aria-label="Active call">
      <div className={styles['widget__body']}>
        <div className={styles['widget__header']}>
          <UserAvatar size="32" src={talkerAvatarSrc} alt={talkerName} />
          <div className={styles['widget__header-text']}>
            <div className={styles['widget__title']}>
              <span className={styles['widget__title-name']}>{talkerName}</span>
              <span className={styles['widget__title-tail']}>
                {' '}is talking
              </span>
            </div>
            <div className={styles['widget__sub']}>
              <span className={styles['widget__elapsed']}>3:39</span>
              <span className={styles['widget__sub-sep']} aria-hidden>&middot;</span>
              <span className={styles['widget__channel']}>
                <Icon size="12" glyph={<GlobeIcon />} />
                {channelName}
              </span>
            </div>
          </div>
          <IconButton
            size="Small"
            padding="Compact"
            aria-label="Expand call window"
            icon={<Icon size="16" glyph={<ArrowExpandIcon />} />}
            onClick={onExpand}
          />
        </div>

        <div className={styles['widget__controls']}>
          <button
            type="button"
            className={participantsButtonClass}
            aria-label={`${participantCount} participants`}
            aria-expanded={participantsActive}
            onClick={onToggleParticipants}
          >
            <Icon size="16" glyph={<AccountMultipleOutlineIcon />} />
            <span>{participantCount}</span>
          </button>

          <div className={styles['widget__actions']}>
            <IconButton
              size="Small"
              padding="Compact"
              active={muted}
              destructive={muted}
              aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
              icon={
                <Icon
                  size="16"
                  glyph={muted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
                />
              }
              onClick={onToggleMute}
            />
            <IconButton
              size="Small"
              padding="Compact"
              active={handRaised}
              aria-label={handRaised ? 'Lower hand' : 'Raise hand'}
              icon={
                <Icon
                  size="16"
                  glyph={handRaised ? <HandRightIcon /> : <HandRightOutlineIcon />}
                />
              }
              onClick={onToggleHand}
            />
            <IconButton
              size="Small"
              padding="Compact"
              active={sharing}
              aria-label={sharing ? 'Stop sharing screen' : 'Share screen'}
              icon={
                <Icon
                  size="16"
                  glyph={sharing ? <MonitorIcon /> : <MonitorOffIcon />}
                />
              }
              onClick={onToggleShare}
            />
            <IconButton
              size="Small"
              padding="Compact"
              active={overlay === 'menu'}
              aria-label={overlay === 'menu' ? 'Close call menu' : 'Open call menu'}
              icon={<Icon size="16" glyph={<DotsHorizontalIcon />} />}
              onClick={onToggleMenu}
            />
            <button
              type="button"
              aria-label="Leave call"
              className={styles['widget__hangup']}
              onClick={onLeave}
            >
              <Icon size="16" glyph={<PhoneHangupIcon />} />
            </button>
          </div>
        </div>
      </div>

      {menuTransition.mounted && (
        <div
          className={`${styles['widget__popover']} ${
            menuTransition.visible ? styles['widget__popover--visible'] : ''
          }`}
        >
          <div className={styles['widget__menu']} role="menu">
            <MenuItem
              label="Audio output"
              secondaryLabel="Default"
              leadingVisual={<Icon size="16" glyph={<VolumeHighIcon />} />}
              trailingElement
              trailingVisual={<Icon size="16" glyph={<ChevronRightIcon />} />}
            />
            <MenuItem
              label="Microphone"
              secondaryLabel="Default"
              leadingVisual={<Icon size="16" glyph={<MicrophoneIcon />} />}
              trailingElement
              trailingVisual={<Icon size="16" glyph={<ChevronRightIcon />} />}
            />
            <MenuItem
              label="Camera"
              secondaryLabel="Default"
              leadingVisual={<Icon size="16" glyph={<VideoOutlineIcon />} />}
              trailingElement
              trailingVisual={<Icon size="16" glyph={<ChevronRightIcon />} />}
            />
            <div className={styles['widget__menu-divider']} role="separator" />
            <MenuItem
              label="Record call"
              leadingVisual={<Icon size="16" glyph={<RecordCircleOutlineIcon />} />}
            />
            <MenuItem
              label="Show chat thread"
              leadingVisual={<Icon size="16" glyph={<MessageTextOutlineIcon />} />}
            />
            <MenuItem
              label="Call info"
              leadingVisual={<Icon size="16" glyph={<InformationOutlineIcon />} />}
              onClick={onOpenCallInfo}
            />
            <MenuItem
              label="Additional settings"
              leadingVisual={<Icon size="16" glyph={<CogOutlineIcon />} />}
            />
          </div>
        </div>
      )}

      {infoTransition.mounted && (
        <div
          className={`${styles['widget__popover']} ${
            infoTransition.visible ? styles['widget__popover--visible'] : ''
          }`}
        >
          <CallInfoPanel
            fullWidth
            onClose={onCloseCallInfo}
            internalLink={INTERNAL_LINK}
            externalLink={EXTERNAL_LINK}
            dialInNumber={DIAL_IN_NUMBER}
            dialInPin={DIAL_IN_PIN}
            externalEnabled={externalEnabled}
            onExternalEnabledChange={onExternalEnabledChange}
          />
        </div>
      )}

      {participantsTransition.mounted && (
        <div
          className={`${styles['widget__popover']} ${
            participantsTransition.visible
              ? styles['widget__popover--visible']
              : ''
          }`}
        >
          <ParticipantsPanel
            variant="widget"
            participants={participants}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  );
}
