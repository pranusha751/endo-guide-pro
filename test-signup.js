import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignup() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test_bracket_error_123@example.com',
    password: 'password123',
    options: {
      data: {
        fullName: 'Test User'
      }
    }
  });

  console.log('Error:', error);
  if (error) {
    console.log('Error message:', error.message);
    console.log('JSON stringified error:', JSON.stringify(error));
  }
}

testSignup();
