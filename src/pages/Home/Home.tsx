import { Link } from 'react-router-dom'
import { PROTOTYPES } from '@/router'
import AICopilotIllustration from '@/assets/illustrations/ai-copilot-intro.svg?react'
import Illustration from '@/components/ui/Illustration/Illustration'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles['home__header']}>
        <h1 className={styles['home__heading']}>Prototype Playground</h1>
        <p className={styles['home__subheading']}>
          Select a flow below to start exploring. Add new flows in{' '}
          <code>src/router/index.tsx</code>.
        </p>
      </header>

      <div className={styles['home__grid']}>
        {PROTOTYPES.map(({ id, label, path }) => (
          <Link key={id} to={path} className={styles['home__card']}>
            <div className={styles['home__card-thumb']} aria-hidden="true" />
            <div className={styles['home__card-body']}>
              <span className={styles['home__card-label']}>{label}</span>
              <span className={styles['home__card-arrow']}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
