import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oeeotrloowgarosklmzz.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZW90cmxvb3dnYXJvc2tsbXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMjI2NzEsImV4cCI6MjA1NjY5ODY3MX0.Qm5oOkKi9Z2gV2hbW43tfvPyDwBMBnhTNmTALWVBQ3c';
console.log(supabaseUrl);
 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;