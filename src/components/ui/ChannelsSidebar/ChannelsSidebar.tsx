import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import PlusIcon from '@mattermost/compass-icons/components/plus';
import MagnifyIcon from '@mattermost/compass-icons/components/magnify';
import FilterVariantIcon from '@mattermost/compass-icons/components/filter-variant';
import ChannelSidebarItem from '@/components/ui/ChannelSidebarItem/ChannelSidebarItem';
import MoreUnreadsBanner from '@/components/ui/MoreUnreadsBanner/MoreUnreadsBanner';
import IconButton from '@/components/ui/IconButton/IconButton';
import Icon from '@/components/ui/Icon/Icon';
import styles from './ChannelsSidebar.module.scss';

// ── Sub-components ────────────────────────────────────────────────────────────

function SidebarHeader({ teamName }: { teamName: string }) {
  return (
    <div className={styles['channels-sidebar__header']}>
      <div className={styles['channels-sidebar__team-dropdown']}>
        <span className={styles['channels-sidebar__team-name']}>{teamName}</span>
        <span className={styles['channels-sidebar__team-chevron']}>
          <ChevronDownIcon size={16} />
        </span>
      </div>
      <IconButton
        aria-label="Add channels"
        size="Small"
        style="Inverted"
        padding="Compact"
        rounded
        icon={<Icon size="16" glyph={<PlusIcon />} />}
        className={styles['channels-sidebar__sidebar-icon-button']}
      />
    </div>
  );
}

function SidebarNavigator({ showFilter = false }: { showFilter?: boolean }) {
  return (
    <div className={styles['channels-sidebar__navigator']}>
      {showFilter && (
        <IconButton
          aria-label="Filter channels"
          size="Small"
          style="Inverted"
          padding="Compact"
          icon={<Icon size="16" glyph={<FilterVariantIcon />} />}
          className={styles['channels-sidebar__sidebar-icon-button']}
        />
      )}
      <div className={styles['channels-sidebar__find-channels']}>
        <span className={styles['channels-sidebar__find-channels-icon']}>
          <MagnifyIcon size={16} />
        </span>
        <span className={styles['channels-sidebar__find-channels-label']}>Find channels</span>
      </div>
    </div>
  );
}

interface SidebarCategoryProps {
  label: string;
  showChevron?: boolean;
  showPlusButton?: boolean;
}

function SidebarCategory({ label, showChevron = true, showPlusButton = false }: SidebarCategoryProps) {
  const categoryClass = [
    styles['channels-sidebar__category'],
    !showChevron ? styles['channels-sidebar__category--no-chevron'] : '',
    showPlusButton ? styles['channels-sidebar__category--has-action'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={categoryClass}>
      <div className={styles['channels-sidebar__category-left']}>
        {showChevron && (
          <span className={styles['channels-sidebar__category-chevron']}>
            <ChevronDownIcon size={12} />
          </span>
        )}
        <span className={styles['channels-sidebar__category-label']}>{label}</span>
      </div>
      {showPlusButton && (
        <IconButton
          aria-label={`New ${label.toLowerCase()}`}
          size="X-Small"
          style="Inverted"
          icon={<Icon size="12" glyph={<PlusIcon />} />}
        />
      )}
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ChannelsSidebarProps {
  teamName?: string;
  showUnreadsCategory?: boolean;
  showFilter?: boolean;
  showDialPad?: boolean;
  moreUnreadsAbove?: boolean;
  moreUnreadsBelow?: boolean;
  /** Name of the channel/DM to highlight as active. Pass '' for none. Match against resolved (overridden) names. */
  activeChannelName?: string;
  /**
   * Rename built-in channel/DM items without editing this component.
   * Keys are the default names; values are the display names to use instead.
   * Applies to visible labels, avatar alt text, active matching, and onItemClick callback args.
   */
  channelNameOverrides?: Record<string, string>;
  avatarAikoTan?: string;
  avatarArjunPatel?: string;
  avatarDanielOkoro?: string;
  avatarDariusCole?: string;
  avatarDavidLiang?: string;
  avatarEmmaNovak?: string;
  avatarEthanBrooks?: string;
  /** Fires when any sidebar item is clicked. The `name` matches the item's visible (resolved) name. */
  onItemClick?: (name: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChannelsSidebar({
  teamName = 'Contributors',
  showUnreadsCategory = false,
  showFilter = false,
  showDialPad = false,
  moreUnreadsAbove = false,
  moreUnreadsBelow = false,
  activeChannelName = 'UX Design',
  channelNameOverrides,
  avatarAikoTan = '',
  avatarArjunPatel = '',
  avatarDanielOkoro = '',
  avatarDariusCole = '',
  avatarDavidLiang = '',
  avatarEmmaNovak = '',
  avatarEthanBrooks = '',
  onItemClick,
}: ChannelsSidebarProps) {
  const resolveName = (original: string) =>
    channelNameOverrides?.[original] ?? original;
  const isActive = (name: string) => resolveName(name) === activeChannelName;

  return (
    <div className={styles['channels-sidebar']}>
      <SidebarHeader teamName={teamName} />
      <SidebarNavigator showFilter={showFilter} />

      {/* Threads + Drafts */}
      <div className={styles['channels-sidebar__top-group']}>
        <ChannelSidebarItem name={resolveName('Threads')} leadingVisual="Threads" />
        <ChannelSidebarItem name={resolveName('Drafts')} leadingVisual="Drafts" status="Mention" mentionCount={1} />
        {showDialPad && (
          <ChannelSidebarItem
            name={resolveName('Dial Pad')}
            leadingVisual="Dial Pad"
            active={isActive('Dial Pad')}
            onClick={onItemClick ? () => onItemClick(resolveName('Dial Pad')) : undefined}
          />
        )}
      </div>

      {/* Scrollable channel list */}
      <div className={styles['channels-sidebar__scroll-view']}>
        <div className={styles['channels-sidebar__channel-groups']}>

          {/* Unreads category (On variant) */}
          {showUnreadsCategory && (
            <div className={styles['channels-sidebar__channel-group']}>
              <SidebarCategory label="Unreads" showChevron={false} />
              <ChannelSidebarItem name={resolveName('UX Design')} leadingVisual="Public" active={isActive('UX Design')} />
              <ChannelSidebarItem name={resolveName('Orion')} leadingVisual="Public" status="Unread" active={isActive('Orion')} />
              <ChannelSidebarItem name={resolveName('Release Discussion')} leadingVisual="Public" status="Unread" active={isActive('Release Discussion')} />
              <ChannelSidebarItem name={resolveName('Customer Onboarding')} leadingVisual="Private" status="Unread" active={isActive('Customer Onboarding')} />
              <ChannelSidebarItem name={resolveName('Race Teams')} leadingVisual="Private" status="Unread" active={isActive('Race Teams')} />
              <ChannelSidebarItem
                name={resolveName('Arjun Patel')}
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarArjunPatel}
                avatarAlt={resolveName('Arjun Patel')}
                showAvatarStatus
                active={isActive('Arjun Patel')}
              />
              <ChannelSidebarItem
                name={resolveName('Daniel Okoro')}
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarDanielOkoro}
                avatarAlt={resolveName('Daniel Okoro')}
                showAvatarStatus
                active={isActive('Daniel Okoro')}
              />
            </div>
          )}

          {/* Favorites */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Favorites" />
            <ChannelSidebarItem name={resolveName('UI Redesign')} leadingVisual="Public" active={isActive('UI Redesign')} />
            {!showUnreadsCategory && (
              <ChannelSidebarItem name={resolveName('UX Design')} leadingVisual="Public" active={isActive('UX Design')} />
            )}
            <ChannelSidebarItem
              name={resolveName('softphone-ux')}
              leadingVisual="Public"
              active={isActive('softphone-ux')}
              onClick={onItemClick ? () => onItemClick(resolveName('softphone-ux')) : undefined}
            />
            <ChannelSidebarItem
              name={resolveName('Aiko Tan')}
              leadingVisual="Direct Message"
              avatarSrc={avatarAikoTan}
              avatarAlt={resolveName('Aiko Tan')}
              showAvatarStatus
              active={isActive('Aiko Tan')}
              onClick={onItemClick ? () => onItemClick(resolveName('Aiko Tan')) : undefined}
            />
            <ChannelSidebarItem name={resolveName('Hilda Martin, Steve M...')} leadingVisual="Group Message" memberCount={2} />
          </div>

          {/* Channels */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Channels" />
            <ChannelSidebarItem name={resolveName('Contributors')} leadingVisual="Public" active={isActive('Contributors')} />
            <ChannelSidebarItem name={resolveName('Developers')} leadingVisual="Public" active={isActive('Developers')} />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name={resolveName('Orion')} leadingVisual="Public" status="Unread" active={isActive('Orion')} />
                <ChannelSidebarItem name={resolveName('Release Discussion')} leadingVisual="Public" status="Unread" active={isActive('Release Discussion')} />
              </>
            )}
            <ChannelSidebarItem name={resolveName('calling-eng')} leadingVisual="Public" active={isActive('calling-eng')} />
            <ChannelSidebarItem name={resolveName('Security Incident')} leadingVisual="Public" active={isActive('Security Incident')} />
            <ChannelSidebarItem name={resolveName('System Status')} leadingVisual="Private" active={isActive('System Status')} />
            <ChannelSidebarItem name={resolveName('Product Support')} leadingVisual="Private" active={isActive('Product Support')} />
            <ChannelSidebarItem name={resolveName('telephony-vendors')} leadingVisual="Private" active={isActive('telephony-vendors')} />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name={resolveName('Sales Partners')} leadingVisual="Private" status="Unread" active={isActive('Sales Partners')} />
                <ChannelSidebarItem name={resolveName('Customer Onboarding')} leadingVisual="Private" status="Unread" active={isActive('Customer Onboarding')} />
              </>
            )}
          </div>

          {/* Direct Messages */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Direct Messages" showPlusButton />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem
                  name={resolveName('Arjun Patel')}
                  leadingVisual="Direct Message"
                  status="Mention"
                  mentionCount={1}
                  avatarSrc={avatarArjunPatel}
                  avatarAlt={resolveName('Arjun Patel')}
                  showAvatarStatus
                  active={isActive('Arjun Patel')}
                />
                <ChannelSidebarItem
                  name={resolveName('Daniel Okoro')}
                  leadingVisual="Direct Message"
                  status="Mention"
                  mentionCount={1}
                  avatarSrc={avatarDanielOkoro}
                  avatarAlt={resolveName('Daniel Okoro')}
                  showAvatarStatus
                  active={isActive('Daniel Okoro')}
                />
              </>
            )}
            <ChannelSidebarItem name={resolveName('Richard McDaniel, P...')} leadingVisual="Group Message" memberCount={2} />
            <ChannelSidebarItem
              name={resolveName('Darius Cole')}
              leadingVisual="Direct Message"
              avatarSrc={avatarDariusCole}
              avatarAlt={resolveName('Darius Cole')}
              showAvatarStatus
              active={isActive('Darius Cole')}
            />
            <ChannelSidebarItem
              name={resolveName('David Liang')}
              leadingVisual="Direct Message"
              avatarSrc={avatarDavidLiang}
              avatarAlt={resolveName('David Liang')}
              showAvatarStatus
              active={isActive('David Liang')}
            />
            <ChannelSidebarItem
              name={resolveName('Emma Novak')}
              leadingVisual="Direct Message"
              avatarSrc={avatarEmmaNovak}
              avatarAlt={resolveName('Emma Novak')}
              showAvatarStatus
              active={isActive('Emma Novak')}
            />
            <ChannelSidebarItem
              name={resolveName('Ethan Brooks')}
              leadingVisual="Direct Message"
              avatarSrc={avatarEthanBrooks}
              avatarAlt={resolveName('Ethan Brooks')}
              showAvatarStatus
              active={isActive('Ethan Brooks')}
            />
          </div>
        </div>

        {moreUnreadsAbove && (
          <MoreUnreadsBanner
            direction="Up"
            className={`${styles['channels-sidebar__more-unreads']} ${styles['channels-sidebar__more-unreads--above']}`}
          />
        )}
        {moreUnreadsBelow && (
          <MoreUnreadsBanner
            direction="Down"
            className={`${styles['channels-sidebar__more-unreads']} ${styles['channels-sidebar__more-unreads--below']}`}
          />
        )}
      </div>
    </div>
  );
}
