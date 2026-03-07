import { NavLink } from 'react-router-dom'
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
              Home
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
