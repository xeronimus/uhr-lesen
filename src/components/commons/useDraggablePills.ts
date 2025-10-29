import {useEffect, useState} from 'react';

export interface DraggablePillsState {
  availablePills: string[];
  rectanglePills: string[];
  draggedItem: {word: string; source: 'available' | 'rectangle'} | null;
  dragOverIndex: number | null;
  isDragging: boolean;
}

export interface TouchDragState {
  word: string;
  source: 'available' | 'rectangle';
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

// Pure functions for business logic
export const removeOneInstance = (array: string[], word: string): string[] => {
  const index = array.indexOf(word);
  if (index === -1) return array;
  const newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
};

export const reorderWithinArray = (array: string[], word: string, targetIndex: number): string[] => {
  const newArray = [...array];
  const draggedIndex = newArray.indexOf(word);
  newArray.splice(draggedIndex, 1);
  newArray.splice(targetIndex, 0, word);
  return newArray;
};

export const insertAtPosition = (array: string[], word: string, position: number): string[] => {
  const newArray = [...array];
  newArray.splice(position, 0, word);
  return newArray;
};

export const appendToArray = (array: string[], word: string): string[] => {
  return [...array, word];
};

interface UseDraggablePillsProps {
  words: string[];
  onChange: (words: string[]) => void;
}

export const useDraggablePills = ({words, onChange}: UseDraggablePillsProps) => {
  const [availablePills, setAvailablePills] = useState<string[]>(words);
  const [rectanglePills, setRectanglePills] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<{word: string; source: 'available' | 'rectangle'} | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [touchDrag, setTouchDrag] = useState<TouchDragState | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onChange(rectanglePills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rectanglePills]);

  useEffect(() => {
    setAvailablePills(words);
    setRectanglePills([]);
  }, [words]);

  // Actions
  const startDrag = (word: string, source: 'available' | 'rectangle') => {
    setDraggedItem({word, source});
    setIsDragging(true);
  };

  const endDrag = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    setTimeout(() => setIsDragging(false), 100);
  };

  const updateDragOverIndex = (index: number | null) => {
    setDragOverIndex(index);
  };

  const movePillToRectangle = (word: string, targetIndex: number | null = null) => {
    if (targetIndex === null) {
      // Append to end
      setRectanglePills(appendToArray(rectanglePills, word));
    } else {
      // Insert after target index
      setRectanglePills(insertAtPosition(rectanglePills, word, targetIndex + 1));
    }
    setAvailablePills(removeOneInstance(availablePills, word));
    setDragOverIndex(null);
  };

  const reorderPillInRectangle = (word: string, targetIndex: number) => {
    setRectanglePills(reorderWithinArray(rectanglePills, word, targetIndex));
    setDragOverIndex(null);
  };

  const movePillToAvailable = (word: string) => {
    setRectanglePills(removeOneInstance(rectanglePills, word));
    setAvailablePills(appendToArray(availablePills, word));
  };

  const handleDropOnRectangle = () => {
    if (!draggedItem) return;

    if (draggedItem.source === 'available') {
      movePillToRectangle(draggedItem.word);
    }
  };

  const handleDropOnPill = (targetIndex: number) => {
    if (!draggedItem) return;

    if (draggedItem.source === 'rectangle') {
      reorderPillInRectangle(draggedItem.word, targetIndex);
    } else {
      movePillToRectangle(draggedItem.word, targetIndex);
    }
  };

  const handleDropOnAvailable = () => {
    if (!draggedItem || draggedItem.source !== 'rectangle') return;
    movePillToAvailable(draggedItem.word);
  };

  const handlePillClick = (word: string) => {
    if (isDragging) return;
    movePillToAvailable(word);
  };

  // Touch handlers
  const startTouchDrag = (word: string, source: 'available' | 'rectangle', clientX: number, clientY: number) => {
    setTouchDrag({
      word,
      source,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY
    });
    setDraggedItem({word, source});
    setIsDragging(false);
  };

  const updateTouchDrag = (clientX: number, clientY: number) => {
    if (!touchDrag) return;

    const deltaX = Math.abs(clientX - touchDrag.startX);
    const deltaY = Math.abs(clientY - touchDrag.startY);

    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }

    setTouchDrag({
      ...touchDrag,
      currentX: clientX,
      currentY: clientY
    });
  };

  const endTouchDrag = (targetIndex: number | null, droppedOn: 'rectangle' | 'available' | 'none') => {
    if (!touchDrag || !draggedItem) {
      setTouchDrag(null);
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Handle tap (not drag)
    if (!isDragging && draggedItem.source === 'rectangle') {
      handlePillClick(draggedItem.word);
      setTouchDrag(null);
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Handle drop
    if (droppedOn === 'rectangle') {
      if (draggedItem.source === 'rectangle' && targetIndex !== null) {
        reorderPillInRectangle(draggedItem.word, targetIndex);
      } else if (draggedItem.source === 'available') {
        movePillToRectangle(draggedItem.word, targetIndex);
      }
    } else if (droppedOn === 'available' && draggedItem.source === 'rectangle') {
      movePillToAvailable(draggedItem.word);
    }

    setTouchDrag(null);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return {
    // State
    availablePills,
    rectanglePills,
    draggedItem,
    dragOverIndex,
    touchDrag,
    isDragging,

    // Actions
    startDrag,
    endDrag,
    updateDragOverIndex,
    handleDropOnRectangle,
    handleDropOnPill,
    handleDropOnAvailable,
    handlePillClick,
    startTouchDrag,
    updateTouchDrag,
    endTouchDrag
  };
};
