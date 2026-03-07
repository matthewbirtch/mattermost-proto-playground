import { NavLink } from 'react-router-dom'
import GlobeIcon from '@mattermost/compass-icons/components/globe'
import AppsIcon from '@mattermost/compass-icons/components/apps'
import MattermostIcon from '@mattermost/compass-icons/components/mattermost'
import Icon from '@/components/ui/Icon/Icon'
import { PROTOTYPES } from '@/router'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles['sidebar__header']}>
        <span className={styles['sidebar__logo']} aria-hidden>
          <Icon glyph={<MattermostIcon size={24} />} size="24" />
        </span>
        <span className={styles['sidebar__title']}>Proto Playground</span>
      </div>

      <div className={styles['sidebar__section']}>
        <span className={styles['sidebar__section-label']}>Flows</span>
        <ul className={styles['sidebar__nav']}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles['sidebar__nav-item']} ${isActive ? styles['sidebar__nav-item--active'] : ''}`
              }
            >
              <Icon glyph={<GlobeIcon size={16} />} size="16" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/components"
              className={({ isActive }) =>
                `${styles['sidebar__nav-item']} ${isActive ? styles['sidebar__nav-item--active'] : ''}`
              }
            >
              <Icon glyph={<AppsIcon size={16} />} size="16" />
              Components
            </NavLink>
          </li>
          {PROTOTYPES.map(({ id, label, path }) => (
            <li key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${styles['sidebar__nav-item']} ${isActive ? styles['sidebar__nav-item--active'] : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <ThemeSwitcher />
    </nav>
  )
}
