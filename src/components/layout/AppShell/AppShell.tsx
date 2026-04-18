import { useState, useRef, useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@mattermost/compass-icons/components/arrow-left';
import PaletteOutlineIcon from '@mattermost/compass-icons/components/palette-outline';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeId } from '@/contexts/ThemeContext';
import IconButton from '@/components/ui/IconButton/IconButton';
import Icon from '@/components/ui/Icon/Icon';
import styles from './AppShell.module.scss';

const THEME_LABELS: Record<ThemeId, string> = {
  denim: 'Denim',
  sapphire: 'Sapphire',
  quartz: 'Quartz',
  indigo: 'Indigo',
  onyx: 'Onyx',
};

export default function AppShell() {
  const isHome = useMatch('/');
  const isEmbedded = window.self !== window.top;
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles['app-shell']}>
      {!isEmbedded && (
        <div className={styles['app-shell__bar']}>
          {!isHome ? (
            <IconButton
              aria-label="Back to home"
              icon={<Icon glyph={<ArrowLeftIcon />} size="20" />}
              onClick={() => navigate('/')}
            />
          ) : (
            <div />
          )}
          <div ref={pickerRef} className={styles['app-shell__theme-picker']}>
            <IconButton
              aria-label="Switch theme"
              icon={<Icon glyph={<PaletteOutlineIcon />} size="20" />}
              toggled={open}
              onClick={() => setOpen((o) => !o)}
            />
            {open && (
              <ul className={styles['app-shell__theme-menu']} role="menu">
                {(Object.entries(THEME_LABELS) as [ThemeId, string][]).map(
                  ([id, label]) => (
                    <li key={id} role="none">
                      <button
                        role="menuitem"
                        className={`${styles['app-shell__theme-option']} ${id === theme ? styles['app-shell__theme-option--active'] : ''}`}
                        onClick={() => {
                          setTheme(id);
                          setOpen(false);
                        }}
                      >
                        {label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
