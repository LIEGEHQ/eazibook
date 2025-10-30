import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// ✅ Build Supabase URL directly from your projectId
const supabaseUrl = `https://${projectId}.supabase.co`;

// ✅ Create the Supabase client (no process.env, no CORS issues)
export const supabase = createClient(supabaseUrl, publicAnonKey);
