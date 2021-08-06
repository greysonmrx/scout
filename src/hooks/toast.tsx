import React, {
  useState, useCallback, createContext, useContext,
} from 'react';
import { v4 } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warn' | 'info';
}

interface IToastContext {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      if (messages.length >= 5) {
        setMessages((oldMessages: any) => oldMessages.filter((message: any) => message.id !== messages[0].id));
      }

      const id = v4();

      const toast = {
        id,
        title,
        description,
        type,
      };

      setMessages((oldMessages: any) => [...oldMessages, toast]);
    },
    [messages],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((oldMessages: any) => oldMessages.filter((message: any) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): IToastContext {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider.');
  }

  return context;
}

export { ToastProvider, useToast };
