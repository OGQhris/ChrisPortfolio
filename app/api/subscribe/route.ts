import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;
    console.log('Processing subscription for:', email);

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    if (existing) {
      console.log('User already subscribed:', email);
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      );
    }

    // Insert into Supabase
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (insertError) {
      console.error('Error saving to Supabase:', insertError);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    console.log('Successfully saved to Supabase:', email);

    // Send welcome email
    if (!process.env.EMAIL_PASSWORD) {
      console.error('EMAIL_PASSWORD is not set in environment variables');
      return NextResponse.json(
        { message: 'Subscribed successfully, but welcome email could not be sent' },
        { status: 200 }
      );
    }

    console.log('Attempting to send welcome email to:', email);
    console.log('Using email password length:', process.env.EMAIL_PASSWORD?.length);

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'OGQhris@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      });

      console.log('Created email transporter');

      const mailOptions = {
        from: '"Chris Marvel Blog" <OGQhris@gmail.com>',
        to: email,
        subject: 'Welcome to Chris Marvel Blog!',
        text: `
Thank you for subscribing to my blog!

You'll receive notifications whenever I publish new content. 

Best regards,
Chris Marvel
        `.trim()
      };

      console.log('Sending email with options:', { ...mailOptions, pass: '[REDACTED]' });

      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully to:', email);

      return NextResponse.json(
        { message: 'Subscribed successfully and welcome email sent' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      return NextResponse.json(
        { message: 'Subscribed successfully, but welcome email failed to send', error: emailError instanceof Error ? emailError.message : 'Unknown error' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
