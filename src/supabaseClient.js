// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptjcyjehtgvgdeijnbrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0amN5amVodGd2Z2RlaWpuYnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTcwNTUsImV4cCI6MjA2MTc3MzA1NX0.zxgqSQha_JUIlciBv5QwCOeEPVQ05w6q-2ccN5fbZmE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
