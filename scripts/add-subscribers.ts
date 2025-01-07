import { supabase } from '../lib/supabase';

async function addSubscribers() {
  const subscribers = [
    'OGQhris@gmail.com',
    'Cmatthew0705@gmail.com'
  ];

  for (const email of subscribers) {
    const { data, error } = await supabase
      .from('subscribers')
      .upsert({ 
        email,
        subscribed_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      });

    if (error) {
      console.error(`Error adding ${email}:`, error);
    } else {
      console.log(`Successfully added ${email}`);
    }
  }
}

addSubscribers()
  .then(() => console.log('Done!'))
  .catch(console.error);
