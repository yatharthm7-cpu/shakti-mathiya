import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className="pointer-events-auto w-full bg-white/95 backdrop-blur-md border border-brand-saffron/20 rounded-2xl shadow-[0_15px_30px_-5px_rgba(74,44,0,0.12)] p-4 flex items-center gap-3.5 relative overflow-hidden"
            >
              {/* Type Accent Strip */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  toast.type === 'success' 
                    ? 'bg-[#10B981]' // Emerald-500
                    : toast.type === 'error' 
                    ? 'bg-brand-maroon' 
                    : 'bg-brand-saffron'
                }`}
              />

              {/* Icon */}
              <div className="flex-shrink-0 ml-1">
                {toast.type === 'success' && (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-brand-maroon" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-5 h-5 text-brand-saffron" />
                )}
              </div>

              {/* Message */}
              <p className="flex-grow text-xs font-semibold text-brand-brown/90 leading-relaxed pr-6">
                {toast.message}
              </p>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1.5 rounded-full text-brand-brown/40 hover:text-brand-brown/80 hover:bg-brand-brown/5 transition-colors absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
