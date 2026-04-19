import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import PlusIcon from '@mattermost/compass-icons/components/plus';
import MagnifyIcon from '@mattermost/compass-icons/components/magnify';
import FilterVariantIcon from '@mattermost/compass-icons/components/filter-variant';
import ChannelSidebarItem from '@/components/ui/ChannelSidebarItem/ChannelSidebarItem';
import MoreUnreadsBanner from '@/components/ui/MoreUnreadsBanner/MoreUnreadsBanner';
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
      <button
        type="button"
        className={styles['channels-sidebar__header-button']}
        aria-label="Add channels"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}

function SidebarNavigator({ showFilter = false }: { showFilter?: boolean }) {
  return (
    <div className={styles['channels-sidebar__navigator']}>
      {showFilter && (
        <button
          type="button"
          className={styles['channels-sidebar__filter-button']}
          aria-label="Filter channels"
        >
          <FilterVariantIcon size={16} />
        </button>
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
        <button
          type="button"
          className={styles['channels-sidebar__category-action']}
          aria-label={`New ${label.toLowerCase()}`}
        >
          <PlusIcon size={12} />
        </button>
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
  avatarAikoTan = '',
  avatarArjunPatel = '',
  avatarDanielOkoro = '',
  avatarDariusCole = '',
  avatarDavidLiang = '',
  avatarEmmaNovak = '',
  avatarEthanBrooks = '',
}: ChannelsSidebarProps) {
  return (
    <div className={styles['channels-sidebar']}>
      <SidebarHeader teamName={teamName} />
      <SidebarNavigator showFilter={showFilter} />

      {/* Threads + Drafts */}
      <div className={styles['channels-sidebar__top-group']}>
        <ChannelSidebarItem name="Threads" leadingVisual="Threads" />
        <ChannelSidebarItem name="Drafts" leadingVisual="Drafts" status="Mention" mentionCount={1} />
      </div>

      {/* Scrollable channel list */}
      <div className={styles['channels-sidebar__scroll-view']}>
        <div className={styles['channels-sidebar__channel-groups']}>

          {/* Unreads category (On variant) */}
          {showUnreadsCategory && (
            <div className={styles['channels-sidebar__channel-group']}>
              <SidebarCategory label="Unreads" showChevron={false} />
              <ChannelSidebarItem name="UX Design" leadingVisual="Public" active />
              <ChannelSidebarItem name="Orion" leadingVisual="Public" status="Unread" />
              <ChannelSidebarItem name="Release Discussion" leadingVisual="Public" status="Unread" />
              <ChannelSidebarItem name="Customer Onboarding" leadingVisual="Private" status="Unread" />
              <ChannelSidebarItem name="Race Teams" leadingVisual="Private" status="Unread" />
              <ChannelSidebarItem
                name="Arjun Patel"
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarArjunPatel}
                avatarAlt="Arjun Patel"
                showAvatarStatus
              />
              <ChannelSidebarItem
                name="Daniel Okoro"
                leadingVisual="Direct Message"
                status="Mention"
                mentionCount={1}
                avatarSrc={avatarDanielOkoro}
                avatarAlt="Daniel Okoro"
                showAvatarStatus
              />
            </div>
          )}

          {/* Favorites */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Favorites" />
            <ChannelSidebarItem name="UI Redesign" leadingVisual="Public" />
            {!showUnreadsCategory && (
              <ChannelSidebarItem name="UX Design" leadingVisual="Public" active />
            )}
            <ChannelSidebarItem name="Hilda Martin, Steve M..." leadingVisual="Group Message" memberCount={2} />
          </div>

          {/* Channels */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Channels" />
            <ChannelSidebarItem name="Contributors" leadingVisual="Public" />
            <ChannelSidebarItem name="Developers" leadingVisual="Public" />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name="Orion" leadingVisual="Public" status="Unread" />
                <ChannelSidebarItem name="Release Discussion" leadingVisual="Public" status="Unread" />
              </>
            )}
            <ChannelSidebarItem name="Security Incident" leadingVisual="Public" />
            <ChannelSidebarItem name="System Status" leadingVisual="Private" />
            <ChannelSidebarItem name="Product Support" leadingVisual="Private" />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem name="Sales Partners" leadingVisual="Private" status="Unread" />
                <ChannelSidebarItem name="Customer Onboarding" leadingVisual="Private" status="Unread" />
              </>
            )}
          </div>

          {/* Direct Messages */}
          <div className={styles['channels-sidebar__channel-group']}>
            <SidebarCategory label="Direct Messages" showPlusButton />
            <ChannelSidebarItem
              name="Aiko Tan"
              leadingVisual="Direct Message"
              avatarSrc={avatarAikoTan}
              avatarAlt="Aiko Tan"
              showAvatarStatus
            />
            {!showUnreadsCategory && (
              <>
                <ChannelSidebarItem
                  name="Arjun Patel"
                  leadingVisual="Direct Message"
                  status="Mention"
                  mentionCount={1}
                  avatarSrc={avatarArjunPatel}
                  avatarAlt="Arjun Patel"
                  showAvatarStatus
                />
                <ChannelSidebarItem
                  name="Daniel Okoro"
                  leadingVisual="Direct Message"
                  status="Mention"
                  mentionCount={1}
                  avatarSrc={avatarDanielOkoro}
                  avatarAlt="Daniel Okoro"
                  showAvatarStatus
                />
              </>
            )}
            <ChannelSidebarItem name="Richard McDaniel, P..." leadingVisual="Group Message" memberCount={2} />
            <ChannelSidebarItem
              name="Darius Cole"
              leadingVisual="Direct Message"
              avatarSrc={avatarDariusCole}
              avatarAlt="Darius Cole"
              showAvatarStatus
            />
            <ChannelSidebarItem
              name="David Liang"
              leadingVisual="Direct Message"
              avatarSrc={avatarDavidLiang}
              avatarAlt="David Liang"
              showAvatarStatus
            />
            <ChannelSidebarItem
              name="Emma Novak"
              leadingVisual="Direct Message"
              avatarSrc={avatarEmmaNovak}
              avatarAlt="Emma Novak"
              showAvatarStatus
            />
            <ChannelSidebarItem
              name="Ethan Brooks"
              leadingVisual="Direct Message"
              avatarSrc={avatarEthanBrooks}
              avatarAlt="Ethan Brooks"
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
