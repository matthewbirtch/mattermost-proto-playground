import { useState } from 'react';
import InformationOutlineIcon from '@mattermost/compass-icons/components/information-outline';
import ArrowCollapseIcon from '@mattermost/compass-icons/components/arrow-collapse';
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
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar';
import Button from '@/components/ui/Button/Button';
import CallParticipantAvatar from '@/components/ui/CallParticipantAvatar/CallParticipantAvatar';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import Icon from '@/components/ui/Icon/Icon';
import IconButton from '@/components/ui/IconButton/IconButton';
import MessageInput from '@/components/ui/MessageInput';
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
import CallInfoPanel from './CallInfoPanel';
import styles from './ExternalCallParticipants.module.scss';

const INTERNAL_LINK =
  'https://community.mattermost.com/team/channels/asdfasf?join=true';
const EXTERNAL_LINK =
  'https://community.mattermost.com/plugins/com.mattermost.calls/guest?token={secret}';
const DIAL_IN_NUMBER = '+1 669 444 9171 (US)';
const DIAL_IN_PIN = '938 394 234';

type Participant = {
  id: string;
  name: string;
  avatarSrc: string;
  host?: boolean;
  talking?: boolean;
  muted?: boolean;
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

export default function ExternalCallParticipants() {
  const [externalEnabled, setExternalEnabled] = useState(false);
  const [popoutOpen, setPopoutOpen] = useState(false);
  const [callInfoOpen, setCallInfoOpen] = useState(false);
  const [widgetOverlay, setWidgetOverlay] = useState<'menu' | 'info' | null>(null);
  const [muted, setMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [sharing, setSharing] = useState(false);

  return (
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
            participantCount={PARTICIPANTS.length}
            talkerName="Leonard R."
            talkerAvatarSrc={avatarLeonard}
            channelName="UX Design"
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            handRaised={handRaised}
            onToggleHand={() => setHandRaised((h) => !h)}
            sharing={sharing}
            onToggleShare={() => setSharing((s) => !s)}
            onExpand={() => setPopoutOpen(true)}
            onLeave={() => setPopoutOpen(false)}
            overlay={widgetOverlay}
            onToggleMenu={() =>
              setWidgetOverlay((v) => (v == null ? 'menu' : null))
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
          participants={PARTICIPANTS}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onCollapse={() => {
            setPopoutOpen(false);
            setCallInfoOpen(false);
          }}
          onLeave={() => setPopoutOpen(false)}
          infoOpen={callInfoOpen}
          onInfoToggle={() => setCallInfoOpen((v) => !v)}
          externalEnabled={externalEnabled}
          onExternalEnabledChange={setExternalEnabled}
        />
      )}
    </div>
  );
}

// ─── Call Popout Window ─────────────────────────────────────────────────────

interface CallPopoutProps {
  participants: Participant[];
  muted: boolean;
  onToggleMute: () => void;
  onCollapse: () => void;
  onLeave: () => void;
  infoOpen: boolean;
  onInfoToggle: () => void;
  externalEnabled: boolean;
  onExternalEnabledChange: (v: boolean) => void;
}

function CallPopout({
  participants,
  muted,
  onToggleMute,
  onCollapse,
  onLeave,
  infoOpen,
  onInfoToggle,
  externalEnabled,
  onExternalEnabledChange,
}: CallPopoutProps) {
  return (
    <div
      className={styles.popout}
      role="dialog"
      aria-modal="false"
      aria-label="Call - UX Design"
    >
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
              toggled={infoOpen}
              aria-label={infoOpen ? 'Close call info' : 'Open call info'}
              icon={<Icon size="16" glyph={<InformationOutlineIcon />} />}
              onClick={onInfoToggle}
            />
            <IconButton
              size="Small"
              style="Inverted"
              aria-label="Collapse call"
              icon={<Icon size="16" glyph={<ArrowCollapseIcon />} />}
              onClick={onCollapse}
            />
          </div>

          {infoOpen && (
            <div className={styles['popout__info-popover']}>
              <CallInfoPanel
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

        <div className={styles['popout__room']}>
          <div className={styles['popout__grid']}>
            {participants.map((p) => (
              <CallParticipantAvatar
                key={p.id}
                src={p.avatarSrc}
                alt={p.name}
                name={p.name}
                size="Medium"
                host={p.host}
                talking={p.talking}
              />
            ))}
          </div>
        </div>

        <div className={styles['popout__controls']}>
          <div className={styles['popout__controls-left']}>
            <Button
              size="Medium"
              appearance="Inverted"
              emphasis="Tertiary"
              leadingIcon={
                <Icon size="20" glyph={<AccountMultipleOutlineIcon />} />
              }
              aria-label={`Participants (${participants.length})`}
            >
              {participants.length}
            </Button>
          </div>

          <div className={styles['popout__controls-middle']}>
            <IconButton
              size="Medium"
              style="Inverted"
              toggled={muted}
              aria-label={muted ? 'Unmute' : 'Mute'}
              icon={<Icon size="20" glyph={<MicrophoneOffIcon />} />}
              onClick={onToggleMute}
            />
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="Share screen"
              icon={<Icon size="20" glyph={<MonitorOffIcon />} />}
            />
            <IconButton
              size="Medium"
              style="Inverted"
              aria-label="Record"
              icon={<Icon size="20" glyph={<RecordCircleOutlineIcon />} />}
            />
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

// ─── Docked Call Widget (widget version of Call Info) ───────────────────────

interface CallWidgetProps {
  participantCount: number;
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
  overlay: 'menu' | 'info' | null;
  onToggleMenu: () => void;
  onOpenCallInfo: () => void;
  onCloseCallInfo: () => void;
  externalEnabled: boolean;
  onExternalEnabledChange: (v: boolean) => void;
}

function CallWidget({
  participantCount,
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
  onOpenCallInfo,
  onCloseCallInfo,
  externalEnabled,
  onExternalEnabledChange,
}: CallWidgetProps) {
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
            className={styles['widget__participants']}
            aria-label={`${participantCount} participants`}
          >
            <Icon size="16" glyph={<AccountMultipleOutlineIcon />} />
            <span>{participantCount}</span>
          </button>

          <div className={styles['widget__actions']}>
            <IconButton
              size="Small"
              padding="Compact"
              toggled={muted}
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
              toggled={handRaised}
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
              toggled={sharing}
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
              toggled={overlay === 'menu'}
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

      {overlay === 'menu' && (
        <div className={styles['widget__popover']}>
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

      {overlay === 'info' && (
        <div className={styles['widget__popover']}>
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
    </div>
  );
}
