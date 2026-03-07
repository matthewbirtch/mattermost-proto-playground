import { NavLink } from 'react-router-dom'
import GlobeIcon from '@mattermost/compass-icons/components/globe'
import AppsIcon from '@mattermost/compass-icons/components/apps'
import Icon from '@/components/ui/Icon/Icon'
import { PROTOTYPES } from '@/router'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.logo}>MM</span>
        <span className={styles.title}>Proto Playground</span>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Flows</span>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
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
                `${styles.navItem} ${isActive ? styles.active : ''}`
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
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
