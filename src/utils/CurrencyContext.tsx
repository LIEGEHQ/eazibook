import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEFAULT_CURRENCY } from './currency';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Create the Supabase client using your projectId and public key
  const supabaseUrl = `https://${projectId}.supabase.co`;
  const supabase = createClient(supabaseUrl, publicAnonKey);

  useEffect(() => {
    loadCurrency();
  }, []);

  const loadCurrency = async () => {
    try {
      setIsLoading(true);

      // ✅ Attempt to fetch company currency setting from Supabase
      const { data, error } = await supabase
        .from('company_settings')
        .select('currency')
        .single();

      if (error) {
        console.warn('Could not fetch currency from Supabase:', error.message);
        setCurrencyState(DEFAULT_CURRENCY);
      } else if (data?.currency) {
        setCurrencyState(data.currency);
      }
    } catch (error) {
      console.error('Error loading currency:', error);
      setCurrencyState(DEFAULT_CURRENCY);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);

    // ✅ Optional: persist change to Supabase if user updates currency
    supabase
      .from('company_settings')
      .upsert({ id: 1, currency: newCurrency })
      .then(({ error }) => {
        if (error) console.error('Error updating currency:', error.message);
      });
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
