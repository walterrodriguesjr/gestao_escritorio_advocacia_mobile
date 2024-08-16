import "react-native-url-polyfill";
import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xfoynnvmczggrpuejzug.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmb3lubnZtY3pnZ3JwdWVqenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4OTk4NjksImV4cCI6MjAzODQ3NTg2OX0.UCblVmmpA5nRgd4f08OCZuNODqBeIgNDvJUXNe7sEwc";

export const supabase = createClient(supabaseUrl, supabaseKey);