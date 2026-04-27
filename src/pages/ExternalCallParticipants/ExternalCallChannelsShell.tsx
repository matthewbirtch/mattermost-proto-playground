import type { ReactNode } from 'react';
import ChannelHeader from '@/components/ui/ChannelHeader/ChannelHeader';
import ChannelsSidebar from '@/components/ui/ChannelsSidebar/ChannelsSidebar';
import GlobalHeader from '@/components/ui/GlobalHeader/GlobalHeader';
import TeamSidebar from '@/components/ui/TeamSidebar/TeamSidebar';
import avatarLeonard from '@/assets/avatars/Leonard Riley.png';
import avatarStaffTeam from '@/assets/avatars/Staff Team.png';
import { externalCallParticipantsChannelsSidebarModel } from './channelsSidebar.model';
import layoutStyles from './ExternalCallParticipantsLayout.module.scss';

export interface ExternalCallChannelsShellProps {
  /** Center column: channel header, messages, message input. */
  children: ReactNode;
}

export default function ExternalCallChannelsShell({
  children,
}: ExternalCallChannelsShellProps) {
  return (
    <>
      <div className={layoutStyles['page__global-header']}>
        <GlobalHeader
          product="Channels"
          userAvatarSrc={avatarLeonard}
          userAvatarAlt="Leonard Riley"
        />
      </div>

      <div className={layoutStyles['page__body']}>
        <div className={layoutStyles['page__team-sidebar']}>
          <TeamSidebar
            activeTeamId="contributors"
            teams={[
              { id: 'contributors', name: 'Contributors', src: avatarStaffTeam },
              { id: 'design', name: 'Design', initials: 'De', unread: true },
              { id: 'acme', name: 'Acme', initials: 'Ac', mentions: 3 },
            ]}
          />
        </div>

        <div className={layoutStyles['page__outer-panel']}>
          <div className={layoutStyles['page__channels-sidebar']}>
            <ChannelsSidebar
              teamName="Contributors"
              showFilter
              model={externalCallParticipantsChannelsSidebarModel}
            />
          </div>

          <div className={layoutStyles['page__inner-panel']}>
            <div className={layoutStyles['page__center']}>
              <ChannelHeader
                type="Channel"
                name="UX Design"
                description="Design reviews and ongoing work."
                memberCount={24}
                pinnedCount={2}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
