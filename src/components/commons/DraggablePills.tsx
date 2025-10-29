import React, {useEffect, useRef, useState} from 'react';

import * as styles from './DraggablePills.css';

interface DraggablePillsProps {
  words: string[];
  onChange: (words: string[]) => void;
}

interface TouchDragState {
  word: string;
  source: 'available' | 'rectangle';
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

const DraggablePills = ({words, onChange}: DraggablePillsProps) => {
  const [availablePills, setAvailablePills] = useState<string[]>(words);
  const [rectanglePills, setRectanglePills] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<{word: string; source: 'available' | 'rectangle'} | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [touchDrag, setTouchDrag] = useState<TouchDragState | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const availableAreaRef = useRef<HTMLDivElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);

  // Helper function to remove only one instance of a word
  const removeOneInstance = (array: string[], word: string): string[] => {
    const index = array.indexOf(word);
    if (index === -1) return array;
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  };

  useEffect(() => {
    onChange(rectanglePills);
  }, [rectanglePills]);

  useEffect(() => {
    setAvailablePills(words);
    setRectanglePills([]);
  }, [words]);

  const handleDragStart = (word: string, source: 'available' | 'rectangle') => {
    setDraggedItem({word, source});
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    // Reset isDragging after a short delay to prevent click from firing
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleDragOverRectangle = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragOverPill = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDropOnRectangle = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.source === 'available') {
      // Add from available pills
      setRectanglePills([...rectanglePills, draggedItem.word]);
      setAvailablePills(removeOneInstance(availablePills, draggedItem.word));
    }

    setDragOverIndex(null);
  };

  const handleDropOnPill = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.source === 'rectangle') {
      // Reorder within rectangle
      const newPills = [...rectanglePills];
      const draggedIndex = newPills.indexOf(draggedItem.word);
      newPills.splice(draggedIndex, 1);
      newPills.splice(targetIndex, 0, draggedItem.word);
      setRectanglePills(newPills);
    } else {
      // Add from available pills at specific position
      const newPills = [...rectanglePills];
      newPills.splice(targetIndex + 1, 0, draggedItem.word);
      setRectanglePills(newPills);
      setAvailablePills(removeOneInstance(availablePills, draggedItem.word));
    }

    setDragOverIndex(null);
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.source !== 'rectangle') return;

    // Remove from rectangle and add back to available
    setRectanglePills(removeOneInstance(rectanglePills, draggedItem.word));
    setAvailablePills([...availablePills, draggedItem.word]);
  };

  const handlePillClick = (word: string) => {
    // Only trigger if not dragging
    if (isDragging) return;

    // Remove from rectangle and add back to available
    setRectanglePills(removeOneInstance(rectanglePills, word));
    setAvailablePills([...availablePills, word]);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent, word: string, source: 'available' | 'rectangle') => {
    const touch = e.touches[0];
    setTouchDrag({
      word,
      source,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY
    });
    setDraggedItem({word, source});
    setIsDragging(false); // Will be set to true if touch moves
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDrag) return;

    const touch = e.touches[0];

    // Calculate distance moved
    const deltaX = Math.abs(touch.clientX - touchDrag.startX);
    const deltaY = Math.abs(touch.clientY - touchDrag.startY);

    // If moved more than 5 pixels, consider it a drag
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }

    setTouchDrag({
      ...touchDrag,
      currentX: touch.clientX,
      currentY: touch.clientY
    });

    // Detect what's under the touch
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // Check if over rectangle area
    if (rectangleRef.current && elements.includes(rectangleRef.current)) {
      // Find if over a specific pill
      const pillElements = Array.from(rectangleRef.current.children);
      let foundIndex: number | null = null;

      pillElements.forEach((pill, idx) => {
        if (elements.includes(pill)) {
          foundIndex = idx;
        }
      });

      setDragOverIndex(foundIndex);
    } else {
      setDragOverIndex(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchDrag || !draggedItem) {
      setTouchDrag(null);
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const touch = e.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // If no drag occurred (just a tap) and source is rectangle, treat it as a click
    if (!isDragging && draggedItem.source === 'rectangle') {
      handlePillClick(draggedItem.word);
      setTouchDrag(null);
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Check if dropped on rectangle area
    if (rectangleRef.current && elements.includes(rectangleRef.current)) {
      const pillElements = Array.from(rectangleRef.current.children);
      let targetIndex: number | null = null;

      pillElements.forEach((pill, idx) => {
        if (elements.includes(pill) && pill.textContent !== 'Drag words here') {
          targetIndex = idx;
        }
      });

      if (targetIndex !== null && draggedItem.source === 'rectangle') {
        // Reorder within rectangle
        const newPills = [...rectanglePills];
        const draggedIndex = newPills.indexOf(draggedItem.word);
        newPills.splice(draggedIndex, 1);
        newPills.splice(targetIndex, 0, draggedItem.word);
        setRectanglePills(newPills);
      } else if (targetIndex !== null && draggedItem.source === 'available') {
        // Add from available at specific position
        const newPills = [...rectanglePills];
        newPills.splice(targetIndex + 1, 0, draggedItem.word);
        setRectanglePills(newPills);
        setAvailablePills(removeOneInstance(availablePills, draggedItem.word));
      } else if (draggedItem.source === 'available') {
        // Add to end of rectangle
        setRectanglePills([...rectanglePills, draggedItem.word]);
        setAvailablePills(removeOneInstance(availablePills, draggedItem.word));
      }
    } else if (availableAreaRef.current && elements.includes(availableAreaRef.current)) {
      // Dropped back on available area
      if (draggedItem.source === 'rectangle') {
        setRectanglePills(removeOneInstance(rectanglePills, draggedItem.word));
        setAvailablePills([...availablePills, draggedItem.word]);
      }
    }

    setTouchDrag(null);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className={styles.container} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div
        ref={availableAreaRef}
        className={styles.availableArea}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnAvailable}
      >
        <div className={styles.pillsContainer}>
          {availablePills.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={`${styles.pill} ${touchDrag?.word === word ? styles.pillDragging : ''}`}
              draggable
              onDragStart={() => handleDragStart(word, 'available')}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, word, 'available')}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={rectangleRef}
        className={styles.rectangle}
        onDragOver={handleDragOverRectangle}
        onDrop={handleDropOnRectangle}
      >
        {rectanglePills.length === 0 ? (
          <div className={styles.placeholder}>Hierhin ziehen</div>
        ) : (
          rectanglePills.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={`${styles.pill} ${dragOverIndex === index ? styles.pillDragOver : ''} ${touchDrag?.word === word ? styles.pillDragging : ''}`}
              draggable
              onDragStart={() => handleDragStart(word, 'rectangle')}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOverPill(e, index)}
              onDrop={(e) => handleDropOnPill(e, index)}
              onTouchStart={(e) => handleTouchStart(e, word, 'rectangle')}
              onClick={() => handlePillClick(word)}
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
