import type { ReactNode } from 'react';
import Button from '@/components/ui/Button/Button';
import IconButton from '@/components/ui/IconButton/IconButton';
import Icon from '@/components/ui/Icon/Icon';
import styles from './ToastBanner.module.scss';

export type ToastBannerType = 'Default' | 'Info' | 'Success' | 'Warning' | 'Danger';

export interface ToastBannerProps {
  /** Optional CSS class name. */
  className?: string;
  /** Message text shown in the banner. */
  message: string;
  /** Optional type for color-coding. Default: Default. */
  type?: ToastBannerType;
  /** Optional leading icon slot. */
  leadingIcon?: ReactNode;
  /** Optional action button label. When provided, onAction should also be set. */
  actionLabel?: string;
  /** Callback when the action button is clicked. */
  onAction?: () => void;
  /** Called when the dismiss (×) button is clicked. */
  onDismiss?: () => void;
}

/**
 * Toast Banner — floating notification at the bottom of the viewport.
 * Confirms actions with brief messages. Supports undo, dismiss, leading icon.
 * Color-coded by type.
 */
export default function ToastBanner({
  className = '',
  message,
  type = 'Default',
  leadingIcon,
  actionLabel,
  onAction,
  onDismiss,
}: ToastBannerProps) {
  const typeClass = type !== 'Default' ? styles[`toast-banner--type-${type.toLowerCase()}`] : '';

  const rootClass = [styles['toast-banner'], typeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} role="status" aria-live="polite">
      <div className={styles['toast-banner__content']}>
        {leadingIcon != null && (
          <span className={styles['toast-banner__icon']} aria-hidden>
            {leadingIcon}
          </span>
        )}
        <span className={styles['toast-banner__message']}>{message}</span>
        {actionLabel != null && (
          <Button
            className={styles['toast-banner__action']}
            emphasis="Primary"
            size="Small"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>
      {onDismiss != null && (
        <IconButton
          className={styles['toast-banner__dismiss']}
          aria-label="Dismiss"
          size="Small"
          icon={<Icon size="16" />}
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
