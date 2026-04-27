import styles from './SceneSwitcher.module.scss';

export interface SceneSwitcherScene {
  id: string;
  label: string;
}

export interface SceneSwitcherProps {
  scenes: SceneSwitcherScene[];
  activeId: string;
  onChange: (id: string) => void;
  /** Label shown before the segmented control (e.g. "Entry point"). */
  label?: string;
  /** Accessible name for the tablist. */
  ariaLabel?: string;
}

export default function SceneSwitcher({
  scenes,
  activeId,
  onChange,
  label = 'Scenes',
  ariaLabel = 'Scene selection',
}: SceneSwitcherProps) {
  return (
    <div
      className={styles['scene-switcher']}
      role="tablist"
      aria-label={ariaLabel}
    >
      <span className={styles['scene-switcher__label']}>{label}</span>
      <div className={styles['scene-switcher__segmented']}>
        {scenes.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles['scene-switcher__tab']} ${
                isActive ? styles['scene-switcher__tab--active'] : ''
              }`}
              onClick={() => onChange(s.id)}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
