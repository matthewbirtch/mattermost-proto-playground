import { useTheme } from '@/contexts/ThemeContext'
import type { ThemeId } from '@/contexts/ThemeContext'
import styles from './Sidebar.module.scss'

const THEME_LABELS: Record<ThemeId, string> = {
  denim: 'Denim',
  sapphire: 'Sapphire',
  quartz: 'Quartz',
  indigo: 'Indigo',
  onyx: 'Onyx',
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles['sidebar__theme']}>
      <label htmlFor="theme-select" className={styles['sidebar__theme-label']}>
        Theme
      </label>
      <select
        id="theme-select"
        className={styles['sidebar__theme-select']}
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeId)}
        aria-label="Select theme"
      >
        {(Object.entries(THEME_LABELS) as [ThemeId, string][]).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
