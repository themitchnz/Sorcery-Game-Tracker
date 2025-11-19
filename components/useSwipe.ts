import React, { useRef } from 'react';

interface SwipeHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

const SWIPE_THRESHOLD = 20; // pixels

export const useSwipe = ({ onSwipeUp, onSwipeDown }: SwipeHandlers) => {
  const touchStartPos = useRef<{ y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); 
    touchStartPos.current = { y: e.touches[0].clientY };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;

    e.stopPropagation();
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartPos.current.y;

    if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
      if (e.cancelable) {
        e.preventDefault(); // Prevent page scroll
      }

      if (deltaY < 0) { // Swiped Up
        onSwipeUp?.();
      } else { // Swiped Down
        onSwipeDown?.();
      }
      
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
      
      // Reset start position to allow for another swipe in the same gesture
      touchStartPos.current = { y: currentY };
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    touchStartPos.current = null;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    style: { touchAction: 'pan-y' } // Inform the browser that we are handling vertical touches
  };
};
