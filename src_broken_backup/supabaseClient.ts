import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kglvpqoztlfjbwfuikmn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbHZwcW96dGxmamJ3ZnVpa21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzgzNzUsImV4cCI6MjA2MzY1NDM3NX0.39aFWpGXfW4P0JKeLbA-zBZNFPhFTlIOlxDNPLuj2jw';

export const supabase = createClient(supabaseUrl, supabaseKey);