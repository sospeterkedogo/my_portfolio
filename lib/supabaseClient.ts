import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service key on server side only

export const supabase = createClient("https://fzvhcnkrrjeedkhqdsgw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dmhjbmtycmplZWRraHFkc2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE1MDM3NiwiZXhwIjoyMDc0NzI2Mzc2fQ.CI3ufl121h9IAQBzaEeSOj91cZa_8S-o30LM_pWNYX4");
