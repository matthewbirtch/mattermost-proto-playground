import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PhoneIcon from '@mattermost/compass-icons/components/phone';
import PhoneInTalkIcon from '@mattermost/compass-icons/components/phone-in-talk';
import PhoneHangupIcon from '@mattermost/compass-icons/components/phone-hangup';
import MicrophoneIcon from '@mattermost/compass-icons/components/microphone';
import MicrophoneOffIcon from '@mattermost/compass-icons/components/microphone-off';
import VolumeHighIcon from '@mattermost/compass-icons/components/volume-high';
import HeadphonesIcon from '@mattermost/compass-icons/components/headphones';
import CellphoneIcon from '@mattermost/compass-icons/components/cellphone';
import BackspaceOutlineIcon from '@mattermost/compass-icons/components/backspace-outline';
import ShieldOutlineIcon from '@mattermost/compass-icons/components/shield-outline';
import CheckIcon from '@mattermost/compass-icons/components/check';
import ClockOutlineIcon from '@mattermost/compass-icons/components/clock-outline';
import CloseIcon from '@mattermost/compass-icons/components/close';
import DotsHorizontalIcon from '@mattermost/compass-icons/components/dots-horizontal';
import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import DialpadIcon from '@/components/icons/DialpadIcon';
import OutboundCallIcon from '@/components/icons/OutboundCallIcon';
import Icon, { SVG_SIZE_MAP } from '@/components/ui/Icon/Icon';
import IconButton from '@/components/ui/IconButton/IconButton';
import Button from '@/components/ui/Button/Button';
import MenuItem from '@/components/ui/MenuItem/MenuItem';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import MessageInput from '@/components/ui/MessageInput';
import MessageSeparator from '@/components/ui/MessageSeparator/MessageSeparator';
import Post from '@/components/ui/Post/Post';
import ProfilePopover from '@/components/ui/ProfilePopover/ProfilePopover';
import TeamSidebar from '@/components/ui/TeamSidebar/TeamSidebar';
import TextInput from '@/components/ui/TextInput/TextInput';
import { playDtmf, startRingback, stopRingback, playHangupClick } from '@/utils/phoneSounds';
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
type Phone = {
  number: string;
  label: string;
  kind: PhoneKind;
  secure: boolean;
  sipTrunk?: string;
};
type Contact = {
  id: string;
  name: string;
  handle: string;
  email: string;
  title: string;
  role?: string;
  avatar: string;
  online: boolean;
  localTime?: { time: string; timezone: string; hourDifference?: string };
  phones: Phone[];
};

const CONTACTS: Contact[] = [
  {
    id: 'aiko',
    name: 'Aiko Tan',
    handle: '@aiko',
    email: 'aiko.tan@mattermost.com',
    title: 'Product Designer',
    avatar: avatarAikoTan,
    online: true,
    localTime: { time: '11:42 PM', timezone: 'JST', hourDifference: '13 hrs ahead' },
    phones: [
      { number: '+1 (415) 555-0142', label: 'Work', kind: 'work', secure: true, sipTrunk: 'DISN Gateway • LB-4' },
      { number: '+81 3 5555 0188', label: 'Mobile', kind: 'mobile', secure: false, sipTrunk: 'Twilio • APAC-1' },
    ],
  },
  {
    id: 'leonard',
    name: 'Leonard Riley',
    handle: '@leonard',
    email: 'leonard.riley@mattermost.com',
    title: 'Engineering Manager',
    role: 'System Admin',
    avatar: avatarLeonard,
    online: true,
    localTime: { time: '10:42 AM', timezone: 'EST' },
    phones: [{ number: '+1 (212) 555-0199', label: 'Work', kind: 'work', secure: true, sipTrunk: 'DISN Gateway • LB-4' }],
  },
  {
    id: 'danielle',
    name: 'Danielle Okoro',
    handle: '@danielle',
    email: 'danielle.okoro@mattermost.com',
    title: 'Solutions Architect',
    avatar: avatarDanielle,
    online: false,
    localTime: { time: '3:42 PM', timezone: 'WAT', hourDifference: '5 hrs ahead' },
    phones: [
      { number: '+234 1 555 0116', label: 'Work', kind: 'work', secure: true, sipTrunk: 'DISN Gateway • LB-2' },
      { number: '+234 803 555 8890', label: 'Mobile', kind: 'mobile', secure: false, sipTrunk: 'Twilio • EMEA-2' },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun Patel',
    handle: '@arjun',
    email: 'arjun.patel@mattermost.com',
    title: 'Customer Success',
    avatar: avatarArjunPatel,
    online: true,
    localTime: { time: '2:42 PM', timezone: 'GMT', hourDifference: '4 hrs ahead' },
    phones: [{ number: '+44 20 7946 0814', label: 'Work', kind: 'work', secure: true, sipTrunk: 'DISN Gateway • LB-1' }],
  },
  {
    id: 'ethan',
    name: 'Ethan Brooks',
    handle: '@ethan',
    email: 'ethan.brooks@mattermost.com',
    title: 'IT Operations',
    avatar: avatarEthanBrooks,
    online: false,
    localTime: { time: '9:42 AM', timezone: 'CST', hourDifference: '1 hr behind' },
    phones: [{ number: '+1 (512) 555-0163', label: 'Work', kind: 'work', secure: true, sipTrunk: 'DISN Gateway • LB-3' }],
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

type CallStatus = 'idle' | 'composing' | 'dialing' | 'connected' | 'ended';

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

type SceneId = 'channel' | 'dm' | 'dialer' | 'rhs';

const SCENES: { id: SceneId; label: string }[] = [
  { id: 'channel', label: 'Channel' },
  { id: 'dm', label: 'Direct message' },
  { id: 'dialer', label: 'Dialer' },
  { id: 'rhs', label: 'Right sidebar' },
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

// ── Call dropdown menu (prototype-only) ────────────────────────────────────

function useOutsideClose(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close, ref]);
}

type StartCallAction =
  | { id: 'audio'; type: 'audio' }
  | { id: 'dialpad'; type: 'dialpad' }
  | {
      id: string;
      type: 'phone';
      label: string;
      number: string;
      secure: boolean;
      contactId: string;
      phoneIndex: number;
    };

function StartCallMenu({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  return (
    <ul
      className={styles['start-call-menu']}
      role="menu"
      aria-label="Start call options"
    >
      {actions.map((action) => {
        let label: string;
        let secondaryLabel: string | undefined;
        let icon: React.ReactNode;
        if (action.type === 'audio') {
          label = 'Start an audio call';
          icon = <Icon glyph={<PhoneIcon />} size="16" />;
        } else if (action.type === 'phone') {
          label = `Call ${action.label}`;
          secondaryLabel = action.number;
          icon = <Icon glyph={<OutboundCallIcon />} size="16" />;
        } else {
          label = 'Use dial pad';
          icon = <Icon glyph={<DialpadIcon />} size="16" />;
        }
        return (
          <li key={action.id} className={styles['start-call-menu__item']}>
            <MenuItem
              role="menuitem"
              label={label}
              secondaryLabel={secondaryLabel}
              leadingVisual={icon}
              onClick={() => onSelect(action)}
            />
          </li>
        );
      })}
    </ul>
  );
}

function SegmentedCallButton({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useOutsideClose(wrapRef, open, () => setOpen(false));

  const toggle = () => setOpen((o) => !o);
  const pick = (action: StartCallAction) => {
    setOpen(false);
    onSelect(action);
  };

  return (
    <div className={styles['seg-call']} ref={wrapRef}>
      <button
        type="button"
        className={styles['seg-call__primary']}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<PhoneIcon />} size="12" />
        <span>Start call</span>
      </button>
      <span className={styles['seg-call__divider']} aria-hidden />
      <button
        type="button"
        className={styles['seg-call__trigger']}
        onClick={toggle}
        aria-label="Choose call option"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<ChevronDownIcon />} size="12" />
      </button>
      {open && <StartCallMenu actions={actions} onSelect={pick} />}
    </div>
  );
}

function PopoverCallButton({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useOutsideClose(wrapRef, open, () => setOpen(false));

  const pick = (action: StartCallAction) => {
    setOpen(false);
    onSelect(action);
  };

  return (
    <div className={styles['pop-call']} ref={wrapRef}>
      <button
        type="button"
        className={styles['pop-call__btn']}
        onClick={() => setOpen((o) => !o)}
        aria-label="Call"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<PhoneIcon />} size="16" />
        <Icon glyph={<ChevronDownIcon />} size="12" />
      </button>
      {open && <StartCallMenu actions={actions} onSelect={pick} />}
    </div>
  );
}

// ── Profile popover ────────────────────────────────────────────────────────

const POPOVER_WIDTH = 272;
const POPOVER_GAP = 8;

function PositionedProfilePopover({
  contact,
  anchorRect,
  onClose,
  onStartCall,
  onOpenDialer,
}: {
  contact: Contact;
  anchorRect: DOMRect;
  onClose: () => void;
  onStartCall: (contactId: string, phoneIndex: number) => void;
  onOpenDialer: () => void;
}) {
  const workIndex = contact.phones.findIndex((p) => p.kind === 'work');
  const workPhone = workIndex >= 0 ? contact.phones[workIndex] : null;

  const actions: StartCallAction[] = [
    { id: 'audio', type: 'audio' },
    ...(workPhone
      ? [
          {
            id: `${contact.id}:${workIndex}`,
            type: 'phone' as const,
            label: workPhone.label,
            number: workPhone.number,
            secure: workPhone.secure,
            contactId: contact.id,
            phoneIndex: workIndex,
          },
        ]
      : []),
    { id: 'dialpad', type: 'dialpad' },
  ];

  const handleSelect = (action: StartCallAction) => {
    if (action.type === 'dialpad') {
      onOpenDialer();
    } else if (action.type === 'phone') {
      onStartCall(action.contactId, action.phoneIndex);
    } else {
      onStartCall(contact.id, workIndex >= 0 ? workIndex : 0);
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>(anchorRect.bottom + POPOVER_GAP);
  const [measured, setMeasured] = useState(false);
  const [closing, setClosing] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const h = ref.current.offsetHeight;
    const spaceBelow = window.innerHeight - anchorRect.bottom - POPOVER_GAP - 16;
    const spaceAbove = anchorRect.top - POPOVER_GAP - 16;
    const placeAbove = h > spaceBelow && spaceAbove >= h;
    setTop(
      placeAbove ? anchorRect.top - h - POPOVER_GAP : anchorRect.bottom + POPOVER_GAP,
    );
    setMeasured(true);
  }, [anchorRect]);

  const beginClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) beginClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [beginClose]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (closing && e.target === e.currentTarget) onClose();
  };

  const maxLeft = window.innerWidth - POPOVER_WIDTH - 16;
  const left = Math.min(Math.max(8, anchorRect.left), Math.max(8, maxLeft));

  return (
    <div
      ref={ref}
      className={styles['popover-anchor']}
      style={{ top, left, visibility: measured ? 'visible' : 'hidden' }}
    >
      <ProfilePopover
        avatarSrc={contact.avatar}
        avatarAlt={contact.name}
        name={contact.name}
        username={contact.handle}
        title={contact.title}
        email={contact.email}
        phone={
          contact.phones[0]
            ? {
                number: contact.phones[0].number,
                sub: contact.phones[0].sipTrunk,
                onClick: () => onStartCall(contact.id, 0),
              }
            : undefined
        }
        role={contact.role}
        localTime={contact.localTime}
        lastOnline={contact.online ? undefined : 'Last online 2 hrs ago'}
        onClose={beginClose}
        phoneIcon={<OutboundCallIcon />}
        callButton={
          <PopoverCallButton actions={actions} onSelect={handleSelect} />
        }
        state={closing ? 'closing' : 'open'}
        onAnimationEnd={handleAnimationEnd}
      />
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
  onOpenDialer,
  callSummary,
}: {
  onOpenProfile: (contactId: string, rect: DOMRect) => void;
  onOpenDialer: () => void;
  callSummary: { contactId: string; durationSec: number; endedAt: number } | null;
}) {
  const actions: StartCallAction[] = [
    { id: 'audio', type: 'audio' },
    { id: 'dialpad', type: 'dialpad' },
  ];
  const handleSelect = (action: StartCallAction) => {
    if (action.type === 'dialpad') onOpenDialer();
    // 'audio' is a stub for a Mattermost Calls group call — no-op in prototype.
  };
  return (
    <>
      <ChannelHeader
        type="Channel"
        name="softphone-ux"
        description="Design + eng working group for the Mattermost outbound calling prototype."
        memberCount={8}
        pinnedCount={1}
        callButton={
          <SegmentedCallButton actions={actions} onSelect={handleSelect} />
        }
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
  onOpenDialer,
}: {
  onOpenProfile: (contactId: string, rect: DOMRect) => void;
  onStartCall: (contactId: string, phoneIndex: number) => void;
  onOpenDialer: () => void;
}) {
  const contact = CONTACT_MAP['aiko'];
  const workIndex = contact.phones.findIndex((p) => p.kind === 'work');
  const workPhone = workIndex >= 0 ? contact.phones[workIndex] : null;

  const actions: StartCallAction[] = [
    { id: 'audio', type: 'audio' },
    ...(workPhone
      ? [
          {
            id: `${contact.id}:${workIndex}`,
            type: 'phone' as const,
            label: workPhone.label,
            number: workPhone.number,
            secure: workPhone.secure,
            contactId: contact.id,
            phoneIndex: workIndex,
          },
        ]
      : []),
    { id: 'dialpad', type: 'dialpad' },
  ];

  const handleSelect = (action: StartCallAction) => {
    if (action.type === 'dialpad') {
      onOpenDialer();
    } else if (action.type === 'phone') {
      onStartCall(action.contactId, action.phoneIndex);
    } else if (action.type === 'audio') {
      // Simulated Mattermost Calls WebRTC audio call — prototype reuses the work phone.
      onStartCall(contact.id, workIndex >= 0 ? workIndex : 0);
    }
  };

  return (
    <>
      <ChannelHeader
        type="DM"
        name={contact.name}
        description={contact.title}
        avatarSrc={contact.avatar}
        avatarStatus={contact.online}
        onNameClick={(e) =>
          onOpenProfile(contact.id, e.currentTarget.getBoundingClientRect())
        }
        callButton={
          <SegmentedCallButton actions={actions} onSelect={handleSelect} />
        }
      />

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

const sanitizeDigits = (s: string) => s.replace(/[^0-9*#+ ()-]/g, '').slice(0, 18);

function KeypadInput({
  value,
  placeholder,
  onChange,
  onEnter,
  trailing,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <TextInput
      className={styles['keypad__input']}
      size="Small"
      value={value}
      onChange={(e) => onChange(sanitizeDigits(e.target.value))}
      onKeyDown={(e) => {
        if (onEnter && e.key === 'Enter') {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      inputMode="tel"
      autoComplete="off"
      aria-label="Phone number"
      trailingIcon={trailing}
    />
  );
}

function KeypadGrid({ onPress }: { onPress: (k: string) => void }) {
  return (
    <div className={styles['keypad__grid']}>
      {KEYS.map(({ key, sub }) => (
        <button
          key={key}
          type="button"
          className={styles['keypad__key']}
          onClick={() => onPress(key)}
        >
          <span className={styles['keypad__key-main']}>{key}</span>
          {sub && <span className={styles['keypad__key-sub']}>{sub}</span>}
        </button>
      ))}
    </div>
  );
}

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

  const append = (k: string) => setTyped((t) => sanitizeDigits(t + k));
  const backspace = () => setTyped((t) => t.slice(0, -1));
  const dial = () => {
    if (!typed) return;
    onDialRaw(typed);
    setTyped('');
  };

  return (
    <>
      <div className={styles['dialer-header']}>
        <span className={styles['dialer-header__icon']}>
          <Icon glyph={<DialpadIcon />} size="16" />
        </span>
        <span className={styles['dialer-header__title']}>Dial Pad</span>
        <span className={styles['dialer-header__description']}>
          Dial any number — work numbers go through Mattermost Secure.
        </span>
      </div>

      <div className={styles['dialer']}>
        <div className={styles['dialer__keypad']}>
          <TextInput
            className={styles['dialer__phone-field']}
            size="Large"
            value={typed}
            onChange={(e) => setTyped(sanitizeDigits(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                dial();
              }
            }}
            placeholder="Enter a number"
            inputMode="tel"
            autoComplete="off"
            aria-label="Phone number"
            trailingIcon={
              <IconButton
                aria-label="Delete digit"
                size="Small"
                padding="Compact"
                disabled={!typed}
                icon={<Icon glyph={<BackspaceOutlineIcon />} size="16" />}
                onClick={backspace}
              />
            }
          />
          <KeypadGrid onPress={append} />

          <div className={styles['dialer__call-action']}>
            <button
              className={styles['dialer__call-button']}
              onClick={dial}
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
                    {c.avatar ? (
                      <UserAvatar src={c.avatar} alt={c.name} size="32" />
                    ) : (
                      <div
                        className={styles['dialer__recent-avatar-fallback']}
                        aria-hidden
                      >
                        <Icon glyph={<PhoneIcon />} size="16" />
                      </div>
                    )}
                    <div className={styles['dialer__recent-body']}>
                      <div
                        className={`${styles['dialer__recent-name']} ${
                          isMissed ? styles['dialer__recent-name--missed'] : ''
                        }`}
                      >
                        {c.name}
                      </div>
                      <div className={styles['dialer__recent-meta']}>
                        {p.number}
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

// ── Right-hand sidebar dialer ──────────────────────────────────────────────

function RhsDialer({
  recents,
  onClose,
  onStartCall,
  onDialRaw,
}: {
  recents: Recent[];
  onClose: () => void;
  onStartCall: (contactId: string, phoneIndex: number) => void;
  onDialRaw: (number: string) => void;
}) {
  const [typed, setTyped] = useState('');

  const append = (k: string) => {
    playDtmf(k);
    setTyped((t) => sanitizeDigits(t + k));
  };
  const backspace = () => setTyped((t) => t.slice(0, -1));
  const dial = () => {
    if (!typed) return;
    onDialRaw(typed);
    setTyped('');
  };

  return (
    <aside className={styles['rhs']} aria-label="Dial pad">
      <div className={styles['rhs__header']}>
        <span className={styles['rhs__header-icon']} aria-hidden>
          <Icon glyph={<DialpadIcon />} size="16" />
        </span>
        <span className={styles['rhs__header-title']}>Dial Pad</span>
        <IconButton
          aria-label="Close dial pad"
          size="Small"
          padding="Compact"
          icon={<Icon glyph={<CloseIcon />} size="16" />}
          onClick={onClose}
        />
      </div>

      <div className={styles['rhs__body']}>
        <div className={styles['rhs__dialpad']}>
          <TextInput
            className={styles['rhs__phone-field']}
            size="Large"
            value={typed}
            onChange={(e) => setTyped(sanitizeDigits(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                dial();
              }
            }}
            placeholder="Enter a number"
            inputMode="tel"
            autoComplete="off"
            aria-label="Phone number"
            trailingIcon={
              <IconButton
                aria-label="Delete digit"
                size="Small"
                padding="Compact"
                disabled={!typed}
                icon={<Icon glyph={<BackspaceOutlineIcon />} size="16" />}
                onClick={backspace}
              />
            }
          />
          <KeypadGrid onPress={append} />
          <button
            className={styles['rhs__call-button']}
            onClick={dial}
            disabled={!typed}
            aria-label="Start call"
          >
            <Icon glyph={<PhoneIcon />} size="20" />
          </button>
        </div>

        <div className={styles['rhs__recents']}>
          <div className={styles['rhs__recents-header']}>
            <Icon glyph={<ClockOutlineIcon />} size="12" />
            <span>Recent calls</span>
          </div>
          <ul className={styles['rhs__recents-list']}>
            {recents.map((r, i) => {
              const c = CONTACT_MAP[r.contactId];
              const p = c.phones[r.phoneIndex];
              const isMissed = r.direction === 'inbound-missed';
              return (
                <li key={i}>
                  <button
                    className={styles['rhs__recent']}
                    onClick={() => onStartCall(r.contactId, r.phoneIndex)}
                  >
                    {c.avatar ? (
                      <UserAvatar src={c.avatar} alt={c.name} size="32" />
                    ) : (
                      <div
                        className={styles['rhs__recent-avatar-fallback']}
                        aria-hidden
                      >
                        <Icon glyph={<PhoneIcon />} size="16" />
                      </div>
                    )}
                    <div className={styles['rhs__recent-body']}>
                      <div
                        className={`${styles['rhs__recent-name']} ${
                          isMissed ? styles['rhs__recent-name--missed'] : ''
                        }`}
                      >
                        {c.name}
                      </div>
                      <div className={styles['rhs__recent-meta']}>
                        {p.number}
                      </div>
                    </div>
                    <div className={styles['rhs__recent-right']}>
                      <div className={styles['rhs__recent-time']}>{r.timestamp}</div>
                      <div className={styles['rhs__recent-duration']}>
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
    </aside>
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
  onDtmfChange,
  onDtmfBackspace,
  onStartComposingCall,
  audioDevice,
  onPickDevice,
  onHangUp,
  onDismiss,
  exiting,
}: {
  call: ActiveCall;
  contact: Contact | null;
  phone: Phone | null;
  nowTick: number;
  onToggleMute: () => void;
  onToggleKeypad: () => void;
  keypadOpen: boolean;
  onDtmf: (k: string) => void;
  onDtmfChange: (v: string) => void;
  onDtmfBackspace: () => void;
  onStartComposingCall: () => void;
  audioDevice: AudioDevice;
  onPickDevice: (id: string) => void;
  onHangUp: () => void;
  onDismiss: () => void;
  exiting: boolean;
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

  const isComposing = call.status === 'composing';
  const displayName = contact ? contact.name : phone?.number || 'Unknown';

  const title = (() => {
    if (isComposing) return 'Start new call';
    if (call.status === 'dialing') return `Calling ${displayName}…`;
    if (call.status === 'ended') return 'Call ended';
    return displayName;
  })();

  const subDuration = (() => {
    if (call.status === 'connected' && call.startedAt) {
      return formatDuration(Math.max(0, Math.floor((nowTick - call.startedAt) / 1000)));
    }
    if (call.status === 'ended' && call.startedAt && call.endedAt) {
      return formatDuration(Math.max(0, Math.floor((call.endedAt - call.startedAt) / 1000)));
    }
    return null;
  })();

  const subContent = isComposing ? 'Enter a number' : subDuration ?? phone?.number ?? '';

  const DeviceIcon = AUDIO_ICON[audioDevice.kind];
  const controlsDisabled = call.status === 'ended';
  const showDtmf = (keypadOpen || isComposing) && call.status !== 'ended';

  return (
    <div
      className={`${styles['pip']}${exiting ? ` ${styles['pip--exiting']}` : ''}`}
      role="dialog"
      aria-label={isComposing ? 'Start a new call' : 'Active call'}
    >
      <div className={styles['pip__widget']}>
        <div className={styles['pip__header']}>
          {contact && contact.avatar ? (
            <UserAvatar src={contact.avatar} alt={contact.name} size="32" />
          ) : (
            <div className={styles['pip__unknown-avatar']} aria-hidden>
              <Icon glyph={<PhoneIcon />} size="16" />
            </div>
          )}
          <div className={styles['pip__header-text']}>
            <div
              className={`${styles['pip__title']} ${
                call.status === 'dialing' ? styles['pip__title--pulsing'] : ''
              }`}
            >
              {title}
            </div>
            <div className={styles['pip__sub']}>
              <span>{subContent}</span>
              {!isComposing && phone?.sipTrunk && (
                <>
                  <span className={styles['pip__sub-sep']} aria-hidden>·</span>
                  <span className={styles['pip__trunk']}>{phone.sipTrunk}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles['pip__controls']}>
          <IconButton
            aria-label={keypadOpen ? 'Hide keypad' : 'Show keypad'}
            size="Small"
            padding="Compact"
            active={keypadOpen || isComposing}
            disabled={controlsDisabled || isComposing}
            icon={<Icon glyph={<DialpadIcon />} size="16" />}
            onClick={onToggleKeypad}
          />
          <div className={styles['pip__controls-right']}>
            {isComposing ? (
              <>
                <button
                  type="button"
                  aria-label="Start call"
                  className={styles['pip__call']}
                  disabled={!call.dtmf}
                  onClick={onStartComposingCall}
                >
                  <Icon glyph={<PhoneIcon />} size="16" />
                </button>
                <button
                  type="button"
                  aria-label="Cancel"
                  className={styles['pip__hangup']}
                  onClick={onDismiss}
                >
                  <Icon glyph={<CloseIcon />} size="16" />
                </button>
              </>
            ) : (
              <>
                <IconButton
                  aria-label={call.muted ? 'Unmute microphone' : 'Mute microphone'}
                  size="Small"
                  padding="Compact"
                  toggled={call.muted}
                  destructive={call.muted}
                  disabled={controlsDisabled}
                  icon={
                    <Icon
                      glyph={call.muted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
                      size="16"
                    />
                  }
                  onClick={onToggleMute}
                />
                <div className={styles['pip__more-wrap']} ref={deviceRef}>
                  <IconButton
                    aria-label="More options"
                    size="Small"
                    padding="Compact"
                    toggled={devicePickerOpen}
                    disabled={controlsDisabled}
                    icon={<Icon glyph={<DotsHorizontalIcon />} size="16" />}
                    onClick={() => setDevicePickerOpen((o) => !o)}
                  />
                  {devicePickerOpen && (
                    <ul className={styles['pip__device-menu']} role="menu">
                      <li className={styles['pip__device-menu-label']}>
                        <Icon glyph={<DeviceIcon size={SVG_SIZE_MAP['12']} />} size="12" />
                        <span>Audio output</span>
                      </li>
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
                <button
                  type="button"
                  aria-label={call.status === 'ended' ? 'Dismiss' : 'End call'}
                  className={styles['pip__hangup']}
                  onClick={call.status === 'ended' ? onDismiss : onHangUp}
                >
                  <Icon glyph={<PhoneHangupIcon />} size="16" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showDtmf && (
        <div className={styles['pip__dtmf']}>
          <div className={styles['pip__dtmf-header']}>
            <span className={styles['pip__dtmf-title']}>Dial pad</span>
            {!isComposing && (
              <IconButton
                aria-label="Close dial pad"
                size="Small"
                padding="Compact"
                icon={<Icon glyph={<CloseIcon />} size="16" />}
                onClick={onToggleKeypad}
              />
            )}
          </div>
          <div className={styles['pip__dtmf-body']}>
            <KeypadInput
              value={call.dtmf}
              placeholder="Enter number"
              onChange={onDtmfChange}
              onEnter={isComposing ? onStartComposingCall : undefined}
              trailing={
                isComposing ? (
                  <IconButton
                    aria-label="Delete digit"
                    size="X-Small"
                    padding="Compact"
                    disabled={!call.dtmf}
                    icon={<Icon glyph={<BackspaceOutlineIcon />} size="16" />}
                    onClick={onDtmfBackspace}
                  />
                ) : undefined
              }
            />
            <KeypadGrid onPress={onDtmf} />
          </div>
        </div>
      )}
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
  const [callExiting, setCallExiting] = useState(false);
  const [rhsOpen, setRhsOpen] = useState(false);

  const [nowTick, setNowTick] = useState(Date.now());

  useEffect(() => {
    setRhsOpen(scene === 'rhs');
  }, [scene]);

  useEffect(() => {
    if (!call || call.status !== 'connected') return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [call]);

  useEffect(() => {
    if (!call || call.status !== 'dialing') return;
    startRingback();
    const id = setTimeout(() => {
      setCall((c) => (c ? { ...c, status: 'connected', startedAt: Date.now() } : c));
      setNowTick(Date.now());
    }, 2400);
    return () => {
      clearTimeout(id);
      stopRingback();
    };
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

  const ensureRawContact = (n: string) => {
    const fakeId = `__raw-${n}`;
    CONTACT_MAP[fakeId] = {
      id: fakeId,
      name: n,
      handle: '',
      email: '',
      title: '',
      role: 'Unknown number',
      avatar: '',
      online: false,
      phones: [{ number: n, label: 'Dialed', kind: 'mobile', secure: false }],
    };
    return fakeId;
  };

  const openDialpadWidget = () => {
    setCallSummary(null);
    setPopover(null);
    setKeypadOpen(true);
    setCall({
      contactId: '',
      phoneIndex: 0,
      status: 'composing',
      startedAt: null,
      endedAt: null,
      muted: false,
      deviceId: AUDIO_DEVICES[0].id,
      dtmf: '',
    });
  };

  const startComposingCall = () => {
    setCall((c) => {
      if (!c || c.status !== 'composing' || !c.dtmf) return c;
      const fakeId = ensureRawContact(c.dtmf);
      return {
        ...c,
        contactId: fakeId,
        phoneIndex: 0,
        status: 'dialing',
        dtmf: '',
      };
    });
    setKeypadOpen(false);
  };

  const dtmfBackspace = () => {
    setCall((c) => (c ? { ...c, dtmf: c.dtmf.slice(0, -1) } : c));
  };

  const hangUp = () => {
    stopRingback();
    playHangupClick();
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

    window.setTimeout(() => {
      setCallExiting(true);
      window.setTimeout(() => {
        setCall(null);
        setKeypadOpen(false);
        setCallExiting(false);
      }, 150);
    }, 100);
  };

  const dismissCall = () => {
    setCall(null);
    setKeypadOpen(false);
    setCallExiting(false);
  };

  const handleDtmf = (k: string) => {
    playDtmf(k);
    setCall((c) => (c ? { ...c, dtmf: sanitizeDigits(c.dtmf + k) } : c));
  };

  const handleDtmfChange = (v: string) => {
    setCall((c) => (c ? { ...c, dtmf: v } : c));
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
          {scene === 'rhs' && (
            <button
              type="button"
              className={`${styles['calls__rhs-trigger']} ${
                rhsOpen ? styles['calls__rhs-trigger--active'] : ''
              }`}
              onClick={() => setRhsOpen((o) => !o)}
              aria-label="Open dial pad"
              aria-pressed={rhsOpen}
            >
              <Icon glyph={<DialpadIcon />} size="16" />
            </button>
          )}
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
                showDialPad
                activeChannelName={
                  scene === 'channel'
                    ? 'softphone-ux'
                    : scene === 'dm'
                    ? 'Aiko Tan'
                    : scene === 'dialer'
                    ? 'Dial Pad'
                    : scene === 'rhs'
                    ? 'softphone-ux'
                    : ''
                }
                avatarAikoTan={avatarAikoTan}
                avatarArjunPatel={avatarArjunPatel}
                avatarDanielOkoro={avatarDanielle}
                avatarDariusCole={avatarDariusCole}
                avatarDavidLiang={avatarDavidLiang}
                avatarEmmaNovak={avatarEmmaNovak}
                avatarEthanBrooks={avatarEthanBrooks}
                onItemClick={(name) => {
                  if (name === 'softphone-ux') setScene('channel');
                  else if (name === 'Aiko Tan') setScene('dm');
                  else if (name === 'Dial Pad') setScene('dialer');
                }}
              />
            </div>

            <div className={styles['calls__inner-panel']}>
              <div className={styles['calls__center']}>
                {scene === 'channel' && (
                  <ChannelScene
                    onOpenProfile={openProfile}
                    onOpenDialer={openDialpadWidget}
                    callSummary={callSummary}
                  />
                )}
                {scene === 'dm' && (
                  <DMScene
                    onOpenProfile={openProfile}
                    onStartCall={startCall}
                    onOpenDialer={openDialpadWidget}
                  />
                )}
                {scene === 'dialer' && (
                  <DialerScene
                    recents={recents}
                    onStartCall={startCall}
                    onDialRaw={(n) => {
                      const fakeId = ensureRawContact(n);
                      startCall(fakeId, 0);
                    }}
                  />
                )}
                {scene === 'rhs' && (
                  <ChannelScene
                    onOpenProfile={openProfile}
                    onOpenDialer={openDialpadWidget}
                    callSummary={callSummary}
                  />
                )}
              </div>
              {scene === 'rhs' && rhsOpen && (
                <RhsDialer
                  recents={recents}
                  onClose={() => setRhsOpen(false)}
                  onStartCall={startCall}
                  onDialRaw={(n) => {
                    const fakeId = ensureRawContact(n);
                    startCall(fakeId, 0);
                  }}
                />
              )}
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
            onDtmfChange={handleDtmfChange}
            onDtmfBackspace={dtmfBackspace}
            onStartComposingCall={startComposingCall}
            onPickDevice={(id) => setCall((c) => (c ? { ...c, deviceId: id } : c))}
            onHangUp={hangUp}
            onDismiss={dismissCall}
            exiting={callExiting}
          />
        )}
      </div>

      {popover && (
        <PositionedProfilePopover
          contact={CONTACT_MAP[popover.contactId]}
          anchorRect={popover.rect}
          onClose={() => setPopover(null)}
          onStartCall={startCall}
          onOpenDialer={openDialpadWidget}
        />
      )}
    </div>
  );
}
