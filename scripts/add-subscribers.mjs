import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukooyfofsdjwquaqkzjf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrb295Zm9mc2Rqd3F1YXFrempmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMjY1MTksImV4cCI6MjA1MTgwMjUxOX0.-bbR4DNf2YMAUyyDgAya0LlJq6S2RG7UHiTDq_L8oFg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addSubscribers() {
  const subscribers = [
    'OGQhris@gmail.com',
    'Cmatthew0705@gmail.com'
  ];

  for (const email of subscribers) {
    // First try to insert
    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email });

    if (error) {
      if (error.code === '23505') { // Unique violation
        console.log(`${email} already exists`);
      } else {
        console.error(`Error adding ${email}:`, error);
      }
    } else {
      console.log(`Successfully added ${email}`);
    }
  }
}

addSubscribers()
  .then(() => console.log('Done!'))
  .catch(console.error);
