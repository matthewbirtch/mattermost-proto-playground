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
  moreUnreadsAbove?: boolean;
  moreUnreadsBelow?: boolean;
  /**
   * Rename built-in channel/DM items without editing this component.
   * Keys are the default names; values are the display names to use instead.
   * Applies to visible labels, avatar alt text, and any callbacks that echo the name.
   */
  channelNameOverrides?: Record<string, string>;
  avatarAikoTan?: string;
  avatarArjunPatel?: string;
  avatarDanielOkoro?: string;
  avatarDariusCole?: string;
  avatarDavidLiang?: string;
  avatarEmmaNovak?: string;
  avatarEthanBrooks?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChannelsSidebar({
  teamName = 'Contributors',
  showUnreadsCategory = false,
  showFilter = false,
  moreUnreadsAbove = false,
  moreUnreadsBelow = false,
  channelNameOverrides,
  avatarAikoTan = '',
  avatarArjunPatel = '',
  avatarDanielOkoro = '',
  avatarDariusCole = '',
  avatarDavidLiang = '',
  avatarEmmaNovak = '',
  avatarEthanBrooks = '',
}: ChannelsSidebarProps) {
  const resolveName = (original: string) =>
    channelNameOverrides?.[original] ?? original;

  return (
    <div className={styles['channels-sidebar']}>
      <SidebarHeader teamName={teamName} />
      <SidebarNavigator showFilter={showFilter} />

      {/* Threads + Drafts */}
      <div className={styles['channels-sidebar__top-group']}>
        <ChannelSidebarItem name={resolveName('Threads')} leadingVisual="Threads" />
        <ChannelSidebarItem name={resolveName('Drafts')} leadingVisual="Drafts" status="Mention" mentionCount={1} />
      </div>

      {/* Scrollable channel list */}
      <div className={styles['channels-sidebar__scroll-view']}>
        <div className={styles['channels-sidebar__channel-groups']}>

          {/* Unreads category (On variant) */}
          {showUnreadsCategory && (
            <div className={styles['channels-sidebar__channel-group']}>
              <SidebarCategory label="Unreads" showChevron={false} />
              <ChannelSidebarItem name={resolveName('UX Design')} leadingVisual="Public" active />
              <ChannelSidebarItem name={resolveName('Orion')} leadingVisual="Public" status="Unread" />
              <ChannelSidebarItem name={resolveName('Release Discussion')} leadingVisual="Public" status="Unread" />
              <ChannelSidebarItem name={resolveName('Customer Onboarding')} leadingVisual="Private" status="Unread" />
              <ChannelSidebarItem name={resolveName('Race Teams')} leadingVisual="Private" status="Unread" />
              <ChannelSidebarItem
                name={resolveName('Arjun Patel')}
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarArjunPatel}
                avatarAlt={resolveName('Arjun Patel')}
                showAvatarStatus
              />
              <ChannelSidebarItem
                name={resolveName('Daniel Okoro')}
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarDanielOkoro}
                avatarAlt={resolveName('Daniel Okoro')}
                showAvatarStatus
              />
            </div>
          )}

          {/* Favorites */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Favorites" />
            <ChannelSidebarItem name={resolveName('UI Redesign')} leadingVisual="Public" />
            {!showUnreadsCategory && (
              <ChannelSidebarItem name={resolveName('UX Design')} leadingVisual="Public" active />
            )}
            <ChannelSidebarItem name={resolveName('Hilda Martin, Steve M...')} leadingVisual="Group Message" memberCount={2} />
          </div>

          {/* Channels */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Channels" />
            <ChannelSidebarItem name={resolveName('Contributors')} leadingVisual="Public" />
            <ChannelSidebarItem name={resolveName('Developers')} leadingVisual="Public" />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name={resolveName('Orion')} leadingVisual="Public" status="Unread" />
                <ChannelSidebarItem name={resolveName('Release Discussion')} leadingVisual="Public" status="Unread" />
              </>
            )}
            <ChannelSidebarItem name={resolveName('Security Incident')} leadingVisual="Public" />
            <ChannelSidebarItem name={resolveName('System Status')} leadingVisual="Private" />
            <ChannelSidebarItem name={resolveName('Product Support')} leadingVisual="Private" />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name={resolveName('Sales Partners')} leadingVisual="Private" status="Unread" />
                <ChannelSidebarItem name={resolveName('Customer Onboarding')} leadingVisual="Private" status="Unread" />
              </>
            )}
          </div>

          {/* Direct Messages */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Direct Messages" showPlusButton />
            <ChannelSidebarItem
              name={resolveName('Aiko Tan')}
              leadingVisual="Direct Message"
              avatarSrc={avatarAikoTan}
              avatarAlt={resolveName('Aiko Tan')}
              showAvatarStatus
            />
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
                />
                <ChannelSidebarItem
                  name={resolveName('Daniel Okoro')}
                  leadingVisual="Direct Message"
                  status="Mention"
                  mentionCount={1}
                  avatarSrc={avatarDanielOkoro}
                  avatarAlt={resolveName('Daniel Okoro')}
                  showAvatarStatus
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
            />
            <ChannelSidebarItem
              name={resolveName('David Liang')}
              leadingVisual="Direct Message"
              avatarSrc={avatarDavidLiang}
              avatarAlt={resolveName('David Liang')}
              showAvatarStatus
            />
            <ChannelSidebarItem
              name={resolveName('Emma Novak')}
              leadingVisual="Direct Message"
              avatarSrc={avatarEmmaNovak}
              avatarAlt={resolveName('Emma Novak')}
              showAvatarStatus
            />
            <ChannelSidebarItem
              name={resolveName('Ethan Brooks')}
              leadingVisual="Direct Message"
              avatarSrc={avatarEthanBrooks}
              avatarAlt={resolveName('Ethan Brooks')}
              showAvatarStatus
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
