import type { ReactNode } from 'react';
import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import IconButton from '@/components/ui/IconButton/IconButton';
import Icon from '@/components/ui/Icon/Icon';
import styles from './PopoverNotice.module.scss';

export interface PopoverNoticeAction {
  label: string;
  onClick?: () => void;
  emphasis?: 'primary' | 'tertiary';
}

export interface PopoverNoticeProps {
  /** Popover title text. */
  title: string;
  /** Body content. */
  children: ReactNode;
  /** Optional icon shown to the left of the title. */
  icon?: ReactNode;
  /** Action buttons rendered below the body. */
  actions?: PopoverNoticeAction[];
  /** When true, shows a "Don't show this again" checkbox. */
  showCheckbox?: boolean;
  /** Checkbox label override. */
  checkboxLabel?: string;
  /** Callback when close button is clicked. */
  onClose?: () => void;
  /** Optional CSS class name. */
  className?: string;
}

/**
 * Popover Notice component matching Figma design.
 * Small contextual popover with title, body, optional actions, and close button.
 */
export default function PopoverNotice({
  title,
  children,
  icon,
  actions,
  showCheckbox = false,
  checkboxLabel = "Don't show this confirmation again",
  onClose,
  className = '',
}: PopoverNoticeProps) {
  const rootClass = [styles['popover-notice'], className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className={styles['popover-notice__content']}>
        {icon != null && (
          <div className={styles['popover-notice__icon']} aria-hidden>
            {icon}
          </div>
        )}

        <div className={styles['popover-notice__body']}>
          <div className={styles['popover-notice__title-row']}>
            <span className={styles['popover-notice__title']}>{title}</span>
          </div>

          <div className={styles['popover-notice__description']}>{children}</div>

          {actions && actions.length > 0 && (
            <div className={styles['popover-notice__actions']}>
              {actions.map((action, i) => (
                <Button
                  key={i}
                  emphasis={action.emphasis === 'tertiary' ? 'Tertiary' : 'Primary'}
                  size="Small"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {showCheckbox && (
            <Checkbox size="Medium">
              {checkboxLabel}
            </Checkbox>
          )}
        </div>
      </div>

      {onClose && (
        <IconButton
          className={styles['popover-notice__close']}
          aria-label="Close"
          size="Small"
          icon={<Icon size="16" />}
          onClick={onClose}
        />
      )}
    </div>
  );
}
