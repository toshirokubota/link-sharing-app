import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

//console.log('supabase-client: ', supabaseUrl, supabaseKey);
const supabase:SupabaseClient  = createClient(supabaseUrl, supabaseKey);
//console.log('supabase-client: ', supabase);

export default supabase;
