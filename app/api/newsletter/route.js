import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Email credentials missing" }, { status: 500 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const mailOptions = {
      from: `"Fashion Hubb" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Fashion Hubb Inner Circle!',
      html: `
        <div style="font-family: serif; color: #3d251e; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f0e6e0; border-radius: 12px;">
          <h1 style="text-align: center; color: #3d251e;">Welcome to the Family!</h1>
          <p>Thank you for joining the Fashion Hubb Inner Circle. We're thrilled to have you with us.</p>
          <p>As a subscriber, you'll be the first to know about:</p>
          <ul>
            <li>Exclusive early access to new collections</li>
            <li>Members-only offers and discounts</li>
            <li>Latest style trends and inspiration</li>
          </ul>
          <div style="background: #fdfaf7; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;">
            <p style="margin: 0; font-weight: bold; color: #3d251e;">Enjoy 10% OFF your next order!</p>
            <p style="margin: 10px 0; font-size: 24px; letter-spacing: 2px;">CODE: <strong>WELCOME10</strong></p>
          </div>
          <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
            © 2026 Fashion Hubb. All rights reserved.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Subscribed successfully",
      trackingId: info.messageId
    }, { status: 200 });

  } catch (error) {
    console.error("Newsletter Gmail Error:", error);
    return NextResponse.json({ success: false, message: "Subscription Error: " + error.message }, { status: 500 });
  }
}
