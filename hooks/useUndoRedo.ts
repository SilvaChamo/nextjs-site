"use client";

import { useState } from "react";

interface UndoRedoAction {
  id: string;
  type: 'create' | 'update' | 'delete' | 'restore';
  tableName: string;
  data: any;
  timestamp: Date;
  description: string;
}

export function useUndoRedo() {
  const [history, setHistory] = useState<UndoRedoAction[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const addAction = (action: Omit<UndoRedoAction, 'id' | 'timestamp'>) => {
    const newAction: UndoRedoAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, newAction];
    });
    setCurrentIndex(prev => prev + 1);
  };

  const undo = () => {
    if (currentIndex < 0) return null;
    
    const action = history[currentIndex];
    setCurrentIndex(prev => prev - 1);
    return action;
  };

  const redo = () => {
    if (currentIndex >= history.length - 1) return null;
    
    const action = history[currentIndex + 1];
    setCurrentIndex(prev => prev + 1);
    return action;
  };

  const canUndo = currentIndex >= 0;
  const canRedo = currentIndex < history.length - 1;

  const clearHistory = () => {
    setHistory([]);
    setCurrentIndex(-1);
  };

  return {
    history,
    currentIndex,
    addAction,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  };
}
