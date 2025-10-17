// Quick test file to check Supabase connection
import { supabase } from "./integrations/supabase/client";

export const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Auth test failed:', error);
      return false;
    }
    
    console.log('Auth test passed:', data);
    
    // Test 2: Database connection
    const { data: testData, error: dbError } = await supabase
      .from('resumes')
      .select('count')
      .limit(1);
      
    if (dbError) {
      console.error('Database test failed:', dbError);
      return false;
    }
    
    console.log('Database test passed');
    return true;
    
  } catch (err) {
    console.error('Connection test failed:', err);
    return false;
  }
};