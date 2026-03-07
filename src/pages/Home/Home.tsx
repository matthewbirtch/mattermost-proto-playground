import { Link } from 'react-router-dom'
import { PROTOTYPES } from '@/router'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Prototype Playground</h1>
        <p className={styles.subheading}>
          Select a flow below to start exploring. Add new flows in{' '}
          <code>src/router/index.tsx</code>.
        </p>
      </header>

      <div className={styles.grid}>
        {PROTOTYPES.map(({ id, label, path }) => (
          <Link key={id} to={path} className={styles.card}>
            <div className={styles.cardThumb} aria-hidden="true" />
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>{label}</span>
              <span className={styles.cardArrow}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
