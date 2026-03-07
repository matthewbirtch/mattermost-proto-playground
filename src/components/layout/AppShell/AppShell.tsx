import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import styles from './AppShell.module.scss'

export default function AppShell() {
  return (
    <div className={styles['app-shell']}>
      <Sidebar />
      <main className={styles['app-shell__main']}>
        <Outlet />
      </main>
    </div>
  )
}
