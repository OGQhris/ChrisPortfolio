import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// KEEP FOR FUTURE USE
// import { supabase } from '@/lib/supabase';
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rateLimit';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  // Authentication check
  const authHeader = req.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limiting: 10 notifications per hour
  const clientIP = getClientIP(req);
  if (!rateLimit(`notify:${clientIP}`, 10, 3600000)) {
    return rateLimitResponse();
  }

  try {
    const { title, description } = await req.json();

    /* ========================================
     * SUPABASE CODE - COMMENTED OUT FOR FUTURE USE
     * ========================================
     *
     * // Get subscribers from Supabase
     * const { data: subscribers, error } = await supabase
     *   .from('subscribers')
     *   .select('email');
     *
     * if (error) {
     *   console.error('Error fetching subscribers:', error);
     *   return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
     * }
     *
     * ======================================== */

    // NEW: Read subscribers from local JSON file
    const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');
    let subscribers: { email: string }[] = [];

    try {
      const fileContents = await fs.readFile(subscribersPath, 'utf8');
      const data = JSON.parse(fileContents);
      subscribers = data.subscribers.map((email: string) => ({ email }));
    } catch (error) {
      console.error('Error reading subscribers file:', error);
      return NextResponse.json(
        { error: 'No subscribers found. Please create data/subscribers.json' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers to notify' });
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'OGQhris@gmail.com';

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: contactEmail,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Send notification to all subscribers
    await Promise.all(subscribers.map(subscriber =>
      transporter.sendMail({
        from: `"Chris Marvel Blog" <${contactEmail}>`,
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

    return NextResponse.json({ message: `Notifications sent to ${subscribers.length} subscribers` });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
