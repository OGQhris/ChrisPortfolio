import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rateLimit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // Rate limiting: 5 messages per hour per IP
  const clientIP = getClientIP(req);
  if (!rateLimit(`contact:${clientIP}`, 5, 3600000)) {
    return rateLimitResponse();
  }

  try {
    const { name, email, message } = await req.json();

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long (max 5000 characters)' }, { status: 400 });
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

    const mailOptions = {
      from: `"Portfolio Contact Form" <${contactEmail}>`,
      to: contactEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
