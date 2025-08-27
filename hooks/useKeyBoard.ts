// hooks/useKeyboardShortcuts.ts - Keyboard Shortcuts Hook
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleStartMenu } from '../store/features/ui/uiSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Windows/Cmd key for start menu
      if (event.metaKey || event.key === 'Meta') {
        event.preventDefault();
        dispatch(toggleStartMenu());
      }
      
      // Alt + Tab for window switching (future implementation)
      if (event.altKey && event.key === 'Tab') {
        event.preventDefault();
        // TODO: Implement window switching
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
};
