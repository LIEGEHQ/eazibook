//import { createClient } from '@supabase/supabase-js';

// Get environment variables
// client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Create Supabase client
//export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_id: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      companies: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          country: string;
          logo_url: string | null;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['companies']['Insert']>;
      };
      customers: {
        Row: {
          id: string;
          company_id: string;
          customer_code: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          company_name: string | null;
          address: string | null;
          city: string | null;
          country: string;
          balance: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          company_id: string;
          sku: string | null;
          name: string;
          description: string | null;
          type: string;
          category: string | null;
          unit: string;
          price: number;
          cost: number;
          tax_rate: number;
          stock_quantity: number;
          low_stock_threshold: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      suppliers: {
        Row: {
          id: string;
          company_id: string;
          supplier_code: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          company_name: string | null;
          address: string | null;
          city: string | null;
          country: string;
          balance: number;
          payment_terms: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['suppliers']['Insert']>;
      };
      invoices: {
        Row: {
          id: string;
          company_id: string;
          customer_id: string | null;
          invoice_number: string;
          invoice_date: string;
          due_date: string | null;
          status: string;
          currency: string;
          subtotal: number;
          tax_amount: number;
          discount_amount: number;
          total: number;
          amount_paid: number;
          balance_due: number;
          notes: string | null;
          pdf_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['invoices']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['invoices']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          company_id: string;
          transaction_date: string;
          type: string;
          category: string | null;
          description: string;
          amount: number;
          payment_method: string | null;
          reference_number: string | null;
          status: string;
          reconciled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      subscriptions: {
        Row: {
          id: string;
          company_id: string;
          user_id: string;
          plan_type: string;
          status: string;
          start_date: string;
          end_date: string | null;
          invoices_limit: number;
          bills_limit: number;
          invoices_used: number;
          bills_used: number;
          auto_renew: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>;
      };
    };
  };
}
