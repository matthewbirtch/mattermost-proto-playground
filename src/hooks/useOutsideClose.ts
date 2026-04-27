import { type RefObject, useEffect } from 'react';

/**
 * Invokes `close` when a pointer event occurs outside `ref.current`.
 * Pattern shared by dropdown / popover triggers in playground prototypes.
 */
export function useOutsideClose(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close, ref]);
}
