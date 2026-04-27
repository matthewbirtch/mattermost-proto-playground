import { useRef, useState } from 'react';
import PhoneIcon from '@mattermost/compass-icons/components/phone';
import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import DialpadIcon from '@/components/icons/DialpadIcon';
import OutboundCallIcon from '@/components/icons/OutboundCallIcon';
import Icon from '@/components/ui/Icon/Icon';
import MenuItem from '@/components/ui/MenuItem/MenuItem';
import { useOutsideClose } from '@/hooks/useOutsideClose';
import { CONFERENCE_BRIDGE } from '@/pages/OutboundCalls/outboundCallData';
import { phoneGlyphFor, phoneLabelText } from '@/pages/OutboundCalls/OutboundCallPhoneGlyphs';
import type { StartCallAction } from '@/types/outboundCall';
import styles from './OutboundCalls.module.scss';

function StartCallMenu({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  return (
    <ul className={styles['start-call-menu']} role="menu" aria-label="Start call options">
      {actions.map((action) => {
        let label: string;
        let secondaryLabel: string | undefined;
        let icon: React.ReactNode;
        if (action.type === 'audio') {
          label = 'Start an audio call';
          icon = <Icon glyph={<PhoneIcon />} size="16" />;
        } else if (action.type === 'phone') {
          label = `Call ${phoneLabelText(action)}`;
          secondaryLabel = action.number;
          icon = (
            <Icon
              glyph={phoneGlyphFor(action.kind, styles['phone-icon--secure'])}
              size="16"
            />
          );
        } else if (action.type === 'conference') {
          label = 'Call conference bridge';
          secondaryLabel = CONFERENCE_BRIDGE.number;
          icon = <Icon glyph={<OutboundCallIcon />} size="16" />;
        } else {
          label = 'Use dial pad';
          icon = <Icon glyph={<DialpadIcon />} size="16" />;
        }
        return (
          <li key={action.id} className={styles['start-call-menu__item']}>
            <MenuItem
              role="menuitem"
              label={label}
              secondaryLabel={secondaryLabel}
              leadingVisual={icon}
              onClick={() => onSelect(action)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function SegmentedCallButton({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useOutsideClose(wrapRef, open, () => setOpen(false));

  const toggle = () => setOpen((o) => !o);
  const pick = (action: StartCallAction) => {
    setOpen(false);
    onSelect(action);
  };

  return (
    <div className={styles['seg-call']} ref={wrapRef}>
      <button
        type="button"
        className={styles['seg-call__primary']}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<PhoneIcon />} size="12" />
        <span>Start call</span>
      </button>
      <span className={styles['seg-call__divider']} aria-hidden />
      <button
        type="button"
        className={styles['seg-call__trigger']}
        onClick={toggle}
        aria-label="Choose call option"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<ChevronDownIcon />} size="12" />
      </button>
      {open && <StartCallMenu actions={actions} onSelect={pick} />}
    </div>
  );
}

export function PopoverCallButton({
  actions,
  onSelect,
}: {
  actions: StartCallAction[];
  onSelect: (action: StartCallAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useOutsideClose(wrapRef, open, () => setOpen(false));

  const pick = (action: StartCallAction) => {
    setOpen(false);
    onSelect(action);
  };

  return (
    <div className={styles['pop-call']} ref={wrapRef}>
      <button
        type="button"
        className={styles['pop-call__btn']}
        onClick={() => setOpen((o) => !o)}
        aria-label="Call"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon glyph={<PhoneIcon />} size="16" />
        <Icon glyph={<ChevronDownIcon />} size="12" />
      </button>
      {open && <StartCallMenu actions={actions} onSelect={pick} />}
    </div>
  );
}
