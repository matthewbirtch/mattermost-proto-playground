import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROTOTYPES } from '@/router';
import styles from './Home.module.scss';

const IFRAME_W = 1280;

function CardThumbnail({ src }: { src: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / IFRAME_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles['home__card-thumb']}
      aria-hidden="true"
    >
      <iframe
        className={styles['home__card-iframe']}
        src={src}
        title="Prototype preview"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}

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
        <Link to="/foundations" className={styles['home__card']}>
          <CardThumbnail src="/foundations" />
          <div className={styles['home__card-body']}>
            <span className={styles['home__card-label']}>Foundations</span>
            <span className={styles['home__card-arrow']}>→</span>
          </div>
        </Link>
        <Link to="/components" className={styles['home__card']}>
          <CardThumbnail src="/components" />
          <div className={styles['home__card-body']}>
            <span className={styles['home__card-label']}>Components</span>
            <span className={styles['home__card-arrow']}>→</span>
          </div>
        </Link>
        <Link to="/patterns" className={styles['home__card']}>
          <CardThumbnail src="/patterns" />
          <div className={styles['home__card-body']}>
            <span className={styles['home__card-label']}>Patterns</span>
            <span className={styles['home__card-arrow']}>→</span>
          </div>
        </Link>
        <Link to="/layouts" className={styles['home__card']}>
          <CardThumbnail src="/layouts" />
          <div className={styles['home__card-body']}>
            <span className={styles['home__card-label']}>Layouts</span>
            <span className={styles['home__card-arrow']}>→</span>
          </div>
        </Link>
        {PROTOTYPES.map(({ id, label, path }) => (
          <Link key={id} to={path} className={styles['home__card']}>
            <CardThumbnail src={path} />
            <div className={styles['home__card-body']}>
              <span className={styles['home__card-label']}>{label}</span>
              <span className={styles['home__card-arrow']}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
