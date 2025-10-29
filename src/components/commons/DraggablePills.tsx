import React, {useRef} from 'react';

import * as styles from './DraggablePills.css';
import {useDraggablePills} from './useDraggablePills';

interface DraggablePillsProps {
  words: string[];
  onChange: (words: string[]) => void;
}

const DraggablePills = ({words, onChange}: DraggablePillsProps) => {
  const availableAreaRef = useRef<HTMLDivElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);

  const {
    availablePills,
    rectanglePills,
    draggedItem,
    dragOverIndex,
    touchDrag,
    startDrag,
    endDrag,
    updateDragOverIndex,
    handleDropOnRectangle,
    handleDropOnPill,
    handleDropOnAvailable,
    handlePillClick,
    handleAvailableClick,
    startTouchDrag,
    updateTouchDrag,
    endTouchDrag
  } = useDraggablePills({words, onChange});

  const onDragStart = (word: string, source: 'available' | 'rectangle') => {
    startDrag(word, source);
  };

  const onDragEnd = () => {
    endDrag();
  };

  const onDragOverRectangle = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDragOverPill = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    updateDragOverIndex(index);
  };

  const onDropOnRectangle = (e: React.DragEvent) => {
    e.preventDefault();
    handleDropOnRectangle();
  };

  const onDropOnPill = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    handleDropOnPill(targetIndex);
  };

  const onDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    handleDropOnAvailable();
  };

  const onPillClick = (word: string) => {
    handlePillClick(word);
  };

  const onAvailableClick = (word: string) => {
    handleAvailableClick(word);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent, word: string, source: 'available' | 'rectangle') => {
    const touch = e.touches[0];
    startTouchDrag(word, source, touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchDrag) return;

    const touch = e.touches[0];
    updateTouchDrag(touch.clientX, touch.clientY);

    // Detect what's under the touch for visual feedback
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    if (rectangleRef.current && elements.includes(rectangleRef.current)) {
      const pillElements = Array.from(rectangleRef.current.children);
      let foundIndex: number | null = null;

      pillElements.forEach((pill, idx) => {
        if (elements.includes(pill)) {
          foundIndex = idx;
        }
      });

      updateDragOverIndex(foundIndex);
    } else {
      updateDragOverIndex(null);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchDrag || !draggedItem) {
      endTouchDrag(null, 'none');
      return;
    }

    const touch = e.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // Determine drop location
    if (rectangleRef.current && elements.includes(rectangleRef.current)) {
      const pillElements = Array.from(rectangleRef.current.children);
      let targetIndex: number | null = null;

      pillElements.forEach((pill, idx) => {
        if (elements.includes(pill) && pill.textContent !== 'Hierhin ziehen') {
          targetIndex = idx;
        }
      });

      endTouchDrag(targetIndex, 'rectangle');
    } else if (availableAreaRef.current && elements.includes(availableAreaRef.current)) {
      endTouchDrag(null, 'available');
    } else {
      endTouchDrag(null, 'none');
    }
  };

  return (
    <div className={styles.container} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div
        ref={availableAreaRef}
        className={styles.availableArea}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropOnAvailable}
      >
        <div className={styles.pillsContainer}>
          {availablePills.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={`${styles.pill} ${touchDrag?.word === word ? styles.pillDragging : ''}`}
              draggable
              onDragStart={() => onDragStart(word, 'available')}
              onDragEnd={onDragEnd}
              onTouchStart={(e) => onTouchStart(e, word, 'available')}
              onClick={() => onAvailableClick(word)}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div ref={rectangleRef} className={styles.rectangle} onDragOver={onDragOverRectangle} onDrop={onDropOnRectangle}>
        {rectanglePills.length === 0 ? (
          <div className={styles.placeholder}>Hierhin ziehen</div>
        ) : (
          rectanglePills.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={`${styles.pill} ${dragOverIndex === index ? styles.pillDragOver : ''} ${touchDrag?.word === word ? styles.pillDragging : ''}`}
              draggable
              onDragStart={() => onDragStart(word, 'rectangle')}
              onDragEnd={onDragEnd}
              onDragOver={(e) => onDragOverPill(e, index)}
              onDrop={(e) => onDropOnPill(e, index)}
              onTouchStart={(e) => onTouchStart(e, word, 'rectangle')}
              onClick={() => onPillClick(word)}
            >
              {word}
            </div>
          ))
        )}
      </div>

      {/* Floating pill for touch drag */}
      {touchDrag && (
        <div
          className={styles.floatingPill}
          style={{
            left: `${touchDrag.currentX}px`,
            top: `${touchDrag.currentY}px`
          }}
        >
          {touchDrag.word}
        </div>
      )}
    </div>
  );
};

export default DraggablePills;
