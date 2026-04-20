import { useEffect, useMemo, useRef, useState } from 'react';
import PhoneIcon from '@mattermost/compass-icons/components/phone';
import PhoneOutlineIcon from '@mattermost/compass-icons/components/phone-outline';
import PhoneInTalkIcon from '@mattermost/compass-icons/components/phone-in-talk';
import PhoneHangupIcon from '@mattermost/compass-icons/components/phone-hangup';
import MicrophoneIcon from '@mattermost/compass-icons/components/microphone';
import MicrophoneOffIcon from '@mattermost/compass-icons/components/microphone-off';
import VolumeHighIcon from '@mattermost/compass-icons/components/volume-high';
import HeadphonesIcon from '@mattermost/compass-icons/components/headphones';
import CellphoneIcon from '@mattermost/compass-icons/components/cellphone';
import KeyboardOutlineIcon from '@mattermost/compass-icons/components/keyboard-outline';
import BackspaceOutlineIcon from '@mattermost/compass-icons/components/backspace-outline';
import LockIcon from '@mattermost/compass-icons/components/lock';
import ShieldOutlineIcon from '@mattermost/compass-icons/components/shield-outline';
import CloseIcon from '@mattermost/compass-icons/components/close';
import CheckIcon from '@mattermost/compass-icons/components/check';
import MessageTextOutlineIcon from '@mattermost/compass-icons/components/message-text-outline';
import AccountOutlineIcon from '@mattermost/compass-icons/components/account-outline';
import ClockOutlineIcon from '@mattermost/compass-icons/components/clock-outline';
import Icon, { SVG_SIZE_MAP } from '@/components/ui/Icon/Icon';
import IconButton from '@/components/ui/IconButton/IconButton';
import Button from '@/components/ui/Button/Button';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import MessageInput from '@/components/ui/MessageInput';
import MessageSeparator from '@/components/ui/MessageSeparator/MessageSeparator';
import Post from '@/components/ui/Post/Post';
import TeamSidebar from '@/components/ui/TeamSidebar/TeamSidebar';
import avatarAikoTan from '@/assets/avatars/Aiko Tan.png';
import avatarArjunPatel from '@/assets/avatars/Arjun Patel.png';
import avatarDanielle from '@/assets/avatars/Danielle Okoro.png';
import avatarDariusCole from '@/assets/avatars/Darius Cole.png';
import avatarDavidLiang from '@/assets/avatars/David Liang.png';
import avatarEmmaNovak from '@/assets/avatars/Emma Novak.png';
import avatarEthanBrooks from '@/assets/avatars/Ethan Brooks.png';
import avatarLeonard from '@/assets/avatars/Leonard Riley.png';
import avatarStaffTeam from '@/assets/avatars/Staff Team.png';
import styles from './OutboundCalls.module.scss';

// ── Mock data ───────────────────────────────────────────────────────────────

type PhoneKind = 'work' | 'mobile';
type Phone = { number: string; label: string; kind: PhoneKind; secure: boolean };
type Contact = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  phones: Phone[];
};

const CONTACTS: Contact[] = [
  {
    id: 'aiko',
    name: 'Aiko Tan',
    role: 'Product Designer · Tokyo',
    avatar: avatarAikoTan,
    online: true,
    phones: [
      { number: '+1 (415) 555-0142', label: 'Work', kind: 'work', secure: true },
      { number: '+81 3 5555 0188', label: 'Mobile', kind: 'mobile', secure: false },
    ],
  },
  {
    id: 'leonard',
    name: 'Leonard Riley',
    role: 'Engineering Manager · New York',
    avatar: avatarLeonard,
    online: true,
    phones: [{ number: '+1 (212) 555-0199', label: 'Work', kind: 'work', secure: true }],
  },
  {
    id: 'danielle',
    name: 'Danielle Okoro',
    role: 'Solutions Architect · Lagos',
    avatar: avatarDanielle,
    online: false,
    phones: [
      { number: '+234 1 555 0116', label: 'Work', kind: 'work', secure: true },
      { number: '+234 803 555 8890', label: 'Mobile', kind: 'mobile', secure: false },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun Patel',
    role: 'Customer Success · London',
    avatar: avatarArjunPatel,
    online: true,
    phones: [{ number: '+44 20 7946 0814', label: 'Work', kind: 'work', secure: true }],
  },
  {
    id: 'ethan',
    name: 'Ethan Brooks',
    role: 'IT Operations · Austin',
    avatar: avatarEthanBrooks,
    online: false,
    phones: [{ number: '+1 (512) 555-0163', label: 'Work', kind: 'work', secure: true }],
  },
];

const CONTACT_MAP: Record<string, Contact> = Object.fromEntries(
  CONTACTS.map((c) => [c.id, c]),
);

type Recent = {
  contactId: string;
  phoneIndex: number;
  direction: 'outbound' | 'inbound-missed';
  timestamp: string;
  durationSec?: number;
};

const INITIAL_RECENTS: Recent[] = [
  { contactId: 'leonard', phoneIndex: 0, direction: 'outbound', timestamp: 'Today, 9:42 AM', durationSec: 252 },
  { contactId: 'danielle', phoneIndex: 0, direction: 'inbound-missed', timestamp: 'Yesterday, 4:18 PM' },
  { contactId: 'arjun', phoneIndex: 0, direction: 'outbound', timestamp: 'Yesterday, 11:07 AM', durationSec: 1140 },
  { contactId: 'aiko', phoneIndex: 1, direction: 'outbound', timestamp: 'Apr 17', durationSec: 84 },
];

type AudioDeviceKind = 'laptop' | 'headphones' | 'external' | 'phone';
type AudioDevice = { id: string; label: string; kind: AudioDeviceKind };

const AUDIO_DEVICES: AudioDevice[] = [
  { id: 'laptop', label: 'MacBook Pro Speakers', kind: 'laptop' },
  { id: 'airpods', label: 'AirPods Pro', kind: 'headphones' },
  { id: 'jabra', label: 'Jabra Evolve2 65', kind: 'external' },
  { id: 'iphone', label: 'iPhone (Handoff)', kind: 'phone' },
];

const AUDIO_ICON: Record<AudioDeviceKind, typeof VolumeHighIcon> = {
  laptop: VolumeHighIcon,
  headphones: HeadphonesIcon,
  external: HeadphonesIcon,
  phone: CellphoneIcon,
};

// ── Call state ─────────────────────────────────────────────────────────────

type CallStatus = 'idle' | 'dialing' | 'connected' | 'ended';

type ActiveCall = {
  contactId: string;
  phoneIndex: number;
  status: CallStatus;
  startedAt: number | null;
  endedAt: number | null;
  muted: boolean;
  deviceId: string;
  dtmf: string;
};

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatRecentDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

// ── Scene switcher ─────────────────────────────────────────────────────────

type SceneId = 'channel' | 'dm' | 'dialer';

const SCENES: { id: SceneId; label: string }[] = [
  { id: 'channel', label: 'Channel' },
  { id: 'dm', label: 'Direct message' },
  { id: 'dialer', label: 'Dialer' },
];

function SceneSwitcher({
  active,
  onChange,
}: {
  active: SceneId;
  onChange: (id: SceneId) => void;
}) {
  return (
    <div className={styles['scene-switcher']} role="tablist" aria-label="Prototype entry points">
      <span className={styles['scene-switcher__label']}>Entry point</span>
      <div className={styles['scene-switcher__segmented']}>
        {SCENES.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles['scene-switcher__tab']} ${isActive ? styles['scene-switcher__tab--active'] : ''}`}
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

// ── Profile popover ────────────────────────────────────────────────────────

function ProfilePopover({
  contact,
  anchorRect,
  onClose,
  onCall,
}: {
  contact: Contact;
  anchorRect: DOMRect;
  onClose: () => void;
  onCall: (phoneIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const popoverWidth = 320;
  const maxLeft = window.innerWidth - popoverWidth - 16;
  const left = Math.min(Math.max(8, anchorRect.left), Math.max(8, maxLeft));

  const style: React.CSSProperties = {
    top: anchorRect.bottom + 8,
    left,
  };

  return (
    <div
      ref={ref}
      className={styles['popover']}
      style={style}
      role="dialog"
      aria-label={`Profile for ${contact.name}`}
    >
      <div className={styles['popover__header']}>
        <UserAvatar src={contact.avatar} alt={contact.name} size="72" status={contact.online} />
        <div className={styles['popover__identity']}>
          <div className={styles['popover__name']}>{contact.name}</div>
          <div className={styles['popover__role']}>{contact.role}</div>
          <div className={styles['popover__presence']}>
            <span
              className={`${styles['popover__presence-dot']} ${
                contact.online ? styles['popover__presence-dot--online'] : ''
              }`}
            />
            {contact.online ? 'Online' : 'Offline'}
          </div>
        </div>
        <IconButton
          aria-label="Close profile"
          icon={<Icon glyph={<CloseIcon />} size="20" />}
          size="Small"
          onClick={onClose}
        />
      </div>

      <div className={styles['popover__quick-actions']}>
        <Button
          emphasis="Secondary"
          size="Small"
          leadingIcon={<Icon glyph={<MessageTextOutlineIcon />} size="16" />}
        >
          Message
        </Button>
        <Button
          emphasis="Secondary"
          size="Small"
          leadingIcon={<Icon glyph={<AccountOutlineIcon />} size="16" />}
        >
          View profile
        </Button>
      </div>

      <div className={styles['popover__section-label']}>Phone</div>
      <ul className={styles['popover__phones']}>
        {contact.phones.map((p, idx) => (
          <li key={p.number}>
            <button className={styles['popover__phone']} onClick={() => onCall(idx)}>
              <span className={styles['popover__phone-leading']}>
                <Icon glyph={<PhoneOutlineIcon />} size="20" />
              </span>
              <span className={styles['popover__phone-body']}>
                <span className={styles['popover__phone-number']}>{p.number}</span>
                <span className={styles['popover__phone-meta']}>
                  {p.label}
                  {p.secure ? (
                    <span className={styles['popover__secure-tag']}>
                      <Icon glyph={<ShieldOutlineIcon />} size="12" />
                      Mattermost Secure
                    </span>
                  ) : (
                    <span className={styles['popover__unsecure-tag']}>PSTN · not encrypted</span>
                  )}
                </span>
              </span>
              <span className={styles['popover__phone-trailing']}>
                <Icon glyph={<PhoneIcon />} size="16" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Channel scene ──────────────────────────────────────────────────────────

type PostItem = {
  id: string;
  contactId: string;
  timestamp: string;
  body: string;
};

const CHANNEL_POSTS: PostItem[] = [
  {
    id: 'p1',
    contactId: 'aiko',
    timestamp: '9:14 AM',
    body: 'Morning! I pushed the new softphone component to the prototype playground. Poke it and let me know what to refine.',
  },
  {
    id: 'p2',
    contactId: 'leonard',
    timestamp: '9:21 AM',
    body: "Quick one — can someone jump on a call with the mobile team? They have a blocker on the softphone keypad work.",
  },
  {
    id: 'p3',
    contactId: 'danielle',
    timestamp: '9:38 AM',
    body: "I can take it. Leonard, what's the best number to reach you on?",
  },
];

function ProfileClickable({
  contactId,
  contactName,
  onOpen,
  children,
}: {
  contactId: string;
  contactName: string;
  onOpen: (contactId: string, rect: DOMRect) => void;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const isAvatar = target.tagName === 'IMG';
    const isUsername =
      target.tagName === 'SPAN' && target.textContent?.trim() === contactName;
    if (!isAvatar && !isUsername) return;
    const img = e.currentTarget.querySelector('img');
    const rect = (img ?? target).getBoundingClientRect();
    onOpen(contactId, rect);
  };

  return (
    <div className={styles['profile-clickable']} onClick={handleClick}>
      {children}
    </div>
  );
}

function ChannelScene({
  onOpenProfile,
  callSummary,
}: {
  onOpenProfile: (contactId: string, rect: DOMRect) => void;
  callSummary: { contactId: string; durationSec: number; endedAt: number } | null;
}) {
  return (
    <>
      <ChannelHeader
        type="Channel"
        name="softphone-ux"
        description="Design + eng working group for the Mattermost outbound calling prototype."
        memberCount={8}
        pinnedCount={1}
      />
      <div className={styles['center__messages']}>
        <MessageSeparator type="Date" label="Today" />

        {CHANNEL_POSTS.map((p) => {
          const c = CONTACT_MAP[p.contactId];
          return (
            <ProfileClickable
              key={p.id}
              contactId={c.id}
              contactName={c.name}
              onOpen={onOpenProfile}
            >
              <Post
                avatarSrc={c.avatar}
                avatarAlt={c.name}
                username={c.name}
                timestamp={p.timestamp}
              >
                <p className={styles['center__post-text']}>{p.body}</p>
              </Post>
            </ProfileClickable>
          );
        })}

        {callSummary && (
          <CallSummaryPost
            contact={CONTACT_MAP[callSummary.contactId]}
            durationSec={callSummary.durationSec}
          />
        )}
      </div>
      <div className={styles['center__composer']}>
        <MessageInput placeholder="Message softphone-ux" />
      </div>
    </>
  );
}

function CallSummaryPost({
  contact,
  durationSec,
}: {
  contact: Contact;
  durationSec: number;
}) {
  return (
    <div className={styles['call-summary']}>
      <div className={styles['call-summary__icon']}>
        <Icon glyph={<PhoneInTalkIcon />} size="20" />
      </div>
      <div className={styles['call-summary__body']}>
        <div className={styles['call-summary__title']}>
          Call with <strong>{contact.name}</strong> ended
        </div>
        <div className={styles['call-summary__meta']}>
          <span>
            <Icon glyph={<ShieldOutlineIcon />} size="12" />
            Mattermost Secure
          </span>
          <span>·</span>
          <span>Duration {formatRecentDuration(durationSec)}</span>
        </div>
      </div>
      <Button emphasis="Tertiary" size="Small">
        Call back
      </Button>
    </div>
  );
}

// ── DM scene ───────────────────────────────────────────────────────────────

function DMScene({
  onOpenProfile,
  onStartCall,
}: {
  onOpenProfile: (contactId: string, rect: DOMRect) => void;
  onStartCall: (contactId: string, phoneIndex: number) => void;
}) {
  const contact = CONTACT_MAP['aiko'];

  return (
    <>
      <div className={styles['dm-header']}>
        <button
          type="button"
          className={styles['dm-header__main']}
          onClick={(e) => onOpenProfile(contact.id, e.currentTarget.getBoundingClientRect())}
        >
          <UserAvatar
            src={contact.avatar}
            alt={contact.name}
            size="32"
            status={contact.online}
          />
          <div className={styles['dm-header__text']}>
            <div className={styles['dm-header__name']}>{contact.name}</div>
            <div className={styles['dm-header__sub']}>{contact.role}</div>
          </div>
        </button>
        <div className={styles['dm-header__actions']}>
          <Button
            emphasis="Secondary"
            size="Small"
            leadingIcon={<Icon glyph={<PhoneIcon />} size="16" />}
            onClick={() => onStartCall(contact.id, 0)}
          >
            Call {contact.name.split(' ')[0]}
          </Button>
        </div>
      </div>

      <div className={styles['center__messages']}>
        <MessageSeparator type="Date" label="Today" />

        <Post
          avatarSrc={contact.avatar}
          avatarAlt={contact.name}
          username={contact.name}
          timestamp="9:02 AM"
        >
          <p className={styles['center__post-text']}>
            Hey! Do you have a minute to walk through the outbound calling flow? Easier by voice.
          </p>
        </Post>
        <Post
          avatarSrc={avatarLeonard}
          avatarAlt="Leonard Riley"
          username="Leonard Riley"
          timestamp="9:04 AM"
        >
          <p className={styles['center__post-text']}>
            Yep — tap the Call button above or open my profile and pick a number, either works.
          </p>
        </Post>
      </div>
      <div className={styles['center__composer']}>
        <MessageInput placeholder={`Message ${contact.name}`} />
      </div>
    </>
  );
}

// ── Dialer scene ───────────────────────────────────────────────────────────

const KEYS: { key: string; sub?: string }[] = [
  { key: '1' },
  { key: '2', sub: 'ABC' },
  { key: '3', sub: 'DEF' },
  { key: '4', sub: 'GHI' },
  { key: '5', sub: 'JKL' },
  { key: '6', sub: 'MNO' },
  { key: '7', sub: 'PQRS' },
  { key: '8', sub: 'TUV' },
  { key: '9', sub: 'WXYZ' },
  { key: '*' },
  { key: '0', sub: '+' },
  { key: '#' },
];

function DialerScene({
  recents,
  onStartCall,
  onDialRaw,
}: {
  recents: Recent[];
  onStartCall: (contactId: string, phoneIndex: number) => void;
  onDialRaw: (number: string) => void;
}) {
  const [typed, setTyped] = useState('');

  const append = (k: string) => setTyped((t) => (t + k).slice(0, 18));
  const backspace = () => setTyped((t) => t.slice(0, -1));

  return (
    <>
      <div className={styles['dialer-header']}>
        <div className={styles['dialer-header__left']}>
          <span className={styles['dialer-header__icon']}>
            <Icon glyph={<KeyboardOutlineIcon />} size="20" />
          </span>
          <div>
            <div className={styles['dialer-header__title']}>Dialer</div>
            <div className={styles['dialer-header__sub']}>
              Dial any number — work numbers go through Mattermost Secure.
            </div>
          </div>
        </div>
      </div>

      <div className={styles['dialer']}>
        <div className={styles['dialer__keypad']}>
          <div className={styles['dialer__display']}>
            <span className={styles['dialer__display-number']}>
              {typed || (
                <span className={styles['dialer__display-placeholder']}>
                  Enter a number
                </span>
              )}
            </span>
            {typed && (
              <IconButton
                aria-label="Delete digit"
                size="Small"
                padding="Compact"
                icon={<Icon glyph={<BackspaceOutlineIcon />} size="20" />}
                onClick={backspace}
              />
            )}
          </div>

          <div className={styles['dialer__grid']}>
            {KEYS.map(({ key, sub }) => (
              <button
                key={key}
                className={styles['dialer__key']}
                onClick={() => append(key)}
                type="button"
              >
                <span className={styles['dialer__key-main']}>{key}</span>
                {sub && <span className={styles['dialer__key-sub']}>{sub}</span>}
              </button>
            ))}
          </div>

          <div className={styles['dialer__call-action']}>
            <button
              className={styles['dialer__call-button']}
              onClick={() => {
                if (!typed) return;
                onDialRaw(typed);
                setTyped('');
              }}
              disabled={!typed}
              aria-label="Start call"
            >
              <Icon glyph={<PhoneIcon />} size="24" />
            </button>
          </div>
        </div>

        <div className={styles['dialer__recents']}>
          <div className={styles['dialer__recents-header']}>
            <Icon glyph={<ClockOutlineIcon />} size="16" />
            <span>Recent calls</span>
          </div>
          <ul className={styles['dialer__recents-list']}>
            {recents.map((r, i) => {
              const c = CONTACT_MAP[r.contactId];
              const p = c.phones[r.phoneIndex];
              const isMissed = r.direction === 'inbound-missed';
              return (
                <li key={i}>
                  <button
                    className={styles['dialer__recent']}
                    onClick={() => onStartCall(r.contactId, r.phoneIndex)}
                  >
                    <UserAvatar src={c.avatar} alt={c.name} size="32" />
                    <div className={styles['dialer__recent-body']}>
                      <div
                        className={`${styles['dialer__recent-name']} ${
                          isMissed ? styles['dialer__recent-name--missed'] : ''
                        }`}
                      >
                        {c.name}
                      </div>
                      <div className={styles['dialer__recent-meta']}>
                        <Icon
                          glyph={
                            r.direction === 'outbound' ? (
                              <PhoneOutlineIcon />
                            ) : (
                              <PhoneHangupIcon />
                            )
                          }
                          size="12"
                        />
                        {p.number}
                        {p.secure && (
                          <span className={styles['dialer__recent-secure']}>
                            <Icon glyph={<LockIcon />} size="12" />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles['dialer__recent-right']}>
                      <div className={styles['dialer__recent-time']}>{r.timestamp}</div>
                      <div className={styles['dialer__recent-duration']}>
                        {r.durationSec !== undefined
                          ? formatRecentDuration(r.durationSec)
                          : 'Missed'}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

// ── PiP call window ────────────────────────────────────────────────────────

function CallPip({
  call,
  contact,
  phone,
  nowTick,
  onToggleMute,
  onToggleKeypad,
  keypadOpen,
  onDtmf,
  audioDevice,
  onPickDevice,
  onHangUp,
  onDismiss,
}: {
  call: ActiveCall;
  contact: Contact | null;
  phone: Phone | null;
  nowTick: number;
  onToggleMute: () => void;
  onToggleKeypad: () => void;
  keypadOpen: boolean;
  onDtmf: (k: string) => void;
  audioDevice: AudioDevice;
  onPickDevice: (id: string) => void;
  onHangUp: () => void;
  onDismiss: () => void;
}) {
  const [devicePickerOpen, setDevicePickerOpen] = useState(false);
  const deviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!devicePickerOpen) return;
    function handler(e: MouseEvent) {
      if (deviceRef.current && !deviceRef.current.contains(e.target as Node)) {
        setDevicePickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [devicePickerOpen]);

  const statusText = (() => {
    if (call.status === 'dialing') return 'Calling…';
    if (call.status === 'connected' && call.startedAt) {
      const elapsed = Math.max(0, Math.floor((nowTick - call.startedAt) / 1000));
      return formatDuration(elapsed);
    }
    if (call.status === 'ended' && call.startedAt && call.endedAt) {
      const elapsed = Math.max(0, Math.floor((call.endedAt - call.startedAt) / 1000));
      return `Call ended · ${formatDuration(elapsed)}`;
    }
    if (call.status === 'ended') return 'Call ended';
    return '';
  })();

  const DeviceIcon = AUDIO_ICON[audioDevice.kind];
  const controlsDisabled = call.status === 'ended';

  return (
    <div className={styles['pip']} role="dialog" aria-label="Active call">
      <div className={styles['pip__header']}>
        <span className={styles['pip__secure-tag']}>
          <Icon glyph={<ShieldOutlineIcon />} size="12" />
          Mattermost Secure
        </span>
        {call.status === 'ended' && (
          <IconButton
            aria-label="Dismiss call window"
            size="Small"
            padding="Compact"
            icon={<Icon glyph={<CloseIcon />} size="16" />}
            onClick={onDismiss}
          />
        )}
      </div>

      <div className={styles['pip__identity']}>
        {contact && contact.avatar ? (
          <UserAvatar src={contact.avatar} alt={contact.name} size="72" />
        ) : (
          <div className={styles['pip__unknown-avatar']} aria-hidden>
            <Icon glyph={<PhoneOutlineIcon />} size="32" />
          </div>
        )}
        <div className={styles['pip__name']}>
          {contact ? contact.name : phone?.number || 'Unknown number'}
        </div>
        <div className={styles['pip__number']}>
          {phone?.number || ''}
          {phone && (
            <span className={styles['pip__number-label']}>
              {' · '}
              {phone.label}
            </span>
          )}
        </div>
        <div
          className={`${styles['pip__status']} ${
            call.status === 'dialing' ? styles['pip__status--pulsing'] : ''
          }`}
        >
          {statusText}
        </div>
      </div>

      {keypadOpen && call.status !== 'ended' && (
        <div className={styles['pip__dtmf']}>
          <div className={styles['pip__dtmf-display']}>
            {call.dtmf || (
              <span className={styles['pip__dtmf-placeholder']}>Press a key</span>
            )}
          </div>
          <div className={styles['pip__dtmf-grid']}>
            {KEYS.map(({ key }) => (
              <button
                key={key}
                type="button"
                className={styles['pip__dtmf-key']}
                onClick={() => onDtmf(key)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles['pip__controls']}>
        <div className={styles['pip__control']}>
          <IconButton
            aria-label={call.muted ? 'Unmute microphone' : 'Mute microphone'}
            size="Large"
            rounded
            toggled={call.muted}
            destructive={call.muted}
            disabled={controlsDisabled}
            icon={
              <Icon
                glyph={call.muted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
                size="20"
              />
            }
            onClick={onToggleMute}
          />
          <span className={styles['pip__control-label']}>
            {call.muted ? 'Muted' : 'Mute'}
          </span>
        </div>

        <div className={styles['pip__control']}>
          <IconButton
            aria-label={keypadOpen ? 'Hide keypad' : 'Show keypad'}
            size="Large"
            rounded
            toggled={keypadOpen}
            disabled={controlsDisabled}
            icon={<Icon glyph={<KeyboardOutlineIcon />} size="20" />}
            onClick={onToggleKeypad}
          />
          <span className={styles['pip__control-label']}>Keypad</span>
        </div>

        <div className={styles['pip__control']} ref={deviceRef}>
          <IconButton
            aria-label="Audio device"
            size="Large"
            rounded
            toggled={devicePickerOpen}
            disabled={controlsDisabled}
            icon={<Icon glyph={<DeviceIcon size={SVG_SIZE_MAP['20']} />} size="20" />}
            onClick={() => setDevicePickerOpen((o) => !o)}
          />
          <span className={styles['pip__control-label']}>Speaker</span>
          {devicePickerOpen && (
            <ul className={styles['pip__device-menu']} role="menu">
              <li className={styles['pip__device-menu-label']}>Audio output</li>
              {AUDIO_DEVICES.map((d) => {
                const DIcon = AUDIO_ICON[d.kind];
                const selected = d.id === audioDevice.id;
                return (
                  <li key={d.id}>
                    <button
                      role="menuitem"
                      className={`${styles['pip__device-item']} ${
                        selected ? styles['pip__device-item--selected'] : ''
                      }`}
                      onClick={() => {
                        onPickDevice(d.id);
                        setDevicePickerOpen(false);
                      }}
                    >
                      <Icon glyph={<DIcon size={SVG_SIZE_MAP['16']} />} size="16" />
                      <span>{d.label}</span>
                      {selected && (
                        <span className={styles['pip__device-check']}>
                          <Icon glyph={<CheckIcon />} size="16" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={styles['pip__control']}>
          <IconButton
            aria-label={call.status === 'ended' ? 'Dismiss' : 'End call'}
            size="Large"
            rounded
            destructive={call.status !== 'ended'}
            icon={<Icon glyph={<PhoneHangupIcon />} size="20" />}
            onClick={call.status === 'ended' ? onDismiss : onHangUp}
          />
          <span className={styles['pip__control-label']}>
            {call.status === 'ended' ? 'Dismiss' : 'End'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function OutboundCalls() {
  const [scene, setScene] = useState<SceneId>('channel');
  const [call, setCall] = useState<ActiveCall | null>(null);
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [popover, setPopover] = useState<{ contactId: string; rect: DOMRect } | null>(null);
  const [recents, setRecents] = useState<Recent[]>(INITIAL_RECENTS);
  const [callSummary, setCallSummary] = useState<
    { contactId: string; durationSec: number; endedAt: number } | null
  >(null);

  const [nowTick, setNowTick] = useState(Date.now());

  useEffect(() => {
    if (!call || call.status !== 'connected') return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [call]);

  useEffect(() => {
    if (!call || call.status !== 'dialing') return;
    const id = setTimeout(() => {
      setCall((c) => (c ? { ...c, status: 'connected', startedAt: Date.now() } : c));
      setNowTick(Date.now());
    }, 2400);
    return () => clearTimeout(id);
  }, [call?.status, call?.contactId, call?.phoneIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const startCall = (contactId: string, phoneIndex: number) => {
    setCallSummary(null);
    setKeypadOpen(false);
    setPopover(null);
    setCall({
      contactId,
      phoneIndex,
      status: 'dialing',
      startedAt: null,
      endedAt: null,
      muted: false,
      deviceId: AUDIO_DEVICES[0].id,
      dtmf: '',
    });
  };

  const hangUp = () => {
    setCall((c) => {
      if (!c) return c;
      const endedAt = Date.now();
      const startedAt = c.startedAt;
      const durationSec =
        c.status === 'connected' && startedAt
          ? Math.max(0, Math.floor((endedAt - startedAt) / 1000))
          : 0;

      if (c.status === 'connected' && durationSec > 0) {
        setCallSummary({ contactId: c.contactId, durationSec, endedAt });
        setRecents((prev) => [
          {
            contactId: c.contactId,
            phoneIndex: c.phoneIndex,
            direction: 'outbound',
            timestamp: 'Just now',
            durationSec,
          },
          ...prev,
        ]);
      }

      return { ...c, status: 'ended', endedAt };
    });
  };

  const dismissCall = () => {
    setCall(null);
    setKeypadOpen(false);
  };

  const handleDtmf = (k: string) => {
    setCall((c) => (c ? { ...c, dtmf: (c.dtmf + k).slice(-16) } : c));
  };

  const openProfile = (contactId: string, rect: DOMRect) => {
    setPopover({ contactId, rect });
  };

  const activeContact = call ? CONTACT_MAP[call.contactId] ?? null : null;
  const activePhone =
    call && activeContact ? activeContact.phones[call.phoneIndex] ?? null : null;
  const activeDevice = useMemo(
    () => AUDIO_DEVICES.find((d) => d.id === call?.deviceId) ?? AUDIO_DEVICES[0],
    [call?.deviceId],
  );

  return (
    <div className={styles['calls']}>
      <div className={styles['calls__switcher-bar']}>
        <SceneSwitcher active={scene} onChange={setScene} />
      </div>

      <div className={styles['calls__shell']}>
        <div className={styles['calls__global-header']}>
          <GlobalHeader
            product="Channels"
            userAvatarSrc={avatarLeonard}
            userAvatarAlt="Leonard Riley"
          />
        </div>

        <div className={styles['calls__body']}>
          <div className={styles['calls__team-sidebar']}>
            <TeamSidebar
              activeTeamId="contributors"
              teams={[
                { id: 'contributors', name: 'Contributors', src: avatarStaffTeam },
                { id: 'design', name: 'Design', initials: 'De', unread: true },
                { id: 'acme', name: 'Acme', initials: 'Ac', mentions: 3 },
              ]}
            />
          </div>

          <div className={styles['calls__outer-panel']}>
            <div className={styles['calls__channels-sidebar']}>
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

            <div className={styles['calls__inner-panel']}>
              <div className={styles['calls__center']}>
                {scene === 'channel' && (
                  <ChannelScene onOpenProfile={openProfile} callSummary={callSummary} />
                )}
                {scene === 'dm' && (
                  <DMScene onOpenProfile={openProfile} onStartCall={startCall} />
                )}
                {scene === 'dialer' && (
                  <DialerScene
                    recents={recents}
                    onStartCall={startCall}
                    onDialRaw={(n) => {
                      const fakeId = `__raw-${n}`;
                      CONTACT_MAP[fakeId] = {
                        id: fakeId,
                        name: n,
                        role: 'Unknown number',
                        avatar: '',
                        online: false,
                        phones: [
                          { number: n, label: 'Dialed', kind: 'mobile', secure: false },
                        ],
                      };
                      startCall(fakeId, 0);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {call && (
          <CallPip
            call={call}
            contact={activeContact}
            phone={activePhone}
            nowTick={nowTick}
            audioDevice={activeDevice}
            keypadOpen={keypadOpen}
            onToggleMute={() => setCall((c) => (c ? { ...c, muted: !c.muted } : c))}
            onToggleKeypad={() => setKeypadOpen((k) => !k)}
            onDtmf={handleDtmf}
            onPickDevice={(id) => setCall((c) => (c ? { ...c, deviceId: id } : c))}
            onHangUp={hangUp}
            onDismiss={dismissCall}
          />
        )}
      </div>

      {popover && (
        <ProfilePopover
          contact={CONTACT_MAP[popover.contactId]}
          anchorRect={popover.rect}
          onClose={() => setPopover(null)}
          onCall={(idx) => startCall(popover.contactId, idx)}
        />
      )}
    </div>
  );
}
