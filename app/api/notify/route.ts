import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    // Get subscribers from Supabase
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email');

    if (error) {
      console.error('Error fetching subscribers:', error);
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers to notify' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'OGQhris@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Send notification to all subscribers
    await Promise.all(subscribers.map(subscriber => 
      transporter.sendMail({
        from: '"Chris Marvel Blog" <OGQhris@gmail.com>',
        to: subscriber.email,
        subject: `New Blog Post: ${title}`,
        text: `
Check out my new blog post!

Title: ${title}
${description}

Read the full post at: https://chrismarvel.com/writing
        `.trim()
      })
    ));

    return NextResponse.json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
