import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PageType = 'home' | 'menu';

interface NavigationContextType {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePageState] = useState<PageType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const setActivePage = (page: PageType) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage, selectedCategory, setSelectedCategory }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
