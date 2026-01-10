import { NextResponse } from 'next/server';
// KEEP THESE IMPORTS FOR FUTURE USE (commented out usage)
// import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rateLimit';

// SUPABASE CHECK - Keep for future re-enablement
// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   throw new Error('Missing required Supabase environment variables');
// }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Rate limiting: 3 subscriptions per hour per IP
  const clientIP = getClientIP(request);
  if (!rateLimit(`subscribe:${clientIP}`, 3, 3600000)) {
    return rateLimitResponse();
  }

  try {
    const body = await request.json();
    const email = body.email;

    // Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    /* ========================================
     * SUPABASE CODE - COMMENTED OUT FOR FUTURE USE
     * ========================================
     *
     * // Check if already subscribed
     * const { data: existing, error: checkError } = await supabase
     *   .from('subscribers')
     *   .select('email')
     *   .eq('email', email)
     *   .single();
     *
     * if (checkError && checkError.code !== 'PGRST116') {
     *   console.error('Error checking subscriber:', checkError);
     *   return NextResponse.json(
     *     { error: 'Failed to check subscription status' },
     *     { status: 500 }
     *   );
     * }
     *
     * if (existing) {
     *   return NextResponse.json(
     *     { message: 'Already subscribed' },
     *     { status: 200 }
     *   );
     * }
     *
     * // Insert into Supabase
     * const { error: insertError } = await supabase
     *   .from('subscribers')
     *   .insert([{ email }]);
     *
     * if (insertError) {
     *   console.error('Error saving to Supabase:', insertError);
     *   return NextResponse.json(
     *     { error: 'Failed to save subscription' },
     *     { status: 500 }
     *   );
     * }
     *
     * ======================================== */

    // NEW FLOW: Send notification to your email instead of storing in Supabase
    if (!process.env.EMAIL_PASSWORD) {
      console.error('EMAIL_PASSWORD is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'OGQhris@gmail.com';

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: contactEmail,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Send notification to YOUR email
      await transporter.sendMail({
        from: `"Blog Subscription" <${contactEmail}>`,
        to: contactEmail,
        subject: `New Blog Subscriber: ${email}`,
        text: `
You have a new blog subscriber!

Subscriber Email: ${email}
Timestamp: ${new Date().toLocaleString()}

To notify this subscriber of new posts, add them to your notification list.
        `.trim()
      });

      // Optionally send welcome email to subscriber
      await transporter.sendMail({
        from: `"Chris Marvel Blog" <${contactEmail}>`,
        to: email,
        subject: 'Welcome to Chris Marvel Blog!',
        text: `
Thank you for subscribing to my blog!

You'll receive notifications whenever I publish new content.

Best regards,
Chris Marvel
        `.trim()
      });

      return NextResponse.json(
        { message: 'Subscribed successfully! Check your email for confirmation.' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return NextResponse.json(
        { error: 'Failed to process subscription' },
        { status: 500 }
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
