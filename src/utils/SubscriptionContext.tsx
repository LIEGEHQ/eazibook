import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

// Subscription types
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'premium';

interface SubscriptionLimits {
  invoices: number;
  bills: number;
}

interface SubscriptionFeatures {
  hasCompanyBranding: boolean;
  hasAIScanner: boolean;
  hasAIChatbot: boolean;
  hasAccounting: boolean;
  hasInventory: boolean;
  hasTaxCompliance: boolean;
  hasPayroll: boolean;
  hasAdvancedReports: boolean;
  hasPrioritySupport: boolean;
}

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
  isPremium: boolean;
  isStarter: boolean;
  isProfessional: boolean;
  usage: SubscriptionLimits;
  limits: SubscriptionLimits;
  features: SubscriptionFeatures;
  canCreateInvoice: boolean;
  canCreateBill: boolean;
  incrementInvoiceUsage: () => void;
  incrementBillUsage: () => void;
  resetUsage: () => void;
}

// Default plan limits
const FREE_LIMITS: SubscriptionLimits = { invoices: 10, bills: 10 };
const STARTER_LIMITS: SubscriptionLimits = { invoices: 50, bills: 50 };
const PROFESSIONAL_LIMITS: SubscriptionLimits = { invoices: Infinity, bills: Infinity };
const PREMIUM_LIMITS: SubscriptionLimits = { invoices: Infinity, bills: Infinity };

// Default plan features
const FREE_FEATURES: SubscriptionFeatures = {
  hasCompanyBranding: false,
  hasAIScanner: false,
  hasAIChatbot: false,
  hasAccounting: false,
  hasInventory: false,
  hasTaxCompliance: false,
  hasPayroll: false,
  hasAdvancedReports: false,
  hasPrioritySupport: false,
};

const STARTER_FEATURES: SubscriptionFeatures = {
  hasCompanyBranding: true,
  hasAIScanner: false,
  hasAIChatbot: false,
  hasAccounting: true,
  hasInventory: false,
  hasTaxCompliance: false,
  hasPayroll: false,
  hasAdvancedReports: false,
  hasPrioritySupport: false,
};

const PROFESSIONAL_FEATURES: SubscriptionFeatures = {
  hasCompanyBranding: true,
  hasAIScanner: false,
  hasAIChatbot: false,
  hasAccounting: true,
  hasInventory: true,
  hasTaxCompliance: true,
  hasPayroll: false,
  hasAdvancedReports: true,
  hasPrioritySupport: false,
};

const PREMIUM_FEATURES: SubscriptionFeatures = {
  hasCompanyBranding: true,
  hasAIScanner: true,
  hasAIChatbot: true,
  hasAccounting: true,
  hasInventory: true,
  hasTaxCompliance: true,
  hasPayroll: true,
  hasAdvancedReports: true,
  hasPrioritySupport: true,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// ✅ Create a single Supabase client
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<SubscriptionPlan>('free');
  const [usage, setUsage] = useState<SubscriptionLimits>({ invoices: 0, bills: 0 });

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  // ✅ Load subscription info directly from Supabase tables (no more fetch errors)
  const loadSubscriptionData = async () => {
    try {
      // Fetch plan
      const { data: planData, error: planError } = await supabase
        .from('subscription_plan')
        .select('plan')
        .single();

      if (planError) {
        console.warn('Plan fetch error:', planError.message);
      } else if (planData?.plan) {
        setPlanState(planData.plan);
      }

      // Fetch usage
      const { data: usageData, error: usageError } = await supabase
        .from('subscription_usage')
        .select('invoices, bills')
        .single();

      if (usageError) {
        console.warn('Usage fetch error:', usageError.message);
      } else if (usageData) {
        setUsage(usageData);
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
    }
  };

  const setPlan = async (newPlan: SubscriptionPlan) => {
    setPlanState(newPlan);
    try {
      const { error } = await supabase
        .from('subscription_plan')
        .upsert({ id: 1, plan: newPlan });

      if (error) console.error('Error updating subscription plan:', error.message);
    } catch (error) {
      console.error('Error updating subscription plan:', error);
    }
  };

  const updateUsage = async (newUsage: SubscriptionLimits) => {
    setUsage(newUsage);
    try {
      const { error } = await supabase
        .from('subscription_usage')
        .upsert({ id: 1, invoices: newUsage.invoices, bills: newUsage.bills });

      if (error) console.error('Error updating usage:', error.message);
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const incrementInvoiceUsage = () => {
    const newUsage = { ...usage, invoices: usage.invoices + 1 };
    updateUsage(newUsage);
  };

  const incrementBillUsage = () => {
    const newUsage = { ...usage, bills: usage.bills + 1 };
    updateUsage(newUsage);
  };

  const resetUsage = () => {
    const newUsage = { invoices: 0, bills: 0 };
    updateUsage(newUsage);
  };

  // Derived flags
  const isPremium = plan === 'premium';
  const isStarter = ['starter', 'professional', 'premium'].includes(plan);
  const isProfessional = ['professional', 'premium'].includes(plan);

  const limits =
    plan === 'premium'
      ? PREMIUM_LIMITS
      : plan === 'professional'
      ? PROFESSIONAL_LIMITS
      : plan === 'starter'
      ? STARTER_LIMITS
      : FREE_LIMITS;

  const features =
    plan === 'premium'
      ? PREMIUM_FEATURES
      : plan === 'professional'
      ? PROFESSIONAL_FEATURES
      : plan === 'starter'
      ? STARTER_FEATURES
      : FREE_FEATURES;

  const canCreateInvoice = limits.invoices === Infinity || usage.invoices < limits.invoices;
  const canCreateBill = limits.bills === Infinity || usage.bills < limits.bills;

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        setPlan,
        isPremium,
        isStarter,
        isProfessional,
        usage,
        limits,
        features,
        canCreateInvoice,
        canCreateBill,
        incrementInvoiceUsage,
        incrementBillUsage,
        resetUsage,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
