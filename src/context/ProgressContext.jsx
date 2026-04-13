import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    seedCreated: false,
    kycVerified: false,
    rsiConfigured: false,
    polymarketRead: false,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = Object.keys(tasks).length;
    const completed = Object.values(tasks).filter(Boolean).length;
    setProgress(Math.round((completed / total) * 100));
  }, [tasks]);

  const toggleTask = (taskId) => {
    setTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <ProgressContext.Provider value={{ tasks, progress, toggleTask }}>
      {children}
    </ProgressContext.Provider>
  );
};
